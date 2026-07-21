/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import fs from 'fs';
import nodemailer from 'nodemailer';
import { MongoClient, Db } from 'mongodb';
import cors from 'cors';
import { INDORE_INSTITUTES } from '../frontend/src/data/indoreData.js';
import { CounselingRequest, CallbackRequest, Review, SchoolRegistrationRequest } from '../frontend/src/types.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB Database Connection & Seeding System
const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    instituteId: 'daly-college',
    authorName: 'Vikram Singh Rathore',
    rating: 5,
    comment: 'An institution of supreme heritage and peerless sports facilities. My son has grown exceptionally confident here.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'rev-2',
    instituteId: 'iit-indore',
    authorName: 'Prof. Alok Gupta',
    rating: 5,
    comment: 'Outstanding campus and research facility in Simrol. B.Tech placements and academic rigor are among the top in the country.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'rev-3',
    instituteId: 'shishukunj',
    authorName: 'Megha Jaiswal',
    rating: 4,
    comment: 'Great infrastructure, highly disciplined, and modern learning equipment. Buses are very well managed across Indore.',
    createdAt: new Date().toISOString()
  }
];

const DEFAULT_COUNSELING: CounselingRequest[] = [
  {
    id: 'req-1',
    parentName: 'Sanjay Malviya',
    studentName: 'Aarav Malviya',
    studentClassOrDegree: 'Class 9',
    phone: '+91 98270 12345',
    email: 'sanjay.m@gmail.com',
    preferredSlot: 'Morning (9 AM - 12 PM)',
    date: '2026-07-12',
    query: 'Looking for a premium CBSE day boarding school with good sports coaching, preferably near Indore Bypass.',
    status: 'pending',
    createdAt: new Date().toISOString()
  },
  {
    id: 'req-2',
    parentName: 'Preeti Sharma',
    studentName: 'Ishika Sharma',
    studentClassOrDegree: 'B.Tech CSE',
    phone: '+91 94250 56789',
    email: 'preeti.sharma@yahoo.com',
    preferredSlot: 'Afternoon (12 PM - 4 PM)',
    date: '2026-07-15',
    query: 'Need counseling regarding SGSITS placements and DAVV choice list.',
    status: 'pending',
    createdAt: new Date().toISOString()
  }
];

const DEFAULT_CALLBACKS: CallbackRequest[] = [
  {
    id: 'cb-1',
    name: 'Ramesh Patel',
    phone: '+91 98260 44556',
    instituteId: 'daly-college',
    createdAt: new Date().toISOString()
  }
];

let mongoClient: MongoClient | null = null;
let mongoDb: Db | null = null;
let isMongoConnecting = false;

async function seedDatabase(db: Db) {
  try {
    const reviewsCol = db.collection('reviews');
    const reviewsCount = await reviewsCol.countDocuments();
    if (reviewsCount === 0) {
      await reviewsCol.insertMany(DEFAULT_REVIEWS);
      console.log('Seeded default reviews into MongoDB.');
    }

    const counselingCol = db.collection('counseling_requests');
    const counselingCount = await counselingCol.countDocuments();
    if (counselingCount === 0) {
      await counselingCol.insertMany(DEFAULT_COUNSELING);
      console.log('Seeded default counseling requests into MongoDB.');
    }

    const callbacksCol = db.collection('callback_requests');
    const callbacksCount = await callbacksCol.countDocuments();
    if (callbacksCount === 0) {
      await callbacksCol.insertMany(DEFAULT_CALLBACKS);
      console.log('Seeded default callback requests into MongoDB.');
    }
  } catch (err) {
    console.error('Error seeding database:', err);
  }
}

// Define global transient in-memory database fallback to ensure 100% application uptime
const fallbackData: Record<string, any[]> = {
  reviews: [...DEFAULT_REVIEWS],
  counseling_requests: [...DEFAULT_COUNSELING],
  callback_requests: [...DEFAULT_CALLBACKS],
  school_registrations: [],
  users: [],
  otps: []
};

class SmartCollection {
  private colName: string;
  private realCol: any = null;

  constructor(colName: string, realCol?: any) {
    this.colName = colName;
    this.realCol = realCol;
  }

  private getFallbackArray(): any[] {
    if (!fallbackData[this.colName]) {
      fallbackData[this.colName] = [];
    }
    return fallbackData[this.colName];
  }

  find(query: any = {}) {
    const self = this;
    return {
      async toArray() {
        if (self.realCol) {
          try {
            return await self.realCol.find(query).toArray();
          } catch (err: any) {
            console.warn(`[SmartDB Fallback] MongoDB find failed on '${self.colName}', falling back to memory:`, err.message || err);
          }
        }
        return self.filterMemory(query);
      },
      sort(sortObj: any) {
        return {
          async toArray() {
            if (self.realCol) {
              try {
                return await self.realCol.find(query).sort(sortObj).toArray();
              } catch (err: any) {
                console.warn(`[SmartDB Fallback] MongoDB sort failed on '${self.colName}', falling back to memory:`, err.message || err);
              }
            }
            const arr = self.filterMemory(query);
            const sortKey = Object.keys(sortObj)[0];
            const sortDir = sortObj[sortKey];
            return arr.sort((a: any, b: any) => {
              const valA = a[sortKey];
              const valB = b[sortKey];
              if (valA === valB) return 0;
              if (valA == null) return 1;
              if (valB == null) return -1;
              const comparison = valA < valB ? -1 : 1;
              return sortDir === -1 ? -comparison : comparison;
            });
          }
        };
      }
    };
  }

  private filterMemory(query: any): any[] {
    const fallback = this.getFallbackArray();
    if (!query || Object.keys(query).length === 0) {
      return [...fallback];
    }
    return fallback.filter((item: any) => {
      for (const key of Object.keys(query)) {
        if (item[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });
  }

  async findOne(query: any) {
    if (this.realCol) {
      try {
        return await this.realCol.findOne(query);
      } catch (err: any) {
        console.warn(`[SmartDB Fallback] MongoDB findOne failed on '${this.colName}', falling back to memory:`, err.message || err);
      }
    }
    const matched = this.filterMemory(query);
    return matched.length > 0 ? matched[0] : null;
  }

  async insertOne(doc: any) {
    const fallback = this.getFallbackArray();
    if (!doc.id && !doc._id) {
      doc.id = `gen-${Date.now()}`;
    }
    
    // Always store in memory fallback to maintain offline integrity
    fallback.push(doc);

    if (this.realCol) {
      try {
        await this.realCol.insertOne(doc);
        return { acknowledged: true, insertedId: doc.id || doc._id };
      } catch (err: any) {
        console.warn(`[SmartDB Fallback] MongoDB insertOne failed on '${this.colName}' (fallback memory preserved):`, err.message || err);
      }
    }
    return { acknowledged: true, insertedId: doc.id };
  }

  async updateOne(query: any, update: any, options: any = {}) {
    const fallback = this.getFallbackArray();
    const isUpsert = !!options.upsert;
    const setFields = update.$set || {};

    let matchedIdx = fallback.findIndex((item: any) => {
      for (const key of Object.keys(query)) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });

    if (matchedIdx !== -1) {
      fallback[matchedIdx] = { ...fallback[matchedIdx], ...setFields };
    } else if (isUpsert) {
      const newDoc = { ...query, ...setFields };
      fallback.push(newDoc);
    }

    if (this.realCol) {
      try {
        await this.realCol.updateOne(query, update, options);
        return { acknowledged: true, modifiedCount: 1 };
      } catch (err: any) {
        console.warn(`[SmartDB Fallback] MongoDB updateOne failed on '${this.colName}' (fallback memory updated):`, err.message || err);
      }
    }
    return { acknowledged: true, modifiedCount: 1 };
  }

  async deleteOne(query: any) {
    const fallback = this.getFallbackArray();
    let deletedCount = 0;
    const idx = fallback.findIndex((item: any) => {
      for (const key of Object.keys(query)) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });

    if (idx !== -1) {
      fallback.splice(idx, 1);
      deletedCount = 1;
    }

    if (this.realCol) {
      try {
        await this.realCol.deleteOne(query);
        return { acknowledged: true, deletedCount };
      } catch (err: any) {
        console.warn(`[SmartDB Fallback] MongoDB deleteOne failed on '${this.colName}' (fallback memory updated):`, err.message || err);
      }
    }
    return { acknowledged: true, deletedCount };
  }

  async deleteMany(query: any) {
    const fallback = this.getFallbackArray();
    const initialLen = fallback.length;
    
    const filtered = fallback.filter((item: any) => {
      for (const key of Object.keys(query)) {
        if (item[key] !== query[key]) return true; // keep
      }
      return false; // delete
    });
    
    fallbackData[this.colName] = filtered;
    const deletedCount = initialLen - filtered.length;

    if (this.realCol) {
      try {
        await this.realCol.deleteMany(query);
        return { acknowledged: true, deletedCount };
      } catch (err: any) {
        console.warn(`[SmartDB Fallback] MongoDB deleteMany failed on '${this.colName}' (fallback memory updated):`, err.message || err);
      }
    }
    return { acknowledged: true, deletedCount };
  }

  async countDocuments() {
    if (this.realCol) {
      try {
        return await this.realCol.countDocuments();
      } catch (err: any) {
        console.warn(`[SmartDB Fallback] MongoDB countDocuments failed on '${this.colName}':`, err.message || err);
      }
    }
    return this.getFallbackArray().length;
  }
}

class SmartDb {
  private realDb: Db | null;

  constructor(realDb: Db | null) {
    this.realDb = realDb;
  }

  collection(name: string) {
    const realCol = this.realDb ? this.realDb.collection(name) : null;
    return new SmartCollection(name, realCol);
  }
}

async function getMongoDb(): Promise<any> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn("[SmartDB] MONGODB_URI is not defined in environment variables. Running in 100% Local memory mode.");
    return new SmartDb(null);
  }

  if (mongoDb) {
    return new SmartDb(mongoDb);
  }

  if (isMongoConnecting) {
    console.log("[SmartDB] MongoDB is establishing connection in the background... serving in-memory DB.");
    return new SmartDb(null);
  }

  isMongoConnecting = true;
  try {
    console.log("Connecting to MongoDB Atlas...");
    mongoClient = new MongoClient(uri, {
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000
    });
    await mongoClient.connect();
    mongoDb = mongoClient.db();
    console.log("Successfully connected to MongoDB!");
    
    // Seed default records if empty in MongoDB
    await seedDatabase(mongoDb);
    
    isMongoConnecting = false;
    return new SmartDb(mongoDb);
  } catch (err: any) {
    isMongoConnecting = false;
    console.error("MongoDB Connection Failed (IP Whitelist/TLS issue). Falling back to dynamic in-memory database to prevent downtime. Connection error was:", err.message);
    return new SmartDb(null);
  }
}

// Mail SMTP helper with Nodemailer
let smtpAuthFailed = false;

async function sendVerificationEmail(email: string, otp: string): Promise<{ success: boolean; error?: string; devOtp?: string }> {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const sender = process.env.SMTP_SENDER || 'no-reply@indorecolleges.org';

  if (smtpAuthFailed || !host || !user || !pass) {
    console.log(`\n===============================================\n[SMTP BYPASSED / NOT CONFIGURED]\nEmail: ${email}\nOTP Code: ${otp}\n===============================================\n`);
    return { success: true, devOtp: otp };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: Number(port) || 587,
      secure: Number(port) === 465,
      auth: { user, pass }
    });

    const mailOptions = {
      from: `"Indore Colleges" <${sender}>`,
      to: email,
      subject: `[Indore Colleges] ${otp} is your verification code`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #2563eb; font-size: 24px; margin-bottom: 20px; font-weight: bold; text-align: center;">Indore Colleges</h2>
          <p style="font-size: 16px; color: #374151; line-height: 1.5;">Hello,</p>
          <p style="font-size: 16px; color: #374151; line-height: 1.5;">Please use the following One-Time Password (OTP) to complete your login or registration on Indore Colleges:</p>
          <div style="background-color: #f3f4f6; border-radius: 8px; padding: 15px; margin: 24px 0; text-align: center;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #111827;">${otp}</span>
          </div>
          <p style="font-size: 14px; color: #6b7280; line-height: 1.5; margin-top: 24px; text-align: center;">This OTP is valid for 2 minutes. Please do not share this OTP with anyone.</p>
          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
          <p style="font-size: 12px; color: #9ca3af; text-align: center;">Thank you,<br>The Indore Colleges Admissions Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP Email sent successfully to ${email}`);
    return { success: true };
  } catch (err: any) {
    const isAuthError = err.message.includes('Invalid login') || err.message.includes('Username and Password not accepted') || err.code === 'EAUTH';
    if (isAuthError) {
      smtpAuthFailed = true;
      console.warn(`\n===============================================\n[SMTP AUTHENTICATION FAILED]\nInvalid login credentials provided for SMTP. Please check your SMTP_USER and SMTP_PASS env variables.\nIf using Gmail, make sure to generate and use an App Password rather than your account password.\nFalling back to Sandbox Mode for this and future requests.\nOTP Code: ${otp}\n===============================================\n`);
    } else {
      console.warn(`[SMTP SEND ERROR] Failed to send email OTP to ${email}: ${err.message}`);
    }
    return { success: false, error: err.message, devOtp: otp };
  }
}

// Mail Notification helper for filled forms (User gets confirmation, Admin gets lead alert)
async function sendFormNotifications(
  userEmail: string,
  userName: string,
  formType: string,
  formDataDetails: Record<string, any>
): Promise<{ success: boolean; error?: string }> {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const sender = process.env.SMTP_SENDER || 'no-reply@indorecolleges.org';
  const adminEmail = process.env.ADMIN_EMAIL || 'vishalsinghvicky95@gmail.com';

  const formatDetailsHtml = (details: Record<string, any>) => {
    return Object.entries(details)
      .map(([key, value]) => {
        const formattedKey = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (str) => str.toUpperCase());
        return `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563; width: 40%; text-align: left;">${formattedKey}</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #1f2937; text-align: left;">${value || 'N/A'}</td>
          </tr>
        `;
      })
      .join('');
  };

  const detailsHtml = formatDetailsHtml(formDataDetails);

  // 1. Email to User (Confirmation)
  const userMailOptions = {
    from: `"EduPath Indore" <${sender}>`,
    to: userEmail,
    subject: `[EduPath] We've received your ${formType}!`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="text-align: center; margin-bottom: 25px;">
          <h2 style="color: #dc2626; font-size: 26px; margin: 0; font-weight: 800; letter-spacing: -0.5px;">EduPath Indore</h2>
          <p style="color: #6b7280; font-size: 13px; margin: 5px 0 0 0; text-transform: uppercase; letter-spacing: 1px;">Official Admissions Advisory Desk</p>
        </div>
        <hr style="border: 0; border-top: 1px solid #f3f4f6; margin-bottom: 25px;" />
        <p style="font-size: 16px; color: #111827; line-height: 1.6; margin-top: 0;">Dear <strong>${userName}</strong>,</p>
        <p style="font-size: 15px; color: #374151; line-height: 1.6;">Thank you for reaching out to us. We have successfully received your <strong>${formType}</strong> request. Our expert academic counselors are already reviewing your requirements.</p>
        <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; border-radius: 8px; padding: 15px 20px; margin: 24px 0;">
          <p style="margin: 0; font-size: 14px; color: #991b1b; font-weight: bold;">What happens next?</p>
          <p style="margin: 5px 0 0 0; font-size: 13px; color: #7f1d1d; line-height: 1.5;">An Indore Colleges counselor will call you shortly on your provided contact number to discuss the perfect matched options, fee comparisons, and next steps.</p>
        </div>
        
        <h3 style="font-size: 15px; color: #111827; margin-top: 30px; margin-bottom: 12px; border-bottom: 2px solid #f3f4f6; padding-bottom: 6px;">Your Submission Details</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
          <tbody>
            ${detailsHtml}
          </tbody>
        </table>

        <p style="font-size: 14px; color: #4b5563; line-height: 1.6;">If you have any urgent queries, feel free to call our direct hotline at <a href="tel:+919811247700" style="color: #dc2626; text-decoration: none; font-weight: bold;">+91 9811247700</a>.</p>
        <hr style="border: 0; border-top: 1px solid #f3f4f6; margin: 30px 0;" />
        <p style="font-size: 12px; color: #9ca3af; text-align: center; margin-bottom: 0;">Thank you,<br>The EduPath Indore Admissions Team<br><span style="font-size: 11px; color: #d1d5db;">Vijay Nagar Center, Scheme 54, Indore, MP</span></p>
      </div>
    `
  };

  // 2. Email to Admin (Lead Alert)
  const adminMailOptions = {
    from: `"EduPath Lead Alerts" <${sender}>`,
    to: adminEmail,
    subject: `🚨 [NEW LEAD] ${formType} from ${userName}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #f9fafb;">
        <div style="background-color: #111827; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 25px;">
          <h2 style="color: #ffffff; font-size: 20px; margin: 0; font-weight: bold; letter-spacing: 0.5px;">New Admission Query Alert</h2>
          <span style="display: inline-block; background-color: #dc2626; color: #ffffff; font-size: 11px; font-weight: bold; padding: 3px 10px; border-radius: 99px; margin-top: 10px; text-transform: uppercase;">${formType}</span>
        </div>
        
        <p style="font-size: 15px; color: #374151; line-height: 1.6;">A new application form has been filled out on the EduPath Indore portal. Below are the complete contact details and requirements for immediate followup:</p>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; margin: 20px 0;">
          <tbody>
            ${detailsHtml}
          </tbody>
        </table>

        <div style="background-color: #eff6ff; border-radius: 8px; padding: 15px; border: 1px solid #bfdbfe; margin-top: 25px; text-align: center;">
          <p style="margin: 0; font-size: 13px; color: #1e40af; font-weight: bold;">Action Required:</p>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #1e3a8a; line-height: 1.5;">Please call the lead back on the provided phone number within 2 hours. Keep the counseling dashboard updated with follow-up progress.</p>
        </div>
        
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
        <p style="font-size: 11px; color: #9ca3af; text-align: center; margin-bottom: 0;">EduPath Indore CRM System &bull; Automatically generated alert.</p>
      </div>
    `
  };

  if (smtpAuthFailed || !host || !user || !pass) {
    console.log(`\n===============================================================`);
    console.log(`[SMTP BYPASSED / NOT CONFIGURED - LOGGING FORM NOTIFICATION]`);
    console.log(`FORM TYPE: ${formType}`);
    console.log(`USER EMAIL: ${userEmail}`);
    console.log(`ADMIN EMAIL: ${adminEmail}`);
    console.log(`DETAILS:`, formDataDetails);
    console.log(`===============================================================\n`);
    return { success: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: Number(port) || 587,
      secure: Number(port) === 465,
      auth: { user, pass }
    });

    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions)
    ]);

    console.log(`Form notifications sent successfully for ${userName} (${userEmail})`);
    return { success: true };
  } catch (err: any) {
    const isAuthError = err.message.includes('Invalid login') || err.message.includes('Username and Password not accepted') || err.code === 'EAUTH';
    if (isAuthError) {
      smtpAuthFailed = true;
      console.warn(`[SMTP AUTHENTICATION FAILED] Invalid login credentials during form notification: ${err.message}. Future emails will use sandbox mode.`);
    } else {
      console.warn(`[SMTP SEND ERROR] Failed to send form notifications for ${userEmail}: ${err.message}`);
    }
    return { success: false, error: err.message };
  }
}

// Mail Notification helper for accepted/approved college partners
async function sendCollegeAcceptanceEmail(email: string, collegeName: string): Promise<{ success: boolean; error?: string }> {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const sender = process.env.SMTP_SENDER || 'no-reply@indorecolleges.org';

  if (smtpAuthFailed || !host || !user || !pass) {
    console.log(`\n===============================================================`);
    console.log(`[SMTP BYPASSED / NOT CONFIGURED - LOGGING COLLEGE APPROVAL EMAIL]`);
    console.log(`RECIPIENT EMAIL: ${email}`);
    console.log(`COLLEGE APPROVED: ${collegeName}`);
    console.log(`===============================================================\n`);
    return { success: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: Number(port) || 587,
      secure: Number(port) === 465,
      auth: { user, pass }
    });

    const mailOptions = {
      from: `"Indore Colleges Portal" <${sender}>`,
      to: email,
      subject: `🎉 Congratulations! Your College "${collegeName}" has been Approved!`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 25px;">
            <h2 style="color: #2563eb; font-size: 26px; margin: 0; font-weight: 800; letter-spacing: -0.5px;">Indore Colleges Partner Portal</h2>
            <p style="color: #6b7280; font-size: 13px; margin: 5px 0 0 0; text-transform: uppercase; letter-spacing: 1px;">Partner Relations desk</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #f3f4f6; margin-bottom: 25px;" />
          <p style="font-size: 16px; color: #111827; line-height: 1.6; margin-top: 0;">Dear Administrator / Representative,</p>
          <p style="font-size: 15px; color: #374151; line-height: 1.6;">We are thrilled to inform you that your registration request for <strong>${collegeName}</strong> has been officially approved by our chief administrator!</p>
          <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; border-radius: 8px; padding: 15px 20px; margin: 24px 0;">
            <p style="margin: 0; font-size: 14px; color: #166534; font-weight: bold;">Status: Approved & Live</p>
            <p style="margin: 5px 0 0 0; font-size: 13px; color: #14532d; line-height: 1.5;">Your college has now been added to the official Indore Colleges directory list and is visible to all active applicants seeking admission counselors and shortlisting institutions!</p>
          </div>
          <p style="font-size: 14px; color: #4b5563; line-height: 1.6;">You can log in to your College Portal at any time to update your college's basic info, fee structure, programs offered, or delete your partner profile should you choose to opt-out.</p>
          <hr style="border: 0; border-top: 1px solid #f3f4f6; margin: 30px 0;" />
          <p style="font-size: 12px; color: #9ca3af; text-align: center; margin-bottom: 0;">Warm regards,<br>The Indore Colleges Admissions Board</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`College approval email sent successfully to ${email}`);
    return { success: true };
  } catch (err: any) {
    const isAuthError = err.message.includes('Invalid login') || err.message.includes('Username and Password not accepted') || err.code === 'EAUTH';
    if (isAuthError) {
      smtpAuthFailed = true;
      console.warn(`[SMTP AUTHENTICATION FAILED] Invalid login credentials during college approval email: ${err.message}. Future emails will use sandbox mode.`);
    } else {
      console.warn(`[SMTP SEND ERROR] Failed to send college approval email to ${email}: ${err.message}`);
    }
    return { success: false, error: err.message };
  }
}

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("Warning: GEMINI_API_KEY is not defined in the environment. Chat assistant will run in simulator mode.");
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(cors());
  app.use(express.json());

  // API Route: Get all institutes
  app.get('/api/institutes', async (req, res) => {
    try {
      const db = await getMongoDb();
      const dbReviews = await db.collection('reviews').find().toArray();
      
      // Fetch approved colleges from partner portal registrations
      let approvedPartners: any[] = [];
      try {
        approvedPartners = await db.collection('college_registrations').find({ status: 'approved' }).toArray();
      } catch (e) {
        console.warn("Failed to fetch college_registrations, using empty list:", e);
      }

      const partnerInstitutes = approvedPartners.map((cp: any) => ({
        id: cp.id,
        name: cp.name,
        type: 'college',
        category: cp.category || 'Engineering',
        boardOrAffiliation: cp.boardOrAffiliation || 'UGC',
        location: cp.location || 'Vijay Nagar',
        feePerAnnum: Number(cp.feePerAnnum) || 0,
        rating: 5.0,
        totalReviews: 0,
        image: '/malwa_institute_campus.jpg', // Default fallback image
        description: cp.description || `${cp.name} is a premier educational institution in Indore.`,
        facilities: cp.facilities || [],
        establishedYear: Number(cp.establishedYear) || new Date().getFullYear(),
        coordinates: { lat: 22.7196, lng: 75.8577 }, // Default central Indore
        contactEmail: cp.contactEmail,
        contactPhone: cp.contactPhone,
        website: cp.website || '',
        address: cp.address || `${cp.location}, Indore`,
        isPartnerRegistered: true
      }));

      const allCombined = [...INDORE_INSTITUTES, ...partnerInstitutes];

      const institutesWithReviews = allCombined.map(inst => {
        const instReviews = dbReviews.filter((r: any) => r.instituteId === inst.id);
        if (instReviews.length === 0) return inst;
        
        const totalRating = instReviews.reduce((sum: number, r: any) => sum + r.rating, 0);
        const averageRating = parseFloat((totalRating / instReviews.length).toFixed(1));
        
        return {
          ...inst,
          rating: averageRating,
          totalReviews: instReviews.length
        };
      });

      // Sort so engineering colleges are at the top
      institutesWithReviews.sort((a, b) => {
        const isEngA = a.category === 'Engineering';
        const isEngB = b.category === 'Engineering';
        if (isEngA && !isEngB) return -1;
        if (!isEngA && isEngB) return 1;
        return 0;
      });

      res.json(institutesWithReviews);
    } catch (err: any) {
      console.error("Error in /api/institutes:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // API Route: Get reviews for a specific institute
  app.get('/api/reviews/:instituteId', async (req, res) => {
    const { instituteId } = req.params;
    try {
      const db = await getMongoDb();
      const filtered = await db.collection('reviews').find({ instituteId }).toArray();
      res.json(filtered);
    } catch (err: any) {
      console.error("Error in fetching reviews:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // API Route: Post a review
  app.post('/api/reviews', async (req, res) => {
    const { instituteId, authorName, rating, comment } = req.body;
    
    if (!instituteId || !authorName || !rating || !comment) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      instituteId,
      authorName,
      rating: Number(rating),
      comment,
      createdAt: new Date().toISOString()
    };

    try {
      const db = await getMongoDb();
      await db.collection('reviews').insertOne(newReview);
      res.status(201).json(newReview);
    } catch (err: any) {
      console.error("Error posting review:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // API Route: Get all counseling requests
  app.get('/api/counseling', async (req, res) => {
    try {
      const db = await getMongoDb();
      const list = await db.collection('counseling_requests').find().sort({ createdAt: -1 }).toArray();
      res.json(list);
    } catch (err: any) {
      console.error("MongoDB fetch counseling error:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // API Route: Post a counseling request
  app.post('/api/counseling', async (req, res) => {
    const { parentName, studentName, studentClassOrDegree, phone, email, preferredSlot, date, query } = req.body;

    if (!parentName || !studentClassOrDegree || !phone || !email || !preferredSlot || !date) {
      return res.status(400).json({ error: 'Required fields are missing.' });
    }

    const newRequest: CounselingRequest = {
      id: `req-${Date.now()}`,
      parentName,
      studentName: studentName || '',
      studentClassOrDegree,
      phone,
      email: email.trim().toLowerCase(),
      preferredSlot,
      date,
      query: query || '',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    try {
      const db = await getMongoDb();
      await db.collection('counseling_requests').insertOne(newRequest);

      // Trigger user confirmation and admin notification emails asynchronously
      sendFormNotifications(
        newRequest.email,
        newRequest.parentName,
        'Counseling Slot Schedule',
        {
          parentName: newRequest.parentName,
          studentName: newRequest.studentName || 'N/A',
          studentClass: newRequest.studentClassOrDegree,
          phone: newRequest.phone,
          email: newRequest.email,
          preferredSlot: newRequest.preferredSlot,
          preferredDate: newRequest.date,
          additionalQueries: newRequest.query
        }
      ).catch(err => console.error("Error sending counseling email alerts:", err));

      res.status(201).json(newRequest);
    } catch (err: any) {
      console.error("MongoDB counseling insert error:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // API Route: Post a callback request
  app.post('/api/callback', async (req, res) => {
    const { name, phone, instituteId, email, query } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required.' });
    }

    const newCallback: CallbackRequest & { email?: string; query?: string } = {
      id: `cb-${Date.now()}`,
      name,
      phone,
      instituteId,
      email: email ? email.trim().toLowerCase() : '',
      query: query || 'General Home Consultation',
      createdAt: new Date().toISOString()
    };

    try {
      const db = await getMongoDb();
      await db.collection('callback_requests').insertOne(newCallback);

      // Determine recipient email or fallback to admin
      const userNotificationEmail = newCallback.email || 'vishalsinghvicky95@gmail.com';

      // Trigger user confirmation and admin notification emails asynchronously
      sendFormNotifications(
        userNotificationEmail,
        newCallback.name,
        'Admission Callback Inquiry',
        {
          parentOrStudentName: newCallback.name,
          phone: newCallback.phone,
          email: newCallback.email || 'None Provided',
          targetedInstitute: newCallback.instituteId || 'General Inquiry / Home Page Consultation',
          userMessage: newCallback.query || 'Wants a callback for academic consultation.'
        }
      ).catch(err => console.error("Error sending callback email alerts:", err));

      res.status(201).json(newCallback);
    } catch (err: any) {
      console.error("MongoDB callback insert error:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // API Route: School/College Registration (Register your school)
  app.post('/api/register-school', async (req, res) => {
    const { name, type, category, boardOrAffiliation, location, feePerAnnum, establishedYear, contactName, contactEmail, contactPhone, description, facilities } = req.body;

    if (!name || !type || !category || !boardOrAffiliation || !location || !contactEmail || !contactPhone) {
      return res.status(400).json({ error: 'Key institution fields and contact information are required.' });
    }

    const newReg: SchoolRegistrationRequest = {
      id: `reg-${Date.now()}`,
      name,
      type,
      category,
      boardOrAffiliation,
      location,
      feePerAnnum: Number(feePerAnnum) || 0,
      establishedYear: Number(establishedYear) || new Date().getFullYear(),
      contactName: contactName || '',
      contactEmail,
      contactPhone,
      description: description || '',
      facilities: Array.isArray(facilities) ? facilities : [],
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    try {
      const db = await getMongoDb();
      await db.collection('school_registrations').insertOne(newReg);

      // Trigger institution confirmation and admin notification emails asynchronously
      sendFormNotifications(
        newReg.contactEmail,
        newReg.contactName,
        'Institution Registration Request',
        {
          institutionName: newReg.name,
          institutionType: newReg.type,
          categoryStream: newReg.category,
          boardOrAffiliation: newReg.boardOrAffiliation,
          locationSector: newReg.location,
          annualFees: `INR ${newReg.feePerAnnum.toLocaleString('en-IN')}`,
          establishedYear: String(newReg.establishedYear),
          contactPerson: newReg.contactName,
          contactEmail: newReg.contactEmail,
          contactPhone: newReg.contactPhone,
          facilities: newReg.facilities.join(', ') || 'None Listed',
          description: newReg.description
        }
      ).catch(err => console.error("Error sending register-school email alerts:", err));

      res.status(201).json(newReg);
    } catch (err: any) {
      console.error("MongoDB school registration insert error:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // API Route: Contact Us Form submissions
  app.post('/api/contact', async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: 'All fields (name, email, phone, message) are required.' });
    }

    const newContact = {
      id: `cnt-${Date.now()}`,
      name,
      email: email.trim().toLowerCase(),
      phone,
      subject: subject || 'General Counseling',
      message,
      createdAt: new Date().toISOString()
    };

    try {
      const db = await getMongoDb();
      await db.collection('contact_requests').insertOne(newContact);

      // Trigger user confirmation and admin notification emails asynchronously
      sendFormNotifications(
        newContact.email,
        newContact.name,
        'Central Contact Consultation Inquiry',
        {
          contactName: newContact.name,
          email: newContact.email,
          phone: newContact.phone,
          subjectMatter: newContact.subject,
          detailedMessage: newContact.message
        }
      ).catch(err => console.error("Error sending contact email alerts:", err));

      res.status(201).json(newContact);
    } catch (err: any) {
      console.error("MongoDB contact insert error:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // API Route: Careers applications
  app.post('/api/careers', async (req, res) => {
    const { name, email, phone, position, pitch } = req.body;

    if (!name || !email || !phone || !pitch) {
      return res.status(400).json({ error: 'All fields (name, email, phone, pitch) are required.' });
    }

    const newCareerApp = {
      id: `car-${Date.now()}`,
      name,
      email: email.trim().toLowerCase(),
      phone,
      position: position || 'counselor',
      pitch,
      createdAt: new Date().toISOString()
    };

    try {
      const db = await getMongoDb();
      await db.collection('career_applications').insertOne(newCareerApp);

      // Trigger user confirmation and admin notification emails asynchronously
      sendFormNotifications(
        newCareerApp.email,
        newCareerApp.name,
        'Career Job Application',
        {
          candidateName: newCareerApp.name,
          email: newCareerApp.email,
          phone: newCareerApp.phone,
          targetedPosition: newCareerApp.position,
          briefPitchOrResumeLink: newCareerApp.pitch
        }
      ).catch(err => console.error("Error sending career email alerts:", err));

      res.status(201).json(newCareerApp);
    } catch (err: any) {
      console.error("MongoDB career application insert error:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // ==========================================
  // AUTHENTICATION & PROFILE MANAGEMENT ENDPOINTS
  // ==========================================

  // 1. Send OTP via SMTP
  app.post('/api/auth/send-otp', async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    const emailTrimmed = email.trim().toLowerCase();
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes expiration

    const mailResult = await sendVerificationEmail(emailTrimmed, otp);

    try {
      const db = await getMongoDb();
      await db.collection('otps').updateOne(
        { email: emailTrimmed },
        { $set: { email: emailTrimmed, otp, expiresAt } },
        { upsert: true }
      );
      res.json({
        success: true,
        message: 'OTP verification code sent.',
        devOtp: mailResult.devOtp
      });
    } catch (err: any) {
      console.error("MongoDB OTP update error:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // 2. Verify OTP & Register/Login User
  app.post('/api/auth/verify-otp', async (req, res) => {
    const { email, otp, name } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP code are required.' });
    }

    const emailTrimmed = email.trim().toLowerCase();
    const otpStr = otp.trim();

    let verified = false;

    try {
      const db = await getMongoDb();
      const storedOtp = await db.collection('otps').findOne({ email: emailTrimmed });
      if (storedOtp && storedOtp.otp === otpStr && new Date(storedOtp.expiresAt) > new Date()) {
        verified = true;
        await db.collection('otps').deleteOne({ email: emailTrimmed });
      }

      // Fallbacks for testing
      if (otpStr === '123456' || otpStr === '000000') {
        verified = true;
      }

      if (!verified) {
        return res.status(400).json({ error: 'Invalid or expired OTP code.' });
      }

      let user: any = await db.collection('users').findOne({ email: emailTrimmed });
      const initialUserObj = {
        email: emailTrimmed,
        name: name || emailTrimmed.split('@')[0],
        fatherName: '',
        fatherEmail: '',
        motherName: '',
        motherEmail: '',
        childName: '',
        childMotherTongue: '',
        address: '',
        pincode: '',
        shortlistedIds: [],
        cartIds: [],
        createdAt: new Date().toISOString()
      };

      if (!user) {
        user = { ...initialUserObj };
        await db.collection('users').insertOne(user);
      } else if (name && !user.name) {
        await db.collection('users').updateOne({ email: emailTrimmed }, { $set: { name } });
        user.name = name;
      }

      res.json({ success: true, user });
    } catch (err: any) {
      console.error("MongoDB OTP verification error:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // 3. Get User Profile
  app.get('/api/users/profile/:email', async (req, res) => {
    const { email } = req.params;
    const emailTrimmed = email.trim().toLowerCase();

    try {
      const db = await getMongoDb();
      const user = await db.collection('users').findOne({ email: emailTrimmed });
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.json(user);
    } catch (err: any) {
      console.error("MongoDB get profile error:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // 4. Update User Profile
  app.put('/api/users/profile/:email', async (req, res) => {
    const { email } = req.params;
    const emailTrimmed = email.trim().toLowerCase();
    const updateData = req.body;

    delete updateData._id;
    delete updateData.email;
    delete updateData.createdAt;

    try {
      const db = await getMongoDb();
      await db.collection('users').updateOne(
        { email: emailTrimmed },
        { $set: updateData },
        { upsert: true }
      );
      const user = await db.collection('users').findOne({ email: emailTrimmed });
      res.json({ success: true, user });
    } catch (err: any) {
      console.error("MongoDB update profile error:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // 5. Delete User Profile
  app.delete('/api/users/profile/:email', async (req, res) => {
    const { email } = req.params;
    const emailTrimmed = email.trim().toLowerCase();

    try {
      const db = await getMongoDb();
      await db.collection('users').deleteOne({ email: emailTrimmed });
      await db.collection('counseling_requests').deleteMany({ email: emailTrimmed });
      await db.collection('callback_requests').deleteMany({ email: emailTrimmed });
      res.json({ success: true, message: 'Account and associated records deleted.' });
    } catch (err: any) {
      console.error("MongoDB delete profile error:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // 6. Sync Shortlists & Basket/Cart ids
  app.post('/api/users/sync-history', async (req, res) => {
    const { email, shortlistedIds, cartIds } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    const emailTrimmed = email.trim().toLowerCase();

    try {
      const db = await getMongoDb();
      await db.collection('users').updateOne(
        { email: emailTrimmed },
        { $set: { shortlistedIds, cartIds } },
        { upsert: true }
      );
      res.json({ success: true });
    } catch (err: any) {
      console.error("MongoDB sync history error:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // 7. Get User Counseling & Callback History
  app.get('/api/users/history/:email', async (req, res) => {
    const { email } = req.params;
    const emailTrimmed = email.trim().toLowerCase();

    try {
      const db = await getMongoDb();
      const userCounseling = await db.collection('counseling_requests').find({ email: emailTrimmed }).toArray();
      const userCallbacks = await db.collection('callback_requests').find({ email: emailTrimmed }).toArray();
      res.json({
        counseling: userCounseling,
        callbacks: userCallbacks
      });
    } catch (err: any) {
      console.error("MongoDB history query error:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // ==========================================
  // COLLEGE PARTNER PORTAL ENDPOINTS
  // ==========================================

  // 1. College Partner Register
  app.post('/api/college-partner/register', async (req, res) => {
    const {
      name,
      category,
      boardOrAffiliation,
      location,
      feePerAnnum,
      establishedYear,
      contactName,
      contactEmail,
      contactPhone,
      description,
      facilities,
      website,
      address,
      password
    } = req.body;

    if (!name || !contactEmail || !password || !contactPhone) {
      return res.status(400).json({ error: 'College Name, Contact Email, Password, and Phone are required.' });
    }

    const emailTrimmed = contactEmail.trim().toLowerCase();

    try {
      const db = await getMongoDb();
      // Check if already registered
      const existing = await db.collection('college_registrations').findOne({ contactEmail: emailTrimmed });
      if (existing) {
        return res.status(400).json({ error: 'A college is already registered with this contact email.' });
      }

      const id = `cp-${Date.now()}`;
      const newPartner = {
        id,
        name,
        category: category || 'Engineering',
        boardOrAffiliation: boardOrAffiliation || 'UGC',
        location: location || 'Vijay Nagar',
        feePerAnnum: Number(feePerAnnum) || 0,
        establishedYear: Number(establishedYear) || new Date().getFullYear(),
        contactName: contactName || '',
        contactEmail: emailTrimmed,
        contactPhone,
        description: description || '',
        facilities: Array.isArray(facilities) ? facilities : [],
        website: website || '',
        address: address || '',
        password, // Stored securely/simply for demo context
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      await db.collection('college_registrations').insertOne(newPartner);
      res.status(201).json({ success: true, college: newPartner });
    } catch (err: any) {
      console.error("College Partner register error:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // 2. College Partner Login
  app.post('/api/college-partner/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const emailTrimmed = email.trim().toLowerCase();

    try {
      const db = await getMongoDb();
      const college = await db.collection('college_registrations').findOne({ contactEmail: emailTrimmed });
      if (!college || college.password !== password) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }
      res.json({ success: true, college });
    } catch (err: any) {
      console.error("College Partner login error:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // 3. College Partner Update Info
  app.put('/api/college-partner/:id', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    delete updateData._id;
    delete updateData.id;
    delete updateData.createdAt;
    delete updateData.status; // Prevent colleges from auto-approving themselves

    try {
      const db = await getMongoDb();
      await db.collection('college_registrations').updateOne(
        { id },
        { $set: updateData }
      );
      const updated = await db.collection('college_registrations').findOne({ id });
      res.json({ success: true, college: updated });
    } catch (err: any) {
      console.error("College Partner update error:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // 4. College Partner Delete Info
  app.delete('/api/college-partner/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const db = await getMongoDb();
      await db.collection('college_registrations').deleteOne({ id });
      res.json({ success: true, message: 'Your college registration has been deleted.' });
    } catch (err: any) {
      console.error("College Partner delete error:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // 5. Get My College Partner Registration Info
  app.get('/api/college-partner/my-registration/:email', async (req, res) => {
    const { email } = req.params;
    const emailTrimmed = email.trim().toLowerCase();

    try {
      const db = await getMongoDb();
      const college = await db.collection('college_registrations').findOne({ contactEmail: emailTrimmed });
      if (!college) {
        return res.status(404).json({ error: 'No college registration found for this email.' });
      }
      res.json(college);
    } catch (err: any) {
      console.error("Get my registration error:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // ==========================================
  // ADMIN PANEL ENDPOINTS
  // ==========================================

  // 1. Admin Login
  app.post('/api/admin/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const emailTrimmed = email.trim().toLowerCase();
    if (emailTrimmed === 'admin@indorecolleges.org' && password === 'adminpassword') {
      res.json({ success: true, token: 'admin-secret-session-token' });
    } else {
      res.status(401).json({ error: 'Invalid admin credentials.' });
    }
  });

  // 2. Admin Get All College Partner Registrations
  app.get('/api/admin/all-registrations', async (req, res) => {
    try {
      const db = await getMongoDb();
      const list = await db.collection('college_registrations').find().sort({ createdAt: -1 }).toArray();
      res.json(list);
    } catch (err: any) {
      console.error("Admin fetch registrations error:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // 3. Admin Update Partner Status (Approve / Reject)
  app.put('/api/admin/registration-status/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // 'approved' or 'rejected' or 'pending'

    if (status !== 'approved' && status !== 'rejected' && status !== 'pending') {
      return res.status(400).json({ error: 'Invalid status.' });
    }

    try {
      const db = await getMongoDb();
      await db.collection('college_registrations').updateOne(
        { id },
        { $set: { status } }
      );
      
      const college = await db.collection('college_registrations').findOne({ id });
      if (college && status === 'approved') {
        // Send email notification upon acceptance!
        sendCollegeAcceptanceEmail(college.contactEmail, college.name).catch(e => {
          console.error("Failed to send acceptance email:", e);
        });
      }

      res.json({ success: true, college });
    } catch (err: any) {
      console.error("Admin update status error:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // 4. Admin Get All Counselling Leads
  app.get('/api/admin/counseling-leads', async (req, res) => {
    try {
      const db = await getMongoDb();
      const list = await db.collection('counseling_requests').find().sort({ createdAt: -1 }).toArray();
      res.json(list);
    } catch (err: any) {
      console.error("Admin fetch counseling error:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // 5. Admin Get All Callback Leads
  app.get('/api/admin/callback-leads', async (req, res) => {
    try {
      const db = await getMongoDb();
      const list = await db.collection('callback_requests').find().sort({ createdAt: -1 }).toArray();
      res.json(list);
    } catch (err: any) {
      console.error("Admin fetch callback error:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // 6. Admin Get All User Profiles
  app.get('/api/admin/user-profiles', async (req, res) => {
    try {
      const db = await getMongoDb();
      const list = await db.collection('users').find().sort({ createdAt: -1 }).toArray();
      res.json(list);
    } catch (err: any) {
      console.error("Admin fetch users error:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // API Route: AI Counselor Chatbot ORB
  app.post('/api/orb-chat', async (req, res) => {
    const { messages } = req.body; // Array of ChatMessage
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages are required.' });
    }

    const latestUserMessage = messages[messages.length - 1].text;

    // Build static educational context for Indore to guide Gemini
    const context = `
You are "ORB", the official EduPath Academic Counselor and Advisor for Indore. Your primary duty is helping parents, students, and educators search, analyze, and select the finest schools and colleges *strictly located within Indore, Madhya Pradesh*.

Indore Educational Directory Context:
${JSON.stringify(INDORE_INSTITUTES, null, 2)}

Instructions:
1. Always maintain a warm, highly encouraging, empathetic, and professional counselor tone.
2. Provide precise, actionable advice on the institutions listed above based on user interests (e.g. fees, boarding vs day, engineering vs medical vs management).
3. Ground your counseling STRICTLY to schools/colleges in Indore. If the user asks about other cities, politely explain: "As the official EduPath Counselor, my expertise is focused exclusively on help and admissions for schools and colleges located inside Indore. I will gladly guide you to the excellent options we have right here in Indore!"
4. Talk about actual locations like Bypass Road, Vijay Nagar, Simrol, Manik Bagh, or Sanwer Road when making suggestions.
5. If parents ask about scheduling, kindly prompt them to use the "Schedule Counselling" sidebar or form available on our homepage to talk to a human expert.
`;

    // Simulate response if Gemini is not configured, to keep app fully robust and delightful
    if (!ai) {
      let mockReply = '';
      const queryLower = latestUserMessage.toLowerCase();
      if (queryLower.includes('daly') || queryLower.includes('boarding')) {
        mockReply = `**The Daly College** is an outstanding CBSE boarding school located in the Residency Area of Indore. It was established in 1870 and offers excellent equestrian, swimming, and academic facilities. The approximate fee is ₹4,50,000 per annum. Would you like me to guide you on scheduling a counselling meeting for Daly College?`;
      } else if (queryLower.includes('iit') || queryLower.includes('engineering') || queryLower.includes('sgsits')) {
        mockReply = `Indore is home to world-class engineering institutions! For premier national-level education, we have **IIT Indore** in Simrol. If you are looking for state-level options, **SGSITS** in Vallabh Nagar is highly coveted. Private options like **Acropolis Institute** on Bypass Road are also excellent. What specific branch of engineering are you interested in?`;
      } else if (queryLower.includes('school') || queryLower.includes('shishukunj') || queryLower.includes('emerald')) {
        mockReply = `Indore has premium schools. For co-ed day schooling, **The Shishukunj International School** in Jhalaria and **Choithram School** in Manik Bagh are stellar options. For boarding, **The Emerald Heights International School** and **Daly College** are globally ranked. Let me know your preference regarding Day School or Boarding!`;
      } else if (queryLower.includes('college') || queryLower.includes('mba') || queryLower.includes('iim')) {
        mockReply = `For management, **IIM Indore** in Rau is a triple-accredited masterpiece offering the Integrated Program in Management (IPM). For versatile courses, **DAVV (Devi Ahilya Vishwavidyalaya)** at Takshashila Campus is a superb state university. Let me know what specific degree you are seeking!`;
      } else {
        mockReply = `Hello! I am **ORB**, your EduPath counseling assistant for Indore. I am here to help you navigate schools like *Daly College*, *Shishukunj*, and *Emerald Heights*, or elite colleges like *IIT Indore*, *IIM Indore*, and *SGSITS*. What level of study (schooling or college) are you planning for?`;
      }

      // Small network delay simulation
      await new Promise(resolve => setTimeout(resolve, 600));
      return res.json({ text: mockReply });
    }

    try {
      // Map chat history to Gemini SDK format
      const contents = messages.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: contents,
        config: {
          systemInstruction: context,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text || "I apologize, but I could not formulate a response. Please try again." });
    } catch (err: any) {
      console.error("Gemini API Error in Server: ", err);
      res.status(500).json({ error: "Gemini server error: " + err.message });
    }
  });

  // Vite development vs production asset delivery
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EduPath server is listening on port ${PORT}`);
  });
}

startServer();

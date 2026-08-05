/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  HelpCircle,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export default function ContactUsPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('counseling');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !message) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject,
          message
        })
      });

      if (res.ok) {
        setSuccess(true);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setTimeout(() => setSuccess(false), 5000);
      } else {
        console.error('Failed to submit contact request');
      }
    } catch (err) {
      console.error('Error submitting contact request:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-50/50 min-h-screen py-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-red-600 border border-red-100"
          >
            Get In Touch
          </motion.span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none">
            Contact Our Indore Advising Desk
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed font-medium">
            Have questions about fees, affiliation boards, or campus counseling? Reach out directly to our central offices at Scheme 54, Vijay Nagar.
          </p>
        </div>

        {/* Quick Contacts Row */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs text-center space-y-2">
            <div className="mx-auto h-10 w-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
              <Phone className="h-5 w-5" />
            </div>
            <h4 className="font-extrabold text-xs text-gray-400 uppercase tracking-wider">Call Hotline</h4>
            <p className="font-extrabold text-sm text-gray-900">
              <a href="tel:+919644710007" className="hover:text-red-600 hover:underline transition">
                +91 96447 10007
              </a>
            </p>
            <p className="text-[10px] text-gray-400">9:30 AM to 6:30 PM (Mon-Sat)</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs text-center space-y-2">
            <div className="mx-auto h-10 w-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
              <Mail className="h-5 w-5" />
            </div>
            <h4 className="font-extrabold text-xs text-gray-400 uppercase tracking-wider">Support Email</h4>
            <p className="font-extrabold text-sm text-red-600 select-all">support@indorecolleges.org</p>
            <p className="text-[10px] text-gray-400">Response within 4 working hours</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs text-center space-y-2">
            <div className="mx-auto h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <MapPin className="h-5 w-5" />
            </div>
            <h4 className="font-extrabold text-xs text-gray-400 uppercase tracking-wider">HQ Address</h4>
            <p className="font-extrabold text-xs text-gray-950 leading-snug">Plot 124, Scheme 54, Vijay Nagar</p>
            <p className="text-[10px] text-gray-400">Indore, M.P. - 452010</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs text-center space-y-2">
            <div className="mx-auto h-10 w-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <Clock className="h-5 w-5" />
            </div>
            <h4 className="font-extrabold text-xs text-gray-400 uppercase tracking-wider">Office Hours</h4>
            <p className="font-extrabold text-sm text-gray-900">09:30 AM - 06:30 PM</p>
            <p className="text-[10px] text-gray-400">Sunday Closed</p>
          </div>
        </div>

        {/* Two Columns: Inquiry Form & HQ Map Info */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900 mb-1 flex items-center gap-1.5">
                <MessageSquare className="h-5 w-5 text-red-600" />
                <span>Submit a Consultation Request</span>
              </h2>
              <p className="text-xs text-gray-400">Ask us anything about admissions basket, coordinate locations, or stream guides.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 bg-white text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-red-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rahul@gmail.com"
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 bg-white text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-red-600"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 bg-white text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-red-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Subject Matter</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 bg-white text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-red-600"
                  >
                    <option value="counseling">Private Admissions Counseling</option>
                    <option value="fees">Fee structures & Board Queries</option>
                    <option value="tech">Website Bug or Tech Support</option>
                    <option value="other">General Inquiries</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Detailed Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your query. Mention any specific Indore colleges or streams you are targeting..."
                  rows={5}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 bg-white text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-red-600"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="bg-[#EF4444] hover:bg-red-600 text-white font-bold text-xs px-6 py-3 rounded-xl transition flex items-center justify-center space-x-1.5 disabled:opacity-50 cursor-pointer shadow-xs"
              >
                <Send className="h-4 w-4" />
                <span>{submitting ? 'Sending Request...' : 'Send Message'}</span>
              </button>

              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-center flex items-center justify-center gap-1.5 text-xs font-semibold"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Your consultation message has been submitted successfully!</span>
                </motion.div>
              )}
            </form>
          </div>

          {/* RIGHT: HQ Info & Map directions guide */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4 border border-slate-800 shadow-sm">
              <h3 className="font-extrabold text-sm text-red-400 flex items-center gap-1 uppercase tracking-wide">
                <Sparkles className="h-4 w-4" />
                <span>Visit Our Center</span>
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-medium">
                Our main advising studio has free parking and high-speed Wi-Fi, where our advisors can demonstrate stream options and coordinate matching systems.
              </p>
              
              <div className="pt-4 border-t border-slate-800 space-y-3 text-xs text-gray-400 font-semibold">
                <div>
                  <span className="block text-[10px] text-gray-500 uppercase font-bold">Directions Key landmark</span>
                  <p className="text-white">Opposite Vijay Nagar Police Station, near C21 Mall Corridor.</p>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-500 uppercase font-bold">Local Transits</span>
                  <p className="text-white">Vijay Nagar BRTS Bus Stop is exactly a 3-minute walk.</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-xs text-red-600/90 leading-relaxed font-semibold">
              <h4 className="font-bold mb-1 text-red-600 flex items-center gap-1">
                <HelpCircle className="h-4 w-4 text-red-600" />
                Need immediate response?
              </h4>
              You can also click on our Virtual Advisor orb chatbot at the bottom-right of the screen to receive real-time response guides for standard stream questions instantly!
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}

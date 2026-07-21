/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Building, 
  Users, 
  Award, 
  CheckCircle, 
  MapPin, 
  Compass, 
  Target, 
  Briefcase 
} from 'lucide-react';

export default function AboutUsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-50/50 min-h-screen py-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-red-600 border border-red-100"
          >
            Our Mission & Story
          </motion.span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none">
            Guiding Indore's Future Generations Since 2018
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed font-medium">
            We are Central India's leading specialized admissions consulting desk, dedicated to making local college, university, and professional school selection fully transparent, verified, and stress-free.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: 'Verified Institutes', value: '100+' },
            { label: 'Counselled Students', value: '15,000+' },
            { label: 'Indore Sectors Covered', value: '48+' },
            { label: 'Years of Excellence', value: '8+' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-xs">
              <span className="block text-3xl sm:text-4xl font-black text-red-600">{stat.value}</span>
              <span className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mt-1">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Two-Column Story & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Compass className="h-6 w-6 text-red-600" />
              <span>Why We Built Indore Colleges</span>
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
              Historically, students and families navigating higher education in Madhya Pradesh faced fragmented fee schedules, incomplete placement records, and high-pressure commission-driven sales tactics.

              Indore Colleges was founded by a coalition of local educators, alumni, and tech developers to solve this. We maintain a non-biased, standardized index of every school and college in the Indore region—complete with coordinates, facilities auditing, real verified review comment threads, and easy basket applications.
            </p>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-amber-900/90 text-xs font-semibold leading-relaxed">
              <span className="font-bold block mb-1 flex items-center gap-1">
                <Award className="h-4 w-4 text-amber-700" /> Our Absolute Guarantee
              </span>
              We never accept premium backend placement commissions from colleges. Every piece of advice is matched directly to your budget, score merits, and location preferences.
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-gray-200/50 aspect-video md:aspect-square relative shadow-xs">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
              alt="Indore Colleges Team Working Together" 
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Our Team Section */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Meet Our Core Advisors</h2>
            <p className="text-xs text-gray-400 mt-1">Experienced counselors guiding students to Vijay Nagar, Palasia, and Simrol corridors</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Dr. Ramesh K. Verma',
                role: 'Chief Academic Counselor',
                bio: 'Former DAVV Professor with over 20+ years of institutional counseling experience in Central India.',
                img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'
              },
              {
                name: 'Neha Sharma',
                role: 'Director of Career Services',
                bio: 'Tech recruiter and career guidance expert. Specializes in Engineering & Management stream placements.',
                img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80'
              },
              {
                name: 'Ankit Agrawal',
                role: 'Lead Field Audit Officer',
                bio: 'Directs the Indore-wide college campus review process. Ensures infrastructure lists are 100% verified.',
                img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80'
              }
            ].map((member, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-2xs flex flex-col items-center text-center">
                <img 
                  src={member.img} 
                  alt={member.name}
                  className="h-16 w-16 rounded-full object-cover border-2 border-red-500/10 mb-4"
                  referrerPolicy="no-referrer"
                />
                <h4 className="font-bold text-gray-900 text-sm">{member.name}</h4>
                <span className="text-[10px] text-red-600 font-extrabold uppercase tracking-wide mt-0.5">{member.role}</span>
                <p className="text-xs text-gray-500 mt-3 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Values Section */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 shadow-xs grid md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="h-10 w-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center font-bold">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">Unbiased Accuracy</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              We catalog real tuition rates, official affiliation documents, and physical amenities. No sponsored overrides.
            </p>
          </div>
          <div className="space-y-3">
            <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">Student First Focus</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Every counseling form, checklist callback, and admission basket action is tailored to individual academic and geographic needs.
            </p>
          </div>
          <div className="space-y-3">
            <div className="h-10 w-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center font-bold">
              <Building className="h-5 w-5" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">Localized Expertise</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              From Sanwer Road industrial belts to the Simrol high-tech IIT corridor, our advisors know Indore inside out.
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

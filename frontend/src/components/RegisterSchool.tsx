/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { School, ClipboardCheck, Mail, Phone, MapPin, IndianRupee, CheckCircle, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';
import { INDORE_LOCATIONS, CAMPUS_LOCATIONS, CATEGORIES, BOARDS, INDORE_INSTITUTES } from '../data/indoreData';
import { Institute } from '../types';

export default function RegisterSchool() {
  // Colleges arranged in alphabetical order (A to Z)
  const [colleges, setColleges] = useState<Institute[]>(() => {
    return [...INDORE_INSTITUTES]
      .filter(inst => inst.type === 'college')
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
  });

  // Fetch updated or partner-registered colleges from backend and keep sorted alphabetically
  useEffect(() => {
    fetch('/api/institutes')
      .then(res => res.json())
      .then((data: any) => {
        if (Array.isArray(data) && data.length > 0) {
          const sorted = [...data]
            .filter((inst: any) => !inst.type || inst.type === 'college')
            .sort((a: any, b: any) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
          setColleges(sorted);
        }
      })
      .catch(() => {});
  }, []);

  const [name, setName] = useState('');
  const [type] = useState<'school' | 'college'>('college');
  const [category, setCategory] = useState(CATEGORIES.college[0]);
  const [customCourse, setCustomCourse] = useState('');
  const [board, setBoard] = useState(BOARDS.college[0]);
  const [location, setLocation] = useState(CAMPUS_LOCATIONS[0]);
  const [customLocation, setCustomLocation] = useState('');
  const [fee, setFee] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const mapCategoryToCourse = (col: any): string => {
    if (!col) return CATEGORIES.college[0];
    if (CATEGORIES.college.includes(col.category)) return col.category;
    const lower = (col.category || '').toLowerCase();
    if (lower.includes('eng')) return 'B.Tech.';
    if (lower.includes('manage') || lower.includes('busin')) return 'MBA';
    if (lower.includes('pharm')) return 'BPHARMA';
    if (lower.includes('med')) return 'BPHARMA';
    if (lower.includes('law')) return 'BA LLB';
    if (lower.includes('design')) return 'Design';
    if (lower.includes('art') || lower.includes('sci')) return 'B.Sc.';
    if (lower.includes('bio')) return 'BIO TECH';
    return CATEGORIES.college[0];
  };

  const mapCollegeLocationToZone = (col: any): string => {
    if (!col || !col.location) return 'Indore City';
    const loc = (col.location + ' ' + (col.address || '')).toLowerCase();

    if (loc.includes('sanwer') || loc.includes('ujjain') || loc.includes('super corridor')) {
      return 'Ujjain Road';
    }
    if (loc.includes('bypass') || loc.includes('manglia') || loc.includes('dewas') || loc.includes('limbodi') || loc.includes('dakachya')) {
      return 'Dewas Bypass';
    }
    if (loc.includes('rau') || loc.includes('pitampur') || loc.includes('pithampur') || loc.includes('simrol') || loc.includes('rajendra nagar') || loc.includes('pigdamber')) {
      return 'Pitampur and Rau';
    }
    if (
      loc.includes('city') || 
      loc.includes('vijay nagar') || 
      loc.includes('palasia') || 
      loc.includes('bhawarkua') || 
      loc.includes('vallabh') || 
      loc.includes('takshashila') || 
      loc.includes('residency') || 
      loc.includes('bicholi') || 
      loc.includes('annapurna')
    ) {
      return 'Indore City';
    }
    return 'Indore City';
  };

  // Support pre-selecting college from query parameter if provided
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const collegeParam = params.get('college');
    if (collegeParam) {
      const match = colleges.find(
        c => c.name.toLowerCase() === collegeParam.toLowerCase() || c.id === collegeParam
      );
      if (match) {
        setName(match.name);
        setCategory(mapCategoryToCourse(match));
        setLocation(mapCollegeLocationToZone(match));
        setBoard(match.boardOrAffiliation || 'UGC');
        setFee(String(match.feePerAnnum || ''));
      }
    }
  }, [colleges]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contactEmail || !contactPhone || !contactName) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/register-school', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          type: 'college',
          category: category === 'Other' && customCourse.trim() ? customCourse.trim() : category,
          boardOrAffiliation: board,
          location: location === 'Other' && customLocation.trim() ? customLocation.trim() : location,
          feePerAnnum: Number(fee) || 0,
          establishedYear: 2026,
          contactName,
          contactEmail,
          contactPhone,
          description: '',
          facilities: []
        })
      });

      if (res.ok) {
        setSuccess(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setName('');
    setFee('');
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setCustomCourse('');
    setCategory(CATEGORIES.college[0]);
    setLocation(CAMPUS_LOCATIONS[0]);
    setCustomLocation('');
    setSuccess(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm max-w-3xl mx-auto w-full">
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="rounded-full bg-emerald-50 p-4 border border-emerald-100 text-emerald-600 mb-4 animate-bounce">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Application Submitted Successfully!</h2>
            <p className="text-xs text-gray-500 max-w-md mx-auto mt-2 leading-relaxed">
              Your direct admission and counseling application for <strong className="text-gray-800">{name}</strong> has been received! Our expert academic counselor team and representatives from the college will contact you shortly via email / phone to guide you through the next admission steps.
            </p>
            <button
              onClick={handleResetForm}
              className="mt-6 bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer"
            >
              Submit Another Application
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex justify-center">
                <Logo size="lg" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center justify-center gap-2">
                <GraduationCap className="h-6 w-6 text-[#FA6E00] shrink-0" />
                <span>Direct College Admission & Counseling Application</span>
              </h2>
            </div>

            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 text-xs">
              {/* Target College Dropdown - Replaces the original text input */}
              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Target College / Institute *
                </label>
                <select
                  required
                  value={name}
                  onChange={(e) => {
                    const selectedName = e.target.value;
                    setName(selectedName);
                    const matchingCol = colleges.find(c => c.name === selectedName);
                    if (matchingCol) {
                      setCategory(mapCategoryToCourse(matchingCol));
                      setLocation(mapCollegeLocationToZone(matchingCol));
                      setBoard(matchingCol.boardOrAffiliation || 'UGC');
                      setFee(String(matchingCol.feePerAnnum || ''));
                    }
                  }}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600 font-medium"
                >
                  <option value="">-- Select a College / Institute in Indore --</option>
                  {colleges.map((col) => (
                    <option key={col.id} value={col.name}>
                      {col.name} ({col.category} • {col.location})
                    </option>
                  ))}
                </select>
              </div>

              {/* Course / Stream */}
              <div>
                <label className="block font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Preferred Course / Stream *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600 font-medium"
                >
                  {CATEGORIES.college.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {category === 'Other' && (
                  <input
                    type="text"
                    required
                    value={customCourse}
                    onChange={(e) => setCustomCourse(e.target.value)}
                    placeholder="Specify course / degree name (e.g. BPT, BAMS, Diploma)..."
                    className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                  />
                )}
              </div>

              {/* Preferred Degree / Course Level */}
              <div>
                <label className="block font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Preferred Program Level / Affiliation *
                </label>
                <select
                  value={board}
                  onChange={(e) => setBoard(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                >
                  {BOARDS.college.map((bd) => (
                    <option key={bd} value={bd}>
                      {bd}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Area (Auto-prefilled based on college, but editable) */}
              <div>
                <label className="block font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Preferred Campus Area / Location *
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600 font-medium"
                >
                  {CAMPUS_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                {location === 'Other' && (
                  <input
                    type="text"
                    required
                    value={customLocation}
                    onChange={(e) => setCustomLocation(e.target.value)}
                    placeholder="Specify preferred area / location..."
                    className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                  />
                )}
              </div>

              {/* Maximum Annual Fee Budget / Preference */}
              <div>
                <label className="block font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center">
                  <IndianRupee className="h-3 w-3 mr-0.5 shrink-0" />
                  Max Tuition Fee Budget Preference (Per Annum) *
                </label>
                <input
                  type="number"
                  required
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  placeholder="e.g. 120000"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>

              {/* Student Personal details Section Header */}
              <div className="sm:col-span-2 pt-2 pb-4 border-t border-gray-100 mt-2">
                <h3 className="font-bold text-gray-900 text-xs flex  justify-center items-center space-x-1">
                  <ClipboardCheck className="h-4 w-4 text-red-600 shrink-0" />
                  <span>Applicant / Student Information Details</span>
                </h3>
              </div>

              {/* Applicant Name */}
              <div>
                <label className="block font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Student / Applicant Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar Verma"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>

              {/* Contact Email */}
              <div>
                <label className="block font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center">
                  <Mail className="h-3.5 w-3.5 mr-1 text-gray-400 shrink-0" />
                  Personal Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="ramesh@gmail.com"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>

              {/* Contact Phone */}
              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center">
                  <Phone className="h-3.5 w-3.5 mr-1 text-gray-400 shrink-0" />
                  Direct Contact / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="e.g. +91 98260 11223"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-red-600 hover:bg-red-500 text-white rounded-xl py-3 text-xs font-bold transition shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {submitting ? 'Submitting Application...' : 'Submit Application & Request Counselor callback'}
            </button>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { School, ClipboardCheck, Mail, Phone, MapPin, IndianRupee, CheckCircle, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INDORE_LOCATIONS, CATEGORIES, BOARDS, INDORE_INSTITUTES } from '../data/indoreData';

export default function RegisterSchool() {
  const colleges = INDORE_INSTITUTES.filter(inst => inst.type === 'college');

  const [name, setName] = useState('');
  const [type] = useState<'school' | 'college'>('college');
  const [category, setCategory] = useState(CATEGORIES.college[0]);
  const [board, setBoard] = useState(BOARDS.college[0]);
  const [location, setLocation] = useState(INDORE_LOCATIONS[0]);
  const [fee, setFee] = useState('');
  const [estYear, setEstYear] = useState('2026');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const availableFacilities = [
    'Hostel Accommodation',
    'Modern Science Labs',
    'Smart Classrooms',
    'Central Library',
    'Sports & Gym Complex',
    'Placement Cell Assistance',
    'Coding & Incubation Labs',
    'Scholarship Schemes',
    'Wi-Fi Enabled Campus',
    'Transport Facility'
  ];

  const handleFacilityToggle = (fac: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(fac) ? prev.filter((f) => f !== fac) : [...prev, fac]
    );
  };

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
          category,
          boardOrAffiliation: board,
          location,
          feePerAnnum: Number(fee) || 0,
          establishedYear: Number(estYear) || 2026,
          contactName,
          contactEmail,
          contactPhone,
          description,
          facilities: selectedFacilities
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
    setEstYear('2026');
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setDescription('');
    setSelectedFacilities([]);
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
            <div>
              <h2 className="text-sm sm:text-base font-bold text-gray-900 flex items-start sm:items-center gap-2">
                <GraduationCap className="h-6 w-6 text-red-600 shrink-0 mt-0.5 sm:mt-0" />
                <span>Direct College Admission & Counseling Application</span>
              </h2>
              <p className="text-[11px] sm:text-xs text-gray-400 mt-1 leading-relaxed">Apply directly to top-tier Indore colleges and receive certified counseling assistance.</p>
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
                      setCategory(matchingCol.category);
                      setLocation(matchingCol.location);
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

              {/* Category / Stream */}
              <div>
                <label className="block font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Preferred Stream / Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                >
                  {CATEGORIES.college.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
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
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                >
                  {INDORE_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
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

              {/* Target Admission Batch */}
              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Target Admission Year / Session *
                </label>
                <select
                  value={estYear}
                  onChange={(e) => setEstYear(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                >
                  <option value="2026">2026 - 2027 Academic Batch</option>
                  <option value="2027">2027 - 2028 Academic Batch</option>
                </select>
              </div>

              {/* Statement of Purpose / Academic Queries */}
              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Statement of Purpose & Career Goals *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us about your educational background, achievements, why you wish to apply to this college, or list any questions you have for the counseling desk..."
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>

              {/* Facilities check boxes */}
              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Facilities / Amenities You Require
                </label>
                <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 gap-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  {availableFacilities.map((fac) => {
                    const checked = selectedFacilities.includes(fac);
                    return (
                      <label key={fac} className="flex items-center space-x-2 cursor-pointer text-[11px] font-medium text-gray-600 select-none">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleFacilityToggle(fac)}
                          className="rounded text-red-600 focus:ring-red-600"
                        />
                        <span>{fac}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Student Personal details Section Header */}
              <div className="sm:col-span-2 pt-2 border-t border-gray-100 mt-2">
                <h3 className="font-bold text-gray-900 text-xs flex items-center space-x-1">
                  <ClipboardCheck className="h-4 w-4 text-red-600 shrink-0" />
                  <span>Applicant / Student Information Details</span>
                </h3>
                <p className="text-[10px] text-gray-400 mt-0.5">Please provide valid contact information to coordinate counseling callbacks and seat inquiries.</p>
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

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Building, 
  Lock, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  CheckCircle, 
  AlertCircle, 
  Trash2, 
  FileText, 
  Award, 
  BookOpen, 
  Layers, 
  Eye, 
  EyeOff,
  User,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INDORE_LOCATIONS, CATEGORIES, BOARDS } from '../data/indoreData';

export default function CollegePartnerRegistration() {
  const [activeTab, setActiveTab] = useState<'register' | 'login' | 'dashboard'>('register');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form Fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES.college[0]);
  const [board, setBoard] = useState(BOARDS.college[0]);
  const [location, setLocation] = useState(INDORE_LOCATIONS[0]);
  const [feePerAnnum, setFeePerAnnum] = useState('');
  const [establishedYear, setEstablishedYear] = useState('2015');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

  // Logged-in College State
  const [loggedInCollege, setLoggedInCollege] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const availableFacilities = [
    'Placement Cell Assistance',
    'Wi-Fi Enabled Campus',
    'Modern Science Labs',
    'Central Library',
    'Sports & Gym Complex',
    'Hostel Accommodation',
    'Smart Classrooms',
    'Coding & Incubation Labs',
    'Transport Facility',
    'Scholarship Schemes'
  ];

  const handleFacilityToggle = (fac: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(fac) ? prev.filter((f) => f !== fac) : [...prev, fac]
    );
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/college-partner/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          category,
          boardOrAffiliation: board,
          location,
          feePerAnnum: Number(feePerAnnum) || 0,
          establishedYear: Number(establishedYear) || 2026,
          contactName,
          contactEmail,
          contactPhone,
          description,
          facilities: selectedFacilities,
          website,
          address,
          password
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to register your college.');
      }

      setSuccessMsg(`Your college "${name}" has been successfully registered! Your application request is currently pending with the administrator. You will receive an approval notification email once accepted.`);
      
      // Auto switch to login and prefill credentials
      setTimeout(() => {
        setActiveTab('login');
        setSuccessMsg('');
      }, 5000);

    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/college-partner/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: contactEmail, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials.');
      }

      setLoggedInCollege(data.college);
      setActiveTab('dashboard');
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await fetch(`/api/college-partner/${loggedInCollege.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loggedInCollege)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update information.');
      }

      setLoggedInCollege(data.college);
      setIsEditing(false);
      setSuccessMsg('College information successfully updated! Your details are refreshed.');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while updating.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!loggedInCollege) return;
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch(`/api/college-partner/${loggedInCollege.id}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete registration.');
      }

      setLoggedInCollege(null);
      setDeleteConfirm(false);
      setActiveTab('register');
      setSuccessMsg('Your college profile and partner account has been successfully deleted from our directory.');
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during deletion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Top Banner */}
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex justify-center items-center gap-2">
          <Building className="h-8 w-8 text-red-600 shrink-0" />
          <span>Indore Colleges Partner Portal</span>
        </h1>
        <p className="text-sm text-slate-500 mt-2 max-w-xl mx-auto">
          List your college in the most comprehensive academic portal of Indore. Reach prospective students, receive direct counseling callbacks, and manage your placement highlights.
        </p>

        {/* Top tab switcher */}
        {loggedInCollege === null && (
          <div className="inline-flex rounded-xl bg-slate-100 p-1 mt-6 border border-slate-200">
            <button
              onClick={() => { setActiveTab('register'); setErrorMsg(''); }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${activeTab === 'register' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Register College
            </button>
            <button
              onClick={() => { setActiveTab('login'); setErrorMsg(''); }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${activeTab === 'login' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Login to Dashboard
            </button>
          </div>
        )}
      </div>

      {/* Message Alerts */}
      <AnimatePresence>
        {successMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }} 
            className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-start gap-3"
          >
            <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">{successMsg}</p>
          </motion.div>
        )}

        {errorMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }} 
            className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-start gap-3"
          >
            <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">{errorMsg}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
        {activeTab === 'register' && loggedInCollege === null && (
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="border-b border-slate-100 pb-4 mb-4">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="h-5 w-5 text-red-600" />
                <span>Institution Information Details</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">Please provide complete, verified details about your college or university in Indore.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* College Name */}
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Official College Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Indore Institute of Professional Studies"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">
                  College Stream Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                >
                  {CATEGORIES.college.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Affiliation / Board */}
              <div>
                <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Affiliation / Approval Board *
                </label>
                <select
                  value={board}
                  onChange={(e) => setBoard(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                >
                  {BOARDS.college.map((bd) => (
                    <option key={bd} value={bd}>{bd}</option>
                  ))}
                </select>
              </div>

              {/* Campus Location Area */}
              <div>
                <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Indore Location Region *
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                >
                  {INDORE_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Annual Tuition Fees */}
              <div>
                <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Average Fee Per Annum (INR) *
                </label>
                <input
                  type="number"
                  required
                  value={feePerAnnum}
                  onChange={(e) => setFeePerAnnum(e.target.value)}
                  placeholder="e.g. 110000"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>

              {/* Established Year */}
              <div>
                <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Established Year *
                </label>
                <input
                  type="number"
                  required
                  value={establishedYear}
                  onChange={(e) => setEstablishedYear(e.target.value)}
                  placeholder="e.g. 2012"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>

              {/* Website */}
              <div>
                <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">
                  College Website Link
                </label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="e.g. https://mycollege.org"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>

              {/* Full Address */}
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Detailed Campus Address *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Sector-B, Scheme No 54, Vijay Nagar, Indore, MP 452010"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">
                  About the College & Mission Statement *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Briefly describe your college courses, placements, campus, and highlights..."
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>

              {/* Facilities check boxes */}
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Campus Facilities & Amenities Offered
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {availableFacilities.map((fac) => {
                    const checked = selectedFacilities.includes(fac);
                    return (
                      <label key={fac} className="flex items-center space-x-2 cursor-pointer text-[11px] font-medium text-slate-600 select-none">
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

              {/* Partner Credentials/Representative Info Section */}
              <div className="sm:col-span-2 pt-4 border-t border-slate-100 mt-2">
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <User className="h-5 w-5 text-red-600" />
                  <span>Representative & Partner Security Credentials</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">Specify credentials to log in later and update or delete your college partner registration details.</p>
              </div>

              {/* Representative Name */}
              <div>
                <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Representative Name *
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Dr. Rajesh Vyas"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>

              {/* Representative Contact Phone */}
              <div>
                <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Direct Contact / Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="e.g. +91 94250 12345"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>

              {/* Contact Email (Acts as Login Username) */}
              <div>
                <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Official Email Address (Username) *
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="e.g. registrar@mycollege.org"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>

              {/* Account Password */}
              <div>
                <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Set Account Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter partner password"
                    className="w-full rounded-xl border border-slate-200 pl-3 pr-10 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-500 text-white rounded-xl py-3 text-xs font-bold transition shadow-sm disabled:opacity-50 cursor-pointer flex justify-center items-center gap-2"
            >
              {loading ? 'Submitting Registration...' : 'Register College & Send Request to Admin'}
            </button>
          </form>
        )}

        {activeTab === 'login' && loggedInCollege === null && (
          <form onSubmit={handleLogin} className="max-w-md mx-auto py-8 space-y-6">
            <div className="text-center">
              <Lock className="h-10 w-10 text-red-600 mx-auto" />
              <h2 className="text-sm sm:text-base font-bold text-slate-900 mt-3">Partner Dashboard Login</h2>
              <p className="text-xs text-slate-400 mt-1">Access your registered college dashboard to update information or delete records.</p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Registered Official Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="e.g. registrar@mycollege.org"
                    className="w-full rounded-xl border border-slate-200 pl-10 pr-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Partner Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-200 pl-10 pr-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-3 text-xs font-bold transition shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Authenticating...' : 'Sign In to Portal'}
            </button>
          </form>
        )}

        {/* LOGGED IN COLLEGE DASHBOARD */}
        {loggedInCollege !== null && activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Header Status Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-100 rounded-xl text-slate-700">
                  <Building className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900">{loggedInCollege.name}</h2>
                  <p className="text-[11px] text-slate-400">ID: {loggedInCollege.id} • Registered on {new Date(loggedInCollege.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Approval Status:</span>
                {loggedInCollege.status === 'approved' ? (
                  <span className="px-3 py-1.5 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-100 uppercase tracking-wider">
                    ● Approved & Live
                  </span>
                ) : loggedInCollege.status === 'rejected' ? (
                  <span className="px-3 py-1.5 text-[10px] font-extrabold text-rose-700 bg-rose-50 rounded-full border border-rose-100 uppercase tracking-wider">
                    ● Rejected
                  </span>
                ) : (
                  <span className="px-3 py-1.5 text-[10px] font-extrabold text-amber-700 bg-amber-50 rounded-full border border-amber-100 uppercase tracking-wider animate-pulse">
                    ● Pending Admin Acceptance
                  </span>
                )}
              </div>
            </div>

            {/* Editing and Main stats */}
            {!isEditing ? (
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Settings className="h-4 w-4 text-red-600" />
                      <span>Current Listed Information</span>
                    </h3>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold rounded-lg transition cursor-pointer"
                    >
                      Update College Info
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4 text-xs text-slate-600">
                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-0.5">Stream Category</p>
                      <p className="font-semibold text-slate-900">{loggedInCollege.category}</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-0.5">Affiliation / Board</p>
                      <p className="font-semibold text-slate-900">{loggedInCollege.boardOrAffiliation}</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-0.5">Campus Location</p>
                      <p className="font-semibold text-slate-900">{loggedInCollege.location}</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-0.5">Established Year</p>
                      <p className="font-semibold text-slate-900">{loggedInCollege.establishedYear}</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-0.5">Tuition Fee Per Annum</p>
                      <p className="font-semibold text-slate-900 font-mono text-xs">INR {Number(loggedInCollege.feePerAnnum).toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-0.5">Official Website</p>
                      <p className="font-semibold text-slate-900 flex items-center gap-1">
                        <Globe className="h-3.5 w-3.5 text-slate-400" />
                        <a href={loggedInCollege.website} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">{loggedInCollege.website || 'Not Listed'}</a>
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-0.5"> Campus Full Address</p>
                      <p className="font-semibold text-slate-900 flex items-start gap-1">
                        <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>{loggedInCollege.address}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-2">College Facilities</p>
                  {loggedInCollege.facilities && loggedInCollege.facilities.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {loggedInCollege.facilities.map((fac: string) => (
                        <span key={fac} className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-600 font-medium rounded-lg text-[10px]">
                          ✓ {fac}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No facilities added yet.</p>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1.5">About description</p>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {loggedInCollege.description || 'No description listed.'}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-2">Representative Contact Information</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-slate-400 shrink-0" />
                      <span>{loggedInCollege.contactName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                      <span>{loggedInCollege.contactEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                      <span>{loggedInCollege.contactPhone}</span>
                    </div>
                  </div>
                </div>

                {/* Self Service delete profile section */}
                <div className="border-t border-rose-100 bg-rose-50/40 p-4 sm:p-5 rounded-xl border mt-8">
                  <h4 className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                    <Trash2 className="h-4 w-4 text-rose-600" />
                    <span>Danger Zone: Withdraw / Delete Registration Profile</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">If your college wants to opt-out or withdraw from our partner listings, you can immediately delete this registration. All listings and credentials will be permanently purged.</p>
                  
                  {!deleteConfirm ? (
                    <button
                      onClick={() => setDeleteConfirm(true)}
                      className="mt-3 px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl cursor-pointer transition flex items-center gap-1.5"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete College Profile & Partner Account</span>
                    </button>
                  ) : (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-rose-200">
                      <p className="text-xs font-semibold text-rose-800">⚠️ Are you absolutely sure you want to proceed? This will immediately take your college offline and delete all partner records. This cannot be undone.</p>
                      <div className="flex gap-2 mt-3 text-xs font-bold">
                        <button
                          onClick={handleDelete}
                          disabled={loading}
                          className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg cursor-pointer"
                        >
                          Yes, Delete Permanently
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(false)}
                          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // EDIT STATE FORM
              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900">Edit College Information</h3>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition cursor-pointer"
                  >
                    Cancel Edit
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* College Name */}
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Official College Name
                    </label>
                    <input
                      type="text"
                      required
                      value={loggedInCollege.name}
                      onChange={(e) => setLoggedInCollege({ ...loggedInCollege, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-800 bg-white"
                    />
                  </div>

                  {/* Fee */}
                  <div>
                    <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Fee Per Annum (INR)
                    </label>
                    <input
                      type="number"
                      required
                      value={loggedInCollege.feePerAnnum}
                      onChange={(e) => setLoggedInCollege({ ...loggedInCollege, feePerAnnum: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-800 bg-white"
                    />
                  </div>

                  {/* Established Year */}
                  <div>
                    <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Established Year
                    </label>
                    <input
                      type="number"
                      required
                      value={loggedInCollege.establishedYear}
                      onChange={(e) => setLoggedInCollege({ ...loggedInCollege, establishedYear: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-800 bg-white"
                    />
                  </div>

                  {/* Website */}
                  <div>
                    <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">
                      College Website
                    </label>
                    <input
                      type="url"
                      value={loggedInCollege.website}
                      onChange={(e) => setLoggedInCollege({ ...loggedInCollege, website: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-800 bg-white"
                    />
                  </div>

                  {/* Representative Contact Mobile */}
                  <div>
                    <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Representative Contact Phone
                    </label>
                    <input
                      type="tel"
                      required
                      value={loggedInCollege.contactPhone}
                      onChange={(e) => setLoggedInCollege({ ...loggedInCollege, contactPhone: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-800 bg-white"
                    />
                  </div>

                  {/* Detailed Campus Address */}
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Campus Full Address
                    </label>
                    <input
                      type="text"
                      required
                      value={loggedInCollege.address}
                      onChange={(e) => setLoggedInCollege({ ...loggedInCollege, address: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-800 bg-white"
                    />
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">
                      About Description & Highlights
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={loggedInCollege.description}
                      onChange={(e) => setLoggedInCollege({ ...loggedInCollege, description: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-800 bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-500 text-white rounded-xl py-3 text-xs font-bold transition cursor-pointer"
                >
                  {loading ? 'Saving Changes...' : 'Save Updated College Information'}
                </button>
              </form>
            )}

            {/* Logout button */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => {
                  setLoggedInCollege(null);
                  setActiveTab('login');
                  setSuccessMsg('Logged out successfully.');
                  setTimeout(() => setSuccessMsg(''), 3000);
                }}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Sign Out from Portal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

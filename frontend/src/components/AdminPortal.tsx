/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Lock, 
  Mail, 
  User, 
  Building, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Clock3, 
  Users, 
  Layers, 
  FileText, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Search,
  Check,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PartnerRequest {
  id: string;
  name: string;
  category: string;
  boardOrAffiliation: string;
  location: string;
  feePerAnnum: number;
  establishedYear: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  description: string;
  facilities: string[];
  website?: string;
  address?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export default function AdminPortal() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Dashboard Sub-tabs
  const [activeSubTab, setActiveSubTab] = useState<'requests' | 'counseling' | 'callbacks' | 'users'>('requests');

  // Dashboard Lists
  const [partners, setPartners] = useState<PartnerRequest[]>([]);
  const [counselingLeads, setCounselingLeads] = useState<any[]>([]);
  const [callbackLeads, setCallbackLeads] = useState<any[]>([]);
  const [userProfiles, setUserProfiles] = useState<any[]>([]);

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Auto load data once logged in
  useEffect(() => {
    const adminToken = localStorage.getItem('admin_token');
    if (adminToken === 'admin-secret-session-token') {
      setIsAdminLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isAdminLoggedIn) {
      fetchAdminData();
    }
  }, [isAdminLoggedIn]);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [resPartners, resCounseling, resCallbacks, resUsers] = await Promise.all([
        fetch('/api/admin/all-registrations'),
        fetch('/api/admin/counseling-leads'),
        fetch('/api/admin/callback-leads'),
        fetch('/api/admin/user-profiles')
      ]);

      const dataPartners = await resPartners.json();
      const dataCounseling = await resCounseling.json();
      const dataCallbacks = await resCallbacks.json();
      const dataUsers = await resUsers.json();

      setPartners(Array.isArray(dataPartners) ? dataPartners : []);
      setCounselingLeads(Array.isArray(dataCounseling) ? dataCounseling : []);
      setCallbackLeads(Array.isArray(dataCallbacks) ? dataCallbacks : []);
      setUserProfiles(Array.isArray(dataUsers) ? dataUsers : []);

    } catch (err) {
      console.error("Failed to fetch admin dashboard records:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: adminPassword })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials.');
      }

      localStorage.setItem('admin_token', data.token);
      setIsAdminLoggedIn(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Authorization failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAdminLoggedIn(false);
    setAdminEmail('');
    setAdminPassword('');
  };

  const handleUpdatePartnerStatus = async (id: string, status: 'approved' | 'rejected' | 'pending') => {
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const res = await fetch(`/api/admin/registration-status/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update partner status.');
      }

      setPartners((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status } : p))
      );

      setSuccessMsg(`College status successfully updated to "${status.toUpperCase()}". ${status === 'approved' ? 'The college representative has been sent an acceptance confirmation email.' : ''}`);
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error executing admin decision.');
    }
  };

  const filteredPartners = partners.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.contactEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCounseling = counselingLeads.filter(c => 
    c.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.studentClassOrDegree.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCallbacks = callbackLeads.filter(cb => 
    cb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cb.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (cb.instituteId || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = userProfiles.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Login State */}
      {!isAdminLoggedIn ? (
        <div className="max-w-md mx-auto bg-white border border-slate-100 shadow-sm p-8 rounded-2xl">
          <div className="text-center mb-6">
            <div className="bg-rose-50 text-red-600 rounded-full p-4 border border-rose-100 inline-block">
              <ShieldAlert className="h-10 w-10 shrink-0" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-4">Authorized Admin Login</h1>
            <p className="text-xs text-slate-400 mt-1">Please authenticate with right credentials to access student enquiries, callback lists, and pending college partner requests.</p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-100 text-rose-800 text-xs rounded-xl flex items-center gap-2">
              <XCircle className="h-4 w-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@indorecolleges.org"
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">
                Secure Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-500 text-white rounded-xl py-3 text-xs font-bold transition shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Authorizing Access...' : 'Authenticate & Unlock Dashboard'}
            </button>
          </form>

          {/* Development Hints */}
          <div className="mt-6 bg-slate-50 p-4 border border-slate-100 rounded-xl text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Demo / Sandbox Admin Access Credentials</p>
            <p className="text-xs text-slate-600 font-mono mt-1">Email: <span className="font-bold text-slate-900">admin@indorecolleges.org</span></p>
            <p className="text-xs text-slate-600 font-mono">Password: <span className="font-bold text-slate-900">adminpassword</span></p>
          </div>
        </div>
      ) : (
        // LOGGED IN ADMIN DASHBOARD
        <div className="space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 p-6 rounded-2xl shadow-sm text-white">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
                <ShieldAlert className="h-6 w-6 text-red-500" />
                <span>EduPath Indore • Central Admin Board</span>
              </h1>
              <p className="text-xs text-slate-400 mt-1">Manage partner college approval requests, admissions counseling requests, and active callbacks from one central panel.</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchAdminData}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Refresh Data
              </button>
              <button
                onClick={handleAdminLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Alert messages */}
          <AnimatePresence>
            {successMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }} 
                className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2"
              >
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
                <span className="font-medium">{successMsg}</span>
              </motion.div>
            )}

            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }} 
                className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2"
              >
                <XCircle className="h-5 w-5 text-rose-600 shrink-0" />
                <span className="font-medium">{errorMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SUMMARY STATISTICS BENTO GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Stat 1 */}
            <div className="bg-white p-5 border border-slate-100 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-red-50 rounded-xl text-red-600">
                <Building className="h-6 w-6 shrink-0" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Partner College Requests</p>
                <p className="text-xl font-black text-slate-900">{partners.length}</p>
                <p className="text-[9px] text-amber-600 font-bold uppercase mt-0.5">{partners.filter(p=>p.status==='pending').length} Pending Approval</p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white p-5 border border-slate-100 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-red-50 rounded-xl text-red-600">
                <FileText className="h-6 w-6 shrink-0" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Counselling Leads</p>
                <p className="text-xl font-black text-slate-900">{counselingLeads.length}</p>
                <p className="text-[9px] text-slate-500 font-medium">Students applications</p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white p-5 border border-slate-100 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                <Clock className="h-6 w-6 shrink-0" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Callback inquiries</p>
                <p className="text-xl font-black text-slate-900">{callbackLeads.length}</p>
                <p className="text-[9px] text-emerald-600 font-bold">Inbound Alerts</p>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="bg-white p-5 border border-slate-100 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                <Users className="h-6 w-6 shrink-0" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Platform Users</p>
                <p className="text-xl font-black text-slate-900">{userProfiles.length}</p>
                <p className="text-[9px] text-slate-500 font-medium">Verified Accounts</p>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs & SEARCH BAR */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Tabs */}
            <div className="flex overflow-x-auto bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => { setActiveSubTab('requests'); setSearchQuery(''); }}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${activeSubTab === 'requests' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <Building className="h-4 w-4" />
                <span>Partner Approvals</span>
              </button>
              <button
                onClick={() => { setActiveSubTab('counseling'); setSearchQuery(''); }}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${activeSubTab === 'counseling' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <FileText className="h-4 w-4" />
                <span>Counselling Leads</span>
              </button>
              <button
                onClick={() => { setActiveSubTab('callbacks'); setSearchQuery(''); }}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${activeSubTab === 'callbacks' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <Phone className="h-4 w-4" />
                <span>Callback Alerts</span>
              </button>
              <button
                onClick={() => { setActiveSubTab('users');  setSearchQuery(''); }}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${activeSubTab === 'users' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <Users className="h-4 w-4" />
                <span>Users Directory</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeSubTab === 'requests' ? 'colleges...' : activeSubTab === 'counseling' ? 'leads...' : activeSubTab === 'callbacks' ? 'callbacks...' : 'users...'}`}
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-600"
              />
            </div>
          </div>

          {/* MAIN TABLES CONTAINER */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden min-h-[300px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 text-slate-400 text-xs">
                <span className="w-8 h-8 rounded-full border-2 border-red-600 border-t-transparent animate-spin mb-3" />
                <span>Retrieving administrative records...</span>
              </div>
            ) : (
              <div>
                
                {/* 1. COLLEGE PARTNERS DIRECTORY */}
                {activeSubTab === 'requests' && (
                  <div>
                    {filteredPartners.length === 0 ? (
                      <p className="p-8 text-center text-slate-400 italic text-xs">No college partner requests match search.</p>
                    ) : (
                      <>
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                          <table className="w-full text-left text-xs text-slate-600 border-collapse">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                                <th className="p-4">College Name</th>
                                <th className="p-4">Stream / Location</th>
                                <th className="p-4">Fees & Est</th>
                                <th className="p-4">Contact Person</th>
                                <th className="p-4">Status Badge</th>
                                <th className="p-4 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredPartners.map((item) => (
                                <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/40">
                                  <td className="p-4 font-semibold text-slate-950">
                                    <p>{item.name}</p>
                                    {item.website && (
                                      <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-[10px] text-red-600 hover:underline flex items-center gap-0.5 mt-0.5">
                                        <span>Website</span>
                                        <ExternalLink className="h-2.5 w-2.5" />
                                      </a>
                                    )}
                                  </td>
                                  <td className="p-4">
                                    <p className="font-bold text-slate-800 text-[11px]">{item.category}</p>
                                    <p className="text-[10px] text-slate-400">{item.location} Area</p>
                                  </td>
                                  <td className="p-4 font-mono text-[11px]">
                                    <p className="font-bold text-slate-800">₹{item.feePerAnnum.toLocaleString('en-IN')}</p>
                                    <p className="text-[10px] text-slate-400 font-sans">Est. {item.establishedYear}</p>
                                  </td>
                                  <td className="p-4">
                                    <p className="font-semibold text-slate-800">{item.contactName}</p>
                                    <p className="text-[10px] text-slate-400">{item.contactEmail}</p>
                                    <p className="text-[10px] text-slate-400">{item.contactPhone}</p>
                                  </td>
                                  <td className="p-4">
                                    {item.status === 'approved' ? (
                                      <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold border border-emerald-100">Approved</span>
                                    ) : item.status === 'rejected' ? (
                                      <span className="px-2 py-1 bg-rose-50 text-rose-700 rounded-full text-[10px] font-bold border border-rose-100">Rejected</span>
                                    ) : (
                                      <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold border border-amber-100 animate-pulse">Pending Acceptance</span>
                                    )}
                                  </td>
                                  <td className="p-4 text-right">
                                    {item.status === 'pending' ? (
                                      <div className="flex justify-end gap-1.5">
                                        <button
                                          onClick={() => handleUpdatePartnerStatus(item.id, 'approved')}
                                          className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold cursor-pointer flex items-center gap-1"
                                          title="Approve College and add to dynamic list"
                                        >
                                          <Check className="h-3 w-3" />
                                          <span>Approve</span>
                                        </button>
                                        <button
                                          onClick={() => handleUpdatePartnerStatus(item.id, 'rejected')}
                                          className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[10px] font-bold cursor-pointer flex items-center gap-1"
                                          title="Reject request"
                                        >
                                          <X className="h-3 w-3" />
                                          <span>Reject</span>
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        onClick={() => handleUpdatePartnerStatus(item.id, 'pending')}
                                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-[10px] font-bold cursor-pointer"
                                      >
                                        Reset to Pending
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Mobile Cards View */}
                        <div className="block md:hidden space-y-4 p-4 bg-slate-50/50">
                          {filteredPartners.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-2xs space-y-3">
                              <div className="flex justify-between items-start gap-2">
                                <div>
                                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{item.name}</h3>
                                  {item.website && (
                                    <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-[10px] text-red-600 font-semibold hover:underline inline-flex items-center gap-0.5 mt-0.5">
                                      <span>Visit Website</span>
                                      <ExternalLink className="h-2.5 w-2.5" />
                                    </a>
                                  )}
                                </div>
                                <div className="shrink-0">
                                  {item.status === 'approved' ? (
                                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold border border-emerald-100">Approved</span>
                                  ) : item.status === 'rejected' ? (
                                    <span className="px-2 py-0.5 bg-rose-50 text-rose-700 rounded-full text-[10px] font-bold border border-rose-100">Rejected</span>
                                  ) : (
                                    <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold border border-amber-100 animate-pulse">Pending</span>
                                  )}
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-50">
                                <div>
                                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px] block">Category / Stream</span>
                                  <span className="text-slate-800 font-semibold">{item.category}</span>
                                </div>
                                <div>
                                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px] block">Indore Sector</span>
                                  <span className="text-slate-800 font-medium">{item.location}</span>
                                </div>
                                <div>
                                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px] block">Est. Year</span>
                                  <span className="text-slate-800 font-medium">{item.establishedYear}</span>
                                </div>
                                <div>
                                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px] block">Annual Fees</span>
                                  <span className="text-rose-600 font-mono font-bold">₹{item.feePerAnnum.toLocaleString('en-IN')}</span>
                                </div>
                              </div>

                              <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 text-[11px] space-y-1">
                                <p className="font-bold text-slate-400 uppercase tracking-wider text-[8px]">In-Charge Representative</p>
                                <p className="text-slate-900 font-semibold">{item.contactName}</p>
                                <p className="text-slate-600">Email: <a href={`mailto:${item.contactEmail}`} className="text-red-600 font-medium hover:underline">{item.contactEmail}</a></p>
                                <p className="text-slate-600">Phone: <a href={`tel:${item.contactPhone}`} className="text-red-600 font-medium hover:underline">{item.contactPhone}</a></p>
                              </div>

                              <div className="pt-2 border-t border-slate-100 flex gap-2">
                                {item.status === 'pending' ? (
                                  <>
                                    <button
                                      onClick={() => handleUpdatePartnerStatus(item.id, 'approved')}
                                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-2 text-xs font-bold transition flex items-center justify-center gap-1"
                                    >
                                      <Check className="h-3.5 w-3.5" />
                                      <span>Approve</span>
                                    </button>
                                    <button
                                      onClick={() => handleUpdatePartnerStatus(item.id, 'rejected')}
                                      className="flex-1 bg-rose-600 hover:bg-rose-700 text-white rounded-xl py-2 text-xs font-bold transition flex items-center justify-center gap-1"
                                    >
                                      <X className="h-3.5 w-3.5" />
                                      <span>Reject</span>
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    onClick={() => handleUpdatePartnerStatus(item.id, 'pending')}
                                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl py-2 text-xs font-bold transition"
                                  >
                                    Reset to Pending Approval
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* 2. STUDENT COUNSELING REQUESTS */}
                {activeSubTab === 'counseling' && (
                  <div>
                    {filteredCounseling.length === 0 ? (
                      <p className="p-8 text-center text-slate-400 italic text-xs">No counselling requests match search.</p>
                    ) : (
                      <>
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                          <table className="w-full text-left text-xs text-slate-600 border-collapse">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                                <th className="p-4">Parent & Student</th>
                                <th className="p-4">Course Level</th>
                                <th className="p-4">Contact Info</th>
                                <th className="p-4">Date & Slot Preferred</th>
                                <th className="p-4">Queries / Message</th>
                                <th className="p-4">Created Time</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredCounseling.map((item: any) => (
                                <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/40">
                                  <td className="p-4">
                                    <p className="font-bold text-slate-900">{item.parentName}</p>
                                    <p className="text-[10px] text-slate-400">Student: {item.studentName || 'N/A'}</p>
                                  </td>
                                  <td className="p-4">
                                    <span className="px-2 py-0.5 bg-red-50 text-red-600 font-bold rounded text-[10px]">
                                      {item.studentClassOrDegree}
                                    </span>
                                  </td>
                                  <td className="p-4">
                                    <p className="font-semibold text-slate-800">{item.phone}</p>
                                    <p className="text-[10px] text-slate-400">{item.email}</p>
                                  </td>
                                  <td className="p-4">
                                    <p className="font-semibold text-slate-800">{item.date}</p>
                                    <p className="text-[10px] text-slate-400">{item.preferredSlot}</p>
                                  </td>
                                  <td className="p-4 max-w-xs">
                                    <p className="text-slate-600 text-[11px] leading-normal">{item.query || 'None specified.'}</p>
                                  </td>
                                  <td className="p-4 text-slate-400 text-[10px]">
                                    {new Date(item.createdAt).toLocaleString()}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Mobile Cards View */}
                        <div className="block md:hidden space-y-4 p-4 bg-slate-50/50">
                          {filteredCounseling.map((item: any) => (
                            <div key={item.id} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-2xs space-y-3">
                              <div className="flex justify-between items-start gap-2">
                                <div>
                                  <h3 className="font-bold text-slate-900 text-sm">{item.parentName}</h3>
                                  <p className="text-[10px] text-slate-500 mt-0.5">Student Name: <span className="font-semibold text-slate-800">{item.studentName || 'N/A'}</span></p>
                                </div>
                                <span className="px-2 py-0.5 bg-red-50 text-red-600 font-bold rounded text-[9px] border border-red-100 whitespace-nowrap shrink-0">
                                  {item.studentClassOrDegree}
                                </span>
                              </div>

                              <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-50">
                                <div>
                                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px] block">Selected Date</span>
                                  <span className="text-slate-800 font-semibold">{item.date}</span>
                                </div>
                                <div>
                                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px] block">Preferred Slot</span>
                                  <span className="text-slate-800 font-semibold">{item.preferredSlot}</span>
                                </div>
                              </div>

                              <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 text-[11px] space-y-1">
                                <p className="font-bold text-slate-400 uppercase tracking-wider text-[8px]">Enquirer Contact Info</p>
                                <p className="text-slate-600">Email: <a href={`mailto:${item.email}`} className="text-red-600 font-medium hover:underline">{item.email}</a></p>
                                <p className="text-slate-600">Phone: <a href={`tel:${item.phone}`} className="text-red-600 font-bold hover:underline">{item.phone}</a></p>
                              </div>

                              {item.query && (
                                <div className="bg-rose-50/40 p-2.5 rounded-xl border border-rose-100/30 text-[11px] text-slate-700">
                                  <p className="font-bold text-rose-800/60 uppercase tracking-wider text-[8px] mb-1">Custom Message / Query</p>
                                  <p className="leading-relaxed">{item.query}</p>
                                </div>
                              )}

                              <div className="text-[10px] text-slate-400 pt-1.5 border-t border-slate-50 flex justify-between items-center">
                                <span>Submission:</span>
                                <span className="font-mono">{new Date(item.createdAt).toLocaleString()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* 3. CALLBACK REQUESTS ALERTS */}
                {activeSubTab === 'callbacks' && (
                  <div>
                    {filteredCallbacks.length === 0 ? (
                      <p className="p-8 text-center text-slate-400 italic text-xs">No callback inquiries match search.</p>
                    ) : (
                      <>
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                          <table className="w-full text-left text-xs text-slate-600 border-collapse">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                                <th className="p-4">Inquirer Name</th>
                                <th className="p-4">Inbound Phone</th>
                                <th className="p-4">Email Address</th>
                                <th className="p-4">Target Institution Ref</th>
                                <th className="p-4">User Message</th>
                                <th className="p-4">Alert Time</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredCallbacks.map((item: any) => (
                                <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/40">
                                  <td className="p-4 font-bold text-slate-900">
                                    {item.name}
                                  </td>
                                  <td className="p-4 font-bold text-red-600">
                                    {item.phone}
                                  </td>
                                  <td className="p-4">
                                    {item.email || <span className="text-slate-400 italic">None provided</span>}
                                  </td>
                                  <td className="p-4 font-semibold text-slate-700">
                                    {item.instituteId || 'General Inquiry Consultation'}
                                  </td>
                                  <td className="p-4">
                                    {item.query || 'Wants callback callback for academic consultation.'}
                                  </td>
                                  <td className="p-4 text-slate-400 text-[10px]">
                                    {new Date(item.createdAt).toLocaleString()}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Mobile Cards View */}
                        <div className="block md:hidden space-y-4 p-4 bg-slate-50/50">
                          {filteredCallbacks.map((item: any) => (
                            <div key={item.id} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-2xs space-y-3">
                              <div className="flex justify-between items-start gap-2">
                                <div>
                                  <h3 className="font-bold text-slate-900 text-sm">{item.name}</h3>
                                  <p className="text-[10px] text-slate-400 mt-0.5">Target: <span className="font-bold text-red-600">{item.instituteId || 'General Consult'}</span></p>
                                </div>
                                <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-[9px] font-bold border border-amber-100 whitespace-nowrap shrink-0">
                                  Callback Alert
                                </span>
                              </div>

                              <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 text-[11px] space-y-1">
                                <p className="font-bold text-slate-400 uppercase tracking-wider text-[8px]">Inbound Contact Info</p>
                                <p className="text-slate-800 font-bold">Phone: <a href={`tel:${item.phone}`} className="text-red-600 hover:underline">{item.phone}</a></p>
                                {item.email && <p className="text-slate-600">Email: <a href={`mailto:${item.email}`} className="text-red-600 hover:underline">{item.email}</a></p>}
                              </div>

                              {item.query && (
                                <div className="bg-slate-100/50 p-2.5 rounded-xl border border-slate-200/40 text-[11px] text-slate-700">
                                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[8px] mb-1">User Query Message</p>
                                  <p className="leading-relaxed">{item.query}</p>
                                </div>
                              )}

                              <div className="text-[10px] text-slate-400 pt-1.5 border-t border-slate-50 flex justify-between items-center">
                                <span>Alert Time:</span>
                                <span className="font-mono">{new Date(item.createdAt).toLocaleString()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* 4. REGISTERED USERS DATABASE */}
                {activeSubTab === 'users' && (
                  <div>
                    {filteredUsers.length === 0 ? (
                      <p className="p-8 text-center text-slate-400 italic text-xs">No user profiles match search.</p>
                    ) : (
                      <>
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                          <table className="w-full text-left text-xs text-slate-600 border-collapse">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                                <th className="p-4">User Personal Info</th>
                                <th className="p-4">Address & Pincode</th>
                                <th className="p-4">Parent Details</th>
                                <th className="p-4">Shortlisted IDs</th>
                                <th className="p-4">Basket Cart IDs</th>
                                <th className="p-4">Member Since</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredUsers.map((item: any) => (
                                <tr key={item.email} className="border-b border-slate-50 hover:bg-slate-50/40">
                                  <td className="p-4">
                                    <p className="font-bold text-slate-900">{item.name}</p>
                                    <p className="text-[10px] text-slate-400 font-mono">{item.email}</p>
                                  </td>
                                  <td className="p-4">
                                    <p>{item.address || 'N/A'}</p>
                                    <p className="text-[10px] text-slate-400">{item.pincode}</p>
                                  </td>
                                  <td className="p-4">
                                    {item.fatherName && <p className="text-[11px] text-slate-700">F: {item.fatherName}</p>}
                                    {item.motherName && <p className="text-[11px] text-slate-700">M: {item.motherName}</p>}
                                  </td>
                                  <td className="p-4 max-w-[150px] truncate" title={item.shortlistedIds?.join(', ')}>
                                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-bold rounded text-[10px]">
                                      {item.shortlistedIds?.length || 0} Saved
                                    </span>
                                  </td>
                                  <td className="p-4 max-w-[150px] truncate" title={item.cartIds?.join(', ')}>
                                    <span className="px-2 py-0.5 bg-red-50 text-red-600 font-bold rounded text-[10px]">
                                      {item.cartIds?.length || 0} in Basket
                                    </span>
                                  </td>
                                  <td className="p-4 text-slate-400 text-[10px]">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Mobile Cards View */}
                        <div className="block md:hidden space-y-4 p-4 bg-slate-50/50">
                          {filteredUsers.map((item: any) => (
                            <div key={item.email} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-2xs space-y-3">
                              <div>
                                <h3 className="font-bold text-slate-900 text-sm">{item.name}</h3>
                                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{item.email}</p>
                              </div>

                              <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-50">
                                <div>
                                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px] block">Shortlisted Institutes</span>
                                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-bold rounded text-[9px] inline-block mt-0.5">
                                    {item.shortlistedIds?.length || 0} Saved
                                  </span>
                                </div>
                                <div>
                                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px] block">Basket Application Cart</span>
                                  <span className="px-2 py-0.5 bg-red-50 text-red-600 font-bold rounded text-[9px] inline-block mt-0.5">
                                    {item.cartIds?.length || 0} in Basket
                                  </span>
                                </div>
                              </div>

                              <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 text-[11px] space-y-2">
                                <div>
                                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[8px]">Student Address</p>
                                  <p className="text-slate-800">{item.address || 'N/A'} {item.pincode && `(PIN: ${item.pincode})`}</p>
                                </div>
                                {(item.fatherName || item.motherName) && (
                                  <div>
                                    <p className="font-bold text-slate-400 uppercase tracking-wider text-[8px]">Parent Particulars</p>
                                    {item.fatherName && <p className="text-slate-700">Father Name: <span className="font-semibold text-slate-800">{item.fatherName}</span></p>}
                                    {item.motherName && <p className="text-slate-700">Mother Name: <span className="font-semibold text-slate-800">{item.motherName}</span></p>}
                                  </div>
                                )}
                              </div>

                              <div className="text-[10px] text-slate-400 pt-1.5 border-t border-slate-50 flex justify-between items-center">
                                <span>Platform Enrolled:</span>
                                <span className="font-mono">{new Date(item.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}

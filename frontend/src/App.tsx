/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import InstituteCard from './components/InstituteCard';
import SidebarCounseling from './components/SidebarCounseling';
import CounsellingDashboard from './components/CounsellingDashboard';
import RegisterSchool from './components/RegisterSchool';
import CollegeDetailPage from './components/CollegeDetailPage';
import InteractiveMap from './components/InteractiveMap';
import OrbChatbot from './components/OrbChatbot';
import BlogsPage from './components/BlogsPage';
import VirtualAdvisorModal from './components/VirtualAdvisorModal';
import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';
import AboutUsPage from './components/AboutUsPage';
import CareersPage from './components/CareersPage';
import ContactUsPage from './components/ContactUsPage';
import CollegePartnerRegistration from './components/CollegePartnerRegistration';
import AdminPortal from './components/AdminPortal';
import { Institute, SearchFilters, UserProfile } from './types';
import { Search, MapPin, Award, IndianRupee, HelpCircle, PhoneCall, Check, X, Compass, ChevronRight, HelpCircle as HelpIcon, Cpu, Briefcase, Laptop, Scale, HeartPulse, Palette, TrendingUp, ChevronLeft, Sparkles, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INDORE_LOCATIONS, CATEGORIES, BOARDS } from './data/indoreData';

export function getInstituteZone(locationStr: string): string {
  const loc = (locationStr || '').toLowerCase();
  
  if (loc.includes('sanwer') || loc.includes('super corridor') || loc.includes('sukhliya') || loc.includes('scheme 78')) {
    return 'north';
  }
  if (loc.includes('simrol') || loc.includes('khandwa') || loc.includes('limbodi') || loc.includes('ralamandal') || loc.includes('garpiplaya')) {
    return 'simrol';
  }
  if (loc.includes('rau') || loc.includes('manik') || loc.includes('rajendra') || loc.includes('annapurna') || loc.includes('sudama') || loc.includes('gumasta') || loc.includes('dwarkapuri') || loc.includes('pigdamber') || loc.includes('mogh') || loc.includes('mog') || loc.includes('dhar')) {
    return 'south-west';
  }
  if (loc.includes('bypass') || loc.includes('jhalaria') || loc.includes('nipania') || loc.includes('bicholi') || loc.includes('mahalaxmi') || loc.includes('dakachya')) {
    return 'bypass';
  }
  return 'central';
}

function ScrollToTopAndSEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    let pageTitle = "Indore Colleges | Find & Apply to Top Colleges in Indore";
    if (pathname === '/explore') {
      pageTitle = "Explore Top Colleges & Universities in Indore | Indore Colleges";
    } else if (pathname.startsWith('/explore/')) {
      const streamName = pathname.replace('/explore/', '').toUpperCase();
      pageTitle = `Top ${streamName} Colleges in Indore 2026 - Admissions & Fees | Indore Colleges`;
    } else if (pathname.startsWith('/college/')) {
      pageTitle = "College Details & Admissions | Indore Colleges";
    } else if (pathname === '/register') {
      pageTitle = "Direct College & School Application | Indore Colleges";
    } else if (pathname === '/dashboard') {
      pageTitle = "Counselling Dashboard & Lead Status | Indore Colleges";
    } else if (pathname === '/blogs') {
      pageTitle = "Admission Guides & Education Blogs | Indore Colleges";
    } else if (pathname === '/about') {
      pageTitle = "About Indore Colleges - MP's #1 Education Portal";
    } else if (pathname === '/careers') {
      pageTitle = "Join Our Team - Careers | Indore Colleges";
    } else if (pathname === '/contact') {
      pageTitle = "Contact Us & Helpline | Indore Colleges";
    } else if (pathname === '/college-portal') {
      pageTitle = "College Partner Registration Portal | Indore Colleges";
    } else if (pathname === '/admin-panel') {
      pageTitle = "Admin Control Portal | Indore Colleges";
    }

    document.title = pageTitle;
  }, [pathname]);

  return null;
}

function CollegeDetailRoute({
  institutes,
  onScheduleCounseling,
  shortlistedIds,
  handleToggleShortlist,
  cartIds,
  handleToggleCart
}: {
  institutes: Institute[];
  onScheduleCounseling: (inst: Institute) => void;
  shortlistedIds: string[];
  handleToggleShortlist: (id: string) => void;
  cartIds: string[];
  handleToggleCart: (id: string) => void;
}) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const college = institutes.find(i => i.id === id);

  useEffect(() => {
    if (college) {
      document.title = `${college.name} Indore - Courses, Fees, Cutoff & Admission | Indore Colleges`;
    }
  }, [college]);

  if (!college && institutes.length > 0) {
    return <Navigate to="/explore" replace />;
  }

  if (!college) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <div className="h-10 w-10 border-2 border-red-600 border-t-transparent rounded-full animate-spin mb-2" />
        <p className="text-xs font-semibold">Loading college details...</p>
      </div>
    );
  }

  return (
    <CollegeDetailPage
      key={college.id}
      institute={college}
      onBack={() => {
        if (window.history.length > 2) {
          navigate(-1);
        } else {
          navigate('/explore');
        }
      }}
      onScheduleCounseling={onScheduleCounseling}
      isShortlisted={shortlistedIds.includes(college.id)}
      onToggleShortlist={() => handleToggleShortlist(college.id)}
      isInCart={cartIds.includes(college.id)}
      onToggleCart={() => handleToggleCart(college.id)}
    />
  );
}

function ExploreRoute({
  institutes,
  loading,
  searchQuery,
  setSearchQuery,
  instituteTypeFilter,
  setInstituteTypeFilter,
  selectedCategory,
  setSelectedCategory,
  selectedBoard,
  setSelectedBoard,
  selectedLocation,
  setSelectedLocation,
  maxFee,
  setMaxFee,
  showMap,
  setShowMap,
  filteredInstitutes,
  handleOpenCounseling,
  handleOpenCallback,
  handleToggleShortlist,
  shortlistedIds,
  handleToggleCart,
  cartIds,
  navigate
}: any) {
  const { streamParam } = useParams<{ streamParam?: string }>();
  const selectedStream = streamParam || null;

  const setSelectedStream = (stream: string | null) => {
    if (stream) {
      navigate(`/explore/${stream}`);
    } else {
      navigate('/explore');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key={selectedStream || 'explore'}
    >
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {instituteTypeFilter === 'college' && (
          <div className="w-full">
            {!selectedStream ? (
              <div className="bg-gradient-to-tr from-red-500/10 via-amber-500/5 to-rose-500/10 rounded-3xl p-8 sm:p-12 shadow-md relative overflow-hidden mb-12 border border-red-100/50">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.15, 1],
                    x: [0, 30, 0],
                    y: [0, -20, 0]
                  }}
                  transition={{ 
                    duration: 12, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-10 -right-10 w-96 h-96 bg-red-400/20 rounded-full blur-3xl pointer-events-none" 
                />
                <motion.div 
                  animate={{ 
                    scale: [1, 1.25, 1],
                    x: [0, -30, 0],
                    y: [0, 30, 0]
                  }}
                  transition={{ 
                    duration: 15, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute -bottom-10 -left-10 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" 
                />
                
                <div className="relative text-center max-w-3xl mx-auto mb-10">
                   <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-red-50 border border-red-100 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-3xs"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-red-500 animate-spin" style={{ animationDuration: '4s' }} />
                    Discover Indore's Finest
                  </motion.span>
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-gray-900"
                  >
                    Are you looking for?
                  </motion.h2>
                  <p className="text-sm sm:text-base text-gray-600 mt-4 max-w-xl mx-auto font-semibold leading-loose space-y-2 sm:space-y-0">
                    Explore <span className="px-2.5 py-1 rounded-lg bg-red-50 text-red-600 border border-red-100 font-extrabold inline-block transition hover:scale-105 duration-200">Top Educational Streams</span> and get <span className="px-2.5 py-1 rounded-lg bg-red-50 text-red-600 border border-red-100 font-extrabold inline-block transition hover:scale-105 duration-200">Tailored Recommendations</span> for Indore's <span className="px-2.5 py-1 rounded-lg bg-red-50 text-red-600 border border-red-100 font-extrabold inline-block transition hover:scale-105 duration-200">Best Colleges</span>.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {[
                    { id: 'engineering', name: 'Engineering' },
                    { id: 'bba', name: 'BBA' },
                    { id: 'bca', name: 'BCA' },
                    { id: 'mba', name: 'MBA' },
                    { id: 'law', name: 'Law' },
                    { id: 'medical', name: 'Medical' },
                    { id: 'design', name: 'Design' },
                  ].map((stream, idx) => {
                    return (
                      <motion.button
                        id={`stream-box-${stream.id}`}
                        key={stream.id}
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        onClick={() => setSelectedStream(stream.id)}
                        className="flex items-center justify-center p-6 bg-white border border-gray-100 hover:bg-red-50/30 hover:border-red-200 rounded-2xl transition cursor-pointer text-center group h-28 shadow-xs hover:shadow-md"
                      >
                        <span className="text-sm font-extrabold tracking-wider uppercase text-gray-800 group-hover:text-red-600 transition duration-200">
                          {stream.name}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200/60 shadow-xs">
                  <div className="flex items-center space-x-4">
                    <button
                      id="btn-back-to-streams"
                      onClick={() => setSelectedStream(null)}
                      className="p-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-gray-700 transition flex items-center justify-center cursor-pointer"
                      title="Back to Streams"
                    >
                      <ChevronLeft className="h-5 w-5 stroke-[2.5]" />
                    </button>
                    <div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
                        <Sparkles className="h-3 w-3 animate-pulse text-amber-500" />
                        Stream Spotlight
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-1 capitalize flex items-center gap-2">
                        Top 10 {selectedStream === 'bba' || selectedStream === 'mba' || selectedStream === 'bca' ? selectedStream.toUpperCase() : selectedStream} Colleges in Indore
                      </h2>
                    </div>
                  </div>
                  <button
                    id="link-all-streams"
                    onClick={() => setSelectedStream(null)}
                    className="text-xs font-extrabold text-red-600 hover:text-red-500 transition flex items-center gap-1.5 cursor-pointer bg-red-50/50 hover:bg-red-50 px-3.5 py-2 rounded-xl"
                  >
                    Explore Other Streams
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="max-w-4xl mx-auto w-full">
                  {(() => {
                    if (selectedStream === 'engineering') {
                      const engineeringColleges = [
                        { rank: 1, name: 'IET DAVV', id: 'iet-davv', displayName: 'Institute of Engineering and Technology, DAVV (IET DAVV)' },
                        { rank: 2, name: 'SGIST', id: 'sgsits', displayName: 'Shri Govindram Seksaria Institute of Technology and Science (SGSITS / SGIST)' },
                        { rank: 3, name: 'Acropolis', id: 'acropolis', displayName: 'Acropolis Institute of Technology and Research' },
                        { rank: 4, name: 'MIST', id: 'malwa-institute', displayName: 'Malwa Institute of Science & Technology (MIST)' },
                        { rank: 5, name: 'IIST', id: 'iist-indore', displayName: 'Indore Institute of Science & Technology (IIST)' },
                        { rank: 6, name: 'CDGI', id: 'chameli-devi', displayName: 'Chameli Devi Group of Institutions (CDGI)' },
                        { rank: 7, name: 'IPS', id: 'ips-engineering', displayName: 'IPS Academy Institute of Engineering & Science' },
                        { rank: 8, name: "SVKM's NMIMS Indore Campus", id: 'nmims-stme', displayName: "SVKM's NMIMS School of Technology & Management (NMIMS Indore Campus)" },
                        { rank: 9, name: 'Medi-Caps University', id: 'medi-caps-university', displayName: 'Medi-Caps University' },
                        { rank: 10, name: 'Symbiosis University (SUAS)', id: 'symbiosis-university', displayName: 'Symbiosis University of Applied Sciences (SUAS)' }
                      ];

                      return (
                        <div className="bg-white rounded-3xl border border-gray-200/60 shadow-sm overflow-hidden divide-y divide-gray-150">
                          {engineeringColleges.map((item, index) => {
                            const matchingInst = institutes.find((i: any) => i.id === item.id);
                            return (
                              <motion.div
                                key={item.rank}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.04 }}
                                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-red-50/5 transition duration-150 group"
                              >
                                <div className="flex items-start sm:items-center space-x-4">
                                  <div className={`h-11 w-11 rounded-xl flex items-center justify-center font-black text-sm shrink-0 border ${
                                    item.rank === 1 ? 'bg-amber-500/10 text-amber-600 border-amber-200' :
                                    item.rank === 2 ? 'bg-slate-400/10 text-slate-600 border-slate-200' :
                                    item.rank === 3 ? 'bg-amber-700/10 text-amber-800 border-amber-300' :
                                    'bg-gray-50 text-gray-500 border-gray-150'
                                  }`}>
                                    #{item.rank}
                                  </div>
                                  
                                  <div className="space-y-1">
                                    <div>
                                      <button
                                        onClick={() => matchingInst && navigate(`/college/${matchingInst.id}`)}
                                        className="text-left font-extrabold text-base text-gray-900 hover:text-red-600 hover:underline transition cursor-pointer decoration-2 decoration-red-500/30"
                                      >
                                        {item.displayName || item.name}
                                      </button>
                                    </div>
                                    
                                    {matchingInst && (
                                      <div className="flex items-center space-x-3 text-xs text-gray-400 font-bold">
                                        <span>📍 {matchingInst.location}</span>
                                        <span>•</span>
                                        <span>⭐ {matchingInst.rating} Rating</span>
                                        {matchingInst.feePerAnnum && (
                                          <>
                                            <span>•</span>
                                            <span>₹{(matchingInst.feePerAnnum / 1000).toFixed(0)}k/year</span>
                                          </>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                
                                {matchingInst && (
                                  <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto">
                                    <button
                                      onClick={() => navigate(`/college/${matchingInst.id}`)}
                                      className="text-xs font-bold bg-gray-50 text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-200 hover:border-red-200 px-3.5 py-2 rounded-xl transition cursor-pointer"
                                    >
                                      View Details
                                    </button>
                                    <button
                                      onClick={() => handleOpenCounseling(matchingInst)}
                                      className="text-xs font-bold bg-red-600 hover:bg-red-500 text-white px-3.5 py-2 rounded-xl transition cursor-pointer"
                                    >
                                      Apply Now
                                    </button>
                                  </div>
                                )}
                              </motion.div>
                            );
                          })}
                        </div>
                      );
                    } else {
                      const streamFiltered = institutes.filter((inst: any) => {
                        if (inst.type !== 'college') return false;
                        const lowerCat = inst.category?.toLowerCase() || '';
                        const lowerName = inst.name?.toLowerCase() || '';
                        const coursesStr = JSON.stringify(inst.coursesList || '').toLowerCase();

                        if (selectedStream === 'bba') {
                          return lowerCat.includes('management') || coursesStr.includes('bba');
                        }
                        if (selectedStream === 'bca') {
                          return coursesStr.includes('bca') || coursesStr.includes('bsc') || lowerName.includes('malwa');
                        }
                        if (selectedStream === 'mba') {
                          return lowerCat.includes('management') || coursesStr.includes('mba');
                        }
                        if (selectedStream === 'law') {
                          return lowerCat.includes('law') || coursesStr.includes('ll.b') || coursesStr.includes('law');
                        }
                        if (selectedStream === 'medical') {
                          return lowerCat.includes('medical') || coursesStr.includes('physiotherapy') || coursesStr.includes('bpt');
                        }
                        if (selectedStream === 'design') {
                          return lowerCat.includes('design') || coursesStr.includes('design');
                        }
                        return false;
                      });

                      const mistInst = streamFiltered.find((inst: any) => inst.id === 'malwa-institute');
                      const otherColleges = streamFiltered.filter((inst: any) => inst.id !== 'malwa-institute');
                      otherColleges.sort((a: any, b: any) => b.rating - a.rating);

                      const combined = [];
                      if (mistInst && ['bba', 'bca', 'mba'].includes(selectedStream)) {
                        combined.push(mistInst);
                      }
                      const finalTop10 = [...combined, ...otherColleges].slice(0, 10);

                      return (
                        <div className="bg-white rounded-3xl border border-gray-200/60 shadow-sm overflow-hidden divide-y divide-gray-150">
                          {finalTop10.map((inst: any, index: number) => {
                            const rank = index + 1;
                            return (
                              <motion.div
                                key={inst.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.04 }}
                                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-red-50/5 transition duration-150 group"
                              >
                                <div className="flex items-start sm:items-center space-x-4">
                                  <div className={`h-11 w-11 rounded-xl flex items-center justify-center font-black text-sm shrink-0 border ${
                                    rank === 1 ? 'bg-amber-500/10 text-amber-600 border-amber-200' :
                                    rank === 2 ? 'bg-slate-400/10 text-slate-600 border-slate-200' :
                                    rank === 3 ? 'bg-amber-700/10 text-amber-800 border-amber-300' :
                                    'bg-gray-50 text-gray-500 border-gray-150'
                                  }`}>
                                    #{rank}
                                  </div>
                                  
                                  <div className="space-y-1">
                                    <div>
                                      <button
                                        onClick={() => navigate(`/college/${inst.id}`)}
                                        className="text-left font-extrabold text-base text-gray-900 hover:text-red-600 hover:underline transition cursor-pointer decoration-2 decoration-red-500/30"
                                      >
                                        {inst.name}
                                      </button>
                                    </div>
                                    <div className="flex items-center space-x-3 text-xs text-gray-400 font-bold">
                                      <span>📍 {inst.location}</span>
                                      <span>•</span>
                                      <span>⭐ {inst.rating} Rating</span>
                                      {inst.feePerAnnum && (
                                        <>
                                          <span>•</span>
                                          <span>₹{(inst.feePerAnnum / 1000).toFixed(0)}k/year</span>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto">
                                  <button
                                    onClick={() => navigate(`/college/${inst.id}`)}
                                    className="text-xs font-bold bg-gray-50 text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-200 hover:border-red-200 px-3.5 py-2 rounded-xl transition cursor-pointer"
                                  >
                                    View Details
                                  </button>
                                  <button
                                    onClick={() => handleOpenCounseling(inst)}
                                    className="text-xs font-bold bg-red-600 hover:bg-red-500 text-white px-3.5 py-2 rounded-xl transition cursor-pointer"
                                  >
                                    Apply Now
                                  </button>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      );
                    }
                  })()}
                </div>
              </div>
            )}
          </div>
        )}

        {instituteTypeFilter !== 'college' && (
          <>
            <div className="space-y-4 max-w-2xl mx-auto w-full">
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-600 transition bg-white shadow-xs">
                <Search className="absolute top-4 left-4.5 h-5 w-5 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e: any) => setSearchQuery(e.target.value)}
                  placeholder="Search institute name, location, courses..."
                  className="w-full pl-12 pr-12 py-4 bg-white text-sm text-gray-800 focus:outline-none placeholder-gray-400"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4.5 top-4 text-xs font-bold text-gray-400 hover:text-gray-600 transition"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <AnimatePresence>
              {showMap && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <InteractiveMap
                    institutes={institutes}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    onViewDetail={(item: any) => navigate(`/college/${item.id}`)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                <div className="relative h-10 w-10 mb-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-20 animate-ping"></span>
                  <span className="relative inline-flex rounded-full h-10 w-10 bg-red-600 text-white items-center justify-center font-bold text-xs">
                    EP
                  </span>
                </div>
                <p className="text-xs">Loading verified Indore profiles...</p>
              </div>
            ) : filteredInstitutes.length === 0 ? (
              <div className="text-center py-24 bg-white border border-dashed border-gray-200 rounded-2xl">
                <Search className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-gray-700">No colleges or institutes match your criteria</h3>
                <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
                  Try clearing search keywords or typing a different query.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                  }}
                  className="mt-4 bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 font-bold text-xs px-4 py-2 rounded-xl transition"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredInstitutes.map((inst: any) => (
                  <InstituteCard
                    key={inst.id}
                    institute={inst}
                    onSelect={handleOpenCounseling}
                    onRequestCallback={handleOpenCallback}
                    onScheduleCounseling={handleOpenCounseling}
                    onViewDetail={(item) => navigate(`/college/${item.id}`)}
                    isShortlisted={shortlistedIds.includes(inst.id)}
                    onToggleShortlist={() => handleToggleShortlist(inst.id)}
                    isInCart={cartIds.includes(inst.id)}
                    onToggleCart={() => handleToggleCart(inst.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [loading, setLoading] = useState(true);

  // Derive activeTab from current route path
  const getActiveTabFromPath = (path: string): 'home' | 'explore' | 'register' | 'dashboard' | 'blogs' | 'about' | 'careers' | 'contact' | 'college-portal' | 'admin-panel' => {
    if (path.startsWith('/explore') || path.startsWith('/college/')) return 'explore';
    if (path === '/register') return 'register';
    if (path === '/dashboard') return 'dashboard';
    if (path === '/blogs') return 'blogs';
    if (path === '/about') return 'about';
    if (path === '/careers') return 'careers';
    if (path === '/contact') return 'contact';
    if (path === '/college-portal') return 'college-portal';
    if (path === '/admin-panel') return 'admin-panel';
    return 'home';
  };

  const activeTab = getActiveTabFromPath(location.pathname);

  const handleTabChange = (tab: 'home' | 'explore' | 'register' | 'dashboard' | 'blogs' | 'about' | 'careers' | 'contact' | 'college-portal' | 'admin-panel') => {
    const routeMap: Record<string, string> = {
      'home': '/',
      'explore': '/explore',
      'register': '/register',
      'dashboard': '/dashboard',
      'blogs': '/blogs',
      'about': '/about',
      'careers': '/careers',
      'contact': '/contact',
      'college-portal': '/college-portal',
      'admin-panel': '/admin-panel'
    };
    navigate(routeMap[tab] || '/');
  };

  // User Session & Authentication States
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('indore_user_profile');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const [pendingAction, setPendingAction] = useState<{
    type: 'shortlist' | 'cart' | 'counseling' | 'general_counseling' | 'callback' | 'view_basket';
    data?: any;
  } | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [instituteTypeFilter, setInstituteTypeFilter] = useState<'all' | 'school' | 'college'>('college');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBoard, setSelectedBoard] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [maxFee, setMaxFee] = useState(1500000); // 15 Lakh Max

  // Counseling Sidebar state
  const [selectedInstitute, setSelectedInstitute] = useState<Institute | null>(null);
  const [isCounselingOpen, setIsCounselingOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // Callback Modal state
  const [callbackInstitute, setCallbackInstitute] = useState<Institute | null>(null);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  // Virtual Advisor State
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackSubmitting, setCallbackSubmitting] = useState(false);
  const [callbackSuccess, setCallbackSuccess] = useState(false);

  // Favorites / Shortlist State
  const [shortlistedIds, setShortlistedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('edupath_shortlisted_ids');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Admissions Basket / Cart State
  const [cartIds, setCartIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('edupath_cart_ids');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('edupath_shortlisted_ids', JSON.stringify(shortlistedIds));
  }, [shortlistedIds]);

  useEffect(() => {
    localStorage.setItem('edupath_cart_ids', JSON.stringify(cartIds));
  }, [cartIds]);

  // Auto-open Virtual Advisor after 10 seconds of loading the website
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAdvisorOpen(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const syncHistoryToBackend = async (email?: string, shortIds?: string[], basketIds?: string[]) => {
    const targetEmail = email || currentUser?.email;
    if (!targetEmail) return;
    try {
      await fetch('/api/users/sync-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: targetEmail,
          shortlistedIds: shortIds !== undefined ? shortIds : shortlistedIds,
          cartIds: basketIds !== undefined ? basketIds : cartIds
        })
      });
    } catch (err) {
      console.error("Failed syncing history with MongoDB:", err);
    }
  };

  const requireAuth = (
    action: {
      type: 'shortlist' | 'cart' | 'counseling' | 'general_counseling' | 'callback' | 'view_basket';
      data?: any;
    },
    message: string
  ): boolean => {
    if (currentUser) {
      return true;
    }
    setPendingAction(action);
    setAuthMessage(message);
    setIsAuthOpen(true);
    return false;
  };

  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    localStorage.setItem('indore_user_profile', JSON.stringify(user));

    const mergedShortlisted = Array.from(new Set([...shortlistedIds, ...(user.shortlistedIds || [])]));
    const mergedCart = Array.from(new Set([...cartIds, ...(user.cartIds || [])]));

    setShortlistedIds(mergedShortlisted);
    setCartIds(mergedCart);

    syncHistoryToBackend(user.email, mergedShortlisted, mergedCart);

    if (pendingAction) {
      const { type, data } = pendingAction;
      setTimeout(() => {
        if (type === 'shortlist') {
          setShortlistedIds(prev => {
            const next = prev.includes(data) ? prev : [...prev, data];
            syncHistoryToBackend(user.email, next, mergedCart);
            return next;
          });
        } else if (type === 'cart') {
          setCartIds(prev => {
            const next = prev.includes(data) ? prev : [...prev, data];
            syncHistoryToBackend(user.email, mergedShortlisted, next);
            return next;
          });
        } else if (type === 'counseling') {
          setSelectedInstitute(data);
          setIsCounselingOpen(true);
        } else if (type === 'general_counseling') {
          setSelectedInstitute(null);
          setIsCounselingOpen(true);
        } else if (type === 'callback') {
          setCallbackInstitute(data);
          setIsCallbackOpen(true);
        }
      }, 300);
    }

    setPendingAction(null);
    setAuthMessage('');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('indore_user_profile');
    setShortlistedIds([]);
    setCartIds([]);
    setIsProfileOpen(false);
  };

  const handleDeleteProfile = () => {
    setCurrentUser(null);
    localStorage.removeItem('indore_user_profile');
    setShortlistedIds([]);
    setCartIds([]);
    setIsProfileOpen(false);
    console.log('User profile deleted successfully.');
  };

  const handleToggleShortlist = (id: string) => {
    if (!requireAuth({ type: 'shortlist', data: id }, 'Please log in to add colleges to your likes/shortlist.')) return;
    setShortlistedIds(prev => {
      const next = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      syncHistoryToBackend(currentUser?.email, next, cartIds);
      return next;
    });
  };

  const handleToggleCart = (id: string) => {
    if (!requireAuth({ type: 'cart', data: id }, 'Please log in to add colleges to your admission basket.')) return;
    setCartIds(prev => {
      const next = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      syncHistoryToBackend(currentUser?.email, shortlistedIds, next);
      return next;
    });
  };

  useEffect(() => {
    fetchInstitutes();
    
    const interacted = localStorage.getItem('edupath_advisor_interacted');
    if (!interacted) {
      const timer = setTimeout(() => {
        setIsAdvisorOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleApplyAdvisorFilters = (filters: {
    type: 'all' | 'school' | 'college';
    category: string;
    board: string;
    location: string;
    maxFee: number;
  }) => {
    setInstituteTypeFilter(filters.type);
    setSelectedCategory(filters.category);
    setSelectedBoard(filters.board);
    setSelectedLocation(filters.location);
    setMaxFee(filters.maxFee);
    
    navigate('/explore');
    localStorage.setItem('edupath_advisor_interacted', 'true');
  };

  const fetchInstitutes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/institutes');
      if (res.ok) {
        const data = await res.json();
        setInstitutes(data);
      }
    } catch (err) {
      console.error('Error fetching Indore institutes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCounseling = (inst: Institute) => {
    if (!requireAuth({ type: 'counseling', data: inst }, `Please log in to schedule expert counseling for ${inst.name}.`)) return;
    setSelectedInstitute(inst);
    setIsCounselingOpen(true);
  };

  const handleOpenGeneralCounseling = () => {
    if (!requireAuth({ type: 'general_counseling' }, 'Please log in to schedule expert career counseling.')) return;
    setSelectedInstitute(null);
    setIsCounselingOpen(true);
  };

  const handleOpenCallback = (inst: Institute) => {
    if (!requireAuth({ type: 'callback', data: inst }, `Please log in to request a callback from ${inst.name}.`)) return;
    setCallbackInstitute(inst);
    setIsCallbackOpen(true);
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackName || !callbackPhone) return;

    setCallbackSubmitting(true);
    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: callbackName,
          phone: callbackPhone,
          instituteId: callbackInstitute?.id,
          email: currentUser?.email || ''
        })
      });

      if (res.ok) {
        setCallbackSuccess(true);
        setCallbackName('');
        setCallbackPhone('');
        setTimeout(() => {
          setCallbackSuccess(false);
          setIsCallbackOpen(false);
          setCallbackInstitute(null);
        }, 2500);
      }
    } catch (err) {
      console.error('Error booking callback:', err);
    } finally {
      setCallbackSubmitting(false);
    }
  };

  // Filter Logic
  const filteredInstitutes = institutes.filter((inst) => {
    if (instituteTypeFilter !== 'all' && inst.type !== instituteTypeFilter) return false;

    if (searchQuery) {
      const query = searchQuery.trim().toLowerCase();
      const isGenericSearch = ['college', 'colleges', 'collage', 'collages', 'school', 'schools', 'institute', 'institutes', 'university', 'universities'].some(term => term === query || query.includes(term));
      
      if (!isGenericSearch) {
        const matchName = inst.name.toLowerCase().includes(query);
        const matchLoc = inst.location.toLowerCase().includes(query);
        const matchCat = inst.category.toLowerCase().includes(query);
        if (!matchName && !matchLoc && !matchCat) return false;
      }
    }

    if (selectedCategory !== 'All' && inst.category !== selectedCategory) return false;

    if (selectedBoard !== 'All' && inst.boardOrAffiliation !== selectedBoard) return false;

    if (selectedLocation !== 'All') {
      if (selectedLocation.startsWith('Zone: ')) {
        const targetZone = selectedLocation.replace('Zone: ', '').toLowerCase();
        if (getInstituteZone(inst.location) !== targetZone) return false;
      } else if (inst.location !== selectedLocation) {
        return false;
      }
    }

    if (inst.feePerAnnum > maxFee) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col font-sans text-gray-900 selection:bg-red-600 selection:text-white">
      <ScrollToTopAndSEO />

      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        instituteTypeFilter={instituteTypeFilter}
        setInstituteTypeFilter={(type) => {
          setInstituteTypeFilter(type);
          setSelectedCategory('All');
          setSelectedBoard('All');
        }}
        setSelectedCategory={setSelectedCategory}
        setSelectedBoard={setSelectedBoard}
        setSelectedLocation={setSelectedLocation}
        setSearchQuery={setSearchQuery}
        setMaxFee={setMaxFee}
        shortlistedIds={shortlistedIds}
        onToggleShortlist={handleToggleShortlist}
        cartIds={cartIds}
        onToggleCart={handleToggleCart}
        currentUser={currentUser}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAuth={() => {
          setAuthMessage('Authenticate to view and update your profile & history.');
          setIsAuthOpen(true);
        }}
      />

      {/* Main Content Sections via React Router */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location}>
            {/* Home Route */}
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key="home-page"
                >
                  <Home
                    setActiveTab={handleTabChange}
                    setInstituteTypeFilter={setInstituteTypeFilter}
                    setSelectedCategory={setSelectedCategory}
                    setSelectedBoard={setSelectedBoard}
                    setSelectedLocation={setSelectedLocation}
                    setSearchQuery={setSearchQuery}
                    onOpenCounseling={handleOpenGeneralCounseling}
                    setSelectedStream={(s) => {
                      if (s) navigate(`/explore/${s}`);
                      else navigate('/explore');
                    }}
                    maxFee={maxFee}
                    setMaxFee={setMaxFee}
                    onViewCollegeDetail={(inst) => navigate(`/college/${inst.id}`)}
                  />
                </motion.div>
              }
            />

            {/* Explore Routes */}
            <Route
              path="/explore"
              element={
                <ExploreRoute
                  institutes={institutes}
                  loading={loading}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  instituteTypeFilter={instituteTypeFilter}
                  setInstituteTypeFilter={setInstituteTypeFilter}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedBoard={selectedBoard}
                  setSelectedBoard={setSelectedBoard}
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                  maxFee={maxFee}
                  setMaxFee={setMaxFee}
                  showMap={showMap}
                  setShowMap={setShowMap}
                  filteredInstitutes={filteredInstitutes}
                  handleOpenCounseling={handleOpenCounseling}
                  handleOpenCallback={handleOpenCallback}
                  handleToggleShortlist={handleToggleShortlist}
                  shortlistedIds={shortlistedIds}
                  handleToggleCart={handleToggleCart}
                  cartIds={cartIds}
                  navigate={navigate}
                />
              }
            />

            <Route
              path="/explore/:streamParam"
              element={
                <ExploreRoute
                  institutes={institutes}
                  loading={loading}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  instituteTypeFilter={instituteTypeFilter}
                  setInstituteTypeFilter={setInstituteTypeFilter}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedBoard={selectedBoard}
                  setSelectedBoard={setSelectedBoard}
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                  maxFee={maxFee}
                  setMaxFee={setMaxFee}
                  showMap={showMap}
                  setShowMap={setShowMap}
                  filteredInstitutes={filteredInstitutes}
                  handleOpenCounseling={handleOpenCounseling}
                  handleOpenCallback={handleOpenCallback}
                  handleToggleShortlist={handleToggleShortlist}
                  shortlistedIds={shortlistedIds}
                  handleToggleCart={handleToggleCart}
                  cartIds={cartIds}
                  navigate={navigate}
                />
              }
            />

            {/* Dynamic College Detail Route */}
            <Route
              path="/college/:id"
              element={
                <CollegeDetailRoute
                  institutes={institutes}
                  onScheduleCounseling={handleOpenCounseling}
                  shortlistedIds={shortlistedIds}
                  handleToggleShortlist={handleToggleShortlist}
                  cartIds={cartIds}
                  handleToggleCart={handleToggleCart}
                />
              }
            />

            {/* Register School Route */}
            <Route
              path="/register"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12"
                >
                  <RegisterSchool />
                </motion.div>
              }
            />

            {/* Counselling Dashboard Route */}
            <Route
              path="/dashboard"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12"
                >
                  <CounsellingDashboard />
                </motion.div>
              }
            />

            {/* Blogs Route */}
            <Route
              path="/blogs"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                >
                  <BlogsPage />
                </motion.div>
              }
            />

            {/* About Us Route */}
            <Route
              path="/about"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                >
                  <AboutUsPage />
                </motion.div>
              }
            />

            {/* Careers Route */}
            <Route
              path="/careers"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                >
                  <CareersPage />
                </motion.div>
              }
            />

            {/* Contact Route */}
            <Route
              path="/contact"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                >
                  <ContactUsPage />
                </motion.div>
              }
            />

            {/* College Portal Route */}
            <Route
              path="/college-portal"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                >
                  <CollegePartnerRegistration />
                </motion.div>
              }
            />

            {/* Admin Portal Route */}
            <Route
              path="/admin-panel"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                >
                  <AdminPortal />
                </motion.div>
              }
            />

            {/* Catch-all Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Slide-out Counseling Appointment Drawer */}
      <AnimatePresence>
        {isCounselingOpen && (
          <SidebarCounseling
            selectedInstitute={selectedInstitute}
            onClose={() => setIsCounselingOpen(false)}
            onSuccess={fetchInstitutes}
          />
        )}
      </AnimatePresence>

      {/* Callback Request Modal Overlay */}
      <AnimatePresence>
        {isCallbackOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-xs" onClick={() => setIsCallbackOpen(false)} />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-4 sm:p-6 shadow-2xl border border-gray-100 z-10"
            >
              <button
                onClick={() => setIsCallbackOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100 z-20"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              <div className="flex items-center space-x-2 text-red-600 mb-4 pr-8">
                <PhoneCall className="h-5 w-5 shrink-0" />
                <h3 className="text-sm font-bold leading-tight">Request Admissions Callback</h3>
              </div>

              {callbackSuccess ? (
                <div className="text-center py-6 space-y-3">
                  <div className="h-10 w-10 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full flex items-center justify-center mx-auto">
                    <Check className="h-5 w-5" />
                  </div>
                  <h4 className="text-xs font-bold text-gray-900">Admissions Ticket Created!</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed max-w-xs mx-auto">
                    We have submitted your request. An admissions representative from {callbackInstitute?.name || 'Indore Colleges'} will call you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="space-y-4 text-xs">
                  <p className="text-gray-500 leading-relaxed text-[11px]">
                    Schedule a free direct phone consultation with {callbackInstitute?.name || 'our Indore academic head'}.
                  </p>

                  <div>
                    <label className="block font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={callbackName}
                      onChange={(e) => setCallbackName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 bg-white text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-red-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Mobile Number
                    </label>
                    <div className="flex rounded-xl overflow-hidden border border-gray-200 focus-within:ring-1 focus-within:ring-red-600 focus-within:border-red-600">
                      <span className="bg-gray-50 border-r border-gray-100 text-gray-500 px-3 flex items-center font-bold">
                        +91
                      </span>
                      <input
                        type="tel"
                        pattern="[0-9]{10}"
                        required
                        value={callbackPhone}
                        onChange={(e) => setCallbackPhone(e.target.value)}
                        placeholder="Enter 10-digit mobile"
                        className="flex-1 px-3 py-2.5 bg-white text-xs text-gray-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={callbackSubmitting}
                    className="w-full bg-red-600 hover:bg-red-500 text-white rounded-xl py-3 text-xs font-bold transition shadow-sm disabled:opacity-50"
                  >
                    {callbackSubmitting ? 'Booking callback...' : 'Call Me Back'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating ENQUIRE NOW Toggle Badge */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden sm:block">
        <motion.button
          whileHover={{ scale: 1.05, x: 4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAdvisorOpen(true)}
          className="bg-[#b90000] hover:bg-red-600 text-white font-extrabold text-[11px] px-3.5 py-3 rounded-r-md shadow-2xl flex flex-col items-center cursor-pointer tracking-widest uppercase [writing-mode:vertical-lr]"
        >
          <span>ENQUIRE NOW</span>
        </motion.button>
      </div>

      {/* Virtual Advisor Interactive Wizard Modal */}
      <AnimatePresence>
        {isAdvisorOpen && (
          <VirtualAdvisorModal
            isOpen={isAdvisorOpen}
            onClose={() => {
              setIsAdvisorOpen(false);
              localStorage.setItem('edupath_advisor_interacted', 'true');
            }}
            institutes={institutes}
            onApplyFilters={handleApplyAdvisorFilters}
          />
        )}
      </AnimatePresence>

      {/* Floating AI counselor bot bubble */}
      <OrbChatbot />

      {/* User Authentication & Profile Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => {
          setIsAuthOpen(false);
          setPendingAction(null);
          setAuthMessage('');
        }}
        onSuccess={handleAuthSuccess}
        initialMessage={authMessage}
      />

      {currentUser && (
        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={currentUser}
          onUpdate={(updatedUser) => {
            setCurrentUser(updatedUser);
            localStorage.setItem('indore_user_profile', JSON.stringify(updatedUser));
          }}
          onLogout={handleLogout}
          onDeleteProfile={handleDeleteProfile}
          shortlistedIds={shortlistedIds}
          cartIds={cartIds}
        />
      )}

      {/* Footer */}
      <Footer 
        setActiveTab={handleTabChange}
        setInstituteTypeFilter={setInstituteTypeFilter}
        setSelectedCategory={setSelectedCategory}
        setSelectedBoard={setSelectedBoard}
        setSelectedLocation={setSelectedLocation}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
}

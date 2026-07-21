/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  Check, 
  Send, 
  ArrowUpRight, 
  BookOpen, 
  Users, 
  PhoneCall, 
  Compass, 
  HelpCircle, 
  ShieldCheck, 
  Award, 
  Play, 
  MessageSquare,
  GraduationCap,
  Calendar,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Building,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INDORE_INSTITUTES, INDORE_LOCATIONS, CATEGORIES } from '../data/indoreData';
import { Institute } from '../types';

interface HomeProps {
  setActiveTab: (tab: 'home' | 'explore' | 'register' | 'dashboard' | 'browse-campus' | 'blogs' | 'about' | 'careers' | 'contact' | 'college-portal' | 'admin-panel') => void;
  setInstituteTypeFilter: (type: 'all' | 'school' | 'college') => void;
  setSelectedCategory: (cat: string) => void;
  setSelectedBoard: (board: string) => void;
  setSelectedLocation: (loc: string) => void;
  setSearchQuery: (query: string) => void;
  onOpenCounseling: () => void;
  setSelectedStream?: (stream: string | null) => void;
  maxFee?: number;
  setMaxFee?: (fee: number) => void;
  onViewCollegeDetail?: (inst: Institute) => void;
}

export default function Home({
  setActiveTab,
  setInstituteTypeFilter,
  setSelectedCategory,
  setSelectedBoard,
  setSelectedLocation,
  setSearchQuery,
  onOpenCounseling,
  setSelectedStream,
  maxFee,
  setMaxFee,
  onViewCollegeDetail
}: HomeProps) {
  // Search card states (CarDekho style)
  const [searchMode, setSearchMode] = useState<'college' | 'course'>('college');
  const [searchOption, setSearchOption] = useState<'budget' | 'stream'>('budget');
  const [selectedBudgetVal, setSelectedBudgetVal] = useState('All');
  const [selectedStreamVal, setSelectedStreamVal] = useState('All');
  const [selectedLocationVal, setSelectedLocationVal] = useState('All');

  // CarDekho style Searched Colleges tab state
  const [activeSearchedTab, setActiveSearchedTab] = useState<'Engi.' | 'BCA' | 'MBA' | 'LAW' | 'MEDICAL'>('Engi.');

  const handleFeaturedClick = (id: string) => {
    const matched = INDORE_INSTITUTES.find(inst => inst.id === id);
    if (matched && onViewCollegeDetail) {
      onViewCollegeDetail(matched);
    } else {
      setSearchQuery('');
      setInstituteTypeFilter('college');
      setActiveTab('explore');
    }
  };

  const handleFormSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInstituteTypeFilter('college');

    // Handle stream selection
    if (selectedStreamVal && selectedStreamVal !== 'All') {
      setSelectedCategory(selectedStreamVal);
      if (setSelectedStream) {
        const catLower = selectedStreamVal.toLowerCase();
        if (catLower.includes('engineering')) setSelectedStream('engineering');
        else if (catLower.includes('management')) setSelectedStream('mba');
        else if (catLower.includes('medical')) setSelectedStream('medical');
        else if (catLower.includes('design')) setSelectedStream('design');
        else setSelectedStream(null);
      }
    } else {
      setSelectedCategory('All');
      if (setSelectedStream) setSelectedStream(null);
    }

    // Handle location selection
    if (selectedLocationVal && selectedLocationVal !== 'All') {
      setSelectedLocation(selectedLocationVal);
    } else {
      setSelectedLocation('All');
    }

    // Handle budget limit
    if (setMaxFee) {
      if (selectedBudgetVal === '1lakh') setMaxFee(100000);
      else if (selectedBudgetVal === '2lakh') setMaxFee(200000);
      else if (selectedBudgetVal === '5lakh') setMaxFee(500000);
      else if (selectedBudgetVal === '10lakh') setMaxFee(1000000);
      else setMaxFee(1500000); // Max fee limit
    }

    setSearchQuery('');
    setActiveTab('explore');

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  // Search input state
  const [localSearch, setLocalSearch] = useState('');
  
  // Schedule a Meeting Form State
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formQuery, setFormQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Play video mock state
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Action helpers
  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localSearch.trim()) return;
    setSearchQuery(localSearch);
    setInstituteTypeFilter('college');
    setActiveTab('explore');
    // Scroll to directory
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleCategoryClick = (category: string, type: 'school' | 'college' = 'college') => {
    setInstituteTypeFilter('college');
    setSelectedCategory(category);
    setSelectedBoard('All');
    setSelectedLocation('All');
    setSearchQuery('');
    if (setSelectedStream) {
      const catLower = category.toLowerCase();
      if (catLower.includes('engineering')) setSelectedStream('engineering');
      else if (catLower.includes('management')) setSelectedStream('mba');
      else if (catLower.includes('medical')) setSelectedStream('medical');
      else if (catLower.includes('design')) setSelectedStream('design');
    }
    setActiveTab('explore');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleLocalityClick = (locality: string) => {
    setInstituteTypeFilter('college');
    setSelectedCategory('All');
    setSelectedBoard('All');
    setSelectedLocation(locality);
    setSearchQuery('');
    setActiveTab('explore');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone || !formEmail) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          phone: formPhone,
          email: formEmail,
          query: formQuery || 'General Home Consultation'
        })
      });
      if (res.ok) {
        setIsSuccess(true);
        setFormName('');
        setFormPhone('');
        setFormEmail('');
        setFormQuery('');
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (err) {
      console.error('Error scheduling consultation:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Indian Cities Grid Data
  const CITIES = [
    { name: 'Mumbai', img: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=300&q=80' },
    { name: 'Delhi', img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=300&q=80' },
    { name: 'Bangalore', img: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=300&q=80' },
    { name: 'Chennai', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=300&q=80' },
    { name: 'Hyderabad', img: 'https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?auto=format&fit=crop&w=300&q=80' },
    { name: 'Indore', img: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=300&q=80', active: true },
    { name: 'Pune', img: './public/iet-davv.jpg' },
    { name: 'Kolkata', img: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=300&q=80' }
  ];

  // Reviews Data
  const REVIEWS = [
    {
      name: 'Dr. Vivek Agrawal',
      role: 'Parent of B.Tech Aspirant',
      comment: 'Indore Colleges counselor guided us as an unbiased partner. They helped us cut through the complex fee structures and placement records of premium engineering and management options in Indore. Best service indeed!',
      rating: 5,
      avatar: 'VA'
    },
    {
      name: 'Ankita Chhabra',
      role: 'Parent of MBA Student',
      comment: 'Excellent, personal college matches. Their quick comparative list of top business schools near Vijay Nagar made our decision extremely stress-free. Direct callbacks are fully transparent.',
      rating: 5,
      avatar: 'AC'
    },
    {
      name: 'Shaiksalim SK',
      role: 'Parent of Medical Aspirant',
      comment: 'Very professional, saved us 2 weeks of campus visits. They scheduled direct admissions and dean interaction sessions at two premium medical institutes based on our exact specialization priorities.',
      rating: 5,
      avatar: 'SS'
    }
  ];

  // Localities list (Indore regional)
  const LOCALITIES = [
    { name: 'Vijay Nagar', dist: '1.2 km' },
    { name: 'Scheme No.54', dist: '1.8 km' },
    { name: 'Ring Road', dist: '2.5 km' },
    { name: 'Kanadia Road', dist: '4.2 km' },
    { name: 'Khajrana Road', dist: '3.9 km' },
    { name: 'Bicholi Mardana', dist: '5.8 km' },
    { name: 'Anurag Nagar', dist: '2.1 km' },
    { name: 'Khandwa Road', dist: '7.4 km' }
  ];

  return (
    <div id="home_view" className="w-full bg-white font-sans overflow-hidden">
      
      {/* 1. OVERLAPPING HERO BANNER SECTION (CARDEKHO STRUCTURE) */}
      <section className="relative min-h-[450px] lg:min-h-[400px] py-8 lg:py-12 px-4 sm:px-8 lg:px-16 xl:px-20 overflow-hidden border-b border-gray-150 flex items-center">
        {/* Full-width device background image of MIST */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <img 
            src="/malwa_institute_campus.jpg" 
            alt="MIST Campus Background" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-[0.90] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/55 lg:bg-gradient-to-r lg:from-black/70 lg:via-black/20 lg:to-black/45" />
        </div>

        <div className="mx-auto max-w-7xl w-full relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-12 items-center">
            
            {/* Left Column: Overlapping Search Card */}
            <div className="lg:col-span-4 xl:col-span-4 z-20">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-gray-100 flex flex-col justify-between max-w-[360px] mx-auto lg:ml-8 xl:ml-14 lg:mr-0 w-full"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight leading-none mb-5 font-outfit">
                    Find your right college
                  </h2>

                  {/* Tabs: Find Colleges vs Find Courses (CarDekho Style) */}
                  <div className="flex gap-3 mb-6 relative">
                    <button
                      type="button"
                      onClick={() => {
                        setSearchMode('college');
                        setSearchOption('budget');
                      }}
                      className={`relative flex-1 text-center py-3 text-xs font-black tracking-wider uppercase rounded-xl transition-all duration-200 cursor-pointer ${
                        searchMode === 'college'
                          ? 'bg-[#1F2937] text-white shadow-md'
                          : 'bg-gray-50 text-gray-400 hover:text-gray-600 border border-gray-200'
                      }`}
                    >
                      Find Colleges
                      {searchMode === 'college' && (
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#1F2937]" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchMode('course');
                        setSearchOption('stream');
                      }}
                      className={`relative flex-1 text-center py-3 text-xs font-black tracking-wider uppercase rounded-xl transition-all duration-200 cursor-pointer ${
                        searchMode === 'course'
                          ? 'bg-[#1F2937] text-white shadow-md'
                          : 'bg-gray-50 text-gray-400 hover:text-gray-600 border border-gray-200'
                      }`}
                    >
                      Find Courses
                      {searchMode === 'course' && (
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#1F2937]" />
                      )}
                    </button>
                  </div>

                  {/* Radio buttons (By Budget vs By Stream) */}
                  {searchMode === 'college' && (
                    <div className="flex items-center gap-6 mb-6">
                      <label className="flex items-center gap-2.5 cursor-pointer text-xs font-extrabold text-gray-700 select-none">
                        <input
                          type="radio"
                          name="searchOption"
                          checked={searchOption === 'budget'}
                          onChange={() => setSearchOption('budget')}
                          className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500 accent-red-600 cursor-pointer"
                        />
                        By Budget
                      </label>
                      <label className="flex items-center gap-2.5 cursor-pointer text-xs font-extrabold text-gray-700 select-none">
                        <input
                          type="radio"
                          name="searchOption"
                          checked={searchOption === 'stream'}
                          onChange={() => setSearchOption('stream')}
                          className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500 accent-red-600 cursor-pointer"
                        />
                        By Stream
                      </label>
                    </div>
                  )}

                  {/* Dynamic Dropdown Selectors based on searchMode & searchOption */}
                  <div className="space-y-4">
                    {searchMode === 'college' ? (
                      searchOption === 'budget' ? (
                        <>
                          {/* Option 1: Select Budget */}
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Select Budget (Annual Fees)</label>
                            <div className="relative">
                              <select
                                value={selectedBudgetVal}
                                onChange={(e) => setSelectedBudgetVal(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition appearance-none cursor-pointer"
                              >
                                <option value="All">Any Budget</option>
                                <option value="1lakh">Under ₹1 Lakh</option>
                                <option value="2lakh">Under ₹2 Lakhs</option>
                                <option value="5lakh">Under ₹5 Lakhs</option>
                                <option value="10lakh">Under ₹10 Lakhs</option>
                              </select>
                              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                                <ChevronRight className="h-4 w-4 rotate-90" />
                              </div>
                            </div>
                          </div>

                          {/* Option 2: Select Stream */}
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Select Stream</label>
                            <div className="relative">
                              <select
                                value={selectedStreamVal}
                                onChange={(e) => setSelectedStreamVal(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition appearance-none cursor-pointer"
                              >
                                <option value="All">All Streams</option>
                                {CATEGORIES.college.map((cat) => (
                                  <option key={cat} value={cat}>{cat}</option>
                                ))}
                              </select>
                              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                                <ChevronRight className="h-4 w-4 rotate-90" />
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Option 1: Select Stream */}
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Select Stream</label>
                            <div className="relative">
                              <select
                                value={selectedStreamVal}
                                onChange={(e) => setSelectedStreamVal(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition appearance-none cursor-pointer"
                              >
                                <option value="All">All Streams</option>
                                {CATEGORIES.college.map((cat) => (
                                  <option key={cat} value={cat}>{cat}</option>
                                ))}
                              </select>
                              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                                <ChevronRight className="h-4 w-4 rotate-90" />
                              </div>
                            </div>
                          </div>

                          {/* Option 2: Select Location */}
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Select Location Locality</label>
                            <div className="relative">
                              <select
                                value={selectedLocationVal}
                                onChange={(e) => setSelectedLocationVal(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition appearance-none cursor-pointer"
                              >
                                <option value="All">All Locations</option>
                                {INDORE_LOCATIONS.map((loc) => (
                                  <option key={loc} value={loc}>{loc}</option>
                                ))}
                              </select>
                              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                                <ChevronRight className="h-4 w-4 rotate-90" />
                              </div>
                            </div>
                          </div>
                        </>
                      )
                    ) : (
                      <>
                        {/* Course Tab Selectors */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Select Category</label>
                          <div className="relative">
                            <select
                              value={selectedStreamVal}
                              onChange={(e) => setSelectedStreamVal(e.target.value)}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition appearance-none cursor-pointer"
                            >
                              <option value="All">All Streams</option>
                              {CATEGORIES.college.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                              <ChevronRight className="h-4 w-4 rotate-90" />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Select Budget</label>
                          <div className="relative">
                            <select
                              value={selectedBudgetVal}
                              onChange={(e) => setSelectedBudgetVal(e.target.value)}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition appearance-none cursor-pointer"
                            >
                              <option value="All">Any Budget</option>
                              <option value="1lakh">Under ₹1 Lakh</option>
                              <option value="2lakh">Under ₹2 Lakhs</option>
                              <option value="5lakh">Under ₹5 Lakhs</option>
                              <option value="10lakh">Under ₹10 Lakhs</option>
                            </select>
                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                              <ChevronRight className="h-4 w-4 rotate-90" />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={handleFormSearchSubmit}
                    className="w-full bg-[#EF4444] hover:bg-red-600 active:scale-98 text-white font-extrabold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-red-500/10 cursor-pointer tracking-wider text-sm flex items-center justify-center gap-2"
                  >
                    <Search className="h-4.5 w-4.5 stroke-[2.5]" />
                    Search Colleges
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Featured Spotlight (MIST ONLY) */}
            <div className="lg:col-span-8 xl:col-span-8 flex flex-col justify-center text-white space-y-2 lg:space-y-4 z-10 lg:pl-10">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex self-start px-3 py-1 bg-[#EF4444] text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md"
              >
                PREMIER ENGINEERING CAMPUS
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-outfit"
              >
                Malwa Institute of Science & Technology (MIST)
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xs sm:text-sm text-gray-200 leading-relaxed max-w-xl font-normal"
              >
                MIST is Indore's flagship hub for top-tier engineering, technology, and business education. Discover state-of-the-art labs, free student bus networks, massive auditoriums, an amphitheater, and outstanding corporate placements.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-3.5 pt-2"
              >
                <button
                  type="button"
                  onClick={() => handleFeaturedClick('malwa-institute')}
                  className="inline-flex bg-white hover:bg-gray-150 active:scale-95 text-gray-900 font-extrabold px-6 py-3.5 rounded-xl transition-all duration-200 shadow-md text-xs tracking-wider uppercase items-center gap-1.5 cursor-pointer"
                >
                  Explore Campus Details
                  <ArrowUpRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={onOpenCounseling}
                  className="inline-flex bg-white/10 hover:bg-white/20 active:scale-95 text-white font-extrabold px-6 py-3.5 rounded-xl transition-all duration-200 text-xs tracking-wider uppercase items-center gap-1.5 cursor-pointer backdrop-blur-sm border border-white/10"
                >
                  Speak With Advisor
                </button>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE MOST SEARCHED COLLEGES SECTION (CARDEKHO-STYLE DYNAMIC TABS) */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="border-b border-gray-200 pb-4 mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-outfit mb-4">
              The most Searched Colleges
            </h2>
            
            {/* Horizontal Tabs: Engi., BCA, MBA, LAW, MEDICAL */}
            <div className="flex gap-6 overflow-x-auto scrollbar-none pb-1">
              {(['Engi.', 'BCA', 'MBA', 'LAW', 'MEDICAL'] as const).map((tab) => {
                const isActive = activeSearchedTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveSearchedTab(tab)}
                    className={`text-sm sm:text-base font-bold pb-2 transition-all cursor-pointer whitespace-nowrap border-b-2 ${
                      isActive 
                        ? 'border-[#EF4444] text-gray-900 font-extrabold' 
                        : 'border-transparent text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* College Cards Grid / Horizontal Scroll */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(() => {
              const SEARCHED_COLLEGE_IDS = {
                'Engi.': ['malwa-institute', 'iit-indore', 'sgsits', 'iet-davv'],
                'BCA': ['davv', 'acropolis', 'symbiosis-university', 'sage-university'],
                'MBA': ['iim-indore', 'pimr', 'jaipuria-indore', 'ims-davv'],
                'LAW': ['nmims-law', 'sage-university', 'davv', 'svvv-indore'],
                'MEDICAL': ['mgm-medical', 'index-medical', 'saims', 'shubhdeep-ayurved']
              };

              const activeIds = SEARCHED_COLLEGE_IDS[activeSearchedTab] || [];
              const activeColleges = activeIds
                .map(id => INDORE_INSTITUTES.find(inst => inst.id === id))
                .filter(Boolean) as Institute[];

              const formatFee = (fee: number) => {
                if (!fee || fee === 0) return 'Varies';
                if (fee >= 100000) {
                  return `₹${(fee / 100000).toFixed(2).replace(/\.?0+$/, '')} Lakh*`;
                }
                return `₹${fee.toLocaleString('en-IN')}*`;
              };

              return activeColleges.map((college) => (
                <div 
                  key={college.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  {/* Image Header */}
                  <div 
                    onClick={() => onViewCollegeDetail && onViewCollegeDetail(college)}
                    className="relative aspect-[16/10] bg-gray-50 overflow-hidden cursor-pointer"
                  >
                    <img 
                      src={college.image || '/sgsits.jpg'} 
                      alt={college.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {college.rating && (
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm py-1 px-2.5 rounded-lg text-[11px] font-black text-gray-800 flex items-center gap-1 shadow-sm">
                        <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                        <span>{college.rating}</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 
                        onClick={() => onViewCollegeDetail && onViewCollegeDetail(college)}
                        className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-[#EF4444] transition-colors line-clamp-2 cursor-pointer font-outfit min-h-[2.5rem]"
                      >
                        {college.name}
                      </h3>
                      
                      {/* Fees */}
                      <p className="text-sm font-extrabold text-gray-800 mt-2">
                        {formatFee(college.feePerAnnum)}
                        <span className="text-[10px] text-gray-400 font-normal ml-1">Avg. Fees</span>
                      </p>

                      {/* Small info line */}
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-1 font-medium">
                        <MapPin className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{college.location}, Indore</span>
                      </div>
                    </div>

                    {/* Apply Now button */}
                    <div className="mt-4 pt-3 border-t border-gray-50">
                      <button
                        type="button"
                        onClick={onOpenCounseling}
                        className="w-full border border-[#EF4444] hover:bg-[#EF4444]/5 text-[#EF4444] font-extrabold py-2 px-4 rounded-xl text-xs tracking-wider uppercase transition-all duration-200 active:scale-95 text-center cursor-pointer"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ));
            })()}
          </div>

        </div>
      </section>

      {/* 3. CATEGORIES SECTION ("Choose your Institute") */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#EF4444] uppercase tracking-wider mb-2">
                <BookOpen className="h-4 w-4" />
                <span>Explore Specializations</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#0F244C] font-outfit">
                Choose your Institute Category
              </h2>
              <p className="text-sm text-gray-500 max-w-xl font-normal mt-2">
                Browse our verified directories of colleges in Indore structured precisely according to stream priorities.
              </p>
            </div>
            <button 
              onClick={() => handleCategoryClick('Engineering', 'college')}
              className="mt-6 md:mt-0 text-xs font-bold text-[#EF4444] hover:text-[#DC2626] inline-flex items-center gap-1.5 hover:underline transition self-start"
            >
              <span>View All Directories</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          {/* Categories Grid with visual cards and arrow buttons */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Engineering & Tech */}
            <div 
              onClick={() => handleCategoryClick('Engineering', 'college')}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col h-full"
            >
              <div className="h-48 overflow-hidden relative bg-gray-50">
                <img 
                  src='./public/ims-davv.jpg'
                  alt="Engineering campus" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-4 right-4 bg-white/95 p-2.5 rounded-xl shadow-md text-gray-800 transition group-hover:bg-[#EF4444] group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#0F244C] group-hover:text-[#EF4444] transition font-outfit">Engineering & Science</h3>
                  <p className="text-xs text-gray-500 mt-2.5 leading-relaxed font-normal">
                    Premier technical colleges (IIT Simrol, SGSITS, DAVV, etc.) specializing in elite CSE, AI, and scientific research.
                  </p>
                </div>
              </div>
            </div>

            {/* Management */}
            <div 
              onClick={() => handleCategoryClick('Management', 'college')}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col h-full"
            >
              <div className="h-48 overflow-hidden relative bg-gray-50">
                <img 
                  src="./public/iim-indore.jpg" 
                  alt="Management class" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-4 right-4 bg-white/95 p-2.5 rounded-xl shadow-md text-gray-800 transition group-hover:bg-[#EF4444] group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#0F244C] group-hover:text-[#EF4444] transition font-outfit">Management & MBA</h3>
                  <p className="text-xs text-gray-500 mt-2.5 leading-relaxed font-normal">
                    Elite business schools (IIM Indore, etc.) offering flagship MBA, BBA, IPM, and executive programs with 100% placements.
                  </p>
                </div>
              </div>
            </div>

            {/* Medical & Sciences */}
            <div 
              onClick={() => handleCategoryClick('Medical', 'college')}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col h-full"
            >
              <div className="h-48 overflow-hidden relative bg-gray-50">
                <img 
                  src="./public/saims.jpg" 
                  alt="Medical lab" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-4 right-4 bg-white/95 p-2.5 rounded-xl shadow-md text-gray-800 transition group-hover:bg-[#EF4444] group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#0F244C] group-hover:text-[#EF4444] transition font-outfit">Medical & Dental</h3>
                  <p className="text-xs text-gray-500 mt-2.5 leading-relaxed font-normal">
                    Top-rated healthcare institutes offering professional MBBS, BDS, and pharmaceutical specializations in Indore.
                  </p>
                </div>
              </div>
            </div>

            {/* Design & Creative */}
            <div 
              onClick={() => handleCategoryClick('Design', 'college')}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col h-full"
            >
              <div className="h-48 overflow-hidden relative bg-gray-50">
                <img 
                  src="./public/ips-ibmr.jpg" 
                  alt="Design studio" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-4 right-4 bg-white/95 p-2.5 rounded-xl shadow-md text-gray-800 transition group-hover:bg-[#EF4444] group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#0F244C] group-hover:text-[#EF4444] transition font-outfit">Design & Arts</h3>
                  <p className="text-xs text-gray-500 mt-2.5 leading-relaxed font-normal">
                    Modern academies offering creative specializations including UI/UX design, fashion, and digital media degrees.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. REVIEWS & TRUST TESTIMONIALS SECTION */}
      <section className="py-24 bg-slate-50 border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Col: Explanatory Header and Carousel of reviews */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#EF4444] uppercase tracking-wider mb-2">
                  <Users className="h-4 w-4" />
                  <span>Student & Parent Reviews</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F244C] font-outfit mt-2">
                  Trusted by Over 10,000 Students & Families in Indore
                </h2>
                <p className="text-sm text-gray-500 mt-3 font-normal leading-relaxed">
                  Hear from genuine, independent voices who identified and locked their dream colleges using our dedicated counseling support.
                </p>
              </div>

              {/* Review Cards Grid */}
              <div className="space-y-5">
                {REVIEWS.map((rev, idx) => (
                  <motion.div 
                    key={idx} 
                    whileHover={{ x: 4 }}
                    className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition duration-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3.5">
                        <div className="h-10 w-10 bg-slate-100 border border-slate-200 text-[#0F244C] text-sm font-bold rounded-full flex items-center justify-center">
                          {rev.avatar}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#0F244C]">{rev.name}</h4>
                          <p className="text-[10px] text-gray-400 font-semibold mt-0.5">{rev.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-0.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed font-light italic">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Col: Video Counselor Callout Box (Highly visual play button) */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xl">
                <div className="relative aspect-video bg-gray-900 overflow-hidden flex items-center justify-center">
                  {isVideoPlaying ? (
                    <iframe
                      src="https://youtu.be/3Zdn1mCcUY0?si=TWs0cZCowhGmtqYo"
                      title="Counseling video"
                      className="absolute inset-0 w-full h-full border-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <img 
                        src="./public/malwa_institute_campus.jpg" 
                        alt="Counselor assisting student" 
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover opacity-75"
                      />
                      <div className="absolute inset-0 bg-[#0F244C]/35 backdrop-blur-[2px]" />
                      <button 
                        onClick={() => setIsVideoPlaying(true)}
                        className="relative z-10 h-16 w-16 bg-[#EF4444] hover:bg-[#DC2626] active:scale-95 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer"
                        title="Play Counselor Introduction"
                      >
                        <Play className="h-6 w-6 fill-white ml-1" />
                      </button>
                      <span className="absolute bottom-3 left-3 bg-[#0F244C]/90 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg border border-white/5 shadow-sm">
                        Meet Our Indore Counselor (2 Min video)
                      </span>
                    </>
                  )}
                </div>
                <div className="p-8 text-center space-y-4">
                  <h3 className="text-base font-bold text-[#0F244C] font-outfit">Need Direct Admissions Alignment?</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-normal">
                    Submit preferred streams and target fee structures. Our counselors will generate your bespoke institute comparison deck in 2 hours.
                  </p>
                  <button 
                    onClick={onOpenCounseling}
                    className="w-full bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-xl py-3.5 text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Talk to a Human Advisor</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. SCHEDULE A MEETING - DETAILED INPUT FORM SECTION */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center bg-[#0F244C] text-white rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-14 relative overflow-hidden shadow-2xl border border-white/5">
            
            {/* Visual ambient circle */}
            <div className="absolute bottom-[-10%] right-[-10%] h-96 w-96 bg-[#EF4444]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-[-5%] left-[-5%] h-64 w-64 bg-[#EF4444]/10 rounded-full blur-2xl pointer-events-none" />

            {/* Left Column: Process Information */}
            <div className="lg:col-span-6 space-y-8 relative z-10">
              <span className="text-[11px] font-bold text-rose-300 uppercase tracking-widest bg-white/5 border border-white/10 px-4.5 py-1.5 rounded-full">
                Admissions Desk
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-outfit leading-tight">
                Schedule a Direct Counseling Meeting
              </h2>
              
              <div className="space-y-6 text-sm font-light text-gray-300">
                <div className="flex items-start space-x-4">
                  <span className="h-6 w-6 rounded-lg bg-[#EF4444]/20 text-rose-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-[#EF4444]/30">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-sm tracking-wide font-outfit">Unbiased Advice</h4>
                    <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">Indore Colleges acts as your completely neutral matching partner, filtering through colleges strictly based on your talent metrics.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <span className="h-6 w-6 rounded-lg bg-[#EF4444]/20 text-rose-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-[#EF4444]/30">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-sm tracking-wide font-outfit">Cut through the noise</h4>
                    <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">Deconstruct structural cutoffs, placement claims, and tuition policies before initiating locking admissions.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <span className="h-6 w-6 rounded-lg bg-[#EF4444]/20 text-rose-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-[#EF4444]/30">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-sm tracking-wide font-outfit">Direct Dean Intros</h4>
                    <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">Our strong local ties help you bypass general queues to secure priority campus tours and direct faculty counseling interactions.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Schedule Form Card */}
            <div className="lg:col-span-6 relative z-10 w-full">
              <div className="bg-white rounded-2xl sm:rounded-[2rem] p-4 sm:p-10 text-gray-950 shadow-2xl border border-gray-100">
                <h3 className="text-lg font-bold tracking-tight mb-6 flex items-center gap-2.5 text-[#0F244C] font-outfit">
                  <Calendar className="h-5.5 w-5.5 text-[#EF4444]" />
                  <span>Choose Callback Time Slot</span>
                </h3>

                {isSuccess ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="h-14 w-14 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
                      <Check className="h-6 w-6" />
                    </div>
                    <h4 className="text-base font-bold text-[#0F244C] font-outfit">Meeting Scheduled Successfully!</h4>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
                      An advisor has been assigned. We will reach out to you on your +91 mobile shortly with details.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5 text-xs">
                    
                    {/* Student / Parent Name */}
                    <div>
                      <label className="block font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Student / Parent Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Rajesh Kumar"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-white text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-[#EF4444] focus:border-[#EF4444] transition-all"
                      />
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Mobile Number
                      </label>
                      <div className="flex rounded-xl overflow-hidden border border-gray-200 focus-within:ring-1 focus-within:ring-[#EF4444] focus-within:border-[#EF4444] transition-all">
                        <span className="bg-slate-50 border-r border-slate-100 text-gray-500 px-4 flex items-center font-bold text-xs select-none">
                          +91
                        </span>
                        <input
                           type="tel"
                           pattern="[0-9]{10}"
                           required
                           value={formPhone}
                           onChange={(e) => setFormPhone(e.target.value)}
                           placeholder="Enter 10-digit phone number"
                           className="flex-1 px-4 py-3 bg-white text-xs text-gray-800 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="e.g. rajesh@gmail.com"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-white text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-[#EF4444] focus:border-[#EF4444] transition-all"
                      />
                    </div>

                    {/* Query Message */}
                    <div>
                      <label className="block font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Preferred streams or target courses (Optional)
                      </label>
                      <textarea
                        value={formQuery}
                        onChange={(e) => setFormQuery(e.target.value)}
                        placeholder="e.g. Looking for MBA / B.Tech courses near Vijay Nagar"
                        rows={2}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-white text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-[#EF4444] focus:border-[#EF4444] resize-none transition-all"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#EF4444] hover:bg-[#DC2626] active:scale-98 text-white rounded-xl py-4 text-xs font-bold transition shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                      <span>{isSubmitting ? 'Scheduling now...' : 'Get Free Counsel Call'}</span>
                    </button>

                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. NATIONWIDE PRESENCE GRID */}
      <section className="py-24 bg-slate-50 border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Col: Grid of landmark cities */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {CITIES.map((city, idx) => (
                  <div 
                    key={idx}
                    onClick={() => city.name === 'Indore' ? handleLocalityClick('All') : {}}
                    className={`group relative rounded-3xl overflow-hidden aspect-square shadow-sm border ${
                      city.active 
                        ? 'border-[#EF4444] cursor-pointer shadow-md' 
                        : 'border-gray-200 cursor-default opacity-85 hover:opacity-100'
                    } transition duration-300 bg-white`}
                  >
                    <img 
                      src={city.img} 
                      alt={city.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-4" />
                    
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-xs font-extrabold tracking-tight font-outfit">{city.name}</p>
                      {city.active && (
                        <span className="inline-block text-[8px] bg-[#EF4444] text-white font-black uppercase tracking-widest px-2 py-0.5 rounded-md mt-1.5 font-sans">
                          Active Center
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: Prominent text headline */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#EF4444] uppercase tracking-wider">
                <Compass className="h-4 w-4" />
                <span>Nationwide Presence</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F244C] leading-tight font-outfit">
                Our National Outreach
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed font-normal">
                We track and register verified directories of premier institutes across India's largest metropolitan cities. While our technology platform guides families nationwide, our core active counseling desk and physical team are fully deployed in <span className="text-[#0F244C] font-bold">Indore</span>.
              </p>
              <div className="pt-4 flex flex-wrap gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleLocalityClick('All')}
                  className="bg-[#0F244C] hover:bg-[#16336a] text-white px-5 py-3.5 rounded-xl text-xs font-bold transition shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Indore Directory</span>
                  <ArrowUpRight className="h-4 w-4 text-sky-400" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS / FEATURES GRID (Bento Style Layout) */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#EF4444] uppercase tracking-wider mb-2">
              <Building className="h-4 w-4" />
              <span>Full-Stack Ecosystem</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0F244C] font-outfit">
              One Portal. Complete Admission Alignment.
            </h2>
            <p className="text-sm text-gray-500 mt-2.5 font-normal">
              We make academic research, choice comparisons, direct expert consultations, and application locking fully seamless.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-8">
            
            {/* Block 1: Verified Colleges (Col-Span 6) */}
            <div className="lg:col-span-6 bg-slate-50 border border-slate-100 rounded-[2rem] p-8 flex flex-col justify-between group hover:border-slate-200 transition duration-300">
              <div className="space-y-5">
                <div className="h-11 w-11 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center text-[#EF4444] shadow-sm">
                  <ShieldCheck className="h-5.5 w-5.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0F244C] font-outfit">2,500+ Verified Higher Institutes</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mt-2.5 font-light">
                    Make critical higher education decisions with pure confidence using our meticulously verified, audited, and updated catalog of top colleges in Indore.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => handleCategoryClick('Engineering', 'college')}
                className="mt-8 self-start text-xs font-bold text-[#EF4444] hover:text-[#DC2626] flex items-center gap-1.5 group-hover:underline transition"
              >
                <span>Browse our catalog</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            {/* Block 2: Admission Support (Col-Span 6) */}
            <div className="lg:col-span-6 bg-[#EF4444]/5 border border-[#EF4444]/10 rounded-[2rem] p-8 flex flex-col justify-between group hover:bg-[#EF4444]/10 transition duration-300">
              <div className="space-y-5">
                <div className="h-11 w-11 bg-[#EF4444]/10 rounded-2xl flex items-center justify-center text-[#EF4444] shadow-xs">
                  <GraduationCap className="h-5.5 w-5.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0F244C] font-outfit">Expert Admission Support</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mt-2.5 font-light">
                    Harness the power of direct dean interfaces and unified counsel callback desks. Never settle for less when choosing your future career route.
                  </p>
                </div>
              </div>
              <button 
                onClick={onOpenCounseling}
                className="mt-8 self-start text-xs font-bold text-[#EF4444] hover:text-[#DC2626] flex items-center gap-1.5 group-hover:underline transition"
              >
                <span>Access virtual advisor</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            {/* Block 3: Compare Choose Apply (Col-Span 6) */}
            <div className="lg:col-span-6 bg-[#0F244C] text-white rounded-[2rem] p-8 flex flex-col justify-between group transition duration-300">
              <div className="space-y-5">
                <div className="h-11 w-11 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-amber-300 shadow-sm">
                  <Award className="h-5.5 w-5.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-outfit">Compare, Choose & Apply</h3>
                  <p className="text-xs text-gray-300 leading-relaxed mt-2.5 font-light">
                    Save top targets in your Admissions Basket, request bulk callbacks, and let our senior advisors manage direct submissions for you.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => handleCategoryClick('Engineering', 'college')}
                className="mt-8 self-start text-xs font-bold text-amber-300 hover:text-amber-400 flex items-center gap-1.5 transition"
              >
                <span>Compare target colleges</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            {/* Block 4: Institute Search (Col-Span 6) */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#0F244C] to-[#142d5c] text-white rounded-[2rem] p-8 flex flex-col justify-between group transition duration-300">
              <div className="space-y-5">
                <div className="h-11 w-11 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[#EF4444] shadow-sm">
                  <BookOpen className="h-5.5 w-5.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-outfit">Intelligent Matchmaking</h3>
                  <p className="text-xs text-red-200 leading-relaxed mt-2.5 font-light">
                    Filter by exact location areas in Indore, campus facility sets, fee ranges, and specific academic affiliations in seconds.
                  </p>
                </div>
              </div>
              <button 
                onClick={onOpenCounseling}
                className="mt-8 self-start text-xs font-bold text-rose-300 hover:text-sky-200 flex items-center gap-1.5 transition"
              >
                <span>Initiate chat session</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 8. OUR PREMIUM ADMISSIONS SERVICES */}
      <section className="py-24 bg-slate-50 border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#EF4444] uppercase tracking-wider mb-2">
              <Sparkles className="h-4 w-4" />
              <span>Dedicated Portals</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0F244C] font-outfit">
              We Accompany You At Every Step
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Card 1: Personalised Recommendations */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="h-10 w-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-lg mb-5 shadow-xs">
                🎓
              </div>
              <h3 className="text-sm font-bold text-[#0F244C] font-outfit">Bespoke Alignments</h3>
              <p className="text-xs text-gray-500 mt-2.5 leading-relaxed font-light">
                Get a customized layout of Engineering, Management, or Medical streams in Indore aligned strictly to your career aspirations.
              </p>
            </motion.div>

            {/* Card 2: One-to-One Counselling */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="h-10 w-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-lg mb-5 shadow-xs">
                👥
              </div>
              <h3 className="text-sm font-bold text-[#0F244C] font-outfit">Direct Counselling</h3>
              <p className="text-xs text-gray-500 mt-2.5 leading-relaxed font-light">
                Secure 1-on-1 interaction with senior local guides to demystify complex fee metrics and campus placement charts.
              </p>
            </motion.div>

            {/* Card 3: Complete Admission Support */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="h-10 w-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-lg mb-5 shadow-xs">
                ✨
              </div>
              <h3 className="text-sm font-bold text-[#0F244C] font-outfit">Complete Alignment</h3>
              <p className="text-xs text-gray-500 mt-2.5 leading-relaxed font-light">
                We handle college comparative charts, dean interaction setups, hostel verification audits, and documentation checks.
              </p>
            </motion.div>

            {/* Card 4: End-to-End Assistance */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="h-10 w-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-lg mb-5 shadow-xs">
                🛡️
              </div>
              <h3 className="text-sm font-bold text-[#0F244C] font-outfit">End-to-End Guarantee</h3>
              <p className="text-xs text-gray-500 mt-2.5 leading-relaxed font-light">
                From drafting primary query tickets down to finalized seat booking confirmation, our support is always active.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 9. POPULAR LOCALITIES IN INDORE */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-12">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#EF4444] uppercase tracking-wider mb-2">
              <MapPin className="h-4 w-4" />
              <span>Campus Map Hubs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F244C] font-outfit">
              Popular Localities near you in Indore
            </h2>
          </div>

          {/* Localities Pill Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {LOCALITIES.map((loc, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.02, y: -2 }}
                onClick={() => handleLocalityClick(loc.name)}
                className="group cursor-pointer bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-lg hover:border-[#EF4444]/30 hover:bg-[#EF4444]/5 transition-all flex items-center justify-between"
              >
                <div className="flex items-center space-x-3 sm:space-x-3.5 min-w-0">
                  <div className="h-9 w-9 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-[#EF4444] group-hover:bg-[#EF4444] group-hover:text-white transition-all flex-shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="truncate">
                    <h4 className="text-xs sm:text-sm font-bold text-[#0F244C] group-hover:text-[#EF4444] transition font-outfit truncate">{loc.name}</h4>
                    <p className="text-[10px] text-gray-400 font-medium mt-0.5">Indore Zone</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-gray-400 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1 group-hover:bg-[#EF4444]/10 group-hover:text-[#EF4444] transition-all flex-shrink-0">
                  {loc.dist}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

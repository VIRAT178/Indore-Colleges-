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
  Heart,
  ExternalLink,
  Globe
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
  const [activeSearchedTab, setActiveSearchedTab] = useState<'Engineering' | 'BBA' | 'BCA' | 'MBA' | 'LAW' | 'MEDICAL' | 'DESIGN'>('Engineering');

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
    if (!formName || !formPhone) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          phone: formPhone,
          email: formEmail || '',
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
      
      {/* 1. HERO BANNER SECTION (INDORE COLLEGES PURPOSE) */}
      <section className="relative min-h-[480px] lg:min-h-[450px] py-14 lg:py-20 px-4 sm:px-8 lg:px-16 xl:px-20 overflow-hidden border-b border-gray-150 flex items-center bg-gray-950">
        {/* Full-width education portal hero background */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <img 
            src="/bg.png" 
            alt="Indore Higher Education Campuses" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-[1.05] contrast-[1.02] scale-105"
          />
          {/* Subtle overlay to preserve image clarity while ensuring text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/40 via-gray-950/20 to-gray-950/50 backdrop-brightness-95" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/10 to-black/40 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="mx-auto max-w-7xl w-full relative z-10 text-left flex flex-col items-start">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.2] font-outfit max-w-4xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
          >
            Find best colleges in Indore for Engineering, Management, Science, Pharmacy and Law Etc.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-sm text-gray-100 leading-relaxed max-w-2xl font-medium mt-4 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]"
          >
            Compare 50+ verified Engineering, Management (MBA/BBA), IT (BCA), Law, and Medical institutions in Indore. Access direct admission support, cutoff breakdowns, fee structures, and personalized 1-on-1 counseling.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-start gap-4 pt-6"
          >
            <button
              type="button"
              onClick={() => {
                setInstituteTypeFilter('college');
                setSelectedCategory('All');
                setSelectedBoard('All');
                setSelectedLocation('All');
                setSearchQuery('');
                setActiveTab('explore');
              }}
              className="inline-flex bg-white hover:bg-gray-100 active:scale-95 text-gray-900 font-extrabold px-7 py-4 rounded-2xl transition-all duration-200 shadow-xl text-xs sm:text-sm tracking-wider uppercase items-center gap-2 cursor-pointer"
            >
              Explore Top Colleges
              <ArrowUpRight className="h-4.5 w-4.5" />
            </button>

            <button
              type="button"
              onClick={onOpenCounseling}
              className="inline-flex bg-red-600 hover:bg-red-500 active:scale-95 text-white font-extrabold px-7 py-4 rounded-2xl transition-all duration-200 text-xs sm:text-sm tracking-wider uppercase items-center gap-2 cursor-pointer backdrop-blur-sm shadow-xl shadow-red-600/30"
            >
              <PhoneCall className="h-4.5 w-4.5" />
              Get Free Counselling
            </button>
          </motion.div>

          {/* Quick Platform Stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="pt-8 mt-8 border-t border-white/10 grid grid-cols-3 gap-8 max-w-xl w-full"
          >
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-outfit">50+</div>
              <div className="text-xs text-gray-300 font-medium">Indore Institutes</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-outfit">10,000+</div>
              <div className="text-xs text-gray-300 font-medium">Students Counselled</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-outfit">100%</div>
              <div className="text-xs text-gray-300 font-medium">Free Guidance</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. THE MOST SEARCHED COLLEGES SECTION (CARDEKHO-STYLE DYNAMIC TABS) */}
      <section className="py-10 sm:py-12 bg-white border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="border-b border-gray-200 pb-4 mb-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-outfit mb-4 text-center">
              The most Searched Colleges
            </h2>
            
            {/* Horizontal Tabs: Engineering, BBA, BCA, MBA, LAW, MEDICAL, DESIGN */}
            <div className="flex justify-start sm:justify-center gap-4 sm:gap-6 overflow-x-auto scrollbar-none pb-1 px-2 sm:px-0">
              {(['Engineering', 'BBA', 'BCA', 'MBA', 'LAW', 'MEDICAL', 'DESIGN'] as const).map((tab) => {
                const isActive = activeSearchedTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveSearchedTab(tab)}
                    className={`text-sm sm:text-base font-bold pb-2 transition-all cursor-pointer whitespace-nowrap border-b-2 ${
                      tab === 'MEDICAL' ? 'hidden sm:block' : ''
                    } ${
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

          {/* College Cards Grid / Split into Google Rating & Indore Colleges Rating categories */}
          {(() => {
            const SEARCHED_COLLEGE_IDS = {
              'Engineering': ['iet-davv', 'sgsits', 'acropolis', 'iist-indore', 'chameli-devi', 'malwa-institute', 'ips-engineering', 'nmims-stme', 'medi-caps-university', 'symbiosis-university', 'sage-university', 'svvv-indore'],
              'BBA': ['pimr', 'ims-davv', 'prestige-university', 'acropolis', 'sage-university', 'symbiosis-university', 'renaissance-college', 'ips-ibmr', 'medi-caps-university', 'svvv-indore', 'oriental-university', 'davv'],
              'BCA': ['acropolis', 'symbiosis-university', 'sage-university', 'pimr', 'svvv-indore', 'medi-caps-university', 'oriental-university', 'renaissance-college', 'davv', 'ips-ibmr', 'ims-davv', 'prestige-university'],
              'MBA': ['iim-indore', 'ims-davv', 'pimr', 'jaipuria-indore', 'prestige-university', 'nmims-indore', 'sage-university', 'ips-ibmr', 'acropolis', 'svvv-indore', 'medi-caps-university', 'oriental-university'],
              'LAW': ['nmims-law', 'sage-university', 'pimr', 'prestige-university', 'svvv-indore', 'oriental-university', 'renaissance-college', 'apj-kalam-univ', 'davv', 'symbiosis-university', 'acropolis', 'ips-ibmr'],
              'MEDICAL': ['mgm-medical', 'saims', 'index-medical', 'shubhdeep-ayurved', 'malwa-institute', 'sage-university', 'oriental-university', 'svvv-indore', 'medi-caps-university', 'renaissance-college', 'acropolis', 'pimr'],
              'DESIGN': ['cindrebay-design', 'symbiosis-university', 'sage-university', 'acropolis', 'renaissance-college', 'svvv-indore', 'prestige-university', 'oriental-university', 'medi-caps-university', 'pimr', 'davv', 'ips-ibmr']
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

            const GOOGLE_RATINGS_MAP: Record<string, number> = {
              'sgsits': 4.5,
              'nmims-stme': 4.4,
              'iet-davv': 4.3,
              'medi-caps-university': 4.2,
              'acropolis': 4.1,
              'iist-indore': 4.0,
              'chameli-devi': 3.9,
              'malwa-institute': 3.8,
              'ips-engineering': 3.8,
              'symbiosis-university': 4.2,
              'sage-university': 4.0,
              'svvv-indore': 3.9,
              'iim-indore': 4.8,
              'jaipuria-indore': 4.4,
              'ims-davv': 4.4,
              'pimr': 4.3,
              'prestige-university': 4.3,
              'nmims-indore': 4.2,
              'renaissance-college': 4.0,
              'ips-ibmr': 3.9,
              'oriental-university': 3.8,
              'davv': 4.3,
              'nmims-law': 4.5,
              'apj-kalam-univ': 3.7,
              'mgm-medical': 4.6,
              'saims': 4.4,
              'index-medical': 4.2,
              'shubhdeep-ayurved': 4.1,
              'cindrebay-design': 4.6
            };

            const getGoogleRating = (college: Institute): number => {
              if (GOOGLE_RATINGS_MAP[college.id] !== undefined) return GOOGLE_RATINGS_MAP[college.id];
              if (college.googleRating !== undefined) return college.googleRating;
              return college.rating || 4.1;
            };

            const getIndoreRating = (college: Institute): number => {
              const listIndex = activeIds.indexOf(college.id);
              if (listIndex !== -1) {
                const indoreScores = [4.8, 4.7, 4.5, 4.3, 4.1, 4.0, 3.9, 3.8, 3.7, 3.6];
                return indoreScores[listIndex] || 4.0;
              }
              if (college.indoreRating !== undefined) return college.indoreRating;
              return Math.min(4.9, Math.max(4.0, (college.rating || 4.2) + 0.2));
            };

            const googleColleges = [...activeColleges]
              .sort((a, b) => getGoogleRating(b) - getGoogleRating(a))
              .slice(0, 6);

            const indoreColleges = [...activeColleges]
              .sort((a, b) => getIndoreRating(b) - getIndoreRating(a))
              .slice(0, 6);

            const renderCollegeCard = (college: Institute, ratingType: 'google' | 'indore') => {
              const ratingVal = ratingType === 'google' ? getGoogleRating(college) : getIndoreRating(college);
              const displayRating = ratingVal.toFixed(1);

              return (
                <div 
                  key={`${ratingType}-${college.id}`}
                  className="bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
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
                    {ratingType === 'google' ? (
                      <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-xs py-1 px-2 rounded-lg text-[11px] font-black text-gray-800 flex items-center gap-1 shadow-xs border border-gray-100">
                        <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                        </svg>
                        <span>{displayRating}</span>
                      </div>
                    ) : (
                      <div className="absolute top-2.5 right-2.5 bg-[#EF4444] text-white py-1 px-2 rounded-lg text-[11px] font-black flex items-center gap-1 shadow-xs">
                        <Star className="h-3 w-3 text-amber-300 fill-amber-300 shrink-0" />
                        <span>{displayRating}</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 
                        onClick={() => onViewCollegeDetail && onViewCollegeDetail(college)}
                        className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#EF4444] transition-colors line-clamp-2 cursor-pointer font-outfit min-h-[2.25rem]"
                      >
                        {college.name}
                      </h3>
                      
                      {/* Fees */}
                      <p className="text-xs font-extrabold text-gray-800 mt-1.5">
                        {formatFee(college.feePerAnnum)}
                        <span className="text-[10px] text-gray-400 font-normal ml-1">Avg. Fees</span>
                      </p>

                      {/* Small info line */}
                      <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-gray-500 mt-1 font-medium">
                        <MapPin className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{college.location}, Indore</span>
                      </div>
                    </div>

                    {/* Apply Now button */}
                    <div className="mt-3 pt-2.5 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={onOpenCounseling}
                        className="w-full border border-[#EF4444] hover:bg-[#EF4444] hover:text-white text-[#EF4444] font-extrabold py-1.5 px-3 rounded-xl text-[11px] tracking-wider uppercase transition-all duration-200 active:scale-95 text-center cursor-pointer"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            };

            return (
              <div>
                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                  {/* Prominent Middle Vertical Divider Line for Large Screens */}
                  <div className="hidden lg:flex absolute left-1/2 top-2 bottom-2 -translate-x-1/2 items-center justify-center pointer-events-none z-20">
                    <div className="h-full w-[2px] bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300 shadow-xs" />
                    <div className="absolute top-1/2 -translate-y-1/2 bg-white px-2.5 py-1 text-[11px] font-black uppercase text-gray-700 tracking-wider rounded-full border-2 border-gray-300 shadow-md flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      <span>VS</span>
                      <span className="w-2 h-2 rounded-full bg-red-600"></span>
                    </div>
                  </div>

                  {/* Left Side Category: According to Google Rating */}
                  <div className="bg-gray-50/80 p-4 sm:p-6 rounded-3xl border border-gray-200/80 shadow-2xs">
                    {/* Header Banner */}
                    <div className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 mb-6 shadow-xs text-center flex flex-col items-center justify-center">
                      <div className="flex items-center justify-center gap-2 mb-1.5">
                        <div className="h-7 w-7 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center shrink-0">
                          <svg className="h-4 w-4" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                          </svg>
                        </div>
                        <span className="inline-block px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-black rounded-md uppercase tracking-wider">
                          CATEGORY 01
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[#0F244C] font-outfit leading-tight tracking-tight">
                        According to Google Rating
                      </h3>
                      <p className="text-[12px] text-gray-500 font-medium mt-1">
                        Top 6 Colleges ranked by public Google Map & Search student reviews
                      </p>
                    </div>

                    {/* 2-Column Grid with 6 Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {googleColleges.map((college) => renderCollegeCard(college, 'google'))}
                    </div>
                  </div>

                  {/* Mobile Divider between Left & Right Sections */}
                  <div className="block lg:hidden relative my-4 text-center">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-dashed border-gray-300"></div></div>
                    <div className="relative inline-flex items-center gap-1.5 bg-white px-4 py-1.5 text-xs font-black text-gray-700 uppercase tracking-wider rounded-full border-2 border-gray-300 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      <span>VS</span>
                      <span className="w-2 h-2 rounded-full bg-red-600"></span>
                    </div>
                  </div>

                  {/* Right Side Category: According to Indore Colleges Rating */}
                  <div className="bg-gray-50/80 p-4 sm:p-6 rounded-3xl border border-gray-200/80 shadow-2xs">
                    {/* Header Banner */}
                    <div className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 mb-6 shadow-xs text-center flex flex-col items-center justify-center">
                      <div className="flex items-center justify-center gap-2 mb-1.5">
                        <div className="h-7 w-7 bg-red-50 text-[#EF4444] font-black text-xs rounded-lg flex items-center justify-center shrink-0 border border-red-100 font-outfit">
                          IC
                        </div>
                        <span className="inline-block px-2.5 py-0.5 bg-red-50 text-red-700 border border-red-200 text-[10px] font-black rounded-md uppercase tracking-wider">
                          CATEGORY 02
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[#0F244C] font-outfit leading-tight tracking-tight">
                        According to Indore Colleges Rating
                      </h3>
                      <p className="text-[12px] text-gray-500 font-medium mt-1">
                        Top 6 Colleges evaluated by Indore Academic Advisory Panel
                      </p>
                    </div>

                    {/* 2-Column Grid with 6 Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {indoreColleges.map((college) => renderCollegeCard(college, 'indore'))}
                    </div>
                  </div>
                </div>

                {/* View Many More Colleges Button */}
                <div className="mt-8 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setInstituteTypeFilter('college');
                      if (activeSearchedTab) {
                        setSelectedCategory(activeSearchedTab);
                      }
                      setActiveTab('explore');
                    }}
                    className="inline-flex items-center justify-center gap-2 bg-[#0F244C] hover:bg-[#EF4444] text-white text-sm sm:text-base font-extrabold py-3.5 px-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 cursor-pointer font-outfit group"
                  >
                    <span>View Many More {activeSearchedTab} Colleges</span>
                    <ArrowUpRight className="h-5 w-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* 3. CATEGORIES SECTION ("Choose your Institute") */}
      <section className="py-10 sm:py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Engineering & Tech */}
            <div 
              onClick={() => handleCategoryClick('Engineering', 'college')}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col h-full"
            >
              <div className="h-36 sm:h-40 overflow-hidden relative bg-gray-50">
                <img 
                  src='./public/ims-davv.jpg'
                  alt="Engineering campus" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 right-3 bg-white/95 p-2 rounded-xl shadow-md text-gray-800 transition group-hover:bg-[#EF4444] group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#0F244C] group-hover:text-[#EF4444] transition font-outfit">Engineering & Science</h3>
                </div>
              </div>
            </div>

            {/* Management */}
            <div 
              onClick={() => handleCategoryClick('Management', 'college')}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col h-full"
            >
              <div className="h-36 sm:h-40 overflow-hidden relative bg-gray-50">
                <img 
                  src="./public/iim-indore.jpg" 
                  alt="Management class" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 right-3 bg-white/95 p-2 rounded-xl shadow-md text-gray-800 transition group-hover:bg-[#EF4444] group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#0F244C] group-hover:text-[#EF4444] transition font-outfit">Management & MBA</h3>
                </div>
              </div>
            </div>

            {/* Medical & Sciences */}
            <div 
              onClick={() => handleCategoryClick('Medical', 'college')}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col h-full"
            >
              <div className="h-36 sm:h-40 overflow-hidden relative bg-gray-50">
                <img 
                  src="./public/saims.jpg" 
                  alt="Medical lab" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 right-3 bg-white/95 p-2 rounded-xl shadow-md text-gray-800 transition group-hover:bg-[#EF4444] group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#0F244C] group-hover:text-[#EF4444] transition font-outfit">Medical & Dental</h3>
                </div>
              </div>
            </div>

            {/* Design & Creative */}
            <div 
              onClick={() => handleCategoryClick('Design', 'college')}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col h-full"
            >
              <div className="h-36 sm:h-40 overflow-hidden relative bg-gray-50">
                <img 
                  src="./public/ips-ibmr.jpg" 
                  alt="Design studio" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 right-3 bg-white/95 p-2 rounded-xl shadow-md text-gray-800 transition group-hover:bg-[#EF4444] group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#0F244C] group-hover:text-[#EF4444] transition font-outfit">Design & Arts</h3>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. REVIEWS & TRUST TESTIMONIALS SECTION */}
      <section className="py-10 sm:py-12 bg-slate-50 border-y border-gray-100">
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
      <section className="py-10 sm:py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 items-center bg-[#0F244C] text-white rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-10 relative overflow-hidden shadow-2xl border border-white/5">
            
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
              
              <div className="space-y-4 text-sm font-light text-gray-300">
                <div className="flex items-center space-x-4">
                  <span className="h-6 w-6 rounded-lg bg-[#EF4444]/20 text-rose-300 font-bold text-xs flex items-center justify-center shrink-0 border border-[#EF4444]/30">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-sm tracking-wide font-outfit">Unbiased Advice</h4>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="h-6 w-6 rounded-lg bg-[#EF4444]/20 text-rose-300 font-bold text-xs flex items-center justify-center shrink-0 border border-[#EF4444]/30">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-sm tracking-wide font-outfit">Cut through the noise</h4>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="h-6 w-6 rounded-lg bg-[#EF4444]/20 text-rose-300 font-bold text-xs flex items-center justify-center shrink-0 border border-[#EF4444]/30">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-sm tracking-wide font-outfit">Direct Dean Intros</h4>
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
      <section className="py-10 sm:py-12 bg-slate-50 border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 sm:gap-12 items-center">
            
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





      {/* 9. POPULAR LOCALITIES IN INDORE */}
      <section className="py-10 sm:py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
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

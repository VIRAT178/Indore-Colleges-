/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, 
  GraduationCap, 
  School, 
  BookOpen, 
  Sparkles, 
  UserCheck, 
  Heart, 
  ShoppingCart, 
  User, 
  Globe, 
  ChevronDown, 
  ChevronRight,
  Phone, 
  ArrowRight, 
  Search, 
  Menu, 
  X, 
  CheckSquare, 
  ExternalLink, 
  HelpCircle, 
  Info, 
  Calendar, 
  Mail, 
  PhoneCall, 
  Award, 
  Star, 
  ListFilter, 
  Trash2, 
  ShieldCheck, 
  Eye, 
  MessageSquare,
  Sparkle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INDORE_INSTITUTES } from '../data/indoreData';
import Logo from './Logo';
import { UserProfile } from '../types';

interface HeaderProps {
  activeTab: 'home' | 'explore' | 'register' | 'dashboard' | 'browse-campus' | 'blogs' | 'about' | 'careers' | 'contact' | 'college-portal' | 'admin-panel';
  setActiveTab: (tab: 'home' | 'explore' | 'register' | 'dashboard' | 'browse-campus' | 'blogs' | 'about' | 'careers' | 'contact' | 'college-portal' | 'admin-panel') => void;
  instituteTypeFilter: 'all' | 'school' | 'college';
  setInstituteTypeFilter: (type: 'all' | 'school' | 'college') => void;
  
  // Deep-integrated filter callbacks
  setSelectedCategory?: (cat: string) => void;
  setSelectedBoard?: (board: string) => void;
  setSelectedLocation?: (loc: string) => void;
  setSearchQuery?: (query: string) => void;
  setMaxFee?: (fee: number) => void;
  
  // Interactive shortlists & comparison lists
  shortlistedIds?: string[];
  onToggleShortlist?: (id: string) => void;
  cartIds?: string[];
  onToggleCart?: (id: string) => void;

  // Authentication & Profile States
  currentUser: UserProfile | null;
  onOpenProfile: () => void;
  onOpenAuth: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  instituteTypeFilter,
  setInstituteTypeFilter,
  setSelectedCategory = () => {},
  setSelectedBoard = () => {},
  setSelectedLocation = () => {},
  setSearchQuery = () => {},
  setMaxFee = () => {},
  shortlistedIds = [],
  onToggleShortlist = () => {},
  cartIds = [],
  onToggleCart = () => {},
  currentUser,
  onOpenProfile,
  onOpenAuth
}: HeaderProps) {
  // Navigation states
  const [activeDropdown, setActiveDropdown] = useState<'schools' | 'boarding' | 'colleges' | 'profile' | 'favorites' | 'cart' | 'blogs' | 'camps' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<'schools' | 'boarding' | 'colleges' | 'more' | null>(null);
  
  // Modal/Overlay states
  const [activeBlog, setActiveBlog] = useState<{ title: string; date: string; readTime: string; content: string[] } | null>(null);
  const [activeAboutModal, setActiveAboutModal] = useState<'about' | 'careers' | 'contact' | 'lang' | null>(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isBulkCallbackOpen, setIsBulkCallbackOpen] = useState(false);
  const [campInterestRegistered, setCampInterestRegistered] = useState(false);
  
  // Form submission states for bulk callback
  const [bulkName, setBulkName] = useState('');
  const [bulkPhone, setBulkPhone] = useState('');
  const [bulkSubmitting, setBulkSubmitting] = useState(false);
  const [bulkSuccess, setBulkSuccess] = useState(false);

  // References for dropdown closing on click outside
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Quick helper to filter and fetch actual institute data for shortlist/cart dropdown views
  const getInstitutesFromIds = (ids: string[]) => {
    return INDORE_INSTITUTES.filter(inst => ids.includes(inst.id));
  };

  const shortlistItems = getInstitutesFromIds(shortlistedIds);
  const cartItems = getInstitutesFromIds(cartIds);

  // Filter trigger helpers
  const handleFilterClick = (type: 'school' | 'college', category?: string, board?: string, location?: string, search?: string) => {
    setActiveTab('explore');
    setInstituteTypeFilter(type);
    setSelectedCategory(category || 'All');
    setSelectedBoard(board || 'All');
    setSelectedLocation(location || 'All');
    setSearchQuery(search || '');
    setMaxFee(1500000);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    
    // Smooth scroll to exploration directory
    setTimeout(() => {
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }, 100);
  };

  // Blogs Data
  const BLOGS = [
    {
      id: 'indore-admissions-2026',
      title: 'Indore College Admissions Guide (2026-27)',
      date: 'June 28, 2026',
      readTime: '5 min read',
      excerpt: 'Everything Indore students need to know about college registration deadlines, entrance tests, and seat choices.',
      content: [
        'Selecting the right higher education institute in Indore is a major milestone for students. With the academic session of 2026-27 approaching, major colleges like IIT Indore, IIM Indore, and SGSITS are rolling out their counselling schedules.',
        'Admission Checklist: Keep critical documents ready: Class 10 & 12 Marksheets, Entrance Exam Score Cards (JEE, NEET, CAT, IPMAT), Domicile certificate, and Aadhar card of parent and student.',
        'Verification Steps: Always check the AICTE approval and UGC accreditation before securing seats. Visit campuses to inspect physical lab infrastructure and library assets.',
        'Fee Structures: Fees range widely in Indore—from ₹30,000 in state colleges to ₹3,00,000+ per semester in premium private institutes.'
      ]
    },
    {
      id: 'cbse-vs-state-board',
      title: 'National vs State Universities: A Comprehensive Guide',
      date: 'June 15, 2026',
      readTime: '4 min read',
      excerpt: 'A comparison of curriculum depth, placements, and campus amenities for Indore college students.',
      content: [
        'One of the most frequent debates during counseling at the Indore desk is whether to choose central/national universities (like IIT/IIM) or state-affiliated colleges (like DAVV/SGSITS).',
        'National Advantage: Highly standardized nationwide curriculum, outstanding global placements, and direct industry research tie-ups. Ideal for students aiming for global career opportunities.',
        'State-Affiliated Advantage: Optimized tuition rates, high seat availability, and state domicile reservations in competitive postgraduate entries.',
        'In conclusion, choose National institutes for high-exposure placement programs, and State-Affiliated colleges for highly specialized local careers and competitive pricing.'
      ]
    },
    {
      id: 'engineering-branches',
      title: 'Top Indore Engineering & Management Streams',
      date: 'May 30, 2026',
      readTime: '6 min read',
      excerpt: 'Branch guidelines and placement insights from IIT Indore & SGSITS experts.',
      content: [
        'Indore is a unique educational hub in Central India, boasting both an IIT and an IIM in the same city limits.',
        'According to recent placement stats from SGSITS, DAVV, and IIT Simrol, Computer Science (CSE) and Artificial Intelligence & Data Science (AI-DS) remain the highest-earning streams with average packages touching ₹18 LPA to ₹35 LPA.',
        'However, Core Streams (Civil, Mechanical, and Electrical) are experiencing a revival due to heavy infrastructure investments and automation. Specialized Management streams (MBA in Business Analytics or Financial Technology) at IIM Indore are reporting 100% placement outcomes.',
        'Expert Tip: Focus on institutions that provide hands-on industry research modules and live internships in Indore Sanwer Road and Super Corridor tech districts.'
      ]
    }
  ];

  // Bulk callback submission handler
  const handleBulkCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkName || !bulkPhone) return;
    setBulkSubmitting(true);
    
    const selectedInstitutes = INDORE_INSTITUTES.filter(inst => cartIds?.includes(inst.id));
    const instituteNames = selectedInstitutes.map(inst => inst.name).join(', ');
    const queryStr = `Bulk Admissions Basket Inquiry. Selected institutes: ${instituteNames || 'None Selected'}`;

    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: bulkName,
          phone: bulkPhone,
          instituteId: 'Bulk Basket Callback Request',
          email: currentUser?.email || '',
          query: queryStr
        })
      });

      if (res.ok) {
        setBulkSuccess(true);
        setBulkName('');
        setBulkPhone('');
        
        // Auto close and clear cart
        setTimeout(() => {
          setBulkSuccess(false);
          setIsBulkCallbackOpen(false);
          // Clear cart
          if (cartIds && onToggleCart) {
            cartIds.forEach(id => onToggleCart(id));
          }
        }, 3000);
      } else {
        console.error('Failed to submit bulk callback request');
      }
    } catch (err) {
      console.error('Error submitting bulk callback request:', err);
    } finally {
      setBulkSubmitting(false);
    }
  };

  return (
    <div ref={headerRef} className="w-full z-40 sticky top-0 bg-white shadow-sm font-sans">
      
      {/* 2. MAIN NAVBAR */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* A. Brand Logo with exact user requested scale/dimensions */}
          <div 
            onClick={() => {
              setActiveTab('home');
              setActiveDropdown(null);
            }}
            className="flex items-center cursor-pointer select-none group transform scale-90 sm:scale-95 origin-left"
          >
            <Logo />
          </div>

          {/* B. Navigation Items (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-1.5">
            
            {/* Home Link */}
            <button
              onClick={() => {
                setActiveTab('home');
                setActiveDropdown(null);
              }}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition ${
                activeTab === 'home'
                  ? 'text-red-600 bg-red-50' 
                  : 'text-gray-800 hover:bg-gray-50'
              }`}
            >
              Home
            </button>

            {/* Colleges & Universities (Direct Trigger) */}
            <button
              onClick={() => {
                handleFilterClick('college');
              }}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition ${
                activeTab === 'explore' && instituteTypeFilter === 'college'
                  ? 'text-red-600 bg-red-50' 
                  : 'text-gray-800 hover:bg-gray-50'
              }`}
            >
              Colleges & Universities
            </button>

            {/* Direct Apply (Switches activeTab) */}
            <button
              onClick={() => {
                setActiveTab('register');
                setActiveDropdown(null);
              }}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition ${
                activeTab === 'register' 
                  ? 'text-red-600 bg-red-50' 
                  : 'text-gray-800 hover:bg-gray-50'
              }`}
            >
              Direct Apply
            </button>

            {/* Blogs Trigger */}
            <button
              onClick={() => {
                setActiveTab('blogs');
                setActiveDropdown(null);
              }}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition ${
                activeTab === 'blogs' 
                  ? 'text-red-600 bg-red-50' 
                  : 'text-gray-800 hover:bg-gray-50'
              }`}
            >
              Blogs
            </button>

            {/* College Partner Portal Trigger */}
            <button
              onClick={() => {
                setActiveTab('college-portal');
                setActiveDropdown(null);
              }}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition ${
                activeTab === 'college-portal' 
                  ? 'text-red-600 bg-red-50' 
                  : 'text-gray-800 hover:bg-gray-50'
              }`}
            >
              College Portal
            </button>

            {/* Browse Campus Live Pill Button */}
            <button
              onClick={() => {
                setActiveTab('browse-campus');
                setActiveDropdown(null);
              }}
              className={`px-3.5 py-1.5 rounded-full flex items-center space-x-2 transition text-xs font-bold ${
                activeTab === 'browse-campus'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-red-50 hover:bg-red-100 text-red-600 shadow-xs'
              }`}
            >
              <span className={`h-2 w-2 rounded-full animate-pulse ${activeTab === 'browse-campus' ? 'bg-white' : 'bg-red-600'}`} />
              <span>Browse Campus</span>
            </button>

          </nav>

          {/* C. Right Action Icons & Mobile Hamburger */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            
            {/* Heart Icon (Favorites/Shortlist count) */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'favorites' ? null : 'favorites')}
                className={`p-1.5 sm:p-2 rounded-full hover:bg-gray-50 text-gray-700 transition relative ${
                  activeDropdown === 'favorites' ? 'bg-gray-50 text-rose-600' : ''
                }`}
                title="Shortlisted Favorites"
              >
                <Heart className={`h-4.5 w-4.5 sm:h-5 sm:w-5 ${shortlistedIds.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
                {shortlistedIds.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-600 text-white rounded-full text-[8px] sm:text-[9px] w-4 sm:h-4.5 sm:w-4.5 h-4 flex items-center justify-center font-bold animate-bounce shadow-sm">
                    {shortlistedIds.length}
                  </span>
                )}
              </button>
            </div>

            {/* Cart Icon (Admissions Shortlist) */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'cart' ? null : 'cart')}
                className={`p-1.5 sm:p-2 rounded-full hover:bg-gray-50 text-gray-700 transition relative ${
                  activeDropdown === 'cart' ? 'bg-gray-50 text-red-600' : ''
                }`}
                title="Admissions Basket"
              >
                <ShoppingCart className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                {cartIds.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-[8px] sm:text-[9px] w-4 sm:h-4.5 sm:w-4.5 h-4 flex items-center justify-center font-bold shadow-sm">
                    {cartIds.length}
                  </span>
                )}
              </button>
            </div>

            {/* User Icon (Profile/Contact menu) */}
            <div className="relative flex items-center space-x-1 sm:space-x-2">
              {currentUser ? (
                <button
                  onClick={onOpenProfile}
                  className="flex items-center space-x-1 sm:space-x-1.5 px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition text-xs font-semibold"
                  title="My Profile & History"
                >
                  <div className="bg-red-600 text-white rounded-full h-4.5 w-4.5 sm:h-5 sm:w-5 flex items-center justify-center text-[9px] sm:text-[10px] font-bold">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline max-w-[80px] truncate">{currentUser.name}</span>
                </button>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="p-1.5 sm:px-3.5 sm:py-1.5 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold rounded-full transition flex items-center space-x-1 shadow-sm"
                  title="Log In"
                >
                  <User className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                  <span className="hidden sm:inline">Log In</span>
                </button>
              )}

              <button
                onClick={() => setActiveDropdown(activeDropdown === 'profile' ? null : 'profile')}
                className={`p-1.5 sm:p-2 rounded-full hover:bg-gray-50 text-gray-700 transition hidden sm:flex items-center justify-center ${
                  activeDropdown === 'profile' ? 'bg-gray-50 text-red-600' : ''
                }`}
                title="Menu & Support"
              >
                <HelpCircle className="h-5 w-5" />
              </button>
            </div>



            {/* Mobile Hamburger menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-gray-800 hover:bg-gray-100 rounded-lg lg:hidden"
              aria-label="Toggle mobile menu"
            >
              <Menu className="h-5.5 w-5.5 sm:h-6 sm:w-6" />
            </button>

          </div>

        </div>

        {/* 3. MEGA DROPDOWNS OVERLAY INTERFACE (Mobile and Desktop Responsive) */}
        <AnimatePresence>
          {activeDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.18 }}
              className="absolute left-0 right-0 w-full bg-white border-b border-gray-200 shadow-xl z-50 overflow-hidden max-h-[85vh] overflow-y-auto"
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-8 py-6 sm:py-8">
                
                {/* --- BROWSE CAMPUS DESKTOP PANEL --- */}
                {activeDropdown === 'camps' && (
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                      <div className="flex items-center space-x-2 text-red-600">
                        <Sparkle className="h-5 w-5 fill-red-500 animate-spin" style={{ animationDuration: '4s' }} />
                        <h3 className="text-base font-extrabold uppercase tracking-wide">Indore Colleges Premium Campuses</h3>
                      </div>
                      <span className="text-xs text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full font-bold">Verified Infrastructure</span>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div className="border border-red-100 bg-red-50/30 p-4 rounded-xl flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded uppercase font-mono">501-Acre Green Campus</span>
                          <h4 className="font-extrabold text-sm text-gray-900 mt-2 mb-1">IIT Indore (Simrol Campus)</h4>
                          <p className="text-[11px] text-gray-600 leading-relaxed font-normal mb-2">Sprawling state-of-the-art campus featuring world-class laboratories, specialized research cells, and green student residences.</p>
                        </div>
                        <span className="text-xs font-bold text-red-600 mt-2 block">Admission Mode: JEE Advanced</span>
                      </div>
                      
                      <div className="border border-red-100 bg-red-50/30 p-4 rounded-xl flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded uppercase font-mono">193-Acre Scenic Hillock</span>
                          <h4 className="font-extrabold text-sm text-gray-900 mt-2 mb-1">IIM Indore (Prabandh Shikhar)</h4>
                          <p className="text-[11px] text-gray-600 leading-relaxed font-normal mb-2">Features outstanding sports centers, olympic swimming pools, high-tech lecture theatres, and premium student hostels.</p>
                        </div>
                        <span className="text-xs font-bold text-red-600 mt-2 block">Admission Mode: IPMAT / CAT</span>
                      </div>

                      <div className="border border-red-100 bg-red-50/30 p-4 rounded-xl flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded uppercase font-mono">35-Acre Central-City Hub</span>
                          <h4 className="font-extrabold text-sm text-gray-900 mt-2 mb-1">SGSITS Indore Campus</h4>
                          <p className="text-[11px] text-gray-600 leading-relaxed font-normal mb-2">Historic technological hub located in the heart of Indore. Renowned for rich labs, libraries, and direct Placement support.</p>
                        </div>
                        {campInterestRegistered ? (
                          <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-lg p-2 text-center text-xs font-bold mt-2">
                            Campus Tour Requested! We will call you.
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setCampInterestRegistered(true);
                              setTimeout(() => setCampInterestRegistered(false), 3000);
                            }}
                            className="w-full text-center py-2 bg-red-600 text-white hover:bg-red-500 rounded-lg text-xs font-bold transition mt-2"
                          >
                            Book Free Campus Tour
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* --- BLOGS DROPDOWN PANEL --- */}
                {activeDropdown === 'blogs' && (
                  <div>
                    <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-5 w-5 text-red-600" />
                        <h3 className="text-base font-extrabold text-gray-900 uppercase tracking-wide">Admission Guidance Blogs</h3>
                      </div>
                      <span className="text-xs text-gray-400">Written by Indore academic directors and counselors</span>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      {BLOGS.map((blog) => (
                        <div key={blog.id} className="border border-gray-100 rounded-xl p-4 bg-gray-50/50 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold mb-1.5">
                              <span>{blog.date}</span>
                              <span>{blog.readTime}</span>
                            </div>
                            <h4 className="text-sm font-extrabold text-gray-900 mb-1 leading-snug hover:text-red-600 transition duration-200 cursor-pointer" onClick={() => setActiveBlog(blog)}>
                              {blog.title}
                            </h4>
                            <p className="text-xs text-gray-500 font-normal leading-relaxed line-clamp-3 mb-4">
                              {blog.excerpt}
                            </p>
                          </div>
                          <button
                            onClick={() => setActiveBlog(blog)}
                            className="text-xs font-bold text-red-600 flex items-center gap-1 hover:underline text-left"
                          >
                            <span>Read Full Article</span>
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* --- FAVORITES DROPDOWN PANEL (HEART) --- */}
                {activeDropdown === 'favorites' && (
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                      <div className="flex items-center space-x-2 text-rose-600">
                        <Heart className="h-5 w-5 fill-rose-500" />
                        <h3 className="text-base font-extrabold uppercase tracking-wide">My Saved Favorites ({shortlistedIds.length})</h3>
                      </div>
                      {shortlistedIds.length > 0 && (
                        <button 
                          onClick={() => shortlistedIds.forEach(id => onToggleShortlist(id))}
                          className="text-xs text-gray-400 hover:text-red-600 font-bold flex items-center gap-1"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Clear Saved</span>
                        </button>
                      )}
                    </div>

                    {shortlistedIds.length === 0 ? (
                      <div className="text-center py-10">
                        <Heart className="h-10 w-10 text-gray-200 mx-auto mb-2" />
                        <p className="text-xs font-semibold text-gray-400">Your saved favorites is empty.</p>
                        <p className="text-[11px] text-gray-300 mt-0.5">Click the heart icon on any college or institute listing card to save it here.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-1">
                        {shortlistItems.map((inst) => (
                          <div key={inst.id} className="flex items-center justify-between border border-gray-100 p-3 rounded-xl bg-gray-50/50">
                            <div className="flex items-center space-x-3">
                              <img src={inst.image} alt={inst.name} referrerPolicy="no-referrer" className="w-10 h-10 object-cover rounded-lg" />
                              <div>
                                <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{inst.name}</h4>
                                <p className="text-[10px] text-gray-400">{inst.location}, Indore | {inst.boardOrAffiliation}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1.5">
                              <button
                                onClick={() => handleFilterClick(inst.type, undefined, undefined, undefined, inst.name)}
                                className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                                title="Locate on Map"
                              >
                                <Compass className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => onToggleShortlist(inst.id)}
                                className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                                title="Remove"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* --- ADMISSIONS BASKET PANEL (CART) --- */}
                {activeDropdown === 'cart' && (
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                      <div className="flex items-center space-x-2 text-red-600">
                        <ShoppingCart className="h-5 w-5" />
                        <h3 className="text-base font-extrabold uppercase tracking-wide">Admissions Basket ({cartIds.length})</h3>
                      </div>
                      {cartIds.length > 0 && (
                        <button 
                          onClick={() => cartIds.forEach(id => onToggleCart(id))}
                          className="text-xs text-gray-400 hover:text-red-600 font-bold flex items-center gap-1"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Clear Basket</span>
                        </button>
                      )}
                    </div>

                    {cartIds.length === 0 ? (
                      <div className="text-center py-10">
                        <ShoppingCart className="h-10 w-10 text-gray-200 mx-auto mb-2" />
                        <p className="text-xs font-semibold text-gray-400">Your admissions basket is empty.</p>
                        <p className="text-[11px] text-gray-300 mt-0.5">Click the cart icon on listing cards to group institutes for joint callback applications.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[220px] overflow-y-auto pr-1">
                          {cartItems.map((inst) => (
                            <div key={inst.id} className="flex items-center justify-between border border-gray-100 p-3 rounded-xl bg-gray-50/50">
                              <div className="flex items-center space-x-3">
                                <img src={inst.image} alt={inst.name} referrerPolicy="no-referrer" className="w-10 h-10 object-cover rounded-lg" />
                                <div>
                                  <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{inst.name}</h4>
                                  <p className="text-[10px] text-gray-400">{inst.location} • ₹{(inst.feePerAnnum/100000).toFixed(1)}L/yr</p>
                                </div>
                              </div>
                              <button
                                onClick={() => onToggleCart(inst.id)}
                                className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                                title="Remove"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>

                        <div className="bg-red-50/50 border border-red-100 rounded-xl p-4 flex items-center justify-between">
                          <div>
                            <h4 className="text-xs font-bold text-red-600">Request Callbacks in Bulk</h4>
                            <p className="text-[10px] text-red-600 leading-tight">We will submit an official joint inquiry to all {cartIds.length} selected campuses.</p>
                          </div>
                          <button
                            onClick={() => setIsBulkCallbackOpen(true)}
                            className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-4 py-2 rounded-lg transition shadow-xs"
                          >
                            Submit Joint Inquiry
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* --- USER / SUPPORT DROPDOWN PANEL (PROFILE) --- */}
                {activeDropdown === 'profile' && (
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                      <div className="flex items-center space-x-2 text-gray-800">
                        <User className="h-5 w-5" />
                        <h3 className="text-base font-extrabold uppercase tracking-wide">Menu & Support Desk</h3>
                      </div>
                      <span className="text-xs text-gray-400">Indore Colleges Central Office</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 text-xs font-semibold text-gray-700">
                      <div className="p-3 border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition cursor-pointer" onClick={() => { setActiveTab('about'); setActiveDropdown(null); }}>
                        <h4 className="font-extrabold text-sm text-gray-900 mb-1 flex items-center gap-1">
                          <Info className="h-4 w-4 text-red-600" /> About Us
                        </h4>
                        <p className="text-[11px] text-gray-500 font-normal leading-snug">Our mission, credentials, and track record in Indore education.</p>
                      </div>

                      <div className="p-3 border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition cursor-pointer" onClick={() => { setActiveTab('careers'); setActiveDropdown(null); }}>
                        <h4 className="font-extrabold text-sm text-gray-900 mb-1 flex items-center gap-1">
                          <ShieldCheck className="h-4 w-4 text-emerald-600" /> Careers
                        </h4>
                        <p className="text-[11px] text-gray-500 font-normal leading-snug">Join our network of elite counselors, admission heads, and guides.</p>
                      </div>

                      <div className="p-3 border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition cursor-pointer" onClick={() => { setActiveTab('contact'); setActiveDropdown(null); }}>
                        <h4 className="font-extrabold text-sm text-gray-900 mb-1 flex items-center gap-1">
                          <Mail className="h-4 w-4 text-red-600" /> Contact Us
                        </h4>
                        <p className="text-[11px] text-gray-500 font-normal leading-snug">Call or visit our Vijay Nagar office. Schedule on-site reviews.</p>
                      </div>

                      <div className="p-3 border border-red-100 rounded-xl bg-red-50/40 hover:bg-red-100/40 transition cursor-pointer" onClick={() => { setActiveTab('admin-panel'); setActiveDropdown(null); }}>
                        <h4 className="font-extrabold text-sm text-red-600 mb-1 flex items-center gap-1">
                          <UserCheck className="h-4 w-4 text-red-600" /> Admin Panel
                        </h4>
                        <p className="text-[11px] text-red-500 font-normal leading-snug">Access the master administrative workspace to handle registrations & approvals.</p>
                      </div>

                      <div className="p-3 border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition cursor-pointer" onClick={() => setActiveAboutModal('lang')}>
                        <h4 className="font-extrabold text-sm text-gray-900 mb-1 flex items-center gap-1">
                          <Globe className="h-4 w-4 text-amber-600" /> Language: EN
                        </h4>
                        <p className="text-[11px] text-gray-500 font-normal leading-snug">Change consultation language. Hindi & English supported.</p>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </header>

      {/* 4. MOBILE HAMBURGER DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-xs" onClick={() => setIsMobileMenuOpen(false)} />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="relative ml-auto w-full max-w-xs h-full bg-white shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              {/* Close Button */}
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div className="flex items-center">
                  <Logo />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-200 text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Links List */}
              <div className="flex-1 px-4 py-6 space-y-4 text-xs font-bold text-gray-800">
                
                {/* Home Link */}
                <div className="border-b border-gray-100 pb-3">
                  <button
                    onClick={() => {
                      setActiveTab('home');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex justify-between items-center w-full text-left py-1 text-sm font-bold transition ${
                      activeTab === 'home' ? 'text-red-600' : 'text-gray-900'
                    }`}
                  >
                    <span>Home</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                </div>

                {/* 1. Colleges Link */}
                <div className="border-b border-gray-100 pb-3">
                  <button
                    onClick={() => handleFilterClick('college')}
                    className={`flex justify-between items-center w-full text-left py-1 text-sm font-bold transition ${
                      activeTab === 'explore' && instituteTypeFilter === 'college' ? 'text-red-600' : 'text-gray-900'
                    }`}
                  >
                    <span>Colleges & Universities</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                </div>

                {/* 2. Browse Campus (Direct View Transition) */}
                <div className="border-b border-gray-100 pb-3">
                  <button
                    onClick={() => {
                      setActiveTab('browse-campus');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex justify-between items-center w-full text-left py-1 text-sm font-bold transition ${
                      activeTab === 'browse-campus' ? 'text-red-600' : 'text-gray-900'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 font-extrabold text-red-600 animate-pulse">
                      <span className="h-2 w-2 rounded-full bg-red-600" />
                      Browse Campus
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                </div>

                {/* Direct Apply trigger */}
                <button
                  onClick={() => {
                    setActiveTab('register');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block text-left py-1 text-sm w-full border-b border-gray-100 pb-3 text-gray-900"
                >
                  Direct Apply
                </button>

                {/* Blogs trigger */}
                <button
                  onClick={() => {
                    setActiveTab('blogs');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block text-left py-1 text-sm w-full border-b border-gray-100 pb-3 transition ${
                    activeTab === 'blogs' ? 'text-red-600 font-extrabold' : 'text-gray-900'
                  }`}
                >
                  Blogs
                </button>

                {/* College Portal trigger */}
                <button
                  onClick={() => {
                    setActiveTab('college-portal');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block text-left py-1 text-sm w-full border-b border-gray-100 pb-3 transition ${
                    activeTab === 'college-portal' ? 'text-red-600 font-extrabold' : 'text-gray-900'
                  }`}
                >
                  College Portal
                </button>

                {/* About Us trigger */}
                <button
                  onClick={() => {
                    setActiveTab('about');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block text-left py-1 text-sm w-full border-b border-gray-100 pb-3 transition ${
                    activeTab === 'about' ? 'text-red-600 font-extrabold' : 'text-gray-900'
                  }`}
                >
                  About Us
                </button>

                {/* Careers trigger */}
                <button
                  onClick={() => {
                    setActiveTab('careers');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block text-left py-1 text-sm w-full border-b border-gray-100 pb-3 transition ${
                    activeTab === 'careers' ? 'text-red-600 font-extrabold' : 'text-gray-900'
                  }`}
                >
                  Careers
                </button>

                {/* Contact Us trigger */}
                <button
                  onClick={() => {
                    setActiveTab('contact');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block text-left py-1 text-sm w-full border-b border-gray-100 pb-3 transition ${
                    activeTab === 'contact' ? 'text-red-600 font-extrabold' : 'text-gray-900'
                  }`}
                >
                  Contact Us
                </button>



              </div>

              {/* Mobile Footer/Utility panel */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 space-y-3">
                <a href="tel:+919644710007" className="flex items-center space-x-2 text-xs font-bold text-gray-700 bg-white p-3 rounded-xl border border-gray-100 shadow-3xs hover:bg-gray-50">
                  <Phone className="h-4 w-4 text-red-600" />
                  <span>Call us: +91 96447 10007</span>
                </a>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- 5. COMPREHENSIVE SCHOOL COMPARISON DASHBOARD MODAL --- */}
      <AnimatePresence>
        {isCompareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-950/60 backdrop-blur-xs" onClick={() => setIsCompareModalOpen(false)} />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-100 z-10 max-h-[90vh] flex flex-col"
            >
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 rounded-full p-1.5 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center space-x-2 text-red-600 mb-6 border-b border-gray-100 pb-3">
                <Award className="h-6 w-6" />
                <div>
                  <h3 className="text-base font-extrabold uppercase tracking-wide text-gray-900">Indore Academic Comparison Board</h3>
                  <p className="text-[11px] text-gray-500 font-normal">Side-by-side assessment of your shortlisted institutions</p>
                </div>
              </div>

              {cartIds.length < 2 ? (
                <div className="text-center py-16 flex-1 flex flex-col justify-center items-center">
                  <div className="h-16 w-16 bg-red-50 border border-red-100 rounded-full flex items-center justify-center text-red-600 mb-4 animate-bounce">
                    <CheckSquare className="h-8 w-8" />
                  </div>
                  <h4 className="text-sm font-extrabold text-gray-900">Add Institutes to Compare</h4>
                  <p className="text-xs text-gray-400 mt-1 max-w-md mx-auto leading-relaxed">
                    You currently have <span className="text-red-600 font-bold">{cartIds.length}</span> items in your Admissions Basket. Click the shopping cart/basket icon on at least 2 colleges or institutes in the listings directory to enable full tabular comparisons!
                  </p>
                  <button
                    onClick={() => {
                      setIsCompareModalOpen(false);
                      handleFilterClick('college');
                    }}
                    className="mt-6 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs px-6 py-3 rounded-xl transition shadow-xs uppercase tracking-wide"
                  >
                    Browse Directory
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto flex-1 pb-4">
                  <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 font-black text-gray-400 uppercase tracking-wider w-1/5 bg-gray-50/50">Feature Card</th>
                        {cartItems.map(inst => (
                          <th key={inst.id} className="py-3 px-4 w-1/4 min-w-[200px] border-l border-gray-100">
                            <div className="flex items-center space-x-3 mb-2">
                              <img src={inst.image} alt={inst.name} referrerPolicy="no-referrer" className="w-12 h-12 object-cover rounded-lg shadow-2xs border border-gray-100" />
                              <div>
                                <h4 className="font-extrabold text-gray-900 line-clamp-2 leading-tight">{inst.name}</h4>
                                <span className="text-[9px] bg-red-50 text-red-600 font-extrabold px-1.5 py-0.2 rounded uppercase tracking-wider">{inst.category}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => onToggleCart(inst.id)}
                              className="text-[10px] text-red-600 hover:text-red-500 font-bold flex items-center gap-1 mt-1"
                            >
                              <Trash2 className="h-3 w-3" /> Remove
                            </button>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 hover:bg-gray-50/30 transition">
                        <td className="py-3 px-4 font-bold text-gray-500 bg-gray-50/50">Location Sector</td>
                        {cartItems.map(inst => (
                          <td key={inst.id} className="py-3 px-4 font-bold text-gray-900 border-l border-gray-100">{inst.location}, Indore</td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50/30 transition">
                        <td className="py-3 px-4 font-bold text-gray-500 bg-gray-50/50">Annual Fees</td>
                        {cartItems.map(inst => (
                          <td key={inst.id} className="py-3 px-4 font-extrabold text-red-600 border-l border-gray-100">
                            ₹{inst.feePerAnnum >= 100000 ? `${(inst.feePerAnnum / 100000).toFixed(2)} Lakh` : `${inst.feePerAnnum.toLocaleString('en-IN')}`}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50/30 transition">
                        <td className="py-3 px-4 font-bold text-gray-500 bg-gray-50/50">Affiliated Board</td>
                        {cartItems.map(inst => (
                          <td key={inst.id} className="py-3 px-4 font-bold text-gray-900 border-l border-gray-100">{inst.boardOrAffiliation}</td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50/30 transition">
                        <td className="py-3 px-4 font-bold text-gray-500 bg-gray-50/50">Rating Score</td>
                        {cartItems.map(inst => (
                          <td key={inst.id} className="py-3 px-4 border-l border-gray-100">
                            <div className="flex items-center space-x-1 font-bold text-amber-500">
                              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                              <span>{inst.rating}</span>
                              <span className="text-gray-400 font-normal">({inst.totalReviews} reviews)</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50/30 transition">
                        <td className="py-3 px-4 font-bold text-gray-500 bg-gray-50/50">Established Year</td>
                        {cartItems.map(inst => (
                          <td key={inst.id} className="py-3 px-4 font-semibold text-gray-600 border-l border-gray-100">Est. {inst.establishedYear} ({new Date().getFullYear() - inst.establishedYear} yrs old)</td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50/30 transition">
                        <td className="py-3 px-4 font-bold text-gray-500 bg-gray-50/50">Campus Facilities</td>
                        {cartItems.map(inst => (
                          <td key={inst.id} className="py-3 px-4 border-l border-gray-100">
                            <div className="flex flex-wrap gap-1">
                              {inst.facilities.map(fac => (
                                <span key={fac} className="text-[9px] bg-gray-100 text-gray-700 font-medium px-1.5 py-0.5 rounded">
                                  {fac}
                                </span>
                              ))}
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-gray-50/30 transition">
                        <td className="py-4 px-4 font-bold text-gray-500 bg-gray-50/50">Direct Callback</td>
                        {cartItems.map(inst => (
                          <td key={inst.id} className="py-4 px-4 border-l border-gray-100">
                            <button
                              onClick={() => {
                                setIsCompareModalOpen(false);
                                // Open counselor sidebar by scrolling
                                handleFilterClick(inst.type, undefined, undefined, undefined, inst.name);
                              }}
                              className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-3 rounded-lg text-center transition block text-[10px]"
                            >
                              Request Admissions Callback
                            </button>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- 6. INDIVIDUAL BLOG READER MODAL --- */}
      <AnimatePresence>
        {activeBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-950/60 backdrop-blur-xs" onClick={() => setActiveBlog(null)} />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-100 z-10 max-h-[85vh] flex flex-col"
            >
              <button
                onClick={() => setActiveBlog(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 rounded-full p-1.5 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center space-x-1.5 text-red-600 text-[10px] font-bold uppercase tracking-widest mb-2">
                <BookOpen className="h-4 w-4" />
                <span>Admissions Advisory Article</span>
              </div>

              <h3 className="text-xl font-extrabold text-gray-950 mb-2 leading-snug">
                {activeBlog.title}
              </h3>

              <div className="flex items-center space-x-3 text-xs text-gray-400 mb-6 pb-4 border-b border-gray-100">
                <span>By Indore Colleges Counselor</span>
                <span>&bull;</span>
                <span>{activeBlog.date}</span>
                <span>&bull;</span>
                <span>{activeBlog.readTime}</span>
              </div>

              <div className="space-y-4 overflow-y-auto flex-1 pr-1 text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                {activeBlog.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center bg-gray-50 -mx-6 -mb-6 p-4">
                <div className="text-[10px] text-gray-400 font-semibold">
                  Still have queries? Speak directly with the author.
                </div>
                <button
                  onClick={() => {
                    setActiveBlog(null);
                    setActiveTab('dashboard');
                  }}
                  className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-xs"
                >
                  Schedule Free Counselor Call
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- 7. BULK ADMISSIONS INQUIRY MODAL --- */}
      <AnimatePresence>
        {isBulkCallbackOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-950/60 backdrop-blur-xs" onClick={() => setIsBulkCallbackOpen(false)} />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-4 sm:p-6 shadow-2xl border border-gray-100 z-10"
            >
              <button
                onClick={() => setIsBulkCallbackOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100 z-20"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              <div className="flex items-center space-x-2 text-red-600 mb-4 border-b border-gray-100 pb-3 pr-8">
                <ShoppingCart className="h-5 w-5 shrink-0" />
                <h3 className="text-sm font-bold uppercase tracking-wide leading-tight">Joint admissions call ticket</h3>
              </div>

              {bulkSuccess ? (
                <div className="text-center py-6 space-y-3">
                  <div className="h-12 w-12 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full flex items-center justify-center mx-auto">
                    <UserCheck className="h-6 w-6" />
                  </div>
                  <h4 className="text-xs font-bold text-gray-900">Bulk admissions request booked!</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed max-w-xs mx-auto">
                    We have successfully compiled your admissions inquiry for all {cartIds.length} selected institutes. An Indore executive counselor will call you back within 2 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBulkCallbackSubmit} className="space-y-4 text-xs text-left">
                  <p className="text-gray-500 leading-relaxed text-[11px]">
                    Schedule a free, coordinated direct call-back callback session for all <span className="text-red-600 font-bold">{cartIds.length} campuses</span> in your basket:
                  </p>

                  <div className="bg-gray-50 rounded-xl p-3 max-h-[100px] overflow-y-auto space-y-1.5 border border-gray-100">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-center space-x-2 text-[10px] text-gray-700 font-semibold">
                        <CheckSquare className="h-3.5 w-3.5 text-red-600" />
                        <span className="line-clamp-1">{item.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Student / Parent Name
                    </label>
                    <input
                      type="text"
                      required
                      value={bulkName}
                      onChange={(e) => setBulkName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 bg-white text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-red-600"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block font-bold text-gray-500 uppercase tracking-wider mb-1">
                      10-Digit Mobile Number
                    </label>
                    <div className="flex rounded-xl overflow-hidden border border-gray-200 focus-within:ring-1 focus-within:ring-red-600 focus-within:border-red-600">
                      <span className="bg-gray-50 border-r border-gray-100 text-gray-500 px-3 flex items-center font-bold">
                        +91
                      </span>
                      <input
                        type="tel"
                        pattern="[0-9]{10}"
                        required
                        value={bulkPhone}
                        onChange={(e) => setBulkPhone(e.target.value)}
                        placeholder="Enter mobile number"
                        className="flex-1 px-3 py-2.5 bg-white text-xs text-gray-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={bulkSubmitting}
                    className="w-full bg-red-600 hover:bg-red-500 text-white rounded-xl py-3 text-xs font-bold transition shadow-sm disabled:opacity-50 uppercase tracking-wide"
                  >
                    {bulkSubmitting ? 'Submitting inquiry...' : 'Inquire for All Campuses'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- 8. UTILITY MENUS (ABOUT, CAREERS, CONTACT, LANG) --- */}
      <AnimatePresence>
        {activeAboutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-950/60 backdrop-blur-xs" onClick={() => setActiveAboutModal(null)} />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 z-10 text-left"
            >
              <button
                onClick={() => setActiveAboutModal(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 rounded-full p-1"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              {activeAboutModal === 'about' && (
                <div className="text-xs">
                  <div className="flex items-center space-x-2 text-red-600 mb-4 pb-2 border-b border-gray-100">
                    <Info className="h-5 w-5" />
                    <h3 className="font-extrabold uppercase tracking-wide">About Indore Colleges</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    Indore Colleges is Central India's leading specialized admissions consulting desk, established in 2018 with a single focused goal: making local college, university, and professional institute selection transparent, verified, and stress-free for Indore families.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    Our database lists over 100 verified institutions across 48 sectors of Indore city. We provide objective, unbiased fee details, facilities reports, and stream outcomes.
                  </p>
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-amber-900 mt-4">
                    <h4 className="font-bold mb-1 flex items-center gap-1"><Compass className="h-3.5 w-3.5" /> Our Guarantee</h4>
                    <p className="text-[11px] leading-snug font-medium">We never accept hidden premium commissions. Every placement advice we provide is strictly based on your budget, score, and location coordinate preferences.</p>
                  </div>
                </div>
              )}

              {activeAboutModal === 'careers' && (
                <div className="text-xs">
                  <div className="flex items-center space-x-2 text-emerald-600 mb-4 pb-2 border-b border-gray-100">
                    <ShieldCheck className="h-5 w-5" />
                    <h3 className="font-extrabold uppercase tracking-wide">Work at Indore Colleges</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    Are you passionate about guiding students towards their ideal career pathways? Indore Colleges is looking for energetic counselors, field researchers, and institute relations managers!
                  </p>
                  <h4 className="font-extrabold text-gray-800 mt-3 mb-1.5 uppercase tracking-wider text-[11px]">Open Positions in Indore:</h4>
                  <ul className="space-y-1.5 font-bold text-gray-700 pl-1 list-disc list-inside">
                    <li>Senior Admissions Counselor (Vijay Nagar Desk)</li>
                    <li>Campus Relations Officer (Field research)</li>
                    <li>Full-stack Developer (Educational search systems)</li>
                  </ul>
                  <p className="text-gray-400 mt-4">Submit your resume directly to: <span className="text-red-600 font-bold hover:underline">careers@indorecolleges.org</span></p>
                </div>
              )}

              {activeAboutModal === 'contact' && (
                <div className="text-xs">
                  <div className="flex items-center space-x-2 text-red-600 mb-4 pb-2 border-b border-gray-100">
                    <Mail className="h-5 w-5" />
                    <h3 className="font-extrabold uppercase tracking-wide">Contact Indore Office</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Get in touch with our Indore administrative desk or visit our local counseling center for private family sessions.
                  </p>
                  <div className="space-y-3 font-semibold text-gray-700">
                    <div className="flex items-start space-x-2">
                      <Compass className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-extrabold text-gray-900">Indore Colleges Headquarters</p>
                        <p className="text-gray-400 font-normal">Plot 124, Sector B, Scheme 54, Vijay Nagar, Indore (M.P.) - 452010</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-emerald-600" />
                      <span>Counseling hotline: <a href="tel:+919644710007" className="hover:underline hover:text-red-600 font-semibold">+91 96447 10007</a></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-purple-600" />
                      <span>Support email: support@indorecolleges.org</span>
                    </div>
                  </div>
                </div>
              )}

              {activeAboutModal === 'lang' && (
                <div className="text-xs">
                  <div className="flex items-center space-x-2 text-amber-600 mb-4 pb-2 border-b border-gray-100">
                    <Globe className="h-5 w-5" />
                    <h3 className="font-extrabold uppercase tracking-wide">Select Support Language</h3>
                  </div>
                  <p className="text-gray-500 leading-relaxed mb-4">
                    Our advisors provide full translation services in three local languages for families' ease:
                  </p>
                  <div className="space-y-2">
                    <button onClick={() => setActiveAboutModal(null)} className="w-full flex justify-between items-center bg-red-50 text-red-600 border border-red-100 font-bold p-3 rounded-xl">
                      <span>English (Default)</span>
                      <CheckSquare className="h-4 w-4" />
                    </button>
                    <button onClick={() => setActiveAboutModal(null)} className="w-full flex justify-between items-center hover:bg-gray-50 border border-gray-200 font-bold p-3 rounded-xl transition text-gray-700">
                      <span>Hindi (हिन्दी)</span>
                      <span className="text-[10px] text-gray-400 font-normal">Available</span>
                    </button>
                    <button onClick={() => setActiveAboutModal(null)} className="w-full flex justify-between items-center hover:bg-gray-50 border border-gray-200 font-bold p-3 rounded-xl transition text-gray-700">
                      <span>Marathi (मराठी)</span>
                      <span className="text-[10px] text-gray-400 font-normal">Available</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

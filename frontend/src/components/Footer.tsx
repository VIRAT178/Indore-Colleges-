/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Logo from './Logo';
import { 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Youtube, 
  MessageCircle, 
  Globe 
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: 'home' | 'explore' | 'register' | 'dashboard' | 'browse-campus' | 'blogs' | 'about' | 'careers' | 'contact') => void;
  setInstituteTypeFilter: (type: 'all' | 'school' | 'college') => void;
  setSelectedCategory: (cat: string) => void;
  setSelectedBoard: (board: string) => void;
  setSelectedLocation: (loc: string) => void;
  setSearchQuery: (query: string) => void;
}

export default function Footer({
  setActiveTab,
  setInstituteTypeFilter,
  setSelectedCategory,
  setSelectedBoard,
  setSelectedLocation,
  setSearchQuery
}: FooterProps) {

  const handleLinkClick = (category: string, board: string = 'All') => {
    setInstituteTypeFilter('college');
    setSelectedCategory(category);
    setSelectedBoard(board);
    setSelectedLocation('All');
    setSearchQuery('');
    setActiveTab('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBoardOnlyClick = (board: string) => {
    setInstituteTypeFilter('college');
    setSelectedCategory('All');
    setSelectedBoard(board);
    setSelectedLocation('All');
    setSearchQuery('');
    setActiveTab('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="edupath_main_footer" className="bg-slate-950 text-gray-200 pt-16 pb-8 font-sans border-t border-red-600/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* TOP SECTION: Logo, description, and Higher Ed directories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-red-600/20">
          
          {/* Column 1: Brand & Contacts */}
          <div className="space-y-5">
            {/* Elegant Logo matching Header Brand style */}
            <div 
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center cursor-pointer select-none group"
            >
              <Logo light />
            </div>

            <p className="text-[12px] text-gray-300 leading-relaxed max-w-sm">
              Indore Colleges is Central India's leading comprehensive college, university, and professional higher education search directory for Indore.
            </p>

            {/* Address & Contact Items with customized color layout */}
            <div className="space-y-3 pt-2 text-[12px] text-gray-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                <span>Plot 124, Sector B, Scheme 54, Vijay Nagar, Indore - 452010</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="h-4.5 w-4.5 text-red-500 shrink-0" />
                <a href="tel:+919644710007" className="hover:text-red-400 hover:underline transition">
                  +91 96447 10007
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Engineering & Tech links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-red-600">
              Engineering & Tech
            </h4>
            <ul className="space-y-3 text-[12px] text-gray-300">
              <li>
                <button onClick={() => handleLinkClick('Engineering')} className="hover:text-red-400 hover:underline transition text-left cursor-pointer">
                  IIT Indore Direct Info
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('Engineering')} className="hover:text-red-400 hover:underline transition text-left cursor-pointer">
                  SGSITS College Profile
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('Engineering')} className="hover:text-red-400 hover:underline transition text-left cursor-pointer">
                  B.Tech Programs in Indore
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('Engineering')} className="hover:text-red-400 hover:underline transition text-left cursor-pointer">
                  Computer Science Majors
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('Engineering')} className="hover:text-red-400 hover:underline transition text-left cursor-pointer">
                  Information Technology Labs
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Management & Commerce links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-red-600">
              Business & MBA
            </h4>
            <ul className="space-y-3 text-[12px] text-gray-300">
              <li>
                <button onClick={() => handleLinkClick('Management')} className="hover:text-red-400 hover:underline transition text-left cursor-pointer">
                  IIM Indore IPM Programs
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('Management')} className="hover:text-red-400 hover:underline transition text-left cursor-pointer">
                  MBA Streams in Indore
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('Management')} className="hover:text-red-400 hover:underline transition text-left cursor-pointer">
                  BBA Colleges in Indore
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('Management')} className="hover:text-red-400 hover:underline transition text-left cursor-pointer">
                  Commerce Institutes
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('Management')} className="hover:text-red-400 hover:underline transition text-left cursor-pointer">
                  Business Administration
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Professional Streams links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-red-600">
              Professional Degrees
            </h4>
            <ul className="space-y-3 text-[12px] text-gray-300">
              <li>
                <button onClick={() => handleLinkClick('Medical')} className="hover:text-red-400 hover:underline transition text-left cursor-pointer">
                  Medical Colleges in Indore
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('Law')} className="hover:text-red-400 hover:underline transition text-left cursor-pointer">
                  Law (LL.B / B.A. LL.B)
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('Design')} className="hover:text-red-400 hover:underline transition text-left cursor-pointer">
                  Design & Fine Arts
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('Digital Marketing')} className="hover:text-red-400 hover:underline transition text-left cursor-pointer">
                  Digital Marketing Certifications
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM MIDDLE SECTION: Social Media and Corporate Office Address */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-10 text-[12px] text-gray-300">
          
          {/* Social Media Links */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Social Media
            </h4>
            <div className="flex flex-wrap gap-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-red-600/30 rounded-lg hover:bg-red-600 hover:border-red-600 text-white transition duration-200" title="Instagram">
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-red-600/30 rounded-lg hover:bg-red-600 hover:border-red-600 text-white transition duration-200" title="Facebook">
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-red-600/30 rounded-lg hover:bg-red-600 hover:border-red-600 text-white transition duration-200" title="X (Twitter)">
                <span className="font-bold text-[11px] leading-none block px-0.5">X</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-red-600/30 rounded-lg hover:bg-red-600 hover:border-red-600 text-white transition duration-200" title="LinkedIn">
                <Linkedin className="h-4.5 w-4.5" />
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-red-600/30 rounded-lg hover:bg-red-600 hover:border-red-600 text-white transition duration-200" title="WhatsApp">
                <MessageCircle className="h-4.5 w-4.5" />
              </a>
              <a href="#" className="p-2 border border-red-600/30 rounded-lg hover:bg-red-600 hover:border-red-600 text-white transition duration-200" title="Blog">
                <Globe className="h-4.5 w-4.5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-red-600/30 rounded-lg hover:bg-red-600 hover:border-red-600 text-white transition duration-200" title="YouTube">
                <Youtube className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Corporate Office Address */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Our Office
            </h4>
            <p className="leading-relaxed text-gray-300">
              Indore Colleges Private Limited, Plot 124, Sector B, Scheme 54, Vijay Nagar, Indore (M.P.) - 452010
            </p>
          </div>

          {/* About us / Quick info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[12px] font-medium text-gray-300">
              <button onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-red-400 hover:underline text-left cursor-pointer">About Us</button>
              <button onClick={() => { setActiveTab('careers'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-red-400 hover:underline text-left cursor-pointer">Careers</button>
              <button onClick={() => { setActiveTab('register'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-red-400 hover:underline text-left cursor-pointer">Direct Apply</button>
              <button onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-red-400 hover:underline text-left cursor-pointer">Contact Us</button>
            </div>
          </div>

        </div>

        {/* BOTTOMMOST REGION: Copyright Bar */}
        <div className="pt-8 mt-4 border-t border-red-600/10 text-center md:text-left flex flex-col md:flex-row items-center justify-between text-[11px] text-gray-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Indore Colleges. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a href="#" className="hover:text-white hover:underline transition">Terms &amp; Conditions</a>
            <span className="text-red-600 hidden md:inline">|</span>
            <a href="#" className="hover:text-white hover:underline transition">Privacy Policy</a>
            <span className="text-red-600 hidden md:inline">|</span>
            <a href="#" className="hover:text-white hover:underline transition">Refund Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

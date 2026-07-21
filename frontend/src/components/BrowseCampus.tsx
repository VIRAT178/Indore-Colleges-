import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Sparkles, 
  PhoneCall, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  GraduationCap, 
  Users, 
  Compass, 
  Calendar, 
  ArrowUpRight,
  BookOpen,
  FileCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Institute } from '../types';

interface BrowseCampusProps {
  institutes: Institute[];
  onOpenCounseling: (inst: Institute) => void;
  setActiveTab: (tab: 'home' | 'explore' | 'register' | 'dashboard' | 'browse-campus') => void;
}

export default function BrowseCampus({ institutes, onOpenCounseling, setActiveTab }: BrowseCampusProps) {
  // Filter States inside Browse Campus page
  const [selectedCampusType, setSelectedCampusType] = useState<'all' | 'residential' | 'day'>('all');
  const [selectedArea, setSelectedArea] = useState<string>('All');
  
  // Callback Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    stream: 'Engineering',
    query: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Areas with counts & background illustrations/images
  const INDORE_AREAS = [
    { 
      name: 'Simrol', 
      count: institutes.filter(i => i.location === 'Simrol').length || 3, 
      img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80',
      tag: 'Premium IIT Hub'
    },
    { 
      name: 'Vijay Nagar', 
      count: institutes.filter(i => i.location === 'Vijay Nagar').length || 5, 
      img: '/pimr.jpg',
      tag: 'Commercial & Tech Hub'
    },
    { 
      name: 'Bhawarkua', 
      count: institutes.filter(i => i.location === 'Bhawarkua').length || 6, 
      img: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=400&q=80',
      tag: 'Students Central Corridor'
    },
    { 
      name: 'Palasia', 
      count: institutes.filter(i => i.location === 'Palasia').length || 4, 
      img: '/patel-college.jpg',
      tag: 'Elite Coaching Belt'
    },
    { 
      name: 'Limbodi', 
      count: institutes.filter(i => i.location === 'Limbodi').length || 3, 
      img: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=400&q=80',
      tag: 'Technical Expansion'
    },
    { 
      name: 'Rau', 
      count: institutes.filter(i => i.location === 'Rau').length || 4, 
      img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=400&q=80',
      tag: 'Engineering Belt'
    }
  ];

  // Logic to separate or mock residential vs day campuses based on data.
  // Note: IIT Indore & IIM Indore can act as residential.
  const filteredList = institutes.filter(inst => {
    // Area filter
    if (selectedArea !== 'All' && inst.location !== selectedArea) return false;

    // Campus type filter
    if (selectedCampusType === 'residential') {
      // Colleges with higher fees or known to be residential (IIT, IIM, or Patel, Daly, IPS)
      return inst.name.includes('IIT') || inst.name.includes('IIM') || inst.name.includes('Daly') || inst.feePerAnnum > 150000;
    }
    if (selectedCampusType === 'day') {
      return !inst.name.includes('IIT') && !inst.name.includes('IIM') && inst.feePerAnnum <= 150000;
    }
    return true;
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;

    setSubmitting(true);
    try {
      // Send a counseling request directly to Express API
      const response = await fetch('/api/counseling', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parentName: formData.name,
          studentName: formData.name,
          studentClassOrDegree: formData.stream,
          phone: formData.phone,
          email: formData.email,
          preferredSlot: 'Morning (9 AM - 12 PM)',
          date: new Date().toISOString().split('T')[0],
          query: `Browse Campus Form inquiry: ${formData.query}`
        })
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          stream: 'Engineering',
          query: ''
        });
      }
    } catch (err) {
      console.error('Error submitting campus counseling ticket:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* 1. HERO HEADER AREA (Styled like the premium pink/peach header in the video) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-500/5 via-rose-500/5 to-amber-500/5 py-16 sm:py-20 border-b border-rose-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center space-x-1 text-[11px] text-red-600 bg-red-100 font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-6">
            <Sparkles className="h-3.5 w-3.5 text-red-600 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Discover Premium Campuses</span>
          </span>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-4">
            Find best college & institute <br className="hidden sm:inline" />
            campuses with <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-500">Indore Colleges!</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
            Discover verified premium campuses, residential colleges, academic blocks, and world-class laboratory infrastructure in Indore. Get 100% free personalized guidance.
          </p>

          {/* Dual Main Core Category Selectors (Exactly modeled on "Residential Camp" & "Day Camp" from the video) */}
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            
            {/* Category Card 1: Residential Campus */}
            <button 
              onClick={() => {
                setSelectedCampusType('residential');
                setSelectedArea('All');
                // Smooth scroll to list
                document.getElementById('campus-directories')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`group text-left relative overflow-hidden rounded-3xl border-2 p-6 transition-all duration-300 flex flex-col md:flex-row items-center gap-5 bg-white ${
                selectedCampusType === 'residential' 
                  ? 'border-red-500 shadow-lg ring-1 ring-red-500' 
                  : 'border-gray-100 hover:border-red-200 hover:shadow-md'
              }`}
            >
              <div className="w-full md:w-32 aspect-video md:aspect-square rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                <img 
                  src="/bm-college.jpg" 
                  alt="Residential Campus"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <span className="text-[9px] font-extrabold bg-red-100 text-red-600 px-2 py-0.5 rounded uppercase tracking-wider">
                  Self-Contained
                </span>
                <h3 className="text-base font-black text-gray-900 mt-2 mb-1 group-hover:text-red-600 transition">
                  Residential Campus
                </h3>
                <p className="text-[11px] text-gray-500 leading-normal font-light">
                  Sprawling educational cities featuring premium in-house hostels, sports complexes, and lush green study circles.
                </p>
              </div>
            </button>

            {/* Category Card 2: Day City Campus */}
            <button 
              onClick={() => {
                setSelectedCampusType('day');
                setSelectedArea('All');
                // Smooth scroll to list
                document.getElementById('campus-directories')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`group text-left relative overflow-hidden rounded-3xl border-2 p-6 transition-all duration-300 flex flex-col md:flex-row items-center gap-5 bg-white ${
                selectedCampusType === 'day' 
                  ? 'border-red-500 shadow-lg ring-1 ring-red-500' 
                  : 'border-gray-100 hover:border-red-200 hover:shadow-md'
              }`}
            >
              <div className="w-full md:w-32 aspect-video md:aspect-square rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=400&q=80" 
                  alt="Day Campus"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <span className="text-[9px] font-extrabold bg-red-100 text-red-600 px-2 py-0.5 rounded uppercase tracking-wider">
                  Urban / central Hub
                </span>
                <h3 className="text-base font-black text-gray-900 mt-2 mb-1 group-hover:text-red-600 transition">
                  Day City Campus
                </h3>
                <p className="text-[11px] text-gray-500 leading-normal font-light">
                  Centrally located hi-tech environments offering direct transit connections, rich computer labs, and active corporate drives.
                </p>
              </div>
            </button>

          </div>
        </div>
      </section>

      {/* 2. EXPLORE CAMPUSES BY AREA (Exactly styled like "Explore Camps by City" from the video) */}
      <section className="py-16 bg-gray-50/50 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Explore Premium Campuses by <span className="text-red-600">Area</span>
            </h2>
            <p className="text-xs text-gray-400 mt-1">Choose an educational sector inside Indore to inspect hand-verified campus options</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {INDORE_AREAS.map((area) => (
              <button
                key={area.name}
                onClick={() => {
                  setSelectedArea(selectedArea === area.name ? 'All' : area.name);
                  document.getElementById('campus-directories')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group relative h-40 rounded-2xl overflow-hidden text-left border transition-all duration-300 ${
                  selectedArea === area.name 
                    ? 'border-red-600 ring-2 ring-red-600 shadow-md' 
                    : 'border-transparent hover:shadow-md'
                }`}
              >
                <img 
                  src={area.img} 
                  alt={area.name} 
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10 transition-opacity" />
                
                <div className="absolute inset-x-3 bottom-3 text-white flex flex-col justify-end">
                  <span className="text-[8px] uppercase tracking-wider text-red-300 font-extrabold mb-1">{area.tag}</span>
                  <h3 className="font-bold text-xs sm:text-sm">{area.name}</h3>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-gray-300">
                    <span>{area.count} premium options</span>
                    <span className="p-1 rounded-full bg-white/10 group-hover:bg-white/20 transition">
                      <ArrowUpRight className="h-3 w-3 text-white" />
                    </span>
                  </div>
                </div>

                {area.count > 4 && (
                  <span className="absolute top-2.5 right-2.5 text-[8px] bg-red-600 text-white px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                    Popular
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DIRECTORY CAMPUS LISTINGS */}
      <section id="campus-directories" className="py-16 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-100 pb-5 mb-8 gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-red-600" />
                <span>
                  Showing {filteredList.length} Premium {selectedCampusType !== 'all' ? `${selectedCampusType} ` : ''}Campuses 
                  {selectedArea !== 'All' ? ` in ${selectedArea}` : ''}
                </span>
              </h2>
              <p className="text-xs text-gray-400 mt-1">Direct tie-ups and fast callbacks enabled for below listings</p>
            </div>
            
            {/* Filter controls inside panel */}
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => { setSelectedCampusType('all'); setSelectedArea('All'); }}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition ${
                  selectedCampusType === 'all' && selectedArea === 'All'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Reset All Filters
              </button>
            </div>
          </div>

          {filteredList.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
              <Compass className="h-12 w-12 text-gray-300 mx-auto mb-4 animate-spin" style={{ animationDuration: '8s' }} />
              <p className="text-gray-500 font-bold">No campuses match the active selection filter.</p>
              <p className="text-xs text-gray-400 mt-1">Try resetting the location or selecting 'All' campus types.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredList.map((inst, index) => (
                <div 
                  key={inst.id}
                  className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-16/10 bg-gray-100">
                    <img src={inst.image} alt={inst.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    
                    {/* Badge */}
                    <span className="absolute top-3.5 left-3.5 bg-gray-950/80 text-white text-[9px] font-extrabold tracking-widest px-2.5 py-1 rounded-full uppercase">
                      {inst.category}
                    </span>

                    <span className="absolute top-3.5 right-3.5 bg-red-600 text-white text-[9px] font-extrabold tracking-widest px-2.5 py-1 rounded-full uppercase">
                      RANKED #{index + 1}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-1 text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1.5">
                        <MapPin className="h-3 w-3 text-red-600" />
                        <span>{inst.location}, Indore</span>
                        <span>&bull;</span>
                        <span>ESTD. {inst.establishedYear}</span>
                      </div>

                      <h3 className="font-extrabold text-sm text-gray-950 mb-2 leading-snug hover:text-red-600 transition">
                        {inst.name}
                      </h3>

                      <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2 mb-4 font-normal">
                        {inst.description}
                      </p>

                      {/* Info grid */}
                      <div className="grid grid-cols-2 gap-3 border-t border-b border-gray-100 py-3 mb-4 text-[10px]">
                        <div>
                          <p className="text-gray-400 uppercase tracking-widest">Est. Annual Fee</p>
                          <p className="font-bold text-gray-900 mt-0.5">₹ {inst.feePerAnnum.toLocaleString('en-IN')} / year</p>
                        </div>
                        <div>
                          <p className="text-gray-400 uppercase tracking-widest">Affiliation</p>
                          <p className="font-bold text-gray-900 mt-0.5">{inst.boardOrAffiliation}</p>
                        </div>
                      </div>

                      {/* Facilities list */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {inst.facilities.slice(0, 3).map((fac) => (
                          <span key={fac} className="bg-gray-50 text-gray-500 text-[9px] px-2 py-0.5 rounded font-medium">
                            {fac}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <button 
                        onClick={() => onOpenCounseling(inst)}
                        className="flex-1 text-center py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition"
                      >
                        Request Direct Call
                      </button>
                      <button 
                        onClick={() => {
                          // Let's scroll up and auto-fill the stream
                          setFormData(prev => ({ ...prev, query: `Interested in campus tour for ${inst.name}` }));
                          document.getElementById('counseling-form-box')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="p-2 border border-red-100 hover:border-red-200 rounded-xl text-red-600 bg-red-50 hover:bg-red-100/50 transition"
                        title="Book Campus Tour"
                      >
                        <Calendar className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. VERIFIED CORE FEATURES & LIVE CALLBACK FORM PANEL (Exactly styled like the lower part in the video) */}
      <section id="counseling-form-box" className="py-16 bg-gray-950 text-white overflow-hidden relative">
        <div className="absolute inset-0 z-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            alt="Campus Architecture Background" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-950/95 to-slate-900 z-0" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Verified Indicators */}
            <div className="lg:col-span-7">
              <span className="text-[10px] font-black text-red-400 uppercase tracking-widest bg-slate-900 border border-red-600/30 px-3 py-1.5 rounded-full">
                100% Quality Standards
              </span>
              <h2 className="text-2xl sm:text-4xl font-black mt-5 mb-8 tracking-tight leading-tight">
                Get a Call Back & <br />
                Verified Campus Admission Tour Ticket!
              </h2>

              <div className="space-y-6">
                
                {/* Point 1 */}
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-red-600/20 border border-red-500/30 rounded-xl text-red-400 mt-1">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Verified Campus Providers</h3>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      All campus layouts and infrastructure lists undergo strict, direct manual inspections by our counselor teams.
                    </p>
                  </div>
                </div>

                {/* Point 2 */}
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-red-600/20 border border-red-500/30 rounded-xl text-red-400 mt-1">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Direct Academic Affiliation</h3>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      We operate in direct collaborative synergy with UGC & AICTE recognized universities in Indore, avoiding middle agents.
                    </p>
                  </div>
                </div>

                {/* Point 3 */}
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-red-600/20 border border-red-500/30 rounded-xl text-red-400 mt-1">
                    <FileCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Transparent Pricing & Seat Matrix</h3>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Zero hidden counseling charges. Parents and student aspirants get the official prospectus and actual seat vacancies.
                    </p>
                  </div>
                </div>

                {/* Point 4 */}
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-red-600/20 border border-red-500/30 rounded-xl text-red-400 mt-1">
                    <PhoneCall className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Instant Call Back & Priority Tour Pass</h3>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Once registered, a certified advisor maps your details and schedules direct institute callbacks within 2 business hours.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Callback Ticket Form (Exactly structured like the video form) */}
            <div className="lg:col-span-5">
              <div className="bg-white text-gray-900 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
                
                {success ? (
                  <div className="text-center py-10">
                    <div className="h-16 w-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-5 animate-bounce">
                      <Check className="h-8 w-8 stroke-[3]" />
                    </div>
                    <h3 className="text-lg font-extrabold text-gray-950">Campus Ticket Generated!</h3>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      We have submitted your stream preference. An official Indore Colleges admissions advisor will call you within 2 hours.
                    </p>
                    <button 
                      onClick={() => setSuccess(false)}
                      className="mt-6 text-xs text-red-600 font-extrabold hover:underline"
                    >
                      Register another stream
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                    <div className="border-b border-gray-100 pb-4 mb-4 text-center sm:text-left">
                      <h3 className="text-base font-black text-gray-950 flex items-center justify-center sm:justify-start gap-1.5">
                        <PhoneCall className="h-4.5 w-4.5 text-red-600" />
                        <span>Get a Call Back</span>
                      </h3>
                      <p className="text-[11px] text-gray-400 mt-1">Enter your details for zero-cost institute guidance</p>
                    </div>

                    {/* Student/Parent Name */}
                    <div>
                      <label className="block font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Student / Parent Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Verma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-gray-200 px-3.5 py-3 bg-gray-50 text-gray-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600"
                      />
                    </div>

                    {/* Mobile number */}
                    <div>
                      <label className="block font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        placeholder="e.g. 9876543210 (10-digit)"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-gray-200 px-3.5 py-3 bg-gray-50 text-gray-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. rahul@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-gray-200 px-3.5 py-3 bg-gray-50 text-gray-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600"
                      />
                    </div>

                    {/* Stream Selection */}
                    <div>
                      <label className="block font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Preferred Stream *
                      </label>
                      <select
                        value={formData.stream}
                        onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                        className="w-full rounded-xl border border-gray-200 px-3.5 py-3 bg-gray-50 text-gray-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600"
                      >
                        <option value="Engineering">Engineering & Tech (B.Tech, M.Tech)</option>
                        <option value="Management">Management (MBA, BBA, IPMAT)</option>
                        <option value="Medical">Medical Sciences (MBBS, BDS, Allied)</option>
                        <option value="Law">Law & Legal Studies (BA LLB, LLM)</option>
                        <option value="Arts & Science">Arts & Pure Sciences (B.Sc, BA)</option>
                      </select>
                    </div>

                    {/* Query Message (Optional) */}
                    <div>
                      <label className="block font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Query / Campus Tour Details (Optional)
                      </label>
                      <textarea
                        value={formData.query}
                        onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                        placeholder="e.g. Interested in Simrol campus tour schedule and transport details."
                        rows={2}
                        className="w-full rounded-xl border border-gray-200 px-3.5 py-3 bg-gray-50 text-gray-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs py-3.5 rounded-xl transition shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <span>Generating Campus Ticket...</span>
                      ) : (
                        <>
                          <span>Send Callback Request</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Institute, Review } from '../types';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Award, 
  IndianRupee, 
  Calendar, 
  Check, 
  Send, 
  Mail, 
  PhoneCall, 
  Heart, 
  ShoppingCart, 
  Building, 
  Clock,
  ShieldCheck,
  Bookmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CollegeDetailPageProps {
  key?: string;
  institute: Institute;
  onBack: () => void;
  onScheduleCounseling: (inst: Institute) => void;
  isShortlisted: boolean;
  onToggleShortlist: () => void;
  isInCart: boolean;
  onToggleCart: () => void;
}

export default function CollegeDetailPage({
  institute,
  onBack,
  onScheduleCounseling,
  isShortlisted,
  onToggleShortlist,
  isInCart,
  onToggleCart
}: CollegeDetailPageProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  
  // Review form states
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    fetchReviews();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [institute.id]);

  const fetchReviews = async () => {
    setLoadingReviews(true);
    try {
      const res = await fetch(`/api/reviews/${institute.id}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewComment) return;

    setSubmittingReview(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instituteId: institute.id,
          authorName: reviewAuthor,
          rating: reviewRating,
          comment: reviewComment
        })
      });

      if (res.ok) {
        setReviewSuccess(true);
        setReviewAuthor('');
        setReviewComment('');
        setReviewRating(5);
        fetchReviews();
        setTimeout(() => setReviewSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Error submitting review:', err);
    } finally {
      setSubmittingReview(false);
    }
  };

  const formatFee = (fee: number) => {
    if (fee >= 100000) {
      return `₹${(fee / 100000).toFixed(2)} Lakh`;
    }
    return `₹${fee.toLocaleString('en-IN')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-50/50 min-h-screen pb-16"
    >
      {/* 2. Hero Section with overlayed Back Button */}
      <div className="relative bg-slate-900 text-white overflow-hidden h-[calc(100vh-80px)] min-h-[500px]">
        <img
          src={institute.image}
          alt={institute.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-40 filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
        
        {/* Back Button Overlay */}
        <div className="absolute top-6 inset-x-0 z-30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <button
              onClick={onBack}
              className="inline-flex items-center space-x-2 text-xs font-bold text-white/90 hover:text-white transition bg-black/35 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/10 hover:bg-black/50 shadow-sm cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Colleges Directory</span>
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-0 inset-x-0 py-8 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="rounded bg-red-600 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
                {institute.category} Stream
              </span>
              <span className="rounded bg-slate-800/80 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-300 border border-slate-700">
                Affiliation: {institute.boardOrAffiliation}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-2">
              {institute.name}
            </h1>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-gray-300">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4 text-red-400 flex-shrink-0" />
                <span>{institute.location}, Indore, Madhya Pradesh</span>
              </div>
              <div className="h-1.5 w-1.5 rounded-full bg-gray-500 hidden sm:block" />
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4 text-red-400 flex-shrink-0" />
                <span>Established in {institute.establishedYear}</span>
              </div>
              <div className="h-1.5 w-1.5 rounded-full bg-gray-500 hidden sm:block" />
              <div className="flex items-center space-x-1 text-amber-400 font-bold">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span>{institute.rating}</span>
                <span className="text-gray-400 font-normal">({institute.totalReviews} verified reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Content Columns */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 lg:grid-cols-12">
          
          {/* LEFT: Detailed Info */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs">
              <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center space-x-2">
                <Building className="h-5 w-5 text-red-600" />
                <span>About the Institution</span>
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {institute.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100 text-xs text-gray-500">
                <div>
                  <span className="block font-bold text-gray-700 mb-0.5">Campus Location</span>
                  <span className="text-gray-600">{institute.location}, Indore</span>
                </div>
                <div>
                  <span className="block font-bold text-gray-700 mb-0.5">Ownership / Board Type</span>
                  <span className="text-gray-600">{institute.boardOrAffiliation} Board / Association</span>
                </div>
                <div>
                  <span className="block font-bold text-gray-700 mb-0.5">Founding Year</span>
                  <span className="text-gray-600">{institute.establishedYear} ({new Date().getFullYear() - institute.establishedYear} Years of Excellence)</span>
                </div>
                <div>
                  <span className="block font-bold text-gray-700 mb-0.5">Accreditation</span>
                  <span className="text-gray-600 inline-flex items-center text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mt-0.5">
                    <ShieldCheck className="h-3 w-3 mr-0.5" />
                    Indore Colleges Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs">
              <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center space-x-2">
                <Check className="h-5 w-5 text-red-600" />
                <span>Campus Facilities & Amenities</span>
              </h2>
              <p className="text-gray-500 text-xs mb-6">
                Premium infrastructural features available on-site for registered and enrolled students.
              </p>
              
              <div className="grid gap-3 sm:grid-cols-2">
                {institute.facilities.map((fac, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 p-3 rounded-xl bg-red-50/40 border border-red-100/50"
                  >
                    <div className="h-6 w-6 rounded-lg bg-red-500/10 flex items-center justify-center text-red-600">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-gray-800">{fac}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: CTAs & Institutional Card */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Fact sheet card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-6">
              <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-50 pb-2">
                Admission Summary
              </h3>

              {/* Fee Fact */}
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Annual Tuition Fee</span>
                <div className="flex items-center font-extrabold text-gray-900 text-xl">
                  <IndianRupee className="h-5 w-5 text-gray-800 mr-0.5" />
                  <span>{formatFee(institute.feePerAnnum)}</span>
                  <span className="text-xs text-gray-400 font-semibold ml-1">/ year</span>
                </div>
              </div>

              {/* Affiliation Fact */}
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Affiliated Board / Body</span>
                <div className="flex items-center space-x-1.5 text-xs font-bold text-gray-800">
                  <Award className="h-4 w-4 text-red-600" />
                  <span>{institute.boardOrAffiliation} Approved</span>
                </div>
              </div>

              {/* Location Fact */}
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Location Coordinates</span>
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-gray-700">
                  <MapPin className="h-4 w-4 text-red-600" />
                  <span>{institute.location}, Indore (MP)</span>
                </div>
              </div>

              {/* Official Contacts */}
              <div className="pt-4 border-t border-gray-100 space-y-2.5 text-xs">
                <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Helpdesk Contacts</span>
                
                {institute.contactEmail ? (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="font-medium select-all">{institute.contactEmail}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">contact@indorecolleges.org</span>
                  </div>
                )}

                {institute.contactPhone ? (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <PhoneCall className="h-4 w-4 text-gray-400" />
                    <span className="font-medium select-all">{institute.contactPhone}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <PhoneCall className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">+91 9554791868</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-2.5">
                <button
                  onClick={() => onScheduleCounseling(institute)}
                  className="w-full bg-[#EF4444] hover:bg-red-600 text-white font-bold text-xs py-3 rounded-xl transition flex items-center justify-center space-x-1.5 shadow-xs"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Open Counseling Form</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={onToggleShortlist}
                    className={`w-full py-2.5 border rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 cursor-pointer ${
                      isShortlisted
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Heart className="h-3.5 w-3.5" />
                    <span>{isShortlisted ? 'Liked' : 'Like'}</span>
                  </button>

                  <button
                    onClick={onToggleCart}
                    className={`w-full py-2.5 border rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 cursor-pointer ${
                      isInCart
                        ? 'bg-red-50 border-red-200 text-red-600'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    <span>{isInCart ? 'In Basket' : 'Basket'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Note info panel */}
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 text-xs text-amber-900/80 leading-relaxed font-medium">
              <p className="font-bold mb-1 flex items-center gap-1 text-amber-900">
                <Clock className="h-3.5 w-3.5" />
                Admission Guidelines
              </p>
              Please prepare digital scans of your Class 10/12 Marksheets, Entrance Scorecard (JEE, CAT, IPMAT etc.), and domicile documents before initiating counseling with the registrar.
            </div>

          </div>

        </div>

        {/* Full-width Sections (From Key Updates & Announcements onwards) */}
        <div className="space-y-8 mt-12">
          {/* Key Updates & Announcements (Optional) */}
          {institute.updates && institute.updates.length > 0 && (
            <div className="bg-[#EF4444]/5 border border-red-100 rounded-2xl p-6 sm:p-8 shadow-3xs relative overflow-hidden">
              <div className="absolute top-0 right-0 h-24 w-24 bg-[#EF4444]/5 rounded-full filter blur-xl translate-x-4 -translate-y-4" />
              <h3 className="text-sm font-black text-[#EF4444] mb-3.5 flex items-center space-x-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-[#EF4444] animate-pulse" />
                <span>Key Updates & Latest Announcements</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700 font-medium">
                {institute.updates.map((upd, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5">
                    <span className="text-[#EF4444] font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{upd}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Courses & Program Fees (Optional) */}
          {institute.coursesList && institute.coursesList.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-1 flex items-center space-x-2">
                  <Building className="h-5 w-5 text-red-600 animate-pulse" />
                  <span>Academic Courses & Fee Structure</span>
                </h2>
                <p className="text-gray-500 text-xs">
                  Detailed view of professional degrees, certificate programs, and annual course fees.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {institute.coursesList.map((course, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-xl p-5 hover:border-red-100 hover:bg-red-50/10 transition duration-200 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <div>
                        <h4 className="font-extrabold text-gray-900 text-sm sm:text-base">{course.name}</h4>
                        <p className="text-[11px] sm:text-xs text-gray-400 font-bold mt-1">{course.duration} (Full-Time Course)</p>
                      </div>
                      <span className="text-xs sm:text-sm font-black text-emerald-600 bg-emerald-50 border border-emerald-100/50 px-3 py-1 rounded-lg shrink-0">
                        {course.fees}
                      </span>
                    </div>
                    {course.specializations && course.specializations.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {course.specializations.map((spec, sidx) => (
                          <span key={sidx} className="text-[10px] font-bold text-gray-600 bg-gray-50 border border-gray-200/50 px-2.5 py-0.5 rounded-md">
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cutoffs & Entrance Requirements (Optional) */}
          {institute.cutoffs && institute.cutoffs.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs">
              <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-2 flex items-center space-x-2">
                <Bookmark className="h-5 w-5 text-red-600" />
                <span>Admission Cutoff Thresholds</span>
              </h2>
              <p className="text-gray-500 text-xs mb-5">
                General Category cutoff thresholds and closing ranks for the most competitive streams.
              </p>
              <div className="overflow-hidden border border-gray-100 rounded-xl">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-400 font-extrabold uppercase text-[10px] tracking-wider border-b border-gray-100">
                      <th className="p-4">Specialization / Course Name</th>
                      <th className="p-4 text-right">Closing Cutoff Rank</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {institute.cutoffs.map((co, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition duration-150">
                        <td className="p-4 font-bold text-gray-800">{co.course}</td>
                        <td className="p-4 text-right font-black text-[#EF4444] bg-red-50/10">{co.rank}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Placement Records (Optional) */}
          {institute.placements && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-1 flex items-center space-x-2">
                  <ShieldCheck className="h-5 w-5 text-red-600" />
                  <span>Career & Placement Records</span>
                </h2>
                <p className="text-gray-500 text-xs">
                  A look at salary statistics and prominent recruiting partners.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-emerald-50/30 rounded-xl p-5 border border-emerald-100/40 text-center">
                  <span className="block text-[10px] font-black text-emerald-600 uppercase tracking-wider">Highest Salary Package</span>
                  <span className="block text-lg sm:text-2xl font-black text-emerald-700 mt-1">{institute.placements.highest}</span>
                </div>
                <div className="bg-red-50/30 rounded-xl p-5 border border-red-100/40 text-center">
                  <span className="block text-[10px] font-black text-red-600 uppercase tracking-wider">Average Salary Package</span>
                  <span className="block text-lg sm:text-2xl font-black text-red-600 mt-1">{institute.placements.average}</span>
                </div>
                {institute.placements.lowest && (
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 text-center col-span-2 sm:col-span-1">
                    <span className="block text-[10px] font-black text-gray-500 uppercase tracking-wider">Lowest / Median</span>
                    <span className="block text-lg sm:text-2xl font-black text-gray-700 mt-1">{institute.placements.lowest}</span>
                  </div>
                )}
              </div>
              <div>
                <span className="block text-[10px] font-black text-gray-400 uppercase mb-3 tracking-wider">Prominent Partner Recruiters</span>
                <div className="flex flex-wrap gap-2.5">
                  {institute.placements.recruiters.map((rec, idx) => (
                    <span key={idx} className="text-xs font-bold text-gray-700 bg-gray-50 border border-gray-100 px-3.5 py-2 rounded-xl hover:bg-gray-100 transition">
                      {rec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Scholarships & Financial Support (Optional) */}
          {institute.scholarships && institute.scholarships.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-5">
              <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-1 flex items-center space-x-2">
                <Award className="h-5 w-5 text-red-600" />
                <span>Scholarships & Financial Aid Schemes</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {institute.scholarships.map((sch, idx) => (
                  <div key={idx} className="bg-amber-50/20 border border-amber-100/50 rounded-xl p-5 flex flex-col justify-between">
                    <div>
                      <h4 className="font-extrabold text-amber-950 text-sm sm:text-base">{sch.name}</h4>
                      {sch.criteria && (
                        <p className="text-xs sm:text-sm text-amber-900/80 mt-1.5 leading-relaxed">
                          <span className="font-bold text-amber-950/90">Eligibility:</span> {sch.criteria}
                        </p>
                      )}
                    </div>
                    {sch.benefits && (
                      <div className="text-[11px] sm:text-xs font-black text-amber-900 mt-3 bg-amber-50 px-2.5 py-1 rounded-md">
                        Benefits: {sch.benefits}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Core Faculty List (Optional) */}
          {institute.facultyList && institute.facultyList.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-5">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-1 flex items-center space-x-2">
                  <Building className="h-5 w-5 text-red-600" />
                  <span>Distinguished Faculty & Leadership</span>
                </h2>
                <p className="text-gray-500 text-xs">
                  Academic advisors and professors leading departments at the institution.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {institute.facultyList.map((fac, idx) => (
                  <div key={idx} className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 flex items-start space-x-3.5 hover:bg-gray-50 transition duration-150">
                    <div className="h-9 w-9 rounded-lg bg-red-500/10 flex items-center justify-center text-red-600 font-extrabold text-xs shrink-0">
                      {fac.name.replace('Dr. ', '').replace('Prof. ', '').split(' ').filter(n => n.length > 0).map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gray-800 text-xs sm:text-sm leading-tight">{fac.name}</h4>
                      <p className="text-[10px] sm:text-xs text-gray-400 font-semibold mt-1">{fac.qualification}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Block */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-8">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-2 flex items-center space-x-2">
                <Star className="h-5 w-5 text-red-600 animate-pulse" />
                <span>Verified User Reviews</span>
              </h2>
              <p className="text-gray-500 text-xs">
                Read genuine feedback from students and parents regarding placements, hostel quality, and academics.
              </p>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {loadingReviews ? (
                <div className="py-6 text-center text-gray-400 italic text-xs">
                  Loading verified comments...
                </div>
              ) : reviews.length === 0 ? (
                <div className="py-8 text-center text-gray-400 border border-dashed border-gray-200 rounded-xl text-xs">
                  No verified reviews found for {institute.name} yet. Be the first to share your experience!
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="bg-gray-50/50 p-5 rounded-xl border border-gray-100 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2.5">
                          <span className="font-bold text-gray-800 text-xs sm:text-sm">{rev.authorName}</span>
                          <div className="flex items-center text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3.5 w-3.5 ${
                                  i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{rev.comment}</p>
                      </div>
                      <div className="text-[10px] text-gray-400 mt-4 text-right">
                        Verified Reviewer
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add Review Form */}
            <form onSubmit={handleAddReview} className="border-t border-gray-100 pt-6 space-y-4">
              <h3 className="text-sm font-bold text-gray-800">Submit Your Institutional Experience</h3>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Your Full Name</label>
                  <input
                    type="text"
                    value={reviewAuthor}
                    onChange={(e) => setReviewAuthor(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 bg-white text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-red-600"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Overall Star Rating</label>
                  <div className="flex items-center space-x-1.5 h-10">
                    {[1, 2, 3, 4, 5].map((stars) => (
                      <button
                        type="button"
                        key={stars}
                        onClick={() => setReviewRating(stars)}
                        className="text-amber-400 hover:scale-110 transition cursor-pointer"
                      >
                        <Star
                          className={`h-5 w-5 ${
                            stars <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Detailed Review Comment</label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Describe placement stats, faculty support, campus facilities, or admission counseling quality..."
                  rows={4}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 bg-white text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-red-600"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="bg-[#EF4444] hover:bg-red-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-xs flex items-center space-x-1.5 disabled:opacity-50"
                >
                  <span>Submit Review</span>
                  <Send className="h-3 w-3" />
                </button>

                {reviewSuccess && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-emerald-600 font-bold text-xs"
                  >
                    Review submitted successfully! Refreshing list...
                  </motion.p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

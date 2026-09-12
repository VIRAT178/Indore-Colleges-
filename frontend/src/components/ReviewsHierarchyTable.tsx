import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  Users, 
  Play, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  ArrowLeft, 
  Award, 
  TrendingUp, 
  Layers, 
  Bell, 
  Check, 
  Video, 
  Film,
  Building,
  Info,
  X,
  CheckCircle2,
  ChevronDown,
  Search,
  Volume2,
  VolumeX,
  Pause,
  Share2,
  Calendar,
  ThumbsUp,
  Flame,
  HelpCircle,
  Camera,
  Code,
  Coffee,
  FileCheck,
  Briefcase,
  MapPin,
  MessageSquare,
  Youtube,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type CategoryType = 
  | 'Engineering College'
  | 'UG Colleges'
  | 'Pharmacy Colleges'
  | 'MBA Colleges'
  | 'MCA Colleges';

export type ReviewPerspectiveType = 
  | 'Review by Indore Colleges'
  | 'Review by Actual Students'
  | 'Review by College Authority';

export interface VideoCardData {
  id: string;
  collegeName: string;
  location: string;
  type: 'Govt / Autonomous' | 'Private University' | 'Autonomous Institute';
  title: string;
  duration: string;
  thumbnail: string;
  perspectiveType: ReviewPerspectiveType;
  category: CategoryType;
  description: string;
  tags: string[];
  projectedReleaseDate: string;
  quality: string;
  productionProgress: number;
  votesCount: number;
}

interface CategoryConfig {
  id: CategoryType;
  title: string;
  shortName: string;
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
  accentBadge: string;
  countColleges: string;
  courses: string[];
  description: string;
  topInstitutes: string[];
}

export const CATEGORIES_LIST: CategoryConfig[] = [
  {
    id: 'Engineering College',
    title: 'Engineering College',
    shortName: 'Engineering',
    icon: GraduationCap,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    accentBadge: 'bg-blue-100 text-blue-800',
    countColleges: '32+ Verified Colleges',
    courses: ['B.Tech', 'M.Tech', 'Diploma'],
    description: 'B.Tech & M.Tech colleges evaluated on physical laboratories, AICTE approvals, Super Corridor placements, and coding culture.',
    topInstitutes: ['SGSITS Indore', 'IIT Indore', 'IET DAVV', 'Acropolis (AITR)', 'Medi-Caps University', 'Chameli Devi (CDGI)']
  },
  {
    id: 'UG Colleges',
    title: 'UG Colleges',
    shortName: 'UG / Arts & Commerce',
    icon: Building2,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    accentBadge: 'bg-purple-100 text-purple-800',
    countColleges: '45+ Verified Colleges',
    courses: ['BBA', 'BCA', 'B.Com', 'B.Sc', 'BA'],
    description: 'B.Com, BBA, B.Sc, BA, and BCA institutes assessed on DAVV affiliation, competitive exam readiness, and faculty mentorship.',
    topInstitutes: ['Prestige (PIMR UG)', 'Renaissance College', 'DAVV UTD Campus', 'IPS Academy', 'St. Paul College', 'BM College']
  },
  {
    id: 'Pharmacy Colleges',
    title: 'Pharmacy Colleges',
    shortName: 'Pharmacy',
    icon: Award,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    accentBadge: 'bg-teal-100 text-teal-800',
    countColleges: '18+ Verified Colleges',
    courses: ['B.Pharm', 'M.Pharm', 'D.Pharm'],
    description: 'B.Pharm and M.Pharm colleges reviewed on PCI compliance, pharmacology laboratories, and Pithampur pharma corridor links.',
    topInstitutes: ['SGSITS Dept of Pharmacy', 'Modern Institute', 'IPS College of Pharmacy', 'Oriental University', 'SAGE University', 'SAIMS Pharmacy']
  },
  {
    id: 'MBA Colleges',
    title: 'MBA Colleges',
    shortName: 'Management / MBA',
    icon: TrendingUp,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    accentBadge: 'bg-amber-100 text-amber-800',
    countColleges: '28+ Verified Colleges',
    courses: ['MBA', 'PGDM', 'Exec MBA'],
    description: 'MBA and PGDM institutions reviewed on median CTC, executive conclaves, corporate recruiters, and ROI metrics.',
    topInstitutes: ['IIM Indore', 'IMS DAVV', 'Prestige (PIMR MBA)', 'Jaipuria Indore', 'IPS Academy IBMR', 'Renaissance University']
  },
  {
    id: 'MCA Colleges',
    title: 'MCA Colleges',
    shortName: 'Computer Apps / MCA',
    icon: Layers,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    accentBadge: 'bg-indigo-100 text-indigo-800',
    countColleges: '15+ Verified Colleges',
    courses: ['MCA', 'BCA+MCA', 'Cloud & AI'],
    description: '2-year MCA graduate programs evaluated on software development labs, cloud computing curricula, and tech placement parity.',
    topInstitutes: ['SCSIT DAVV', 'IET DAVV MCA', 'Acropolis MCA', 'Medi-Caps MCA', 'SGSITS MCA', 'SAGE University']
  }
];

export interface ReviewPerspectiveKeyPoint {
  title: string;
  tag: string;
  icon: any;
}

export const REVIEW_PERSPECTIVES: {
  type: ReviewPerspectiveType;
  title: string;
  subtitle: string;
  badge: string;
  cardNumber: number;
  icon: any;
  color: string;
  iconBg: string;
}[] = [
  {
    type: 'Review by Indore Colleges',
    title: 'Review by Indore Colleges',
    subtitle: 'Independent 360° Campus Ground Audit & ROI verification',
    badge: 'Campus Ground Audit',
    cardNumber: 1,
    icon: ShieldCheck,
    color: 'text-[#F66710]',
    iconBg: 'bg-orange-50 border border-orange-100'
  },
  {
    type: 'Review by Actual Students',
    title: 'Review by Actual Students',
    subtitle: 'Unfiltered ground realities, academics & campus life',
    badge: 'Student Testimonials',
    cardNumber: 2,
    icon: Users,
    color: 'text-blue-600',
    iconBg: 'bg-blue-50 border border-blue-100'
  },
  {
    type: 'Review by College Authority',
    title: 'Review by College Authority',
    subtitle: 'Official statements, vision & placement roadmaps from Deans & TPOs',
    badge: 'Leadership Statements',
    cardNumber: 3,
    icon: Building2,
    color: 'text-emerald-600',
    iconBg: 'bg-emerald-50 border border-emerald-100'
  }
];

// Helper to generate 6 video cards based on Category + Perspective
export function getSixVideosData(category: CategoryType, perspective: ReviewPerspectiveType): VideoCardData[] {
  const collegesMap: Record<CategoryType, { name: string; loc: string; type: 'Govt / Autonomous' | 'Private University' | 'Autonomous Institute'; img: string }[]> = {
    'Engineering College': [
      { name: 'SGSITS Indore', loc: 'YN Road, Central Indore', type: 'Govt / Autonomous', img: '/sgsits.jpg' },
      { name: 'IIT Indore', loc: 'Simrol Campus, Khandwa Road', type: 'Govt / Autonomous', img: '/iit-indore.jpg' },
      { name: 'IET DAVV', loc: 'Khandwa Road, DAVV Takshashila', type: 'Govt / Autonomous', img: '/iet-davv.jpg' },
      { name: 'Acropolis Institute (AITR)', loc: 'Manglia Bypass, Indore', type: 'Autonomous Institute', img: '/acropolis.jpg' },
      { name: 'Medi-Caps University', loc: 'AB Road, Rau, Indore', type: 'Private University', img: '/medi-caps-university.jpg' },
      { name: 'Chameli Devi Group (CDGI)', loc: 'Khandwa Road, Indore', type: 'Autonomous Institute', img: '/chameli-devi.jpg' }
    ],
    'UG Colleges': [
      { name: 'Prestige Institute (PIMR UG)', loc: 'Scheme 54, Vijay Nagar', type: 'Autonomous Institute', img: '/pimr.jpg' },
      { name: 'Renaissance College', loc: 'Mayakhedi, AB Bypass Road', type: 'Autonomous Institute', img: '/renaissance-college.jpg' },
      { name: 'DAVV UTD Campus', loc: 'Takshashila Campus, Bhawarkua', type: 'Govt / Autonomous', img: '/davv.jpg' },
      { name: 'IPS Academy', loc: 'Rajendra Nagar, AB Road', type: 'Autonomous Institute', img: '/ips-engineering.jpg' },
      { name: 'BM College', loc: 'Gokanya Road, Indore', type: 'Autonomous Institute', img: '/bm-college.jpg' },
      { name: 'Malwa Institute (UG Wing)', loc: 'Limbodagari, Sanwer Road', type: 'Autonomous Institute', img: '/malwa_institute_campus.jpg' }
    ],
    'Pharmacy Colleges': [
      { name: 'SGSITS Dept of Pharmacy', loc: 'YN Road, Indore', type: 'Govt / Autonomous', img: '/sgsits.jpg' },
      { name: 'Modern Institute of Pharmacy', loc: 'Alwasa, Behind Revati Range', type: 'Autonomous Institute', img: '/oriental-university.jpg' },
      { name: 'IPS College of Pharmacy', loc: 'Knowledge Village, Rajendra Nagar', type: 'Autonomous Institute', img: '/ips-engineering.jpg' },
      { name: 'Oriental University Pharmacy', loc: 'Sanwer Road, Indore', type: 'Private University', img: '/oriental-university.jpg' },
      { name: 'SAGE University Pharmacy', loc: 'Kailod Kartal, Bypass Road', type: 'Private University', img: '/sage-university.jpg' },
      { name: 'SAIMS Institute of Pharmacy', loc: 'MR 10 Crossing, Sanwer Road', type: 'Private University', img: '/saims.jpg' }
    ],
    'MBA Colleges': [
      { name: 'IIM Indore', loc: 'Prabandh Shikhar, Rau-Pithampur Road', type: 'Govt / Autonomous', img: '/iim-indore.jpg' },
      { name: 'IMS DAVV', loc: 'Takshashila Campus, Khandwa Road', type: 'Govt / Autonomous', img: '/ims-davv.jpg' },
      { name: 'Prestige Institute (PIMR MBA)', loc: 'Sector 54, Near Bombay Hospital', type: 'Autonomous Institute', img: '/pimr.jpg' },
      { name: 'Jaipuria Institute of Management', loc: 'Dakachya, Indore Bypass', type: 'Autonomous Institute', img: '/jaipuria-indore.jpg' },
      { name: 'IPS Academy (IBMR)', loc: 'Rajendra Nagar, Indore', type: 'Autonomous Institute', img: '/ips-ibmr.jpg' },
      { name: 'Renaissance University', loc: 'Grama Revati, Sanwer Road', type: 'Private University', img: '/renaissance-college.jpg' }
    ],
    'MCA Colleges': [
      { name: 'SCSIT DAVV', loc: 'School of Computer Science, Khandwa Rd', type: 'Govt / Autonomous', img: '/davv.jpg' },
      { name: 'IET DAVV MCA Center', loc: 'Takshashila Campus, Indore', type: 'Govt / Autonomous', img: '/iet-davv.jpg' },
      { name: 'Acropolis Institute MCA', loc: 'Manglia, Indore Bypass', type: 'Autonomous Institute', img: '/acropolis.jpg' },
      { name: 'Medi-Caps University MCA', loc: 'Pigdamber, Rau, Indore', type: 'Private University', img: '/medi-caps-university.jpg' },
      { name: 'SGSITS Computer Dept', loc: 'YN Road, Central Indore', type: 'Govt / Autonomous', img: '/sgsits.jpg' },
      { name: 'SAGE School of Computing', loc: 'Rau Bypass Road, Indore', type: 'Private University', img: '/sage-university.jpg' }
    ]
  };

  const selectedColleges = collegesMap[category] || collegesMap['Engineering College'];

  return selectedColleges.map((col, index) => {
    let title = '';
    let description = '';
    let duration = `${11 + (index * 2)}:${20 + (index * 6)}`;
    let tags: string[] = [];
    const productionProgress = 85 + (index * 2);
    const votesCount = 140 + (index * 38);

    if (perspective === 'Review by Indore Colleges') {
      title = `${col.name} — Ground Inspection & Placement Claim vs Reality`;
      description = `Our senior research analyst conducts an on-campus audit of ${col.name}: scrutinizing coding labs, library resources, fee return on investment (ROI), and placement verification.`;
      tags = ['360° Campus Tour', 'Placement Audit', 'Lab Verification', 'ROI Index'];
    } else if (perspective === 'Review by Actual Students') {
      title = `Day in Life & Ground Reality at ${col.name} — By Current Students`;
      description = `Unfiltered student interview: Senior batch scholars openly discuss 75% attendance policy, hostel lifestyle, exam rigor, coding clubs, and real support received during campus drives.`;
      tags = ['Student Testimonial', 'Hostel Life', 'Coding Culture', 'Campus Reality'];
    } else {
      title = `Executive Interview with Director & Placement Dean — ${col.name}`;
      description = `Official executive dialogue with the head of ${col.name}: discussing upcoming AICTE/NBA syllabus revisions, Super Corridor company MoUs, student patents, and 2026 admissions.`;
      tags = ['Dean Interview', 'AICTE Accreditation', 'Super Corridor MoUs', 'Future Roadmap'];
    }

    return {
      id: `${category}-${perspective}-${col.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      collegeName: col.name,
      location: col.loc,
      type: col.type,
      title,
      duration,
      thumbnail: col.img,
      perspectiveType: perspective,
      category,
      description,
      tags,
      projectedReleaseDate: 'Premiere 2026 • Final Production',
      quality: '4K Ultra HD',
      productionProgress: Math.min(productionProgress, 95),
      votesCount
    };
  });
}

export default function ReviewsHierarchyTable() {
  // Navigation State
  // activeCategory: 'Engineering College' by default so the 3 cards open on the same page, or user can click any of the 5 categories.
  const [activeCategory, setActiveCategory] = useState<CategoryType>('Engineering College');
  const [isCardsSectionOpen, setIsCardsSectionOpen] = useState<boolean>(true);

  // activeReviewType: When null -> user is on the main page (Heading "Reviews", 5 categories list, 3 cards on same page).
  // When not null -> user views the 6 videos cards with "Coming Soon".
  const [activeReviewType, setActiveReviewType] = useState<ReviewPerspectiveType | null>(null);

  // Interactive "Notify Me" toggle state (persisted locally)
  const [notifiedVideos, setNotifiedVideos] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('indore_reviews_notified');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Interactive user votes for anticipated videos
  const [videoVotes, setVideoVotes] = useState<Record<string, number>>({});
  const [userVoted, setUserVoted] = useState<Record<string, boolean>>({});

  // Interactive Teaser Video Player Modal
  const [previewVideoModal, setPreviewVideoModal] = useState<VideoCardData | null>(null);
  const [isPlayingSimulated, setIsPlayingSimulated] = useState<boolean>(true);
  const [isMutedSimulated, setIsMutedSimulated] = useState<boolean>(false);
  const [playerCurrentTime, setPlayerCurrentTime] = useState<number>(14);
  const [notifyPhoneNumber, setNotifyPhoneNumber] = useState<string>('');
  const [isPhoneSubmitted, setIsPhoneSubmitted] = useState<boolean>(false);

  // Notification Toast
  const [notificationToast, setNotificationToast] = useState<{ title: string; desc: string } | null>(null);

  // Simulate playback timer in preview modal
  useEffect(() => {
    let timer: any;
    if (previewVideoModal && isPlayingSimulated) {
      timer = setInterval(() => {
        setPlayerCurrentTime(prev => (prev >= 60 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [previewVideoModal, isPlayingSimulated]);

  const toggleNotify = (videoId: string, collegeName: string) => {
    setNotifiedVideos(prev => {
      const nextState = !prev[videoId];
      const updated = { ...prev, [videoId]: nextState };
      try {
        localStorage.setItem('indore_reviews_notified', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }

      if (nextState) {
        setNotificationToast({
          title: 'Alert Scheduled!',
          desc: `You will be notified instantly on publication of the ${collegeName} video audit.`
        });
      } else {
        setNotificationToast({
          title: 'Alert Removed',
          desc: `You have unsubscribed from ${collegeName} launch alerts.`
        });
      }
      setTimeout(() => setNotificationToast(null), 4000);
      return updated;
    });
  };

  const handleVoteAnticipation = (videoId: string) => {
    if (userVoted[videoId]) return;
    setUserVoted(prev => ({ ...prev, [videoId]: true }));
    setVideoVotes(prev => ({ ...prev, [videoId]: (prev[videoId] || 0) + 1 }));
    setNotificationToast({
      title: 'Anticipation Vote Recorded!',
      desc: 'Thank you! High-demand videos are given top priority by our production team in Indore.'
    });
    setTimeout(() => setNotificationToast(null), 4000);
  };

  const handleCategoryClick = (catId: CategoryType) => {
    if (activeCategory === catId) {
      // Toggle card visibility if clicked again
      setIsCardsSectionOpen(prev => !prev);
    } else {
      setActiveCategory(catId);
      setIsCardsSectionOpen(true);
    }
  };

  const rawSixVideos = activeReviewType 
    ? getSixVideosData(activeCategory, activeReviewType)
    : [];

  const filteredSixVideos = rawSixVideos;

  const activeCategoryDetails = CATEGORIES_LIST.find(c => c.id === activeCategory) || CATEGORIES_LIST[0];

  return (
    <div className="w-full relative">
      {/* Interactive Toast Notification */}
      <AnimatePresence>
        {notificationToast && (
          <motion.div
            initial={{ opacity: 0, y: -25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 0.95 }}
            className="fixed top-20 right-4 z-50 max-w-md bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-red-500/50 flex items-start gap-3.5 backdrop-blur-md"
          >
            <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-red-600/30">
              <Bell className="w-4 h-4 text-white animate-bounce" />
            </div>
            <div className="flex-1 text-xs">
              <p className="font-black text-red-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{notificationToast.title}</span>
              </p>
              <p className="text-slate-200 mt-1 leading-relaxed font-light">{notificationToast.desc}</p>
            </div>
            <button 
              onClick={() => setNotificationToast(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* CASE A: SAME PAGE VIEW (Heading "Reviews" + 5 Categories + 3 Cards Open)   */}
      {/* ========================================================================= */}
      {!activeReviewType ? (
        <div className="space-y-6 sm:space-y-8">
          {/* 2. FIVE CATEGORIES LIST */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
                  <span>Categories</span>
                  <span className="text-xs font-normal text-slate-400 normal-case">
                    Select a category to explore reviews
                  </span>
                </h2>
              </div>
              <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F66710]" />
                <span>Active: <strong className="text-slate-800 font-semibold">{activeCategory}</strong></span>
              </div>
            </div>

            {/* Five Category Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-3.5">
              {CATEGORIES_LIST.map((cat) => {
                const IconComponent = cat.icon;
                const isSelected = activeCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`group relative p-4 sm:p-4.5 rounded-xl text-left transition-all duration-200 cursor-pointer bg-white border flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#F66710] shadow-xs ring-1 ring-[#F66710]/30'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 shadow-2xs'
                    }`}
                  >
                    <div>
                      {/* Top Row: Clean Icon & Minimal Active Tag */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                          isSelected 
                            ? 'bg-orange-50 text-[#F66710] border border-orange-200/60' 
                            : 'bg-slate-100/80 text-slate-600 group-hover:bg-slate-100 group-hover:text-slate-900'
                        }`}>
                          <IconComponent className="w-4.5 h-4.5" />
                        </div>
                        {isSelected && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#F66710] bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200/60">
                            <Check className="w-3 h-3 stroke-[2.5]" />
                            <span>Active</span>
                          </span>
                        )}
                      </div>

                      {/* Category Title */}
                      <h3 className={`text-[15px] leading-snug tracking-tight mb-1 transition-colors ${
                        isSelected ? 'text-[#F66710] font-bold' : 'text-slate-900 font-semibold group-hover:text-slate-950'
                      }`}>
                        {cat.title}
                      </h3>

                      {/* Verified Colleges Count */}
                      <p className="text-xs text-slate-500 font-normal mb-2.5">
                        {cat.countColleges}
                      </p>

                      {/* Specialization / Key Courses */}
                      <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-100">
                        {cat.courses.map((course) => (
                          <span
                            key={course}
                            className={`text-[10px] font-medium px-1.5 py-0.5 rounded transition-colors ${
                              isSelected
                                ? 'bg-orange-50 text-[#F66710] border border-orange-200/50 font-semibold'
                                : 'bg-slate-50 text-slate-600 border border-slate-100 group-hover:bg-slate-100 group-hover:text-slate-900'
                            }`}
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. THREE CARDS OPEN RIGHT HERE ON THE SAME PAGE
                 - Review by Indore Colleges
                 - Review by Actual Students
                 - Review by College Authority
          */}
          <AnimatePresence mode="wait">
            {isCardsSectionOpen && (
              <motion.div
                id="three-cards-section"
                key={activeCategory}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.09,
                      delayChildren: 0.04
                    }
                  },
                  exit: {
                    opacity: 0,
                    y: -14,
                    scale: 0.98,
                    transition: { duration: 0.18, ease: "easeIn" }
                  }
                }}
                className="pt-2 space-y-4"
              >
                {/* Category Context Indicator Bar */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F66710]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Showing 3 Perspectives for: <strong className="text-slate-900 font-bold">{activeCategory}</strong>
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-normal hidden sm:inline">
                    Select a perspective to explore video reviews
                  </span>
                </div>

                {/* THE THREE CARDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                  {REVIEW_PERSPECTIVES.map((persp) => {
                    const IconComponent = persp.icon;

                    return (
                      <motion.div
                        key={persp.type}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setActiveReviewType(persp.type)}
                        className="group bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm p-5 sm:p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between"
                      >
                        <div>
                          {/* Top Row: Icon + Subtle Perspective Pill */}
                          <div className="flex items-center justify-between gap-3 mb-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${persp.iconBg}`}>
                              <IconComponent className={`w-5 h-5 ${persp.color}`} />
                            </div>
                            <span className="text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-md">
                              Perspective #{persp.cardNumber}
                            </span>
                          </div>

                          {/* Main Heading Highlighted & Subtitle */}
                          <h3 className={`text-base sm:text-lg font-bold ${persp.color} mb-1.5 leading-snug tracking-tight`}>
                            {persp.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                            {persp.subtitle}
                          </p>
                        </div>

                        {/* Bottom Row: 6 Videos Indicator & Clean Action */}
                        <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span className="inline-flex items-center gap-1.5 font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
                            <Film className="w-3.5 h-3.5 text-slate-400" />
                            <span>6 Videos Series</span>
                          </span>
                          <span className={`inline-flex items-center gap-1 ${persp.color} font-semibold transition-colors`}>
                            <span>Watch</span>
                            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* ========================================================================= */
        /* CASE B: DEDICATED SIX VIDEOS VIEW (When clicking one of the 3 Cards)      */
        /* Displays six video cards with "Coming Soon"                               */
        /* ========================================================================= */
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="space-y-8"
        >
          {/* Top Return Button & Breadcrumbs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200">
            <button
              onClick={() => setActiveReviewType(null)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-red-600 text-white text-xs font-bold transition shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Back to Reviews ({activeCategory})</span>
            </button>

            {/* Breadcrumb path */}
            <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold">
              <button 
                onClick={() => setActiveReviewType(null)}
                className="hover:text-red-600 transition cursor-pointer"
              >
                Reviews
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <button 
                onClick={() => setActiveReviewType(null)}
                className="hover:text-red-600 transition cursor-pointer"
              >
                {activeCategory}
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-red-600 font-black">{activeReviewType}</span>
            </div>
          </div>

          {/* Switch Between Perspectives */}
          <div className="bg-white p-3 sm:p-4 rounded-2xl border border-gray-200 shadow-xs">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              <div className="flex items-center gap-2 px-1 text-xs font-black uppercase tracking-wider text-gray-500 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                <span>Switch Perspective:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 flex-1">
                {REVIEW_PERSPECTIVES.map((persp) => {
                  const Icon = persp.icon;
                  const isActive = activeReviewType === persp.type;
                  return (
                    <button
                      key={persp.type}
                      onClick={() => setActiveReviewType(persp.type)}
                      className={`flex items-center justify-center sm:justify-start gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-slate-950 text-white border-slate-950 shadow-md ring-2 ring-red-500/50'
                          : 'bg-slate-50 text-gray-700 hover:bg-slate-100 hover:text-gray-900 border-gray-200'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-red-600 text-white' : persp.iconBg
                      }`}>
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : persp.color}`} />
                      </div>
                      <div className="text-left min-w-0 flex-1">
                        <p className="leading-tight truncate font-extrabold">{persp.title}</p>
                        <p className={`text-[10px] leading-tight truncate ${isActive ? 'text-slate-300' : 'text-gray-500'}`}>
                          {persp.badge}
                        </p>
                      </div>
                      {isActive && (
                        <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-md bg-red-600 text-white shrink-0 hidden sm:inline-block">
                          Active
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Six Videos Grid */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-black text-gray-950 flex items-center gap-2">
                  <span>6 Featured Video Reviews</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 font-bold">
                    {filteredSixVideos.length} Showing
                  </span>
                </h3>
                <p className="text-xs text-gray-500 font-light mt-0.5">
                  Click the play button or thumbnail on any card to launch the interactive video teaser preview.
                </p>
              </div>

              {/* YouTube Channel link button */}
              <a
                href="https://www.youtube.com/@Indorecolleges"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition shrink-0 group self-start sm:self-auto"
                title="Visit Indore Colleges on YouTube"
              >
                <Youtube className="w-4 h-4" />
                <span>Subscribe on YouTube @Indorecolleges</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 transition" />
              </a>
            </div>

            {/* THE SIX VIDEO CARDS */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${activeReviewType}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.22 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {filteredSixVideos.map((video, idx) => {
                  const isNotified = !!notifiedVideos[video.id];
                  const hasVoted = !!userVoted[video.id];
                  const votes = video.votesCount + (videoVotes[video.id] || 0);

                  return (
                    <motion.div
                      key={video.id}
                      whileHover={{ y: -6 }}
                      className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
                    >
                    {/* VIDEO THUMBNAIL WITH COMING SOON OVERLAY */}
                    <div 
                      onClick={() => setPreviewVideoModal(video)}
                      className="relative aspect-16/9 bg-slate-950 overflow-hidden cursor-pointer select-none"
                    >
                      <img 
                        src={video.thumbnail} 
                        alt={video.collegeName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-65 group-hover:scale-105 group-hover:opacity-80 transition-all duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80';
                        }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/60 pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                          Video #{idx + 1}
                        </span>

                        {/* COMING SOON BADGE */}
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-red-600 text-white shadow-lg shadow-red-900/40 animate-pulse">
                          <Clock className="w-3 h-3" />
                          <span>Coming Soon</span>
                        </span>
                      </div>

                      {/* Center Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-red-600 text-white shadow-2xl flex items-center justify-center group-hover:scale-115 transition-all duration-300 ring-4 ring-white/40">
                          <Play className="w-6 h-6 fill-white ml-1" />
                        </div>
                      </div>

                      {/* Bottom Info inside Thumbnail */}
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] text-white font-bold">
                        <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs">
                          {video.quality}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span>Est. {video.duration}</span>
                        </span>
                      </div>
                    </div>

                    {/* CARD BODY CONTENT */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* College Name & Location */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-red-50 text-red-700 border border-red-100">
                            {video.collegeName}
                          </span>
                          <span className="text-[10px] text-gray-400 font-medium truncate">
                            {video.location}
                          </span>
                        </div>

                        {/* Video Title */}
                        <h4 
                          onClick={() => setPreviewVideoModal(video)}
                          className="font-black text-sm sm:text-base text-gray-950 group-hover:text-red-600 transition leading-snug cursor-pointer line-clamp-2 mb-2.5"
                        >
                          {video.title}
                        </h4>

                        {/* Video Description */}
                        <p className="text-xs text-gray-500 font-normal leading-relaxed line-clamp-2 mb-3">
                          {video.description}
                        </p>

                        {/* Production Progress Bar */}
                        <div className="mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 mb-1">
                            <span>Production Progress</span>
                            <span className="text-red-600 font-black">{video.productionProgress}% Finalized</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-amber-500 to-red-600 rounded-full" 
                              style={{ width: `${video.productionProgress}%` }}
                            />
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {video.tags.map((tag, i) => (
                            <span key={i} className="text-[9px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Controls: Anticipation Upvote & Notify Me Button */}
                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => handleVoteAnticipation(video.id)}
                          className={`text-xs font-bold flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition cursor-pointer ${
                            hasVoted
                              ? 'text-red-600 bg-red-50'
                              : 'text-gray-500 hover:text-red-600 hover:bg-gray-100'
                          }`}
                          title="Vote this video as top anticipation priority"
                        >
                          <Flame className={`w-3.5 h-3.5 ${hasVoted ? 'fill-red-600 text-red-600' : ''}`} />
                          <span>{votes} Anticipating</span>
                        </button>

                        <button
                          onClick={() => toggleNotify(video.id, video.collegeName)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                            isNotified
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-slate-900 text-white hover:bg-red-600'
                          }`}
                        >
                          {isNotified ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Notified</span>
                            </>
                          ) : (
                            <>
                              <Bell className="w-3.5 h-3.5" />
                              <span>Notify Me</span>
                            </>
                          )}
                        </button>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Roadmap Notice */}
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="text-sm sm:text-base font-black text-gray-950 flex items-center justify-center md:justify-start gap-2">
                <Info className="w-4 h-4 text-red-600 shrink-0" />
                <span>Video Release Schedule &amp; Production Notice</span>
              </h4>
              <p className="text-xs text-gray-500 font-light max-w-2xl leading-relaxed">
                Our videography and editorial crew in Indore are capturing on-ground footage with high-definition drone visuals and recorded stakeholder Q&amp;As. Click "Notify Me" on any card to get immediate notification upon publication.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveReviewType(null)}
                className="px-4 py-2.5 rounded-xl bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-bold text-xs transition cursor-pointer shadow-xs"
              >
                ← Back to Reviews
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* INTERACTIVE MODAL: VIDEO TEASER PLAYER & LAUNCH ALERT NOTIFICATION        */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {previewVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-200 relative my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setPreviewVideoModal(null);
                  setIsPhoneSubmitted(false);
                }}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* SIMULATED VIDEO PLAYER SCREEN */}
              <div className="relative aspect-16/9 bg-slate-950 overflow-hidden select-none">
                <img 
                  src={previewVideoModal.thumbnail} 
                  alt={previewVideoModal.collegeName} 
                  className="w-full h-full object-cover opacity-60"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80';
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none" />

                {/* Animated Teaser Watermark */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-red-600 text-white shadow-lg flex items-center gap-1.5">
                    <Film className="w-3 h-3" />
                    <span>Teaser Preview</span>
                  </span>
                  <span className="text-[10px] font-bold text-white/80 bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-xs">
                    {previewVideoModal.quality}
                  </span>
                </div>

                {/* Center Video Teaser Animation */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-red-600/95 text-white flex items-center justify-center mb-3 ring-8 ring-white/10 shadow-2xl">
                    {isPlayingSimulated ? (
                      <Play className="w-7 h-7 fill-white ml-1 animate-pulse" />
                    ) : (
                      <Pause className="w-7 h-7 text-white" />
                    )}
                  </div>

                  <span className="text-xs font-black uppercase tracking-widest px-3.5 py-1 rounded-full bg-amber-500 text-black mb-1 shadow-md">
                    Coming Soon • In Final Editing
                  </span>
                  <p className="text-xs text-slate-300 font-light max-w-sm">
                    Premiere scheduled for 2026 Admissions Session
                  </p>

                  {/* Simulated Audio Visualizer Wave */}
                  {isPlayingSimulated && (
                    <div className="flex items-center gap-1 mt-3">
                      {[16, 28, 12, 34, 20, 40, 18, 26, 32, 14, 22].map((height, i) => (
                        <span 
                          key={i} 
                          className="w-1 bg-red-500 rounded-full animate-pulse" 
                          style={{ height: `${height}px`, animationDelay: `${i * 0.1}s` }} 
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Simulated Interactive Video Controls Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 to-transparent flex flex-col gap-2">
                  {/* Progress scrub bar */}
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                    <div 
                      className="h-full bg-red-600 rounded-full transition-all duration-300"
                      style={{ width: `${(playerCurrentTime / 60) * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-white/90">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setIsPlayingSimulated(!isPlayingSimulated)}
                        className="hover:text-red-400 transition cursor-pointer"
                      >
                        {isPlayingSimulated ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                      </button>
                      <button 
                        onClick={() => setIsMutedSimulated(!isMutedSimulated)}
                        className="hover:text-red-400 transition cursor-pointer"
                      >
                        {isMutedSimulated ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <span>00:{playerCurrentTime.toString().padStart(2, '0')} / Est. {previewVideoModal.duration}</span>
                    </div>

                    <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                      Full 4K Video Coming Soon
                    </span>
                  </div>
                </div>
              </div>

              {/* MODAL BODY */}
              <div className="p-6 sm:p-7 space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-red-100 text-red-700">
                      {previewVideoModal.collegeName} • {previewVideoModal.category}
                    </span>
                    <span className="text-xs text-gray-500 font-bold">
                      {previewVideoModal.perspectiveType}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-gray-950 mt-2 leading-snug">
                    {previewVideoModal.title}
                  </h3>
                  <p className="text-xs text-gray-600 font-normal mt-2 leading-relaxed">
                    {previewVideoModal.description}
                  </p>
                </div>

                {/* Topics Covered */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    Topics Documented in this Video:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {previewVideoModal.tags.map((t, idx) => (
                      <span key={idx} className="text-xs bg-white text-gray-800 border border-gray-200 px-2.5 py-1 rounded-lg font-medium">
                        ✓ {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* WhatsApp / SMS Alert Registration Box */}
                <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-black text-red-900 flex items-center gap-1.5">
                      <Bell className="w-4 h-4 text-red-600" />
                      <span>Get Instant Notification on Premiere</span>
                    </p>
                    <span className="text-[10px] text-red-600 font-bold">Free Alert</span>
                  </div>

                  {!isPhoneSubmitted ? (
                    <div className="flex flex-col sm:flex-row gap-2 mt-2">
                      <input
                        type="text"
                        placeholder="Enter WhatsApp or Phone Number (+91...)"
                        value={notifyPhoneNumber}
                        onChange={(e) => setNotifyPhoneNumber(e.target.value)}
                        className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-red-200 bg-white focus:outline-hidden focus:border-red-600"
                      />
                      <button
                        onClick={() => {
                          if (notifyPhoneNumber.trim().length >= 8) {
                            setIsPhoneSubmitted(true);
                            toggleNotify(previewVideoModal.id, previewVideoModal.collegeName);
                          } else {
                            toggleNotify(previewVideoModal.id, previewVideoModal.collegeName);
                            setIsPhoneSubmitted(true);
                          }
                        }}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs transition cursor-pointer shrink-0 shadow-sm"
                      >
                        Set Alert
                      </button>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Alert saved! We will send a direct video watch link upon publication.</span>
                    </div>
                  )}
                </div>

                {/* Footer buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                  <button
                    onClick={() => {
                      toggleNotify(previewVideoModal.id, previewVideoModal.collegeName);
                    }}
                    className={`flex-1 py-3 px-4 rounded-2xl font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer ${
                      notifiedVideos[previewVideoModal.id]
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900 hover:bg-black text-white'
                    }`}
                  >
                    <Bell className="w-4 h-4" />
                    <span>
                      {notifiedVideos[previewVideoModal.id]
                        ? 'Notification Saved'
                        : 'Notify Me for this Video'}
                    </span>
                  </button>

                  <a
                    href="https://www.youtube.com/@Indorecolleges"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition flex items-center justify-center gap-2 shrink-0 shadow-xs"
                    title="Subscribe @Indorecolleges on YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                    <span>Subscribe @Indorecolleges</span>
                  </a>

                  <button
                    onClick={() => {
                      setPreviewVideoModal(null);
                      setIsPhoneSubmitted(false);
                    }}
                    className="py-3 px-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

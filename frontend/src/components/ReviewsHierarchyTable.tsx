import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Building2, 
  Award, 
  TrendingUp, 
  Scale, 
  Stethoscope, 
  ShieldCheck, 
  Users,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Bell,
  Check,
  Flame,
  Film,
  X,
  CheckCircle2,
  ExternalLink,
  Youtube,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type CategoryType = 
  | 'Technical College'
  | 'Pharmacy College'
  | 'PG College'
  | 'Professional College'
  | 'Law College'
  | 'Science College';

export type ReviewPerspectiveType = 
  | 'Review by Indore Colleges'
  | 'Review by Actual Students'
  | 'Review by College Authority';

export interface CategoryItem {
  id: CategoryType;
  title: string;
  specializations: string[];
  icon: React.ElementType;
}

export const CATEGORIES_LIST: CategoryItem[] = [
  {
    id: 'Technical College',
    title: 'Technical College',
    specializations: ['B.Tech.', 'M.Tech.', 'Diploma'],
    icon: GraduationCap,
  },
  {
    id: 'Professional College',
    title: 'Professional College',
    specializations: ['BBA', 'B.Com.', 'BCA'],
    icon: Building2,
  },
  {
    id: 'PG College',
    title: 'PG College',
    specializations: ['MBA', 'MCA', 'M.Sc.', 'PGDM', 'PGDGA'],
    icon: TrendingUp,
  },
  {
    id: 'Pharmacy College',
    title: 'Pharmacy College',
    specializations: ['D.Pharma', 'B.Pharma', 'M.Pharma'],
    icon: Award,
  },
  {
    id: 'Law College',
    title: 'Law College',
    specializations: ['BA LLB', 'BBA LLB'],
    icon: Scale,
  },
  {
    id: 'Science College',
    title: 'Science College',
    specializations: ['B.Sc. Nursing', 'Paramedical'],
    icon: Stethoscope,
  },
];

export interface PerspectiveItem {
  type: ReviewPerspectiveType;
  title: string;
  cardNumber: number;
  icon: React.ElementType;
  iconBgInactive: string;
  iconColorInactive: string;
  iconBgActive: string;
}

export const REVIEW_PERSPECTIVES: PerspectiveItem[] = [
  {
    type: 'Review by Indore Colleges',
    title: 'Review by Indore Colleges',
    cardNumber: 1,
    icon: ShieldCheck,
    iconBgInactive: 'bg-orange-50',
    iconColorInactive: 'text-[#F66710]',
    iconBgActive: 'bg-[#F66710] text-white',
  },
  {
    type: 'Review by Actual Students',
    title: 'Review by Actual Students',
    cardNumber: 2,
    icon: Users,
    iconBgInactive: 'bg-blue-50',
    iconColorInactive: 'text-blue-600',
    iconBgActive: 'bg-blue-600 text-white',
  },
  {
    type: 'Review by College Authority',
    title: 'Review by College Authority',
    cardNumber: 3,
    icon: Building2,
    iconBgInactive: 'bg-emerald-50',
    iconColorInactive: 'text-emerald-600',
    iconBgActive: 'bg-emerald-600 text-white',
  },
];

export interface VideoCardData {
  id: string;
  collegeName: string;
  location: string;
  type: string;
  title: string;
  duration: string;
  thumbnail: string;
  perspectiveType: ReviewPerspectiveType;
  category: CategoryType;
  description: string;
  tags: string[];
  productionProgress: number;
  votesCount: number;
}

// Tailored colleges for each of the 6 categories
const CATEGORY_COLLEGES: Record<CategoryType, { name: string; loc: string; type: string; img: string }[]> = {
  'Technical College': [
    { name: 'SGSITS Indore', loc: 'Park Road, Vallabh Nagar', type: 'Autonomous Govt Aided', img: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80' },
    { name: 'IET DAVV Indore', loc: 'Khandwa Road, DAVV Campus', type: 'State University Dept', img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80' },
    { name: 'Acropolis Institute (AITR)', loc: 'Manglia Bypass, Indore', type: 'Private Autonomous', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80' },
    { name: 'Medi-Caps University', loc: 'AB Road, Pigdamber, Rau', type: 'Private State University', img: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80' },
    { name: 'Chameli Devi Group (CDGI)', loc: 'Gram Umrikheda, Khandwa Road', type: 'Private Engineering', img: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80' },
    { name: 'SVVV Indore', loc: 'Ujjain Road, Indore', type: 'Private University', img: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=800&q=80' }
  ],
  'Pharmacy College': [
    { name: 'SGSITS Dept of Pharmacy', loc: 'Park Road, Indore', type: 'Autonomous PCI Approved', img: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=800&q=80' },
    { name: 'Modern Institute of Pharma', loc: 'Alwasa, Sanwer Road', type: 'PCI Approved', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80' },
    { name: 'IPS Academy College of Pharmacy', loc: 'Knowledge Village, Rajendra Nagar', type: 'Autonomous PCI Approved', img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80' },
    { name: 'Choithram College of Pharmacy', loc: 'Manik Bagh Road, Indore', type: 'Private PCI Approved', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80' },
    { name: 'SAGE University Pharma Sciences', loc: 'Kailod Kartal, Bypass Road', type: 'Private University', img: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80' },
    { name: 'Oriental University Pharmacy', loc: 'Sanwer Road, Jakhya', type: 'PCI Accredited', img: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80' }
  ],
  'PG College': [
    { name: 'IMS DAVV Indore', loc: 'Takshashila Campus, Khandwa Road', type: 'University Department', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80' },
    { name: 'Prestige Institute (PIMR PG)', loc: 'Sector 54, Scheme 74C, Vijay Nagar', type: 'Autonomous NAAC A++', img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80' },
    { name: 'SCSIT DAVV (Computer Apps)', loc: 'Khandwa Road, DAVV', type: 'State University Dept', img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80' },
    { name: 'Jaipuria Institute of Management', loc: 'Dakachya, Indore Bypass', type: 'AICTE Approved PGDM', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80' },
    { name: 'IPS Academy IBMR', loc: 'Rajendra Nagar, AB Road', type: 'Autonomous Management', img: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=800&q=80' },
    { name: 'Pioneer Institute of Management', loc: 'Sector R, Mahalaxmi Nagar', type: 'AICTE / DAVV Approved', img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80' }
  ],
  'Professional College': [
    { name: 'Prestige Institute (UG Campus)', loc: 'Scheme 54, Vijay Nagar', type: 'Autonomous UG College', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80' },
    { name: 'Renaissance University Professional', loc: 'Gram Revati, Sanwer Road', type: 'Private University', img: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80' },
    { name: 'IPS Academy Commerce & BBA', loc: 'Knowledge Village, Rajendra Nagar', type: 'Affiliated to DAVV', img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80' },
    { name: 'St. Paul Institute (SIPS)', loc: 'Lalaram Nagar, Indore', type: 'Autonomous Minority', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80' },
    { name: 'Christian Eminent College', loc: 'F-Sector, HIG Colony, Indore', type: 'NAAC A Accredited', img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80' },
    { name: 'BM College of Commerce & Tech', loc: 'Gokanya, Rau Bypass', type: 'Private College', img: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80' }
  ],
  'Law College': [
    { name: 'Indore Institute of Law (IIL)', loc: 'Rau Pithampur Road, Indore', type: 'Bar Council Approved', img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80' },
    { name: 'School of Law, DAVV', loc: 'Takshashila Campus, Khandwa Road', type: 'State University Dept', img: 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?auto=format&fit=crop&w=800&q=80' },
    { name: 'Prestige School of Law', loc: 'Vijay Nagar, Indore', type: 'Autonomous Law College', img: 'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=800&q=80' },
    { name: 'Renaissance Law College', loc: 'Sanwer Road, Indore', type: 'BCI Recognized', img: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=80' },
    { name: 'Oriental School of Law', loc: 'Opp. Revati Range, Sanwer Road', type: 'Private Law School', img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80' },
    { name: 'SAGE University Faculty of Law', loc: 'Bypass Road, Indore', type: 'State Private University', img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80' }
  ],
  'Science College': [
    { name: 'Choithram College of Nursing', loc: 'Manik Bagh Road, Indore', type: 'INC Approved Healthcare', img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80' },
    { name: 'SAIMS Institute of Nursing', loc: 'Sanwer Road, Indore', type: 'Medical University Attached', img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80' },
    { name: 'Index Nursing Sciences', loc: 'Index City, Nemawar Road', type: 'INC / MPNRC Approved', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80' },
    { name: 'Bombay Hospital College of Nursing', loc: 'Ring Road, IDA Scheme 94', type: 'Hospital Attached College', img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80' },
    { name: 'Modern Institute of Paramedical', loc: 'Sanwer Road, Indore', type: 'Paramedical Council', img: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80' },
    { name: 'Arihant Science & Nursing College', loc: 'Khandwa Road, Indore', type: 'MPNRC Recognized', img: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80' }
  ]
};

function getVideosForPerspective(category: CategoryType, perspective: ReviewPerspectiveType): VideoCardData[] {
  const colleges = CATEGORY_COLLEGES[category] || CATEGORY_COLLEGES['Technical College'];

  return colleges.map((col, idx) => {
    let title = '';
    let description = '';
    let tags: string[] = [];

    if (perspective === 'Review by Indore Colleges') {
      title = `${col.name} Complete Campus Ground Audit & ROI Reality Review`;
      description = `360° independent inspection of ${col.name}: laboratories quality, actual verified placements, faculty expertise, fee breakdown, and ground reality.`;
      tags = ['Campus Audit', 'Placement Reality', 'Lab Infrastructure', 'ROI Analysis'];
    } else if (perspective === 'Review by Actual Students') {
      title = `Ground Reality & Day in Life at ${col.name} — By Current Students`;
      description = `Unfiltered student feedback on ${col.name}: attendance policies, campus crowd, hostel food & living, exams, coding clubs, and real placement assistance.`;
      tags = ['Student Feedback', 'Hostel Life', 'Campus Crowd', 'Honest Review'];
    } else {
      title = `Executive Dialogue with Dean & Placement Director — ${col.name}`;
      description = `Official executive dialogue with leadership of ${col.name}: discussing 2026 admissions, industry MoUs, syllabus updates, and student career roadmaps.`;
      tags = ['Dean Interview', 'Accreditations', 'Industry MoUs', '2026 Roadmap'];
    }

    return {
      id: `${category}-${perspective}-${idx}`,
      collegeName: col.name,
      location: col.loc,
      type: col.type,
      title,
      duration: `${14 + idx * 2}m ${20 + idx * 5}s`,
      thumbnail: col.img,
      perspectiveType: perspective,
      category,
      description,
      tags,
      productionProgress: 75 + idx * 4,
      votesCount: 42 + idx * 18
    };
  });
}

export default function ReviewsHierarchyTable() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('Technical College');
  
  // When null -> user is on the main Categories & Perspectives page
  // When set to a ReviewPerspectiveType -> user is redirected to the Videos page for that perspective!
  const [selectedPerspectiveForVideos, setSelectedPerspectiveForVideos] = useState<ReviewPerspectiveType | null>(null);

  // Local state for interactive notifications & upvotes
  const [notifiedVideos, setNotifiedVideos] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('indore_reviews_notified');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [videoVotes, setVideoVotes] = useState<Record<string, number>>({});
  const [userVoted, setUserVoted] = useState<Record<string, boolean>>({});

  // Interactive Teaser Video Player Modal
  const [previewVideoModal, setPreviewVideoModal] = useState<VideoCardData | null>(null);
  const [isPlayingSimulated, setIsPlayingSimulated] = useState<boolean>(true);
  const [isMutedSimulated, setIsMutedSimulated] = useState<boolean>(false);
  const [playerCurrentTime, setPlayerCurrentTime] = useState<number>(12);
  const [notifyPhoneNumber, setNotifyPhoneNumber] = useState<string>('');
  const [isPhoneSubmitted, setIsPhoneSubmitted] = useState<boolean>(false);

  // Toast
  const [notificationToast, setNotificationToast] = useState<{ title: string; desc: string } | null>(null);

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
    const updated = { ...notifiedVideos, [videoId]: !notifiedVideos[videoId] };
    setNotifiedVideos(updated);
    try {
      localStorage.setItem('indore_reviews_notified', JSON.stringify(updated));
    } catch {
      // ignore
    }

    if (updated[videoId]) {
      setNotificationToast({
        title: 'Launch Alert Active',
        desc: `You will be notified immediately when the ${collegeName} video goes live!`
      });
    } else {
      setNotificationToast({
        title: 'Alert Removed',
        desc: `Notification preference updated for ${collegeName}.`
      });
    }
    setTimeout(() => setNotificationToast(null), 3500);
  };

  const handleVoteAnticipation = (videoId: string) => {
    if (userVoted[videoId]) return;
    setUserVoted(prev => ({ ...prev, [videoId]: true }));
    setVideoVotes(prev => ({ ...prev, [videoId]: (prev[videoId] || 0) + 1 }));
  };

  // Videos list when on the videos page
  const videosList = selectedPerspectiveForVideos
    ? getVideosForPerspective(activeCategory, selectedPerspectiveForVideos)
    : [];

  return (
    <div className="w-full py-2">
      {/* Toast Alert */}
      <AnimatePresence>
        {notificationToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-50 max-w-sm bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 flex items-start gap-3"
          >
            <div className="p-1.5 rounded-lg bg-[#F66710] text-white shrink-0 mt-0.5">
              <Bell className="w-4 h-4" />
            </div>
            <div className="flex-1 text-xs">
              <p className="font-bold text-white text-sm">{notificationToast.title}</p>
              <p className="text-slate-300 mt-0.5 leading-relaxed">{notificationToast.desc}</p>
            </div>
            <button 
              onClick={() => setNotificationToast(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* CASE 1: MAIN PAGE (Categories + Showing 3 Perspectives)                    */}
      {/* ========================================================================= */}
      {!selectedPerspectiveForVideos ? (
        <div className="space-y-7 sm:space-y-8">
          {/* 1. CATEGORIES: 3 cards in one layer and 3 cards in the second layer */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3.5">
              CATEGORIES
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3.5 md:gap-4">
              {CATEGORIES_LIST.map((cat) => {
                const IconComponent = cat.icon;
                const isSelected = activeCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full p-3 sm:p-4 md:p-5 rounded-2xl text-center transition-all duration-200 cursor-pointer bg-white border flex flex-col items-center justify-between gap-2 sm:gap-2.5 group min-h-[135px] sm:min-h-[150px] ${
                      isSelected
                        ? 'border-2 border-[#F66710] shadow-sm ring-2 sm:ring-4 ring-orange-500/10'
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
                    }`}
                  >
                    {/* Center Top: Icon */}
                    <div
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0 ${
                        isSelected
                          ? 'bg-orange-50/90 text-[#F66710] scale-105'
                          : 'bg-slate-100/80 text-slate-600 group-hover:text-slate-900 group-hover:bg-slate-100'
                      }`}
                    >
                      <IconComponent className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                    </div>

                    {/* Center: Heading */}
                    <h3
                      className={`text-xs sm:text-sm md:text-base font-bold transition-colors leading-snug text-center ${
                        isSelected ? 'text-[#F66710]' : 'text-slate-900 group-hover:text-[#F66710]'
                      }`}
                    >
                      {cat.title}
                    </h3>

                    {/* Center: Specializations of that card */}
                    <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5 pt-0.5 w-full">
                      {cat.specializations.map((spec) => (
                        <span
                          key={spec}
                          className={`text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-md transition-colors whitespace-nowrap ${
                            isSelected
                              ? 'bg-orange-100/70 text-[#F66710] border border-orange-200/60'
                              : 'bg-slate-100 text-slate-600 border border-slate-200/60'
                          }`}
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. SHOWING 3 PERSPECTIVES */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3.5">
              SHOWING 3 PERSPECTIVES FOR:{' '}
              <span className="font-black text-slate-950">
                {activeCategory.toUpperCase()}
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {REVIEW_PERSPECTIVES.map((persp) => {
                const IconComponent = persp.icon;

                return (
                  <button
                    key={persp.type}
                    type="button"
                    onClick={() => {
                      // Redirect user to the videos page for this perspective!
                      setSelectedPerspectiveForVideos(persp.type);
                    }}
                    className="w-full bg-white rounded-3xl border border-slate-200 hover:border-[#F66710] hover:shadow-lg p-6 sm:p-8 transition-all duration-200 cursor-pointer text-center flex flex-col items-center justify-center gap-3.5 group min-h-[170px]"
                  >
                    {/* At the center top: Icon */}
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${persp.iconBgInactive} ${persp.iconColorInactive} group-hover:bg-[#F66710] group-hover:text-white group-hover:scale-105 shadow-xs`}
                    >
                      <IconComponent className="w-7 h-7" />
                    </div>

                    {/* In center: Large Heading */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-lg sm:text-xl font-bold leading-snug text-slate-900 group-hover:text-[#F66710] transition-colors text-center">
                        {persp.title}
                      </h3>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* CASE 2: REDIRECTED VIDEOS PAGE FOR SELECTED PERSPECTIVE                   */
        /* ========================================================================= */
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Top Bar: Return Button & Breadcrumbs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <button
              onClick={() => setSelectedPerspectiveForVideos(null)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-[#F66710] text-white text-xs font-bold transition shadow-xs cursor-pointer self-start"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Back to Categories &amp; Perspectives</span>
            </button>

            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold flex-wrap">
              <button 
                onClick={() => setSelectedPerspectiveForVideos(null)}
                className="hover:text-[#F66710] transition cursor-pointer"
              >
                Categories
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <button 
                onClick={() => setSelectedPerspectiveForVideos(null)}
                className="hover:text-[#F66710] transition cursor-pointer"
              >
                {activeCategory}
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[#F66710] font-black">{selectedPerspectiveForVideos}</span>
            </div>
          </div>


          {/* Videos Grid Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                <span>{activeCategory} Video Reviews</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-100 text-[#F66710] font-bold">
                  {videosList.length} Videos
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-normal mt-1">
                Showing video reviews for <strong>{activeCategory}</strong> curated under <strong>{selectedPerspectiveForVideos}</strong>.
              </p>
            </div>

            <a
              href="https://www.youtube.com/@Indorecolleges"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition shrink-0 group self-start sm:self-auto cursor-pointer"
            >
              <Youtube className="w-4 h-4" />
              <span>Subscribe on YouTube @Indorecolleges</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 transition" />
            </a>
          </div>

          {/* 6 Videos Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {videosList.map((video, idx) => {
              const isNotified = !!notifiedVideos[video.id];
              const hasVoted = !!userVoted[video.id];
              const votes = video.votesCount + (videoVotes[video.id] || 0);

              return (
                <div
                  key={video.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Thumbnail & Play Overlay */}
                  <div 
                    onClick={() => setPreviewVideoModal(video)}
                    className="relative aspect-16/9 bg-slate-950 overflow-hidden cursor-pointer select-none"
                  >
                    <img 
                      src={video.thumbnail} 
                      alt={video.collegeName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-85 transition-all duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80';
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/50 pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                        Video #{idx + 1}
                      </span>

                      <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-[#F66710] text-white shadow-md animate-pulse">
                        <Clock className="w-3 h-3" />
                        <span>Coming Soon</span>
                      </span>
                    </div>

                    {/* Center Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-13 h-13 rounded-full bg-[#F66710] text-white shadow-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 ring-4 ring-white/30">
                        <Play className="w-6 h-6 fill-white ml-0.5" />
                      </div>
                    </div>

                    {/* Bottom Info inside Thumbnail */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] text-white font-bold">
                      <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs">
                        4K Ultra HD
                      </span>
                      <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>Est. {video.duration}</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* College Name & Location */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-orange-50 text-[#F66710] border border-orange-100">
                          {video.collegeName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium truncate">
                          {video.location}
                        </span>
                      </div>

                      {/* Video Title */}
                      <h4 
                        onClick={() => setPreviewVideoModal(video)}
                        className="font-bold text-base text-slate-900 group-hover:text-[#F66710] transition leading-snug cursor-pointer line-clamp-2 mb-2"
                      >
                        {video.title}
                      </h4>

                      {/* Video Description */}
                      <p className="text-xs text-slate-500 font-normal leading-relaxed line-clamp-2 mb-3">
                        {video.description}
                      </p>

                      {/* Production Progress */}
                      <div className="mb-3.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-1">
                          <span>Production Progress</span>
                          <span className="text-[#F66710] font-black">{video.productionProgress}% Finalized</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-amber-500 to-[#F66710] rounded-full" 
                            style={{ width: `${video.productionProgress}%` }}
                          />
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {video.tags.map((tag, i) => (
                          <span key={i} className="text-[9px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Controls */}
                    <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleVoteAnticipation(video.id)}
                        className={`text-xs font-bold flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition cursor-pointer ${
                          hasVoted
                            ? 'text-[#F66710] bg-orange-50'
                            : 'text-slate-500 hover:text-[#F66710] hover:bg-slate-100'
                        }`}
                        title="Vote this video as top anticipation priority"
                      >
                        <Flame className={`w-3.5 h-3.5 ${hasVoted ? 'fill-[#F66710] text-[#F66710]' : ''}`} />
                        <span>{votes} Anticipating</span>
                      </button>

                      <button
                        onClick={() => toggleNotify(video.id, video.collegeName)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          isNotified
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-slate-900 text-white hover:bg-[#F66710]'
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
                </div>
              );
            })}
          </div>

          {/* Bottom Notice */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-[#F66710] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Video Release Schedule &amp; Production Notice
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Our videography team is filming on-ground in Indore. Click "Notify Me" on any college card to get an instant alert upon video release.
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedPerspectiveForVideos(null)}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs transition cursor-pointer shrink-0"
            >
              ← Back to Categories
            </button>
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
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-8"
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
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-[#F66710] text-white shadow-lg flex items-center gap-1.5">
                    <Film className="w-3 h-3" />
                    <span>Teaser Preview</span>
                  </span>
                  <span className="text-[10px] font-bold text-white/80 bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-xs">
                    4K Ultra HD
                  </span>
                </div>

                {/* Center Video Teaser Animation */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-[#F66710]/95 text-white flex items-center justify-center mb-3 ring-8 ring-white/10 shadow-2xl">
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
                          className="w-1 bg-[#F66710] rounded-full animate-pulse" 
                          style={{ height: `${height}px`, animationDelay: `${i * 0.1}s` }} 
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Simulated Interactive Video Controls Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 to-transparent flex flex-col gap-2">
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                    <div 
                      className="h-full bg-[#F66710] rounded-full transition-all duration-300"
                      style={{ width: `${(playerCurrentTime / 60) * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-white/90">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setIsPlayingSimulated(!isPlayingSimulated)}
                        className="hover:text-orange-400 transition cursor-pointer"
                      >
                        {isPlayingSimulated ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                      </button>
                      <button 
                        onClick={() => setIsMutedSimulated(!isMutedSimulated)}
                        className="hover:text-orange-400 transition cursor-pointer"
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
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-orange-100 text-[#F66710]">
                      {previewVideoModal.collegeName} • {previewVideoModal.category}
                    </span>
                    <span className="text-xs text-slate-500 font-bold">
                      {previewVideoModal.perspectiveType}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-950 mt-2 leading-snug">
                    {previewVideoModal.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-normal mt-2 leading-relaxed">
                    {previewVideoModal.description}
                  </p>
                </div>

                {/* Topics Covered */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Topics Documented in this Video:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {previewVideoModal.tags.map((t, idx) => (
                      <span key={idx} className="text-xs bg-white text-slate-800 border border-slate-200 px-2.5 py-1 rounded-lg font-medium">
                        ✓ {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* WhatsApp / Phone Alert Registration Box */}
                <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold text-orange-950 flex items-center gap-1.5">
                      <Bell className="w-4 h-4 text-[#F66710]" />
                      <span>Get Instant Notification on Premiere</span>
                    </p>
                    <span className="text-[10px] text-[#F66710] font-bold">Free Alert</span>
                  </div>

                  {!isPhoneSubmitted ? (
                    <div className="flex flex-col sm:flex-row gap-2 mt-2">
                      <input
                        type="text"
                        placeholder="Enter WhatsApp or Phone Number (+91...)"
                        value={notifyPhoneNumber}
                        onChange={(e) => setNotifyPhoneNumber(e.target.value)}
                        className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-orange-200 bg-white focus:outline-hidden focus:border-[#F66710]"
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
                        className="px-4 py-2 bg-[#F66710] hover:bg-orange-600 text-white rounded-xl font-bold text-xs transition cursor-pointer shrink-0 shadow-xs"
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
                    className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
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

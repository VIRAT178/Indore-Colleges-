import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  ArrowRight, 
  Search, 
  Sparkles, 
  GraduationCap, 
  Building, 
  Award, 
  TrendingUp,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// College-oriented blogs list
const COLLEGE_BLOGS = [
  {
    id: 'indore-admissions-2026',
    title: 'Indore College Admissions Guide (2026-27)',
    category: 'Admission Guides',
    date: 'June 28, 2026',
    readTime: '5 min read',
    image: '/bm-college.jpg',
    excerpt: 'Everything Indore students need to know about college registration deadlines, entrance tests, and seat choices.',
    author: 'Prof. S.K. Sharma',
    role: 'Senior Academic Advisor',
    content: [
      'Selecting the right higher education institute in Indore is a major milestone for students. With the academic session of 2026-27 approaching, major colleges like IIT Indore, IIM Indore, and SGSITS are rolling out their counselling schedules.',
      'Admission Checklist: Keep critical documents ready: Class 10 & 12 Marksheets, Entrance Exam Score Cards (JEE, NEET, CAT, IPMAT), Domicile certificate, and Aadhar card of parent and student.',
      'Verification Steps: Always check the AICTE approval and UGC accreditation before securing seats. Visit campuses to inspect physical lab infrastructure and library assets.',
      'Fee Structures: Fees range widely in Indore—from ₹30,000 in state colleges to ₹3,00,000+ per semester in premium private institutes.'
    ]
  },
  {
    id: 'engineering-branches',
    title: 'Top Indore Engineering & Management Streams',
    category: 'Engineering & MBA',
    date: 'May 30, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Branch guidelines and placement insights from IIT Indore & SGSITS experts.',
    author: 'Dr. Neha Upadhyay',
    role: 'Placement Cell Lead',
    content: [
      'Indore is a unique educational hub in Central India, boasting both an IIT and an IIM in the same city limits.',
      'According to recent placement stats from SGSITS, DAVV, and IIT Simrol, Computer Science (CSE) and Artificial Intelligence & Data Science (AI-DS) remain the highest-earning streams with average packages touching ₹18 LPA to ₹35 LPA.',
      'However, Core Streams (Civil, Mechanical, and Electrical) are experiencing a revival due to heavy infrastructure investments and automation. Specialized Management streams (MBA in Business Analytics or Financial Technology) at IIM Indore are reporting 100% placement outcomes.',
      'Expert Tip: Focus on institutions that provide hands-on industry research modules and live internships in Indore Sanwer Road and Super Corridor tech districts.'
    ]
  },
  {
    id: 'national-vs-state-unis',
    title: 'National vs State Universities: A Comprehensive Comparison',
    category: 'Career Counseling',
    date: 'June 15, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    excerpt: 'A comparison of curriculum depth, placements, and campus amenities for Indore college students.',
    author: 'Er. Rajesh Verma',
    role: 'Career Counselor',
    content: [
      'One of the most frequent debates during counseling at the Indore desk is whether to choose central/national universities (like IIT/IIM) or state-affiliated colleges (like DAVV/SGSITS).',
      'National Advantage: Highly standardized nationwide curriculum, outstanding global placements, and direct industry research tie-ups. Ideal for students aiming for global career opportunities.',
      'State-Affiliated Advantage: Optimized tuition rates, high seat availability, and state domicile reservations in competitive postgraduate entries.',
      'In conclusion, choose National institutes for high-exposure placement programs, and State-Affiliated colleges for highly specialized local careers and competitive pricing.'
    ]
  },
  {
    id: 'top-indore-campus-infrastructure',
    title: 'Top 5 College Campuses in Indore with Exceptional Infrastructure',
    category: 'Campus Reviews',
    date: 'May 10, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    excerpt: 'An inside look into laboratories, smart lecture halls, sport complexes, and library facilities.',
    author: 'Amit Trivedi',
    role: 'Education Journalist',
    content: [
      'Modern learning requires state-of-the-art facilities. We took a look at physical layouts, tech labs, sports setups, and campus safety measures across college networks in Indore.',
      'IIT Indore: Boasts a sprawling 501-acre green campus in Simrol with world-class cleanroom facilities, advanced materials research center, and highly sophisticated student hostels.',
      'IIM Indore: Situated on a scenic hillock of Prabandh Shikhar, its 193-acre campus offers state-of-the-art Harvard-style case classrooms, swimming pools, and extensive student activity arenas.',
      'SGSITS: Offers unmatched historical significance in the center of Indore with 35-acres of packed high-tech laboratory wings, computer-aided design labs, and mechanical testing workshops.'
    ]
  },
  {
    id: 'scholarships-and-funding',
    title: 'How to Secure College Scholarships and Tuition Waivers in Indore',
    category: 'Admission Guides',
    date: 'April 22, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Complete guide to state-sponsored scholarship plans, merit awards, and sports quota applications.',
    author: 'Sanjay Jain',
    role: 'Admissions Officer',
    content: [
      'Do not let tuition costs stop your higher education dreams. Indore offers premium state-backed and private scholarship schemes that can cover up to 100% of your academic fees.',
      'Medhavi Chhatra Yojana: A flag-ship Madhya Pradesh state government scholarship that pays the full tuition fee for qualifying students scoring above 70% in board exams.',
      'Merit-Based Awards: Private universities (like IPS Academy, Sage, and Medi-caps) offer automated percentage-based waivers directly during registration rounds.',
      'Sports and Special Quotas: National-level sports performers can access up to 50% relaxation in eligibility criteria and immediate direct entry paths.'
    ]
  }
];

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeBlog, setActiveBlog] = useState<typeof COLLEGE_BLOGS[0] | null>(null);

  // Filter logic
  const categories = ['All', 'Admission Guides', 'Engineering & MBA', 'Career Counseling', 'Campus Reviews'];
  
  const filteredBlogs = COLLEGE_BLOGS.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen pb-24">
      
      {/* 1. HERO HEADER AREA (Styled with premium college branding, explicitly stating "Colleges Oriented") */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-500/5 via-rose-500/5 to-amber-500/5 py-16 border-b border-rose-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center space-x-1.5 text-[10px] text-red-600 bg-red-100 font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-6">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>Colleges & Universities Oriented</span>
          </span>
          
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
            Admission & Campus Guidance <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-500">Only for College Aspirants</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed mb-8 font-light">
            Stay ahead with the latest admissions calendars, counseling schedules, placement stats, and campus facility breakdowns compiled by our expert Indore academic panel.
          </p>
        </div>
      </section>

      {/* 2. MAIN BLOG VIEWPORT SECTION */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <AnimatePresence mode="wait">
            {!activeBlog ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key="list"
              >
                {/* Category Filters row */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                        selectedCategory === cat 
                          ? 'bg-red-600 text-white shadow-md shadow-red-600/15 scale-102'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {filteredBlogs.length === 0 ? (
                  <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200 max-w-lg mx-auto">
                    <BookOpen className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600 font-extrabold text-sm">No college guides match your criteria.</p>
                    <p className="text-xs text-gray-400 mt-1">Try resetting the category filter or changing your search terms.</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBlogs.map((blog) => (
                      <article 
                        key={blog.id}
                        className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between"
                      >
                        <div>
                          <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
                            <img src={blog.image} alt={blog.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                            <span className="absolute top-3.5 left-3.5 bg-gray-950/80 text-white text-[9px] font-extrabold tracking-widest px-2.5 py-1 rounded-full uppercase">
                              {blog.category}
                            </span>
                          </div>

                          <div className="p-6">
                            <div className="flex items-center space-x-2 text-[10px] text-gray-400 font-bold mb-2">
                              <span>{blog.date}</span>
                              <span>&bull;</span>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{blog.readTime}</span>
                              </div>
                            </div>

                            <h3 
                              onClick={() => setActiveBlog(blog)}
                              className="font-extrabold text-base text-gray-950 hover:text-red-600 transition leading-snug cursor-pointer mb-2.5 line-clamp-2"
                            >
                              {blog.title}
                            </h3>

                            <p className="text-xs text-gray-500 font-light leading-relaxed line-clamp-3">
                              {blog.excerpt}
                            </p>
                          </div>
                        </div>

                        <div className="p-6 pt-0 border-t border-gray-50 flex items-center justify-between mt-4">
                          <div className="text-[10px]">
                            <p className="font-extrabold text-gray-900">{blog.author}</p>
                            <p className="text-gray-400 font-light">{blog.role}</p>
                          </div>
                          <button
                            onClick={() => setActiveBlog(blog)}
                            className="flex items-center space-x-1.5 text-xs font-bold text-red-600 hover:underline"
                          >
                            <span>Read Article</span>
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                key="detail"
                className="max-w-3xl mx-auto"
              >
                {/* Back Button */}
                <button 
                  onClick={() => setActiveBlog(null)}
                  className="inline-flex items-center space-x-2 text-xs font-bold text-gray-600 hover:text-red-600 transition mb-8 bg-gray-100 px-4 py-2 rounded-xl"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to College Guides</span>
                </button>

                {/* Main Article Image */}
                <div className="aspect-21/9 rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50 mb-8">
                  <img src={activeBlog.image} alt={activeBlog.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
                               {/* Meta details */}
                <span className="inline-flex items-center space-x-1 text-[10px] text-red-600 bg-red-50 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                  {activeBlog.category}
                </span>

                <h2 className="text-2xl sm:text-4xl font-black text-gray-950 tracking-tight leading-tight mb-4">
                  {activeBlog.title}
                </h2>

                <div className="flex items-center space-x-4 border-b border-gray-100 pb-6 mb-8 text-xs text-gray-500">
                  <div>
                    <span className="font-bold text-gray-900">{activeBlog.author}</span>
                    <span className="text-gray-400 font-light block">{activeBlog.role}</span>
                  </div>
                  <span className="text-gray-200">|</span>
                  <span>{activeBlog.date}</span>
                  <span className="text-gray-200">|</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{activeBlog.readTime}</span>
                  </span>
                </div>

                {/* Article Body Content */}
                <div className="space-y-6 text-sm text-gray-600 leading-relaxed font-light">
                  {activeBlog.content.map((p, idx) => (
                    <p key={idx} className="first-of-type:text-base first-of-type:font-normal first-of-type:text-gray-900">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Sidebar callout inside blog reader */}
                <div className="bg-red-50/50 border border-red-100 rounded-3xl p-6 sm:p-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h4 className="font-extrabold text-sm text-red-600 flex items-center gap-1.5">
                      <Sparkles className="h-4.5 w-4.5 text-red-600" />
                      <span>Confused About Placement Branches?</span>
                    </h4>
                    <p className="text-xs text-red-600/70 font-light mt-1">
                      Our experts generate direct choice-locking lists based on cutoff percentiles in 2 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveBlog(null);
                      // Scroll to target form
                      setTimeout(() => {
                        document.getElementById('counseling-form-box')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition shrink-0 shadow-lg shadow-red-600/10"
                  >
                    Get Counseling Guide
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

    </div>
  );
}

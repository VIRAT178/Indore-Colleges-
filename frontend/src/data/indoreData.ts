/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Institute } from '../types';

export const INDORE_INSTITUTES: Institute[] = [
  // --- COLLEGES, UNIVERSITIES & TECH INST ---
  {
    id: 'malwa-institute',
    name: 'Malwa Institute of Science & Technology',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'AICTE',
    location: 'Limbodi',
    feePerAnnum: 75000,
    rating: 4.7,
    totalReviews: 24,
    image: '/malwa_institute_campus.jpg',
    description: 'Malwa Institute of Science and Technology (MIST Indore) is a premier engineering and business administration institute offering Undergraduate, Postgraduate, and Diploma courses in various specializations. Possessing world-class in-house facilities like massive auditoriums, an amphitheater, and its own fleet of free buses, the college grooms students to match modern corporate cultures.',
    facilities: ['Library', 'Laboratory', 'Cafeteria', 'Sports Arena', 'Medical Center', 'Hostels', 'Auditorium', 'Advanced Computer Labs', 'Modern Classrooms'],
    establishedYear: 2007,
    coordinates: { lat: 22.6680, lng: 75.8890 },
    contactEmail: 'admissions@mistindore.com',
    contactPhone: '0731-6777777',
    website: 'http://mistindore.com/',
    address: 'P.O. Palia, Hatod Road, Limbodagari, Behind Aurobindo Hospital, Limboda, Indore - 453111, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (8 km)',
    approval: 'AICTE Approved, Affiliated to Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV)',
    selectionCriteria: 'Entrance-based. BE/B.Tech admissions via JEE Main score and MP DTE Counseling. Diploma via MP Pre-Polytechnic Test. ME/M.Tech via GATE score.',
    updates: [
      'MP Counselling Cutoff 2026 has been released. BTech Round 1 Cutoff Rank is 1101941-1501100 for the General Category.',
      'Ongoing Admission Timeline for BBA/BBM: Jun 22, 2026 - Aug 14, 2026.'
    ],
    coursesList: [
      { name: 'Bachelor of Technology [B.Tech]', duration: '4 Years', fees: '₹3 Lakh Total Fees', specializations: ['CS', 'IT', 'ME', 'CE', 'EC'] },
      { name: 'Master of Business Administration [MBA]', duration: '2 Years', fees: '₹90,000 Total Fees', specializations: ['Marketing', 'HR', 'Finance', 'Production & Operations', 'IS', 'BA'] },
      { name: 'Bachelor of Physiotherapy [BPT]', duration: '4 Years', fees: '₹2.8 Lakh Total Fees' },
      { name: 'Integrated BBA+MBA', duration: '5 Years', fees: '₹2.95 Lakh Total Fees' },
      { name: 'Bachelor in Medical Laboratory Technology [BMLT]', duration: '3 Years', fees: '₹2.1 Lakh Total Fees' },
      { name: 'BSC - IT & Electronics', duration: '3 Years', fees: 'Varies', specializations: ['Web Development', 'Android Mobile App Development'] },
      { name: 'B.Com. (Plain | Tax | Foreign Trade)', duration: '3 Years', fees: 'Varies' }
    ],
    placements: {
      highest: 'INR 15.40 LPA',
      average: 'INR 7.75 LPA',
      lowest: 'INR 3.60 LPA',
      recruiters: ['Wipro', 'Collabera', 'Impetus', 'NIIT', 'Calsoft', 'Genpact', 'Capgemini', 'Zycus', 'Jaro Education']
    },
    facultyList: [
      { name: 'Shri Ram Swaroop Shivhare', qualification: 'Chairman' },
      { name: 'Dr. M.S. Murthy', qualification: 'B.Tech, M.Tech, Ph.D.' },
      { name: 'Bhushan Akhare', qualification: 'B.E., M.E.' },
      { name: 'Mamta Mukati', qualification: 'B.E. (Chemical Engg.)' },
      { name: 'Vinod Mahajan', qualification: 'B.E., Diploma, M.Tech.' },
      { name: 'Ashish Pathak', qualification: 'B.E., Diploma, M.Tech.' },
      { name: 'Anil Ghyar', qualification: 'B.E., M.E.' },
      { name: 'Vivek Shukla', qualification: 'B.E., M.Tech' },
      { name: 'Saddam Mansuri', qualification: 'B.E., M.E.' },
      { name: 'Praveen Chaurasia', qualification: 'B.E., M.E.' }
    ],
    cutoffs: [
      { course: 'B.Tech Information Technology', rank: '1101941' },
      { course: 'B.Tech Computer Science Engineering', rank: '1476320' },
      { course: 'B.Tech Artificial Intelligence and Machine Learning', rank: '1500246' },
      { course: 'B.Tech Mechanical Engineering', rank: '1501100' }
    ]
  },
  {
    id: 'iit-indore',
    name: 'Indian Institute of Technology (IIT) Indore',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'UGC',
    location: 'Simrol',
    feePerAnnum: 299400,
    rating: 4.2,
    totalReviews: 186,
    image: '/iit-indore.jpg',
    description: 'Indian Institute of Technology Indore (IIT Indore), established in 2009, is an autonomous public university of National Importance located on a 501.42-acre state-of-the-art campus in Simrol. Highly ranked nationally and globally, the institute is prominent for elite research, strong multi-disciplinary engineering programs, first-class single occupancy hosteling configurations, and leading technology transfer facilities.',
    facilities: ['Advanced Research Labs', 'Supercomputer Facility', 'Single Occupancy Hostels', 'Sports Complex', '24/7 Library', 'Start-up Incubator', 'Central Workshop', 'Health Centre'],
    establishedYear: 2009,
    coordinates: { lat: 22.5204, lng: 75.9207 },
    contactEmail: 'admissions@iiti.ac.in',
    contactPhone: '+91 731 6603555',
    website: 'http://www.iiti.ac.in/',
    address: 'Khandwa Road, Simrol, Indore - 453552, Madhya Pradesh, India',
    approval: 'Autonomous Public University recognized by MHRD, Govt. of India',
    selectionCriteria: 'Entrance-based. B.Tech via JEE Advanced and JoSAA counseling. M.Tech via GATE and COAP counseling. M.Sc via IIT JAM and JOAPS counseling.',
    updates: [
      'JEE Advanced 2026 Cutoff Ranks are published. The Round 1 CSE closing rank for gender-neutral is 1639.',
      'JoSAA 2026 Round 4 reporting and withdrawal windows are currently open (Ongoing: Jul 10 - Jul 14, 2026).'
    ],
    coursesList: [
      { name: 'Bachelor of Technology [B.Tech]', duration: '4 Years', fees: '₹2,99,400 (1st Year Fees)', specializations: ['Computer Science & Eng', 'Mathematics & Computing', 'Electrical Eng', 'Mechanical Eng', 'Space Sci & Eng', 'Engineering Physics', 'Chemical Eng', 'Civil Eng', 'Metallurgical Eng & Materials Sci'] },
      { name: 'Master of Technology [M.Tech]', duration: '2 Years', fees: '₹1,14,600 (1st Year Fees)', specializations: ['Biomedical Eng', 'Computer Science & Eng', 'Communication & Signal Processing', 'VLSI Design & Nanoelectronics', 'Advanced Manufacturing', 'Applied Optics', 'Electrical Vehicle Eng', 'Mechanical System Design'] },
      { name: 'Master of Science [M.Sc]', duration: '2 Years', fees: '₹74,000 (1st Year Fees)', specializations: ['Biotechnology', 'Chemistry', 'Mathematics', 'Astronomy', 'Physics'] },
      { name: 'Doctor of Philosophy [Ph.D]', duration: '3 Years', fees: '₹1,63,400 (1st Year Fees)', specializations: ['Psychology', 'Engineering', 'Sciences'] }
    ],
    placements: {
      highest: 'INR 1.37 Crore',
      average: 'INR 23.91 LPA',
      lowest: 'INR 10.00 LPA (MTech Median)',
      recruiters: ['Google', 'Amazon', 'Microsoft', 'Deloitte', 'Accenture', 'Adobe', 'Goldman Sachs', 'Samsung', 'Oracle', 'Zomato', 'Qualcomm']
    },
    facultyList: [
      { name: 'Professor Suhas S. Joshi', qualification: 'Director' },
      { name: 'Prof. Narendra S. Chaudhari', qualification: 'CSE Department' },
      { name: 'Prof. Abhishek Srivastava', qualification: 'CSE Department' },
      { name: 'Prof. Amod C. Umarikar', qualification: 'Electrical Engineering' },
      { name: 'Prof. Ram Bilas Pachori', qualification: 'Electrical Engineering' },
      { name: 'Dr. Anand Parey', qualification: 'Mechanical Engineering' },
      { name: 'Dr. Satyajit Chatterjee', qualification: 'Mechanical Engineering' },
      { name: 'Dr. Bhupesh Kumar Lad', qualification: 'Mechanical Engineering' },
      { name: 'Dr. I.A. Palani', qualification: 'Mechanical Engineering' },
      { name: 'Dr. Parasharam M. Shirage', qualification: 'Metallurgy Engineering & Materials Science' },
      { name: 'Prof. Preeti A. Bhobe', qualification: 'Physics Department' },
      { name: 'Dr. Satya S. Bulusu', qualification: 'Chemistry Department' },
      { name: 'Dr. Sharad Gupta', qualification: 'Biosciences and Biomedical Engineering' },
      { name: 'Prof. Rajesh Kumar', qualification: 'Physics Department' },
      { name: 'Prof. Shaikh M. Mobin', qualification: 'Chemistry Department' },
      { name: 'Prof. Sk. Safique Ahmad', qualification: 'Mathematics Department' },
      { name: 'Prof. Swadesh Kumar Sahoo', qualification: 'Mathematics Department' },
      { name: 'Dr. Prashant Kodgire', qualification: 'Biosciences and Biomedical Engineering' },
      { name: 'Prof. Abhirup Datta', qualification: 'Astronomy, Astrophysics & Space Engineering HOD' }
    ],
    scholarships: [
      { name: 'Central Sector Scholarship', criteria: 'SC/ST category 1st year B.Tech', benefits: 'Financial support for low income families (< 4.5 lakhs)' },
      { name: 'Merit Cum Means (MCM) Scholarship', criteria: 'Gen/OBC based on merit', benefits: 'Offered to 25% of students' },
      { name: 'Samsung Star Scholarship', criteria: 'From Jawahar Navodaya Vidyalaya', benefits: 'Sponsorship by Samsung India' }
    ],
    cutoffs: [
      { course: 'B.Tech Computer Science Engineering', rank: '1639' },
      { course: 'B.Tech Mathematics and Computing', rank: '2017' },
      { course: 'B.Tech Electrical Engineering', rank: '3113' },
      { course: 'B.Tech Engineering Physics', rank: '6793' },
      { course: 'B.Tech Mechanical Engineering', rank: '7079' },
      { course: 'B.Tech Space Science and Engineering', rank: '7221' }
    ]
  },
  {
    id: 'iim-indore',
    name: 'Indian Institute of Management (IIM) Indore',
    type: 'college',
    category: 'Management',
    boardOrAffiliation: 'Autonomous',
    location: 'Rau',
    feePerAnnum: 1051000,
    rating: 4.3,
    totalReviews: 82,
    image: '/iim-indore.jpg',
    description: 'Indian Institute of Management Indore (IIM Indore), established in 1996, is a premier management institution of National Importance. Prominent for its five-year Integrated Programme in Management (IPM), high standard Post Graduate Programme (PGP/MBA), and Executive programs, IIM Indore holds Triple Crown Accreditation (EQUIS, AACSB, AMBA) and delivers stellar leadership talent globally.',
    facilities: ['Hilltop Campus', 'Auditorium-1 (300 capacity)', 'Auditorium-2 (800 capacity)', 'Sports Stadium & Complex', 'Night Canteen (11 PM - 5 AM)', 'Learning Centre Library', 'High-speed LAN Hostels', 'Swimming Pool', 'Digital Finance Lab'],
    establishedYear: 1996,
    coordinates: { lat: 22.6288, lng: 75.7836 },
    contactEmail: 'pgpadmission@iimidr.ac.in',
    contactPhone: '0731-2439666',
    website: 'https://iimidr.ac.in/',
    address: 'Prabandh Shikhar, Rau-Pithampur Road, Indore - 453556, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 16 km)',
    approval: 'Autonomous Institution of National Importance, EQUIS, AACSB & AMBA Accredited',
    selectionCriteria: 'Entrance-based. PGP (MBA) via CAT percentile followed by Written Ability Test (WAT) and Personal Interview (PI). IPM via IPMAT entrance exam.',
    updates: [
      'The institute has achieved 100% placement for the 2023-25 batch with over 225 recruiters, with the highest package reaching INR 70 LPA.',
      'CAT sectional cutoff for shortlisting remains at 80 percentile across VARC, DILR, and QA, with a 90 overall percentile threshold.'
    ],
    coursesList: [
      { name: 'Post Graduate Programme in Management [PGP/MBA]', duration: '2 Years', fees: '₹10.51 Lakhs (1st Year Fees)', specializations: ['General', 'Human Resources'] },
      { name: 'Integrated Programme in Management [IPM]', duration: '5 Years', fees: '₹44.8 Lakhs (Total Fees)' },
      { name: 'Executive Post Graduate Programme [EPGP]', duration: '1 Year', fees: '₹27.77 Lakhs (Total Fees)' },
      { name: 'Doctoral Programme in Management [DPM]', duration: '3-4 Years', fees: '₹75,000 (1st Year Fees)' }
    ],
    placements: {
      highest: 'INR 70.00 LPA',
      average: 'INR 29.75 LPA',
      lowest: 'INR 27.00 LPA (Median Package)',
      recruiters: ['Everest Group', 'EY', 'GEP Worldwide', 'Graviton Consulting', 'Indus Insights', 'Infosys Consulting', 'Kearney', 'KPMG', 'PwC India', 'Goldman Sachs', 'Morgan Stanley', 'McKinsey', 'Bain & Company', 'Aditya Birla', 'Adobe', 'Barclays', 'Capgemini', 'FedEx', 'Flipkart']
    },
    facultyList: [
      { name: 'Professor Himanshu Rai', qualification: 'Director' },
      { name: 'Prof. Swatantra', qualification: 'Department of Communication' },
      { name: 'Sayantan Mukherjee', qualification: 'Department of Communication' },
      { name: 'Joysankar Bhattacharya', qualification: 'Department of Economics' },
      { name: 'Indrajit Thakurata', qualification: 'Department of Economics' },
      { name: 'Surya Bhushan Kumar', qualification: 'Department of Finance and Accounting' },
      { name: 'Hariprasad B', qualification: 'Department of Finance and Accounting' },
      { name: 'Saurabh Kumar', qualification: 'Department of Information Systems' },
      { name: 'Madhukar Dayal', qualification: 'Department of Information Systems' },
      { name: 'Sabita Mahapatra', qualification: 'Department of Marketing' },
      { name: 'Aditya Billore', qualification: 'Department of Marketing' }
    ],
    scholarships: [
      { name: 'Need Based Financial Assistance (NBFA) Scheme', criteria: 'Family income less than INR 12 Lakh per annum', benefits: 'Sponsorship of interest on student education loans' },
      { name: 'Government of India Post Matric Scholarship', criteria: 'Reserved category SC/ST/OBC criteria compliance', benefits: 'Full/Partial Tuition fee waivers' }
    ],
    cutoffs: [
      { course: 'Post Graduate Programme in Management (PGPM)', rank: '90 Percentile Overall (CAT)' },
      { course: 'PG Program in Management - Human Resources', rank: '90 Percentile Overall (CAT)' }
    ]
  },
  {
    id: 'sgsits',
    name: 'Shri Govindram Seksaria Institute of Technology and Science (SGSITS)',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'AICTE',
    location: 'Vallabh Nagar',
    feePerAnnum: 95000,
    rating: 3.7,
    totalReviews: 364,
    image: '/sgsits.jpg',
    description: 'Shri Govindram Seksaria Institute of Technology and Science (SGSITS Indore), established in 1952, is a premier government-aided autonomous technical institute. Affiliated with RGPV and approved by the UGC and AICTE with a NAAC Grade A accreditation, it is ranked among the finest engineering colleges in Central India, acclaimed for high merit-based intake and strong core/software job placements.',
    facilities: ['Central Library', 'Computer Center', 'Gymnasium', 'Hostels (Separate Boys & Girls)', 'Dispensary', 'CIDI Centre', 'Central Workshop', 'Lush Green Grounds', 'High-speed Wi-Fi'],
    establishedYear: 1952,
    coordinates: { lat: 22.7248, lng: 75.8710 },
    contactEmail: 'director@sgsits.ac.in',
    contactPhone: '0731-2541254',
    website: 'http://www.sgsits.ac.in',
    address: '23 Sir M. Visvesvaraya Marg, Vallabh Nagar, Indore - 452003, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 7 km)',
    approval: 'Government-Aided Autonomous Institute, Affiliated to RGPV, UGC and AICTE Approved, NAAC Grade A',
    selectionCriteria: 'Entrance-based. B.Tech/BE admissions via JEE Main score and MP DTE Counseling. M.Tech via GATE score. MCA/MBA via MP DTE centralized counseling process.',
    updates: [
      'JEE Main general category Round 1 Cutoff Rank starts from 21533 for B.Tech Computer Science Engineering.',
      'SGSITS has been ranked 152nd in India for B.Tech and 6th in Madhya Pradesh by Collegedunia 2026.'
    ],
    coursesList: [
      { name: 'Bachelor of Technology [B.Tech]', duration: '4 Years', fees: '₹1.0 Lakh - ₹1.81 Lakh (1st Year Fees)', specializations: ['Computer Science and Engineering', 'Information Technology', 'Electronics & Telecommunication', 'Electronics & Instrumentation', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Biomedical Engineering', 'Industrial & Production Engineering'] },
      { name: 'Master of Computer Applications [MCA]', duration: '2 Years', fees: '₹2.45 Lakhs (1st Year Fees)' },
      { name: 'Master of Business Administration [MBA]', duration: '2 Years', fees: '₹1.23 Lakhs (1st Year Fees)', specializations: ['General Management', 'Hospital Administration'] },
      { name: 'Master of Technology [M.Tech]', duration: '2 Years', fees: '₹88,550 (1st Year Fees)', specializations: ['Quantum Computing', 'Power Electronics', 'Information Technology', 'Transportation Engineering', 'Computer Engineering', 'CAD/CAM and Automation', 'Structural Engineering', 'Environmental Engineering'] }
    ],
    placements: {
      highest: 'INR 44.00 LPA',
      average: 'INR 7.00 LPA (UG Median)',
      lowest: 'INR 4.50 LPA (PG Median)',
      recruiters: ['Amazon', 'Google', 'Adobe', 'Samsung', 'Deloitte', 'Groww', 'Infosys', 'TCS', 'Wipro', 'Accenture', 'Cognizant']
    },
    facultyList: [
      { name: 'Prof. Neetesh Purohit', qualification: 'Director' },
      { name: 'Dr. Prashant P. Bansod', qualification: 'HOD, Department of Biomedical Engineering' },
      { name: 'Dr. S. M. Narulkar', qualification: 'HOD, Department of Civil Engineering' },
      { name: 'Dr. H. K. Mahiyar', qualification: 'Professor, Department of Civil Engineering' },
      { name: 'Dr. Vandan Tewari', qualification: 'Professor & Head, Department of Computer Engineering' },
      { name: 'Prof. D A Mehta', qualification: 'Professor, Department of Computer Engineering' },
      { name: 'Dr. G. D. Thakar', qualification: 'Professor & Head, Department of MBA' },
      { name: 'Dr. Anupama Paliwal', qualification: 'Assistant Professor, Department of MBA' }
    ],
    scholarships: [
      { name: 'State Post Matric Scholarship', criteria: 'SC/ST/OBC categories', benefits: 'Tuition and maintenance fee reimbursement schemes' },
      { name: 'Mukhyamantri Medhavi Vidyarthi Yojana (MMVY)', criteria: 'MP State meritorious criteria', benefits: 'Complete tuition fee funding support' }
    ],
    cutoffs: [
      { course: 'B.Tech Computer Science Engineering', rank: '21533' },
      { course: 'B.Tech Information Technology', rank: '26568' },
      { course: 'B.Tech Electronics & Telecommunication', rank: '35170' },
      { course: 'B.Tech Electronics and Instrumentation', rank: '39962' },
      { course: 'B.Tech Electrical Engineering', rank: '41294' },
      { course: 'B.Tech Mechanical Engineering', rank: '47041' }
    ]
  },
  {
    id: 'davv',
    name: 'Devi Ahilya Vishwavidyalaya (DAVV)',
    type: 'college',
    category: 'Arts & Science',
    boardOrAffiliation: 'UGC',
    location: 'Takshashila Campus',
    feePerAnnum: 45000,
    rating: 3.7,
    totalReviews: 2214,
    image: '/davv.jpg',
    description: 'Devi Ahilya Vishwavidyalaya (DAVV), established in 1964, is a premier state public university accredited with NAAC Grade A+ grade. Spanning across a lush 760-acre campus, it offers multi-disciplinary academic centers (including IET, IMS, IIPS, and School of Economics). The university caters to more than 270 affiliated colleges in the division, delivering exceptional academic, placement, and research ecosystems.',
    facilities: ['Takshashila Campus Wi-Fi', 'Central Library & e-Gyan Portal', 'High-Tech Workspaces & Labs', 'Boys & Girls Hostels', 'University Playgrounds', 'Hygienic Canteens & Cafeterias', 'Spacious Auditoriums', 'Health Centre', 'Sports Fields'],
    establishedYear: 1964,
    coordinates: { lat: 22.7121, lng: 75.8722 },
    contactEmail: 'registrar.davv@mp.gov.in',
    contactPhone: '0731-2524863',
    website: 'https://www.dauniv.ac.in/',
    address: 'Nalanda Campus, R. N. T. Marg, Indore - 452001, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 6 km)',
    approval: 'UGC Recognized State Public University, Approved by AICTE, NCTE, BCI & PCI, NAAC A+ Grade',
    selectionCriteria: 'Entrance-based. CUET-UG score for undergraduate B.A., B.Sc., B.Com., BBA, BCA, B.Pharma. CUET-PG score or DAVV-CET for professional MBA, MCA, LL.M, B.Ed. programs. JEE Main for B.Tech.',
    updates: [
      'Ranked 151-200 in the overall category by NIRF 2025.',
      'D.Pharma Round 1 closing rank for MP Counselling is 16204.'
    ],
    coursesList: [
      { name: 'Master of Business Administration [MBA]', duration: '2 Years', fees: '₹34,392 - ₹1.05 Lakhs (1st Year Fees)', specializations: ['Hospital Administration', 'Advertising Management & Public Relations', 'Business Analytics', 'Business Economics', 'Computer Management', 'Disaster Management', 'e-Commerce'] },
      { name: 'Bachelor of Technology [B.Tech] + Master of Technology [M.Tech]', duration: '5 Years', fees: '₹64,500 - ₹86,500 (1st Year Fees)', specializations: ['Artificial Intelligence', 'Data Science', 'Information Technology'] },
      { name: 'Bachelor of Pharmacy [B.Pharma]', duration: '4 Years', fees: '₹89,500 (1st Year Fees)' },
      { name: 'BALLB {Hons.}', duration: '5 Years', fees: '₹40,250 (1st Year Fees)' },
      { name: 'Bachelor of Education [B.Ed]', duration: '2 Years', fees: '₹44,711 (1st Year Fees)' },
      { name: 'Master of Computer Applications [MCA]', duration: '2 Years', fees: '₹86,500 (1st Year Fees)' }
    ],
    placements: {
      highest: 'INR 12.00 LPA',
      average: 'INR 5.60 LPA (Median Package)',
      lowest: 'INR 4.00 LPA',
      recruiters: ['TCS', 'Wipro', 'Deloitte', 'Infosys', 'Amazon', 'Flipkart', 'Vistara', 'Shakti Pumps', 'Balaji Wafers', 'HMD Wires']
    },
    facultyList: [
      { name: 'Dr. Rakesh Singhai', qualification: 'Vice Chancellor' },
      { name: 'Dr. P.K. Gupta', qualification: 'Professor' },
      { name: 'Dr. Rajiv Gupta', qualification: 'Professor' },
      { name: 'Dr. Ajai Kumar Jain', qualification: 'Lecturer' },
      { name: 'Dr. Vivek Sharma', qualification: 'Lecturer' },
      { name: 'Dr. B.P. Singh', qualification: 'Lecturer' },
      { name: 'Ms. Sona Fating', qualification: 'Lecturer' },
      { name: 'Ms. Anandita Chatterjee', qualification: 'Lecturer' },
      { name: 'Dr. C.C. Motiani', qualification: 'Lecturer' }
    ],
    scholarships: [
      { name: 'Post-Matric Scholarship Scheme', criteria: 'SC/ST/OBC students', benefits: 'Full/partial scholarship and concession' },
      { name: 'Single Girl Child Fellowship for Research', criteria: 'PhD candidates', benefits: 'Monthly stipends and research grants' }
    ],
    cutoffs: [
      { course: 'D.Pharm', rank: '16204' },
      { course: 'MBA Advertising Management & Public Relations', rank: '127' },
      { course: 'MBA Business Analytics', rank: '127' },
      { course: 'MBA Computer Management', rank: '127' }
    ]
  },
  {
    id: 'acropolis',
    name: 'Acropolis Institute of Technology and Research',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'AICTE',
    location: 'Bypass Road (Manglia)',
    feePerAnnum: 74000,
    rating: 3.8,
    totalReviews: 314,
    image: '/acropolis.jpg',
    description: 'Acropolis Institute of Technology and Research (AITR), established in 2005, is a prominent private engineering college in Indore. Affiliated with RGPV and approved by the AICTE with NBA accreditation for CSE, ME, and ECE departments, AITR delivers top-tier technical education. Known for its strong Career Development Cell (CDC), strict professional training modules, and outstanding campus placement programs, it prepares graduates for the modern IT and core sectors.',
    facilities: ['Smart Classrooms with Audio-Visual Aids', 'Centrally A/C Auditorium (250 capacity)', 'Group Discussion & Seminar Halls', 'Centrally Stocked Library (55,000+ books)', 'EDUSAT-ISRO Lab for Online Lectures', 'Sports Fields (Basketball, Badminton, Cricket)', 'Hygienic Canteens', 'Fleet of over 70 Bus Services'],
    establishedYear: 2005,
    coordinates: { lat: 22.7915, lng: 75.9080 },
    contactEmail: 'admission@acropolis.in',
    contactPhone: '0731-4730000',
    website: 'http://aitr.ac.in/',
    address: 'Acropolis Institute Bypass Road, Manglia Square, Manglia, Indore - 453771, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 15 km)',
    approval: 'AICTE Approved, Affiliated to RGPV, NBA Accredited (for CSE, ME, ECE)',
    selectionCriteria: 'Entrance-based. B.E./B.Tech admissions via JEE Main score and MP DTE Counseling. MBA admissions via CMAT scores. M.Tech via GATE scores.',
    updates: [
      'MP Counselling Cutoff 2026 has been released. BTech Round 1 Cutoff Rank is 306287-1165551 for the General Category.',
      'DTE MP Admission Timeline for MCA/MBA counseling is currently active.'
    ],
    coursesList: [
      { name: 'Bachelor of Technology [B.Tech / B.E.]', duration: '4 Years', fees: '₹74,000 - ₹93,000 (1st Year Fees)', specializations: ['Computer Science and Engineering', 'Information Technology', 'Artificial Intelligence and Machine Learning', 'Data Science', 'Cyber Security', 'Computer Science and Information Technology', 'Mechanical Engineering', 'Civil Engineering', 'Electronics & Communication Engineering'] },
      { name: 'Master of Business Administration [MBA]', duration: '2 Years', fees: '₹1.14 Lakhs (1st Year Fees)', specializations: ['Marketing', 'Finance', 'Human Resources'] },
      { name: 'Master of Computer Applications [MCA]', duration: '2 Years', fees: '₹85,000 (1st Year Fees)' },
      { name: 'BCA + MCA Integrated', duration: '5 Years', fees: '₹69,000 (1st Year Fees)' },
      { name: 'Diploma in Engineering (Polytechnic)', duration: '3 Years', fees: '₹26,000 (1st Year Fees)', specializations: ['Civil Engineering', 'Mechanical Engineering'] }
    ],
    placements: {
      highest: 'INR 12.00 LPA',
      average: 'INR 4.50 LPA',
      recruiters: ['TCS', 'Capgemini', 'Cognizant', 'Wipro', 'Persistent Systems', 'Impetus', 'Accolite', 'ADP', 'Amazon', 'Bajaj RX']
    },
    facultyList: [
      { name: 'Dr. S. C. Sharma', qualification: 'Director' },
      { name: 'Dr. Kamal Kumar Sethi', qualification: 'HOD, Department of Computer Science and Engineering' },
      { name: 'Dr. Shilpa Bhalerao', qualification: 'HOD, Department of CSIT' },
      { name: 'Dr. Namrata Tapasvi', qualification: 'Professor & HOD, Department of CSE (AI&ML)' },
      { name: 'Dr. U.B.S. Chandrawat', qualification: 'Professor & HOD, Department of ECE' },
      { name: 'Dr. Amit Marwah', qualification: 'Professor & HOD, Department of ME' },
      { name: 'Dr. Arvind Jaiswal', qualification: 'Associate Professor, Department of Information Technology' },
      { name: 'Mr. Darpan Kesore', qualification: 'Assistant Professor, Department of Civil Engineering' },
      { name: 'Mr. Rishi Gurjar', qualification: 'Assistant Professor, Department of Civil Engineering' },
      { name: 'Mr. Saurabh Jain', qualification: 'Associate Professor, Department Mechanical Engineering' },
      { name: 'Mr. Neeraj Gautam', qualification: 'Assistant Professor, Department Mechanical Engineering' }
    ],
    scholarships: [
      { name: 'Mukhyamantri Medhavi Vidyarthi Yojana (MMVY)', criteria: 'MP Domicile, 12th board high merit & qualifying JEE rank', benefits: 'Full tuition fee reimbursement support' },
      { name: 'Post Matric Scholarship', criteria: 'SC/ST/OBC category low-income students', benefits: 'Maintenance allowance and tuition fee exemptions' },
      { name: 'Dr. R.M. Sojatia Merit Scholarship', criteria: 'AITR semester-wise academic toppers', benefits: 'Cash rewards and semester fee reductions' },
      { name: 'Mr. Pradeep Sojatia Merit-cum-Means Scholarship', criteria: 'High merit and economically weaker section (EWS)', benefits: 'Financial aid towards tuition fees' }
    ],
    cutoffs: [
      { course: 'B.Tech Computer Science Engineering', rank: '306287' },
      { course: 'B.Tech Artificial Intelligence and Machine Learning', rank: '342658' },
      { course: 'B.Tech Data Science', rank: '402618' },
      { course: 'B.Tech Cyber Security', rank: '404343' },
      { course: 'B.Tech Computer Science and Information Technology', rank: '477633' },
      { course: 'B.Tech Information Technology', rank: '515238' }
    ]
  },
  {
    id: 'symbiosis-university',
    name: 'Symbiosis University of Applied Sciences (SUAS)',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'Private University',
    location: 'Super Corridor',
    feePerAnnum: 275000,
    rating: 4.0,
    totalReviews: 40,
    image: '/symbiosis-university.jpg',
    description: 'Symbiosis University of Applied Sciences (SUAS) Indore, established in 2016, is a self-financed private university specializing in skill development. Offering robust hands-on vocational models, modern laboratory layouts, and exceptional industry collaborations (including German universities), it focuses on producing industry-ready professionals in high employment tech and business sectors.',
    facilities: ['German Skill Labs', 'Mock Retail Stores', 'Tech Garages', 'Computer Labs (Fully Wi-Fi)', 'Hostel Blocks (Boys & Girls)', 'Rich Library (20,410+ books)', 'Swimming Pool', 'Badminton Courts', 'Table Tennis Room', 'Basketball Court', 'Cricket Grounds'],
    establishedYear: 2016,
    coordinates: { lat: 22.7680, lng: 75.8110 },
    contactEmail: 'admissions@suas.ac.in',
    contactPhone: '0731-2581300',
    website: 'http://www.suas.ac.in',
    address: 'Bada Bangadda, Super Corridor, New Airport, Indore - 453112, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 2 km)',
    approval: 'Approved by UGC and All India Council for Technical Education (AICTE)',
    selectionCriteria: 'Skill-CAT / Entrance test (National/State/SUAS) / Personal Interview depending on selected courses.',
    updates: [
      'Admission to MBA program is done on the basis of SNAP / CAT / MAT / CMAT / XAT / MAH-CET etc.',
      'Symbiosis Indore focus is skill development in high employment sectors to produce industry-ready professionals.'
    ],
    coursesList: [
      { name: 'Bachelor of Technology [B.Tech]', duration: '4 Years', fees: '₹2.75 Lakhs (Per Year)', specializations: ['Computer Science And IT', 'Mechatronics Engineering', 'Automobile Engineering'] },
      { name: 'Bachelor of Business Administration [BBA]', duration: '3 Years', fees: '₹2.60 Lakhs (Per Year)', specializations: ['Retail & E-Commerce', 'BFSI', 'Digital Media & Marketing', 'Logistics & Supply Chain Management'] },
      { name: 'Bachelor of Science [B.Sc] (Data Science)', duration: '3 Years', fees: '₹2.0 Lakhs (Per Year)' },
      { name: 'Master of Business Administration [MBA]', duration: '2 Years', fees: '₹6.25 Lakhs (Per Year)', specializations: ['BFSI', 'Marketing'] },
      { name: 'MBA-Tech Integrated', duration: '5 Years', fees: '₹2.75 Lakhs (Per Year)' }
    ],
    placements: {
      highest: 'INR 20.00 LPA',
      average: 'INR 5.50 LPA (Estimated)',
      lowest: 'INR 3.50 LPA',
      recruiters: ['Royal Enfield', 'Maruti Suzuki', 'Hyundai', 'Reliance', 'Big Bazar', 'TATA', 'Mahindra', 'Intellipaat', 'ICICI Securities Ltd', 'Wipro']
    },
    facultyList: [
      { name: 'Dr S. B. Mujumdar', qualification: 'Chancellor' },
      { name: 'Dr. Ajit Singh Tomar', qualification: 'Associate Professor' },
      { name: 'Dr. Shweta Mishra', qualification: 'Assistant Professor' },
      { name: 'Dr. Ajay Mishra', qualification: 'Assistant Professor' },
      { name: 'Dr. Pooja Talreja', qualification: 'Associate Professor' },
      { name: 'Dr. Charul Jain', qualification: 'Associate Professor' },
      { name: 'Dr. Neha Gupta', qualification: 'Associate Professor' },
      { name: 'Er. Ishwarlal Rathod', qualification: 'Assistant Professor' },
      { name: 'Dr. Devendra Chouhan', qualification: 'Assistant Professor' }
    ],
    scholarships: [
      { name: 'B.Tech Mechanical & Mechatronics Merit Scholarship', criteria: '10+2 score of 60% and above (strictly based on merit)', benefits: '20% to 50% waiver on first-year academic fees' }
    ],
    cutoffs: [
      { course: 'B.Tech Computer Science and IT', rank: 'JEE Main or SUAS Entrance Merit list' }
    ]
  },
  {
    id: 'svvv-indore',
    name: 'Shri Vaishnav Vidyapeeth Vishwavidyalaya (SVVV)',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'Private University',
    location: 'Sanwer Road',
    feePerAnnum: 115000,
    rating: 3.6,
    totalReviews: 270,
    image: '/svvv-indore.jpg',
    description: 'Shri Vaishnav Vidyapeeth Vishwavidyalaya (SVVV) Indore, established in 2015, is a prestigious self-financed private university in Indore, Madhya Pradesh. Approved by UGC, the Pharmacy Council of India, the Council of Architecture, and accredited by NBA, SVVV is highly recognized for its extensive range of specialized programs, state-of-the-art laboratory infrastructure, and excellent academic rigor.',
    facilities: ['Wi-Fi Campus', 'Central Library', 'Advanced Engineering Laboratories', 'Smart Classrooms', 'Boys & Girls Hostels', 'Canteen / Cafeteria', 'Auditorium & Seminar Halls', 'Sports Complex & Grounds', 'Transport Buses', 'Medical Desks', 'Gymnasium'],
    establishedYear: 2015,
    coordinates: { lat: 22.7840, lng: 75.8480 },
    contactEmail: 'admissions@svvv.edu.in',
    contactPhone: '0731-2729071',
    website: 'http://svvv.edu.in/',
    address: 'Ujjain Road, Indore - 453111, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 20 km)',
    approval: 'Approved by UGC, PCI, COA and NBA Accredited',
    selectionCriteria: 'Entrance-based. B.Tech via JEE Main or SVET (Shri Vaishnav Entrance Test). MBA via CAT/MAT/XAT/CMAT/ATMA/SVET. M.Tech via GATE or SVET.',
    updates: [
      'SVVV Admissions are currently open for all undergraduate, postgraduate, and research programs.',
      'Shri Vaishnav Vidyapeeth Vishwavidyalaya conducts its own SVET entrance test.'
    ],
    coursesList: [
      { name: 'Bachelor of Technology [B.Tech]', duration: '4 Years', fees: '₹4.28 Lakhs - ₹7.28 Lakhs (Total Fees)', specializations: ['Computer Science and Engineering', 'Electronics & Communication', 'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering'] },
      { name: 'Bachelor of Architecture [B.Arch]', duration: '5 Years', fees: '₹4.33 Lakhs (Total Fees)' },
      { name: 'Master of Business Administration [MBA]', duration: '2 Years', fees: '₹2.58 Lakhs - ₹3.48 Lakhs (Total Fees)', specializations: ['Agribusiness', 'International Business', 'Media Management', 'Family Business & Entrepreneurship', 'Tourism Management', 'Engineering Management'] },
      { name: 'Bachelor of Computer Applications [BCA]', duration: '3 Years', fees: '₹1.88 Lakhs - ₹2.03 Lakhs (Total Fees)', specializations: ['Big Data Analytics in collaboration with IBM'] },
      { name: 'Bachelor of Science [B.Sc]', duration: '3 Years', fees: '₹1.13 Lakhs - ₹1.88 Lakhs (Total Fees)', specializations: ['Biotechnology', 'Forensic Sciences'] },
      { name: 'Master of Technology [M.Tech]', duration: '2 Years', fees: '₹1.58 Lakhs (Total Fees)' },
      { name: 'Master of Science [M.Sc]', duration: '2 Years', fees: '₹98,000 - ₹1.68 Lakhs (Total Fees)' },
      { name: 'Ph.D', duration: '3 Years', fees: '₹2.48 Lakhs (Total Fees)', specializations: ['Management'] }
    ],
    placements: {
      highest: 'INR 47.00 LPA',
      average: 'INR 5.56 LPA',
      lowest: 'INR 5.85 LPA (Median Package)',
      recruiters: ['IMPETUS', 'IBM', 'Infosys', 'Piramal', 'HDFC Bank', 'VLCC', 'Wipro', 'TCS', 'Vardhman', 'Voltas', 'HSBC']
    },
    facultyList: [
      { name: 'Purushottamdas Pasari', qualification: 'Chancellor' },
      { name: 'Mr. ROHAN BORADE', qualification: 'Assistant Professor' },
      { name: 'Dr. Chinar Garg', qualification: 'Assistant Professor' },
      { name: 'Dr. Namit Gupta', qualification: 'Professor & HOD' },
      { name: 'Mr. Anil Kumar Jain', qualification: 'HOD & Assistant Professor' },
      { name: 'Dr. VIMAL KUMAR DIXIT', qualification: 'Assistant Professor' },
      { name: 'Dr. A. S. Rathore', qualification: 'Associate Professor and HOD' },
      { name: 'Mr. KAMAL BORANA', qualification: 'Associate Professor' },
      { name: 'Dr. Anand Rajavat', qualification: 'Director and Dean' },
      { name: 'Dr. JIGYASU DUBEY', qualification: 'Professor & HOD' },
      { name: 'Dr. Rupali Bhartiya', qualification: 'Associate Professor and HOD' },
      { name: 'Dr. SHYAM SUNDAR MEENA', qualification: 'Associate Professor' },
      { name: 'Dr. Rishu Roy', qualification: 'Professor' },
      { name: 'Dr. Pragya Jaroliya', qualification: 'Professor' },
      { name: 'Mr. VINOD DHAR', qualification: 'Professor & HOD' },
      { name: 'Dr. Chhavi Tiwari', qualification: 'Associate Professor and HOD' }
    ],
    scholarships: [
      { name: 'Girl Students Scholarship', criteria: 'First year girl students', benefits: '50% of Tuition Fee or INR 50,000' },
      { name: 'Meritorious Students Scholarship', criteria: '95% and above in 10+2 / Graduation', benefits: '100% of Tuition Fee' },
      { name: 'Meritorious Students Scholarship (Slab B)', criteria: '85% to 95% in 10+2 / Graduation', benefits: '30% of Tuition Fee' },
      { name: 'Meritorious MBA Students Scholarship', criteria: 'CAT 75 percentile+ / MAT,XAT,ATMA,CMAT,JEE 90 percentile+', benefits: '50% of Tuition Fee or INR 50,000' }
    ],
    cutoffs: [
      { course: 'MBA Agribusiness', rank: '75 Percentile (CAT)' },
      { course: 'MBA International Business', rank: '75 Percentile (CAT)' },
      { course: 'MBA Media Management', rank: '75 Percentile (CAT)' }
    ]
  },
  {
    id: 'sage-university',
    name: 'SAGE University',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'Private University',
    location: 'Bypass Road (Manglia)',
    feePerAnnum: 125000,
    rating: 3.9,
    totalReviews: 203,
    image: '/sage-university.jpg',
    description: 'SAGE University Indore, established in 2017 by the Sagar Group of Education Society, is an elite private university accredited with an A+ grade by NAAC. Operating on a modern 75-acre green hilltop campus, it is approved by UGC, AICTE, BCI, and PCI. SAGE focuses on professional, industry-aligned programs in Engineering, Management, Pharmacy, and Law with advanced Apple, Android, and AI/ML tech labs.',
    facilities: ['Apple Computer Lab', 'Android and AI/ML Labs', 'Central Library (60,000+ books)', 'Smart Classrooms', 'Auditorium', 'Prangan & Aangan Hostels (Boys & Girls)', 'Swimming Pool', 'Cricket & Football Grounds', 'Gymnasium', 'Modern Cafeteria', 'On-campus Medical Center'],
    establishedYear: 2017,
    coordinates: { lat: 22.7750, lng: 75.9220 },
    contactEmail: 'admission@sageuniversity.in',
    contactPhone: '9522578382',
    website: 'https://sageuniversity.in/',
    address: 'Kailod Kartal, Indore-Rau Bypass Road, Indore - 452020, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 22 km)',
    approval: 'UGC, AICTE, BCI, PCI Approved & NAAC A+ Accredited',
    selectionCriteria: 'Entrance-based & Merit-based. Admission via SAGE Entrance Exam (SEE), JEE Main, or qualifying board merit.',
    updates: [
      'SAGE SEE 2026 Phase 8 is scheduled for July 11-12, 2026, and Phase 9 is scheduled for July 25-26, 2026.',
      'B.Tech admissions are open, featuring direct admission options with 50% in 10+2 PCM.'
    ],
    coursesList: [
      { name: 'Bachelor of Technology [B.Tech]', duration: '4 Years', fees: '₹2.83 Lakhs - ₹10.43 Lakhs (Total Fees)', specializations: ['Computer Science and Engineering', 'Artificial Intelligence & Machine Learning', 'Data Science', 'Cyber Security'] },
      { name: 'Master of Business Administration [MBA]', duration: '2 Years', fees: '₹1.91 Lakhs - ₹6.31 Lakhs (Total Fees)', specializations: ['General', 'Marketing', 'Finance', 'HR', 'Business Analytics'] },
      { name: 'Bachelor of Business Administration [BBA]', duration: '3 Years', fees: '₹2.92 Lakhs - ₹6.37 Lakhs (Total Fees)' },
      { name: 'Master of Computer Applications [MCA]', duration: '2 Years', fees: '₹2.01 Lakhs (Total Fees)', specializations: ['Artificial Intelligence & Machine Learning'] },
      { name: 'Bachelor of Pharmacy [B.Pharm]', duration: '4 Years', fees: '₹5.23 Lakhs (Total Fees)' },
      { name: 'Bachelor of Laws [L.L.B.] {Hons.}', duration: '3 Years', fees: '₹2.62 Lakhs (Total Fees)' },
      { name: 'Bachelor of Science [B.Sc] (Hons.)', duration: '3 Years', fees: '₹1.72 Lakhs (Total Fees)', specializations: ['Forensic Science'] }
    ],
    placements: {
      highest: 'INR 1.50 Crore',
      average: 'INR 4.53 LPA (PG Median)',
      lowest: 'INR 2.85 LPA (UG Median)',
      recruiters: ['Salesforce', 'TCS', 'Infosys', 'Wipro', 'Cognizant', 'Juspay', 'ZS Associates', 'Capgemini', 'IBM']
    },
    facultyList: [
      { name: 'Er. Sanjeev Agrawal', qualification: 'Chancellor' },
      { name: 'Dr. Jamna Mishra', qualification: 'Professor & HOD, Journalism' },
      { name: 'Prof. Suranjit Kosta', qualification: 'Associate Professor, Computing' },
      { name: 'Ar. Akriti Dubey', qualification: 'Assistant Professor, Architecture' },
      { name: 'Dr. Smruti Sohani', qualification: 'Professor, Agriculture' },
      { name: 'Dr. Archana Dinesh', qualification: 'Professor, Psychology' },
      { name: 'Dr. Mukesh Keshri', qualification: 'Associate Professor, Finance' },
      { name: 'Dr. Sushil Beliya', qualification: 'Professor, Management' },
      { name: 'Dr. Pankaj Sharma', qualification: 'Professor, Management' },
      { name: 'Dr. Shubha R Singh', qualification: 'Associate Professor, Management' }
    ],
    scholarships: [
      { name: 'SAGE SEE Merit Scholarship Slab A', criteria: '95% and above in qualifying exam or SEE', benefits: '100% Tuition Fee Waiver' },
      { name: 'SAGE SEE Merit Scholarship Slab B', criteria: '90% - 95% in qualifying exam', benefits: '50% Tuition Fee Waiver' },
      { name: 'SAGE SEE Merit Scholarship Slab C', criteria: '80% - 90% in qualifying exam', benefits: '25% Tuition Fee Waiver' },
      { name: 'Early Bird Scheme', criteria: 'First Year UG/PG/Diploma early application', benefits: '10% Tuition Fee Waiver' }
    ],
    cutoffs: [
      { course: 'B.Tech Computer Science and Engineering', rank: 'JEE Main merit rank or board percentage (minimum 50%)' }
    ]
  },
  {
    id: 'nmims-indore',
    name: 'SVKM\'s NMIMS Indore Campus',
    type: 'college',
    category: 'Management',
    boardOrAffiliation: 'Private University',
    location: 'Super Corridor',
    feePerAnnum: 750000,
    rating: 4.5,
    totalReviews: 114,
    image: '/nmims-indore.jpg',
    description: 'SVKM\'s NMIMS Indore, established in 2017, is a state-of-the-art campus approved by the AICTE and accredited by NAAC with an A Grade. Renowned for its premium academic rigor, outstanding corporate connect, and exceptional leadership building, the institute offers highly specialized management, engineering, commerce, pharmacy, and law degrees on a sprawling 25-acre modern campus.',
    facilities: ['Bloomberg Terminals', 'Smart Boardrooms', 'Central Library (e-journals and print books)', 'A/C Classrooms & Hostels', 'Sports Courts (Cricket, Basketball, Badminton)', 'Central Air-conditioned Auditorium', 'Research & Innovation Labs', 'Canteen / Cafeteria', 'Round-the-clock Security'],
    establishedYear: 2017,
    coordinates: { lat: 22.7710, lng: 75.8150 },
    contactEmail: 'indore@nmims.edu',
    contactPhone: '0731-258150',
    website: 'https://indore.nmims.edu/',
    address: 'Off Super Corridor, Bada Bangarda, Tehsil: Hatod, Indore - 453112, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 5 km)',
    approval: 'Approved by AICTE, UGC, and accredited with NAAC Grade A',
    selectionCriteria: 'Entrance-based. MBA via NMAT score + Competency Assessment + Personal Interview. B.Tech via NMIMS CET. BBA/B.Com via NPAT. BALLB/BBALLB via NMIMS LAT or CLAT.',
    updates: [
      'NMAT 2025 results are being released sequentially; MBA admissions scheduling is currently active.',
      'Competency Assessment weightage has been increased to 60%, with NMAT weightage at 10% for the 2026 batch.'
    ],
    coursesList: [
      { name: 'Master of Business Administration [MBA]', duration: '2 Years', fees: '₹18 Lakhs (Total Fees)', specializations: ['General', 'Marketing', 'Human Resources', 'Business Analytics'] },
      { name: 'Bachelor of Technology [B.Tech]', duration: '4 Years', fees: '₹8.08 Lakhs (Total Fees)', specializations: ['Computer Engineering', 'Artificial Intelligence & Data Science'] },
      { name: 'Bachelor of Business Administration [BBA]', duration: '4 Years', fees: '₹11 Lakhs (Total Fees)' },
      { name: 'Bachelor of Commerce [B.Com] (Hons.)', duration: '4 Years', fees: '₹6 Lakhs (Total Fees)' },
      { name: 'B.Tech + MBA Integrated (Tech Management)', duration: '5 Years', fees: '₹14.25 Lakhs (Total Fees)' },
      { name: 'BALLB {Hons.} / BBALLB {Hons.}', duration: '5 Years', fees: '₹10 Lakhs (Total Fees)' }
    ],
    placements: {
      highest: 'INR 10.00 LPA',
      average: 'INR 7.95 LPA',
      lowest: 'INR 5.40 LPA (B.Tech Highest)',
      recruiters: ['KPMG', 'Grant Thornton', 'Uber', 'PwC', 'Swiggy', 'Marico', 'EY', 'Reliance', 'ICICI Securities', 'TCS', 'Consultadd', 'VI', 'Zebronics', 'Mahindra']
    },
    facultyList: [
      { name: 'Prof. (Dr.) Anshuman Jaswal', qualification: 'Director' },
      { name: 'Dr. Sameer Pingle', qualification: 'Associate Dean – SBM' },
      { name: 'Dr. Niranjan Shastri', qualification: 'Program Chairperson SBM' },
      { name: 'Dr. Shubhangi Jore', qualification: 'Associate Professor – QT' },
      { name: 'Dr. Akshay Joshi', qualification: 'Assistant Professor – Business Strategy' },
      { name: 'Dr. Atul Kumar Vora', qualification: 'Assistant Professor – Accounting & Finance' },
      { name: 'Dr. Aaquil Bunglowala', qualification: 'Associate Dean – STME & Professor' },
      { name: 'Dr. Ashutosh Hajela', qualification: 'Associate Dean – SOL & Associate Professor' },
      { name: 'Dr. Munendra Jain', qualification: 'Associate Professor - Applied Physics' },
      { name: 'Dr. Vikas Khare', qualification: 'Associate Professor - Electrical Engineering' },
      { name: 'Dr. Dharmendra Sharma', qualification: 'Associate Professor – Computer Science Engineering' }
    ],
    scholarships: [
      { name: 'Chancellor\'s Scholarships for MBA', criteria: 'Based on merit in entrance exam + PI', benefits: 'INR 2,00,000 disbursement adjusted in second year fees' },
      { name: 'Academic Excellence Scholarship', criteria: 'Top 10% students with highest CGPA in batch', benefits: 'Tuition Fee concessions and cash awards' }
    ],
    cutoffs: [
      { course: 'Master of Business Administration (MBA)', rank: '206 Marks (NMAT cutoff)' }
    ]
  },
  {
    id: 'apj-kalam-univ',
    name: 'Dr. A.P.J. Abdul Kalam University',
    type: 'college',
    category: 'Arts & Science',
    boardOrAffiliation: 'Private University',
    location: 'Bypass Road (Manglia)',
    feePerAnnum: 100000,
    rating: 3.6,
    totalReviews: 39,
    image: '/apj-kalam-univ.jpg',
    description: 'Dr. A.P.J. Abdul Kalam University Indore, established in 2011, is a well-established private university approved by UGC, AICTE, and PCI. Spanning across a peaceful green environment, it provides an outstanding platform for professional degrees, smart learning layouts, and industry-oriented vocational skills, recognized for its commitment to technical and pharmaceutical education.',
    facilities: ['Smart Classrooms', 'Advanced Laboratories', 'Digital Library', 'Lecture Halls', 'Auditorium & Seminar Halls', 'Research & Innovation Labs', 'Hostels (Separate Boys & Girls)', 'Central Cafeteria', 'Sports Grounds'],
    establishedYear: 2011,
    coordinates: { lat: 22.7820, lng: 75.9180 },
    contactEmail: 'info@apj.ac.in',
    contactPhone: '0731-6502390',
    website: 'http://www.aku.ac.in/',
    address: 'Dewas Bypass Road, Village Arandia, Post Jhalaria, Indore - 452016, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 25 km)',
    approval: 'UGC, AICTE and PCI Approved',
    selectionCriteria: 'Entrance-based (AKU-CET) / JEE Mains / GATE / GPAT scores or qualifying exam merit.',
    updates: [
      'Ranked 94 in the engineering category by The Times of India in 2025.',
      'Offers direct admission in several UG and diploma programs based on 10+2 and graduation merit.'
    ],
    coursesList: [
      { name: 'Bachelor of Engineering [BE]', duration: '4 Years', fees: '₹3.56 Lakhs - ₹3.58 Lakhs (Total Fees)', specializations: ['Computer Science And Engineering'] },
      { name: 'Bachelor of Pharmacy [B.Pharma]', duration: '4 Years', fees: '₹1.0 Lakh (Total Fees)' },
      { name: 'Master of Technology [M.Tech]', duration: '2 Years', fees: '₹4.02 Lakhs (Total Fees)' },
      { name: 'Master of Pharmacy [M.Pharm]', duration: '2 Years', fees: '₹1.0 Lakh (Total Fees)' },
      { name: 'Bachelor of Education [B.Ed]', duration: '2 Years', fees: 'Merit-based Fees' },
      { name: 'Bachelor of Laws [L.L.B.]', duration: '3 Years', fees: 'Merit-based Fees' },
      { name: 'Ph.D', duration: '3 Years', fees: '₹2.83 Lakhs - ₹3.73 Lakhs (1st Year Fees)', specializations: ['Management Studies'] }
    ],
    placements: {
      highest: 'INR 10.89 LPA',
      average: 'INR 5.00 LPA (Estimated)',
      lowest: 'INR 1.89 LPA',
      recruiters: ['Tata Technologies', 'Tech Mahindra', 'WNS', 'OCS', 'Vodafone', 'Concentrics', 'L&T', 'REYNA', 'TCS', 'Infosys', 'Wipro', 'Cognizant', 'HCL', 'Amazon']
    },
    facultyList: [
      { name: 'Dr. Sandeep M.Salodkar', qualification: 'Vice-Chancellor' }
    ],
    scholarships: [
      { name: 'Government Post-Matric Scholarship', criteria: 'Reserved category SC/ST/OBC and low-income students', benefits: 'Tuition and maintenance fee exemptions as per state norms' }
    ],
    cutoffs: [
      { course: 'Bachelor of Engineering (BE) CSE', rank: 'JEE Main merit cut-off list' }
    ]
  },
  {
    id: 'oriental-university',
    name: 'Oriental University',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'Private University',
    location: 'Sanwer Road',
    feePerAnnum: 100000,
    rating: 3.8,
    totalReviews: 101,
    image: '/oriental-university.jpg',
    description: 'Oriental University, established in 2011, is the first self-financed private university in Indore. Approved by UGC, AICTE, PCI, BCI, and NCTE, it spans a beautiful 77-acre green residential campus. Characterized by spacious laboratories, a rich central library, and the prominent OU-ASPIRE Scholarship program, it delivers highly affordable tech and business education with high-impact research modules.',
    facilities: ['Fully Residential Campus (77 Acres)', 'Central Library (42,000+ books)', 'Hostels (Separate Boys & Girls)', 'Attached Washroom Hostels with Wi-Fi', 'Spacious Laboratories & Equipment', 'Sports Complex & Gymnasium', 'Auditorium & Seminar Halls', 'Hygienic Cafeteria', 'Fleet of Transport Buses', '24x7 Security & CCTV', 'Active Training & Placement Cell'],
    establishedYear: 2011,
    coordinates: { lat: 22.7950, lng: 75.8420 },
    contactEmail: 'admission@oui.edu.in',
    contactPhone: '0731-3565036',
    website: 'https://admission.oui.edu.in/',
    address: 'Opp. Reoti Range, Gate No.1, Jakhya, Sanwer Road, Indore - 453555, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 12 km)',
    approval: 'UGC, AICTE, PCI, BCI and NCTE Approved Private University',
    selectionCriteria: 'Entrance-based & Merit-based. B.Tech via JEE Main or 10+2 Merit. MBA via CAT/MAT or Merit. Law via CLAT or Merit. B.Pharm via Merit / GPAT score.',
    updates: [
      'Admissions 2026 are currently open for multiple undergraduate, postgraduate, and doctoral streams.',
      'Ranked 95th in India and 4th in Madhya Pradesh for Education category by Collegedunia 2026.'
    ],
    coursesList: [
      { name: 'Bachelor of Technology [B.Tech]', duration: '4 Years', fees: '₹1.63 Lakhs - ₹4.03 Lakhs (Total Fees)', specializations: ['Computer Science and Engineering', 'Artificial Intelligence & Machine Learning', 'Robotics and Automation', 'Mechanical Engineering', 'Civil Engineering', 'Electronics & Communication Engineering'] },
      { name: 'Bachelor of Business Administration [BBA]', duration: '3 Years', fees: '₹1.38 Lakhs - ₹2.13 Lakhs (Total Fees)', specializations: ['General'] },
      { name: 'Master of Computer Applications [MCA]', duration: '2 Years', fees: '₹1.23 Lakhs (Total Fees)', specializations: ['Artificial Intelligence & Machine Learning'] },
      { name: 'Bachelor of Pharmacy [B.Pharm]', duration: '4 Years', fees: '₹3.63 Lakhs (Total Fees)' },
      { name: 'Bachelor of Education [B.Ed]', duration: '2 Years', fees: '₹1.43 Lakhs (Total Fees)' },
      { name: 'Bachelor of Arts [BA]', duration: '3 Years', fees: '₹62,500 - ₹68,500 (Total Fees)' },
      { name: 'Master of Science [M.Sc]', duration: '2 Years', fees: '₹72,500 - ₹1.53 Lakhs (Total Fees)' },
      { name: 'Master of Pharmacy [M.Pharm]', duration: '2 Years', fees: '₹1.83 Lakhs (Total Fees)' },
      { name: 'Ph.D', duration: '3 Years', fees: '₹3.03 Lakhs (Total Fees)', specializations: ['Library & Information Science'] }
    ],
    placements: {
      highest: 'INR 72.00 LPA',
      average: 'INR 5.30 LPA',
      lowest: 'INR 3.50 LPA',
      recruiters: ['Accenture', 'Axis Bank', 'Infosys', 'HCL Technologies', 'Wipro', 'TATA', 'Force Motors', 'HDFC Bank', 'Mankind', 'Persistent Ltd', 'Syntel', 'TCS', 'Tech Mahindra', 'L&T Finance', 'Lupin']
    },
    facultyList: [
      { name: 'Shri Praveen Thakral', qualification: 'Chancellor' },
      { name: 'Dr Dheeraj Nim', qualification: 'Associate Professor' },
      { name: 'Dr Manjari Gupta', qualification: 'Assistant Professor' },
      { name: 'Dr Dipti Malpani', qualification: 'Assistant Professor' },
      { name: 'Dr Manmeet Singh', qualification: 'Professor' },
      { name: 'Dr Neelu Gupta', qualification: 'Associate Professor' },
      { name: 'Dr Mahavir Chhajed', qualification: 'Professor' },
      { name: 'Dr Narendra Silawat', qualification: 'Professor' },
      { name: 'Dr Sumeet Dwivedi', qualification: 'Associate Professor' },
      { name: 'Dr Kratika Daniel', qualification: 'Associate Professor' },
      { name: 'Dr Neelam Jain', qualification: 'Associate Professor' },
      { name: 'Dr Nitu Singh', qualification: 'Associate Professor' },
      { name: 'Dr Prerna Chaturvedi', qualification: 'Associate Professor' },
      { name: 'Dr Geetanjali Sharma', qualification: 'Associate Professor' },
      { name: 'Dr Veerendra Jain', qualification: 'Associate Professor' },
      { name: 'Dr Jyoti Gangrade', qualification: 'Associate Professor' }
    ],
    scholarships: [
      { name: 'OU-ASPIRE Merit & Early Bird Scholarship', criteria: 'Qualifying score and early registration before May 31, 2026', benefits: 'Tuition fee rebate slabs (ranges from INR 10,000 to INR 25,000 annually)' },
      { name: 'Special Rebate Scheme', criteria: 'Girl child, EWS, PWD, BPL, Single Parent, or Defence Wards (Max 10% seats)', benefits: 'Additional 5% annual tuition rebate' }
    ],
    cutoffs: [
      { course: 'B.Tech Computer Science and Engineering', rank: 'JEE Main merit cutoff or qualifying board percentage' }
    ]
  },
  {
    id: 'medi-caps-university',
    name: 'Medi-Caps University',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'Private University',
    location: 'Rau',
    feePerAnnum: 145000,
    rating: 4.4,
    totalReviews: 484,
    image: '/medi-caps-university.jpg',
    description: 'Medi-Caps University, established in 2000, is a highly popular state-of-the-art private university. Consistently ranked 1st in Madhya Pradesh for placements by the Times Engineering Survey, it features excellent infrastructure, a 94% placement rate, a robust career cell, and extensive sports facilities on a sprawling campus near Rau.',
    facilities: ['High Speed Computer Labs', 'State of art Workshops', 'Basketball Stadium', 'Modern Gym', 'Central Library (e-Resources)', 'Separate Girls/Boys Hostels', 'Hygienic Canteens', 'Research Centers'],
    establishedYear: 2000,
    coordinates: { lat: 22.6210, lng: 75.8030 },
    contactEmail: 'admission@medicaps.ac.in',
    contactPhone: '0731-2856233',
    website: 'https://www.medicaps.ac.in/',
    address: 'A.B. Road, Pigdamber, Rau, Indore - 453331, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 18 km)',
    approval: 'UGC Recognized, AICTE & PCI Approved, NBA Accredited',
    selectionCriteria: 'Entrance-based. B.Tech via JEE Main or MU-SAT score. MBA via CAT/CMAT/MAT. Other courses via qualifying board merit.',
    updates: [
      'Ranked No.1 Private University in Central India for engineering placements by i3RC Times Engineering.',
      'MU-SAT 2026 phase-wise registrations are now live on the official admissions portal.'
    ],
    coursesList: [
      { name: 'Bachelor of Technology [B.Tech]', duration: '4 Years', fees: '₹1.45 Lakhs (1st Year Fees)', specializations: ['Computer Science & Eng', 'Information Technology', 'Artificial Intelligence', 'Data Science', 'Mechanical Eng', 'Civil Eng'] },
      { name: 'Master of Business Administration [MBA]', duration: '2 Years', fees: '₹1.25 Lakhs (1st Year Fees)', specializations: ['Finance', 'Marketing', 'HR', 'Foreign Trade'] },
      { name: 'Bachelor of Computer Applications [BCA]', duration: '3 Years', fees: '₹75,000 (1st Year Fees)' },
      { name: 'Bachelor of Pharmacy [B.Pharm]', duration: '4 Years', fees: '₹1.10 Lakhs (1st Year Fees)' }
    ],
    placements: {
      highest: 'INR 48.00 LPA',
      average: 'INR 6.50 LPA',
      lowest: 'INR 3.80 LPA',
      recruiters: ['Amazon', 'TCS', 'Infosys', 'Cognizant', 'Wipro', 'Capgemini', 'Force Motors', 'ICICI Bank', 'Reliance', 'Apollo']
    },
    facultyList: [
      { name: 'Dr. Dilip K. Patnaik', qualification: 'Vice-Chancellor' },
      { name: 'Dr. Devendra S. Vyas', qualification: 'Professor & Dean, Engineering' },
      { name: 'Dr. Harish B. Bapat', qualification: 'Professor & Dean, Management' }
    ],
    scholarships: [
      { name: 'MU-SAT Merit Scholarship', criteria: 'Rank in top 100 in MU-SAT exam', benefits: '100% Tuition Fee Waiver' },
      { name: 'Board Topper Scholarship', criteria: 'Top scorer in respective State/Central board exams', benefits: 'Significant tuition fee waivers' }
    ],
    cutoffs: [
      { course: 'B.Tech Computer Science and Engineering', rank: 'JEE Main merit cutoff or MU-SAT score' }
    ]
  },
  {
    id: 'prestige-university',
    name: 'Prestige University',
    type: 'college',
    category: 'Management',
    boardOrAffiliation: 'Private University',
    location: 'Super Corridor',
    feePerAnnum: 600000,
    rating: 4.4,
    totalReviews: 38,
    image: '/prestige-university.jpg',
    description: 'Prestige University, Indore, is a modern corporate-led private institution specializing in advanced management and engineering disciplines. Operating from a premium digital campus, the university incorporates global design thinking frameworks, hands-on business modeling, and intense executive mentorship from seasoned international faculty.',
    facilities: ['Incubation Centers', 'A/C Lecture Theatres', 'Executive Dining Lounge', 'Creative Design Studios', 'Bloomberg Labs', 'Hi-tech Computer Hubs', 'Sports Grounds'],
    establishedYear: 2021,
    coordinates: { lat: 22.7760, lng: 75.8190 },
    contactEmail: 'admissions@prestigeuniversity.edu.in',
    contactPhone: '0731-4012222',
    website: 'https://prestigeuniversity.edu.in/',
    address: 'Super Corridor, Tehsil Hatod, Indore - 453112, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 6 km)',
    approval: 'UGC recognized Private State University, Approved by MP PURC',
    selectionCriteria: 'Entrance-based & Interview. Admission via CAT/XAT/NMAT/MAT score followed by group discussions and Personal Interview.',
    updates: [
      'MBA 2026 application window is currently active for specialized streams including Food & Agri-Business and E-Commerce.',
      'Active international academic partnership with prestigious business schools in the US and Europe.'
    ],
    coursesList: [
      { name: 'Master of Business Administration [MBA]', duration: '2 Years', fees: '₹6.00 Lakhs (1st Year Fees)', specializations: ['Business Analytics', 'E-Commerce', 'Food & Agri-Business', 'Financial Technology', 'International Business'] },
      { name: 'Bachelor of Business Administration [BBA] (Hons.)', duration: '3 Years', fees: '₹2.50 Lakhs (1st Year Fees)' },
      { name: 'B.Tech (Computer Science Engineering)', duration: '4 Years', fees: '₹1.80 Lakhs (1st Year Fees)' }
    ],
    placements: {
      highest: 'INR 18.00 LPA',
      average: 'INR 8.50 LPA',
      lowest: 'INR 4.50 LPA',
      recruiters: ['Deloitte', 'PwC', 'KPMG', 'EY', 'ICICI Bank', 'HDFC Bank', 'Amul', 'ITC Ltd', 'Federal Bank']
    },
    facultyList: [
      { name: 'Dr. Davish Jain', qualification: 'Chancellor' },
      { name: 'Dr. Sanjeev Patni', qualification: 'Vice-Chancellor' },
      { name: 'Dr. Ashwini Kumar', qualification: 'Dean – School of Management' }
    ],
    scholarships: [
      { name: 'Prestige Global Scholars Fellowship', criteria: '90 percentile and above in CAT/XAT', benefits: 'Up to 50% waiver on first year academic fees' },
      { name: 'Sports and Cultural Excellence Scholarship', criteria: 'National level achievement certificates', benefits: '20% Tuition Fee rebate' }
    ],
    cutoffs: [
      { course: 'MBA Business Analytics', rank: '80 Percentile (CAT / CMAT)' }
    ]
  },
  {
    id: 'renaissance-college',
    name: 'Renaissance College of Commerce & Management',
    type: 'college',
    category: 'Arts & Science',
    boardOrAffiliation: 'UGC',
    location: 'Vijay Nagar',
    feePerAnnum: 75000,
    rating: 4.1,
    totalReviews: 87,
    image: '/renaissance-college.jpg',
    description: 'Renaissance College of Commerce & Management (RCCM Indore) is a widely popular, highly vibrant arts, commerce, and media institution. Acclaimed for its premium extra-curricular fests, leadership bootcamps, and top grooming sessions, RCCM provides outstanding practical and professional mentorship to make students corporate-ready.',
    facilities: ['Radio Booths', 'Corporate Placement Cell', 'Modern Auditoriums', 'Exhibition Corridors', 'Rich Library', 'Visual Media Labs', 'Sports Fields'],
    establishedYear: 2006,
    coordinates: { lat: 22.7550, lng: 75.8910 },
    contactEmail: 'info@rccm.in',
    contactPhone: '0731-4262100',
    website: 'https://www.rccm.in/',
    address: 'Renaissance House, Behind High Court, 18, Jaora Compound, Indore - 452001, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 8 km)',
    approval: 'UGC Recognized, Affiliated to Devi Ahilya Vishwavidyalaya (DAVV)',
    selectionCriteria: 'Merit-based. Admissions are done on the basis of 10+2 scores and personal screening.',
    updates: [
      'RCCM admissions 2026 for B.Com, BBA, BA (Journalism) and B.Sc are currently active.',
      'Active student grooming initiatives like Renaissance Gurukul and National Youth Parliaments have commenced.'
    ],
    coursesList: [
      { name: 'Bachelor of Commerce [B.Com] (Hons.)', duration: '3 Years', fees: '₹75,000 (1st Year Fees)', specializations: ['Plain', 'Taxation', 'Computer Application'] },
      { name: 'Bachelor of Business Administration [BBA]', duration: '3 Years', fees: '₹85,000 (1st Year Fees)' },
      { name: 'Bachelor of Arts [BA]', duration: '3 Years', fees: '₹50,000 (1st Year Fees)', specializations: ['Mass Communication', 'Psychology', 'Economics'] },
      { name: 'Bachelor of Science [B.Sc]', duration: '3 Years', fees: '₹55,000 (1st Year Fees)', specializations: ['Computer Science', 'Biotechnology'] }
    ],
    placements: {
      highest: 'INR 10.50 LPA',
      average: 'INR 4.20 LPA',
      lowest: 'INR 2.80 LPA',
      recruiters: ['HDFC Bank', 'ICICI Bank', 'TCS', 'Teleperformance', 'Wipro', 'IndiGo', 'Genpact', 'Aditya Birla Group', 'Byju\'s']
    },
    facultyList: [
      { name: 'Dr. Rajesh Vyas', qualification: 'Principal' },
      { name: 'Prof. Amritpal Singh', qualification: 'HOD, Commerce' },
      { name: 'Prof. Shraddha Sharma', qualification: 'Associate Professor, Media Studies' }
    ],
    scholarships: [
      { name: 'Renaissance Merit Scholarship', criteria: '90% and above in 10+2 board exam', benefits: '20% reduction in first year fee' },
      { name: 'Sportsperson Rebate', criteria: 'State or National representation certificates', benefits: 'Partial fee waiving schemes' }
    ],
    cutoffs: [
      { course: 'B.Com Hons', rank: '10+2 merit score (minimum 60%)' }
    ]
  },
  {
    id: 'pimr',
    name: 'Prestige Institute of Management & Research (PIMR)',
    type: 'college',
    category: 'Management',
    boardOrAffiliation: 'Autonomous',
    location: 'Scheme 54',
    feePerAnnum: 150000,
    rating: 4.3,
    totalReviews: 298,
    image: '/pimr.jpg',
    description: 'Prestige Institute of Management & Research (PIMR) is a top-tier autonomous institution in Central India affiliated with DAVV. Possessing NAAC Grade A++ accreditation, PIMR is widely prominent for its elite MBA, BBA, Law, and Mass Comm courses, outstanding academic pedagogy, and high placement ratios in blue-chip corporate houses.',
    facilities: ['Dedicated Placement Cell', 'Advanced Computer Center', 'Digital Libraries', 'Mock Parliament Room', 'Moot Court Hall', 'Seminar Halls', 'Canteen', 'Indoor/Outdoor Sports Facilities'],
    establishedYear: 1994,
    coordinates: { lat: 22.7538, lng: 75.8860 },
    contactEmail: 'pimr_admission@gamil.com',
    contactPhone: '0731-4012222',
    website: 'https://pimrindore.ac.in/',
    address: 'Scheme No 54, Vijay Nagar, Indore - 452010, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 12 km)',
    approval: 'UGC Recognized, AICTE Approved Autonomous Institute, Accredited with NAAC A++ Grade',
    selectionCriteria: 'Entrance-based & merit. MBA admissions via CMAT scores and DTE Counseling. BBA, Law admissions via CLAT / board merit list.',
    updates: [
      'PIMR is accredited with NAAC A++ Grade, making it one of the elite private management colleges in Central India.',
      'Placements for the 2026 batch are currently active with more than 150 recruiters visiting the campus.'
    ],
    coursesList: [
      { name: 'Master of Business Administration [MBA]', duration: '2 Years', fees: '₹1,50,000 (1st Year Fees)', specializations: ['General', 'Marketing', 'Finance', 'Human Resources', 'International Business', 'Advertising & PR'] },
      { name: 'Bachelor of Business Administration [BBA]', duration: '3 Years', fees: '₹1,18,000 (1st Year Fees)' },
      { name: 'BALLB {Hons.} / BBALLB {Hons.}', duration: '5 Years', fees: '₹1,10,000 (1st Year Fees)' },
      { name: 'Bachelor of Commerce [B.Com] (Hons.)', duration: '3 Years', fees: '₹85,000 (1st Year Fees)' }
    ],
    placements: {
      highest: 'INR 14.00 LPA',
      average: 'INR 5.80 LPA',
      lowest: 'INR 3.50 LPA',
      recruiters: ['Deloitte', 'ICICI Bank', 'HDFC Bank', 'Aditya Birla Group', 'TCS', 'Nestle', 'Asian Paints', 'Federal Bank', 'Colgate Palmolive']
    },
    facultyList: [
      { name: 'Dr. Debasis Mallik', qualification: 'Director' },
      { name: 'Dr. Alok Bansal', qualification: 'Professor & Dean' },
      { name: 'Dr. Yogendra S. Rajawat', qualification: 'Professor & Dean – Law' }
    ],
    scholarships: [
      { name: 'Prestige Foundation Scholarship', criteria: 'Class 12th board merit of 85%+', benefits: 'INR 25,000 Tuition Fee waiver' },
      { name: 'Government Post Matric Scholarship', criteria: 'SC/ST/OBC category low-income students', benefits: 'Full/Partial Tuition Fee waiving' }
    ],
    cutoffs: [
      { course: 'Master of Business Administration (MBA)', rank: 'CMAT cutoff score or DTE round 1 rank 1100' }
    ]
  },
  {
    id: 'nmims-stme',
    name: 'SVKM\'s NMIMS School of Tech & Management',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'Private University',
    location: 'Super Corridor',
    feePerAnnum: 350000,
    rating: 4.4,
    totalReviews: 53,
    image: '/nmims-stme.jpg',
    description: 'The School of Technology Management and Engineering (STME) is the prestigious technical wing of NMIMS Indore. It offers elite integrated dual-degree programs (B.Tech + MBA) and B.Tech specializations in high-growth areas like Artificial Intelligence, Data Science, and Computer Engineering, utilizing global industry linkages.',
    facilities: ['Advanced Robotics Lab', 'Server and Tech Control Center', 'Fully Air-conditioned Study Halls', 'Bloomberg Terminal Lab', 'Hostels', 'Sports Fields', 'Canteen'],
    establishedYear: 2017,
    coordinates: { lat: 22.7712, lng: 75.8152 },
    contactEmail: 'admission.indore@nmims.edu',
    contactPhone: '0731-258151',
    website: 'https://indore.nmims.edu/academics/schools/school-of-technology-management-engineering/',
    address: 'Off Super Corridor, Bada Bangarda, Tehsil: Hatod, Indore - 453112, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 5 km)',
    approval: 'AICTE Approved & NAAC Grade A Accredited',
    selectionCriteria: 'Entrance-based. Admission via NMIMS-CET score followed by centralized counselling.',
    updates: [
      'Registrations for NMIMS-CET 2026 are currently active for B.Tech and Integrated B.Tech+MBA programs.',
      'Active industry collaboration featuring joint certification with tech leaders like IBM.'
    ],
    coursesList: [
      { name: 'Bachelor of Technology [B.Tech]', duration: '4 Years', fees: '₹2,12,000 (1st Year Fees)', specializations: ['Computer Engineering', 'Artificial Intelligence & Data Science'] },
      { name: 'B.Tech + MBA Integrated (Tech Management)', duration: '5 Years', fees: '₹2,85,000 (1st Year Fees)', specializations: ['Computer Engineering', 'Information Technology'] }
    ],
    placements: {
      highest: 'INR 10.50 LPA',
      average: 'INR 7.50 LPA',
      lowest: 'INR 4.50 LPA',
      recruiters: ['KPMG', 'EY', 'PwC', 'Grant Thornton', 'TCS', 'Capgemini', 'Amdocs', 'Infosys', 'Cognizant']
    },
    facultyList: [
      { name: 'Dr. Aaquil Bunglowala', qualification: 'Associate Dean STME & Professor' },
      { name: 'Dr. Dharmendra Sharma', qualification: 'Associate Professor – CSE' },
      { name: 'Dr. Vikas Khare', qualification: 'Associate Professor – Electrical Engg' }
    ],
    scholarships: [
      { name: 'NMIMS Student Merit Scholarship', criteria: 'Top ranking in NMIMS CET entrance exam', benefits: 'Up to 30% first year fee waiver' }
    ],
    cutoffs: [
      { course: 'B.Tech Computer Engineering', rank: 'NMIMS-CET merit list index' }
    ]
  },
  {
    id: 'bm-college',
    name: 'BM College of Technology',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'AICTE',
    location: 'Dhar Road',
    feePerAnnum: 62000,
    rating: 3.7,
    totalReviews: 28,
    image: '/bm-college.jpg',
    description: 'BM College of Technology, established in 2007, is committed to providing affordable technical and management education in Indore. Possessing excellent mechanical and civil engineering labs, it focuses on hands-on practical learning, skill workshops, and active vocational training.',
    facilities: ['CNC Machine Lab', 'Canteen', 'Hostel Accommodations', 'Bus Fleet', 'Central Workshop', 'Library', 'Sports Grounds'],
    establishedYear: 2007,
    coordinates: { lat: 22.7100, lng: 75.7600 },
    contactEmail: 'info@bmctindore.org',
    contactPhone: '0731-2895555',
    website: 'http://bmctindore.org/',
    address: 'Gokanya, Dhar Road, Indore - 452016, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 12 km)',
    approval: 'AICTE Approved, Affiliated to RGPV & DAVV',
    selectionCriteria: 'Entrance-based & Merit-based. B.Tech via JEE Main / 10+2 marks and MP DTE counselling. MBA via CMAT or board merit.',
    updates: [
      'Admissions are open for B.Tech and MBA streams for the upcoming 2026-27 academic session.',
      'Active industrial collaboration programs with local SME hubs in Pithampur sector.'
    ],
    coursesList: [
      { name: 'Bachelor of Technology [B.Tech]', duration: '4 Years', fees: '₹62,000 (1st Year Fees)', specializations: ['Computer Science and Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Electronics & Communication', 'Electrical & Electronics'] },
      { name: 'Master of Business Administration [MBA]', duration: '2 Years', fees: '₹55,000 (1st Year Fees)', specializations: ['Marketing', 'Finance', 'HR'] },
      { name: 'Diploma in Engineering (Polytechnic)', duration: '3 Years', fees: '₹28,000 (1st Year Fees)' }
    ],
    placements: {
      highest: 'INR 6.00 LPA',
      average: 'INR 3.20 LPA',
      lowest: 'INR 2.40 LPA',
      recruiters: ['TCS', 'Infosys', 'Capgemini', 'Force Motors', 'Teleperformance', 'Pratibha Syntex', 'Tata International']
    },
    facultyList: [
      { name: 'Dr. Arvind Singh', qualification: 'Principal' },
      { name: 'Prof. Ramesh Patel', qualification: 'HOD, Mechanical Eng' },
      { name: 'Prof. Sonal Gupta', qualification: 'Assistant Professor, CSE' }
    ],
    scholarships: [
      { name: 'EWS Scheme Scholarship', criteria: 'Family income less than 2.5 lakhs per annum', benefits: 'Full state-sponsored tuition rebate' },
      { name: 'Meritorious Scholarship', criteria: 'Above 80% marks in 10+2', benefits: 'INR 10,000 Tuition Fee waiver' }
    ],
    cutoffs: [
      { course: 'B.Tech Computer Science and Engineering', rank: 'MP DTE Round 1 rank 800000 or qualifying board merit' }
    ]
  },
  {
    id: 'chameli-devi',
    name: 'Chameli Devi Group of Institutions',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'AICTE',
    location: 'Khandwa Road',
    feePerAnnum: 78000,
    rating: 4.1,
    totalReviews: 84,
    image: '/chameli-devi.jpg',
    description: 'Chameli Devi Group of Institutions (CDGI Indore), established in 2006, is a premier multi-disciplinary college. Located along Khandwa Road, it is known for its high academic standards, strong professional development cell, state-of-the-art laboratory networks, and extensive sports infrastructure.',
    facilities: ['A/C Auditoriums', 'Modern Science & Tech Labs', 'Canteen Hub', 'Cricket Ground (State level)', 'High Speed Wi-Fi Campus', 'Central Library', 'Fleet of Buses', 'Boys & Girls Hostels'],
    establishedYear: 2006,
    coordinates: { lat: 22.6340, lng: 75.8780 },
    contactEmail: 'admissions@cdgi.edu.in',
    contactPhone: '0731-4243600',
    website: 'https://www.cdgi.edu.in/',
    address: 'Khandwa Road, Near Toll Naka, Indore - 452020, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 14 km)',
    approval: 'AICTE Approved, Affiliated to RGPV (B.Tech) & DAVV (MBA/BBA/B.Com)',
    selectionCriteria: 'Entrance-based. B.Tech via JEE Main score and MP DTE Counseling. MBA via CMAT or centralized state counseling. BBA/B.Com via merit lists.',
    updates: [
      'CDGI B.Tech admissions 2026-27 are currently open; scholarships are available for high board percentile scorers.',
      'Ranked among top engineering institutes in Central India by leading educational surveys.'
    ],
    coursesList: [
      { name: 'Bachelor of Technology [B.Tech]', duration: '4 Years', fees: '₹78,000 (1st Year Fees)', specializations: ['Computer Science and Engineering', 'Information Technology', 'Artificial Intelligence & Data Science', 'Mechanical Engineering', 'Civil Engineering'] },
      { name: 'Master of Business Administration [MBA]', duration: '2 Years', fees: '₹72,000 (1st Year Fees)', specializations: ['Finance', 'Marketing', 'HR', 'System Management'] },
      { name: 'Bachelor of Business Administration [BBA]', duration: '3 Years', fees: '₹48,000 (1st Year Fees)' },
      { name: 'Bachelor of Pharmacy [B.Pharm]', duration: '4 Years', fees: '₹82,000 (1st Year Fees)' }
    ],
    placements: {
      highest: 'INR 12.50 LPA',
      average: 'INR 4.50 LPA',
      lowest: 'INR 3.20 LPA',
      recruiters: ['TCS', 'Infosys', 'Cognizant', 'Capgemini', 'Wipro', 'Xoriant', 'Daffodil Software', 'Amdocs', 'Jaro Education']
    },
    facultyList: [
      { name: 'Dr. Joy Banerjee', qualification: 'Director' },
      { name: 'Dr. S.S. Dhakad', qualification: 'Professor & Principal, Pharmacy' },
      { name: 'Dr. K.S. Vasishth', qualification: 'Dean – Management Studies' }
    ],
    scholarships: [
      { name: 'CDGI Merit Scholarship', criteria: 'Above 90% in 10+2 board exam', benefits: '20% Tuition Fee rebate' },
      { name: 'EWS/ST/SC/OBC Scholarship', criteria: 'State domicile rules compliance', benefits: 'Full state tuition funding support' }
    ],
    cutoffs: [
      { course: 'B.Tech Computer Science and Engineering', rank: 'MP DTE Round 1 rank 600000' }
    ]
  },
  {
    id: 'iist-indore',
    name: 'Indore Institute of Science & Technology',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'AICTE',
    location: 'Rau',
    feePerAnnum: 95000,
    rating: 4.1,
    totalReviews: 112,
    image: '/iist-indore.jpg',
    description: 'Indore Institute of Science & Technology (IIST Indore) is a leading technical campus established in 2003. Known for its rigorous coding certification drives, specialized industrial partnerships, and top placement training bootcamps, it delivers excellent engineering education near Rau bypass.',
    facilities: ['Advanced Computing Labs', 'Hostel Block (Separate Boys & Girls)', 'Digital Libraries', 'Gymnasium', 'Specialized Innovation Labs', 'Sports Fields (Football, Cricket)', 'Hygienic Canteens'],
    establishedYear: 2003,
    coordinates: { lat: 22.6180, lng: 75.7950 },
    contactEmail: 'admissions@indoreinstitute.com',
    contactPhone: '0731-4010555',
    website: 'https://www.indoreinstitute.com/',
    address: 'Opposite IIM Indore, Rau-Pithampur Road, Rau, Indore - 453331, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 16 km)',
    approval: 'AICTE Approved, Affiliated to RGPV, accredited by NAAC',
    selectionCriteria: 'Entrance-based. B.Tech via JEE Main or 10+2 board PCM merit through MP DTE Counseling.',
    updates: [
      'IIST has launched specialized training programs in Cloud Computing, AI, and Salesforce integration for the 2026 session.',
      'B.Tech lateral entry admissions are currently active on the DTE MP counseling portal.'
    ],
    coursesList: [
      { name: 'Bachelor of Technology [B.Tech]', duration: '4 Years', fees: '₹95,000 (1st Year Fees)', specializations: ['Computer Science and Engineering', 'Information Technology', 'Artificial Intelligence & Machine Learning', 'Chemical Engineering', 'Mechanical Engineering', 'Electronics & Comm'] }
    ],
    placements: {
      highest: 'INR 15.00 LPA',
      average: 'INR 5.10 LPA',
      lowest: 'INR 3.50 LPA',
      recruiters: ['TCS', 'Infosys', 'Cognizant', 'Wipro', 'Capgemini', 'Amdocs', 'Persistent Ltd', 'Juspay', 'Syntel', 'Daffodil']
    },
    facultyList: [
      { name: 'Dr. Keshav Patidar', qualification: 'Principal' },
      { name: 'Dr. Rajeev Shrivastava', qualification: 'HOD, Computer Science Engineering' },
      { name: 'Dr. Namrata Sharma', qualification: 'Associate Professor, Civil Eng' }
    ],
    scholarships: [
      { name: 'IIST Academic Excellence Scholarship', criteria: 'Above 85% in 10+2 PCM score', benefits: 'INR 15,000 Tuition Fee waiver annually' },
      { name: 'Government Domicile Support Schemes', criteria: 'SC/ST/OBC criteria compliance', benefits: 'Full tuition support waivers' }
    ],
    cutoffs: [
      { course: 'B.Tech Computer Science and Engineering', rank: 'MP DTE Round 1 rank 550000' }
    ]
  },
  {
    id: 'iet-davv',
    name: 'Institute of Engineering and Technology, DAVV',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'UGC',
    location: 'Takshashila Campus',
    feePerAnnum: 85000,
    rating: 4.3,
    totalReviews: 174,
    image: '/iet-davv.jpg',
    description: 'The Institute of Engineering and Technology (IET DAVV), established in 1996, is the premier self-financed engineering school of Devi Ahilya Vishwavidyalaya. Renowned for its highly competitive intake and outstanding campus placement drives, it remains a top choice for technical education in Central India.',
    facilities: ['IET Central Library', 'High-speed Computer Labs', 'Sports Ground', 'Boys & Girls Hostels', 'Auditorium', 'Physics & Chemistry Labs', 'Canteen', 'Wi-Fi Access Points'],
    establishedYear: 1996,
    coordinates: { lat: 22.7125, lng: 75.8730 },
    contactEmail: 'director.iet@dauniv.ac.in',
    contactPhone: '0731-2361116',
    website: 'https://www.ietdavv.edu.in/',
    address: 'Khandwa Road, Takshashila Campus, Indore - 452020, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 10 km)',
    approval: 'UGC Recognized, Approved by AICTE, Autonomous Wing of DAVV',
    selectionCriteria: 'Entrance-based. B.E./B.Tech via JEE Main score and MP DTE Counseling. M.E./M.Tech via GATE scores or state-level qualifying exams.',
    updates: [
      'JEE Main 2026 Cutoff Round 1 rank for gender-neutral general category at CSE closed at 42600.',
      'DTE MP counseling windows for ME/MTech programs are scheduled to start shortly.'
    ],
    coursesList: [
      { name: 'Bachelor of Engineering [B.E. / B.Tech]', duration: '4 Years', fees: '₹85,000 (1st Year Fees)', specializations: ['Computer Engineering', 'Information Technology', 'Electronics & Telecommunication', 'Electronics & Instrumentation', 'Mechanical Engineering', 'Civil Engineering'] },
      { name: 'Master of Engineering [M.E. / M.Tech]', duration: '2 Years', fees: '₹75,000 (1st Year Fees)', specializations: ['Software Engineering', 'Information Security', 'Digital Communications', 'Industrial Engg & Management'] }
    ],
    placements: {
      highest: 'INR 28.00 LPA',
      average: 'INR 7.20 LPA',
      lowest: 'INR 4.50 LPA',
      recruiters: ['Amazon', 'Google', 'Deloitte', 'Cognizant', 'Infosys', 'TCS', 'Wipro', 'Barclays', 'Groww', 'Nvidia']
    },
    facultyList: [
      { name: 'Dr. Sanjiv Tokekar', qualification: 'Director' },
      { name: 'Dr. Ashesh Tiwari', qualification: 'Professor, Mechanical Eng' },
      { name: 'Dr. Vrinda Tokekar', qualification: 'Professor, Information Technology' }
    ],
    scholarships: [
      { name: 'Mukhyamantri Medhavi Vidyarthi Yojana (MMVY)', criteria: 'MP State meritorious criteria compliance', benefits: 'Complete tuition fee funding support' },
      { name: 'Post Matric Scholarship', criteria: 'SC/ST/OBC category low-income students', benefits: 'State-sponsored academic rebates' }
    ],
    cutoffs: [
      { course: 'B.E. Computer Engineering', rank: '42600 (JEE Main rank)' },
      { course: 'B.E. Information Technology', rank: '51200 (JEE Main rank)' }
    ]
  },
  {
    id: 'ips-engineering',
    name: 'IPS Academy Institute of Engineering & Science',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'AICTE',
    location: 'Rajendra Nagar',
    feePerAnnum: 125000,
    rating: 4.3,
    totalReviews: 139,
    image: '/ips-engineering.jpg',
    description: 'IPS Academy Institute of Engineering & Science, established in 1994, is a premier private college operating on a massive 58-acre state-of-the-art campus. It is widely famous for its unique Fire Technology & Safety engineering program, which is national-scale and highly respected across core sectors, besides traditional tech branches.',
    facilities: ['Fire Drills Ground', 'Advanced Physics & Chemistry Labs', 'Incubator Cell', 'Swimming Pool (Olympic size)', 'Central Library (1 Lakh+ books)', 'Hostel Accommodations', 'Auditorium', 'Cricket Stadium'],
    establishedYear: 1994,
    coordinates: { lat: 22.6740, lng: 75.8280 },
    contactEmail: 'admission.ies@ipsacademy.org',
    contactPhone: '0731-4014600',
    website: 'https://ies.ipsacademy.org/',
    address: 'Knowledge Town, Rajendra Nagar, A.B. Road, Indore - 452012, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 12 km)',
    approval: 'AICTE Approved, Affiliated to RGPV, accredited by NBA & NAAC',
    selectionCriteria: 'Entrance-based. B.Tech via JEE Main score or 10+2 merit followed by MP DTE Counseling. M.Tech via GATE scores.',
    updates: [
      'IPS Academy B.Tech admissions 2026 are currently active for core, IT, and Fire Technology branches.',
      'Ranked among the premier private engineering institutions in Central India for industry readiness.'
    ],
    coursesList: [
      { name: 'Bachelor of Technology [B.Tech]', duration: '4 Years', fees: '₹1,25,000 (1st Year Fees)', specializations: ['Fire Technology and Safety', 'Computer Science and Engineering', 'Civil Engineering', 'Mechanical Engineering', 'Electronics & Comm'] },
      { name: 'Master of Technology [M.Tech]', duration: '2 Years', fees: '₹85,000 (1st Year Fees)', specializations: ['Structural Engineering', 'Industrial Safety', 'Power Electronics'] }
    ],
    placements: {
      highest: 'INR 18.00 LPA',
      average: 'INR 5.20 LPA',
      lowest: 'INR 3.60 LPA',
      recruiters: ['IOCL', 'ONGC', 'Reliance Industries', 'L&T', 'TCS', 'Infosys', 'Cognizant', 'Capgemini', 'Wipro', 'Eicher Motors']
    },
    facultyList: [
      { name: 'Dr. Archana Keerti Chowdhary', qualification: 'Principal' },
      { name: 'Dr. Pravin Kumar Karandikar', qualification: 'Professor, Electrical Eng' },
      { name: 'Dr. Rajesh Kumar Sen', qualification: 'Associate Professor, Civil Eng' }
    ],
    scholarships: [
      { name: 'IPS Academy Merit Scholarship', criteria: '90% and above in Class 12th PCM', benefits: 'INR 20,000 Tuition Fee waiver' },
      { name: 'State Post Matric Scholarship Schemes', criteria: 'Reserved categories compliance', benefits: 'Full/Partial Tuition fee waivers' }
    ],
    cutoffs: [
      { course: 'B.Tech Fire Technology and Safety', rank: 'MP DTE Round 1 rank 320000' },
      { course: 'B.Tech Computer Science and Engineering', rank: 'MP DTE Round 1 rank 410000' }
    ]
  },
  {
    id: 'lncts-indore',
    name: 'Lakshmi Narain College of Tech & Science',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'AICTE',
    location: 'Bypass Road (Manglia)',
    feePerAnnum: 82000,
    rating: 3.9,
    totalReviews: 43,
    image: '/lncts-indore.jpg',
    description: 'Lakshmi Narain College of Technology & Science (LNCTS Indore), established in 2007, is a prominent member of the LNCT Group of Institutions. Regarded for its structured engineering programs, tech workshops, and student-focused career mentoring, it delivers a robust ecosystem for academic and professional growth on the Indore-Bypass road.',
    facilities: ['Advanced Computer Labs', 'Electrical & Electronics Workshops', 'Central Library', 'Spacious Classrooms', 'Bus Fleet Services', 'Sports Complex', 'Canteen'],
    establishedYear: 2007,
    coordinates: { lat: 22.7840, lng: 75.9290 },
    contactEmail: 'admission.lncts@lnct.ac.in',
    contactPhone: '0731-4214400',
    website: 'https://www.lnctindore.com/',
    address: 'Bypass Road, Manglia Square, Indore - 453771, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 15 km)',
    approval: 'AICTE Approved, Affiliated to RGPV',
    selectionCriteria: 'Entrance-based. B.Tech via JEE Main score and MP DTE Counseling.',
    updates: [
      'Admission registrations for the 2026-27 session are now active on the central LNCT portal.',
      'Special coding bootcamps have been introduced for third-year engineering students.'
    ],
    coursesList: [
      { name: 'Bachelor of Technology [B.Tech]', duration: '4 Years', fees: '₹82,000 (1st Year Fees)', specializations: ['Computer Science and Engineering', 'Information Technology', 'Civil Engineering', 'Mechanical Engineering', 'Electronics & Comm'] }
    ],
    placements: {
      highest: 'INR 11.00 LPA',
      average: 'INR 4.10 LPA',
      lowest: 'INR 3.20 LPA',
      recruiters: ['TCS', 'Infosys', 'Cognizant', 'Capgemini', 'Wipro', 'Persistent Systems', 'HCL Technologies', 'Zensar']
    },
    facultyList: [
      { name: 'Dr. Amit Bodh Upadhyaya', qualification: 'Director' },
      { name: 'Prof. Sandeep Patidar', qualification: 'HOD, Computer Science Engineering' },
      { name: 'Prof. Vivek Sharma', qualification: 'Assistant Professor, Mechanical Eng' }
    ],
    scholarships: [
      { name: 'LNCT Group Merit Scholarship', criteria: 'Above 85% in Class 12th PCM', benefits: 'INR 10,000 Tuition Fee waiver' },
      { name: 'Post Matric Scholarship Scheme', criteria: 'Reserved categories compliance', benefits: 'State-sponsored tuition rebates' }
    ],
    cutoffs: [
      { course: 'B.Tech Computer Science and Engineering', rank: 'MP DTE Round 1 rank 650000' }
    ]
  },
  {
    id: 'lnct-bhopal-indore',
    name: 'LNCT (Bhopal) Indore Campus',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'AICTE',
    location: 'Bypass Road (Manglia)',
    feePerAnnum: 80000,
    rating: 3.9,
    totalReviews: 38,
    image: '/lnct-bhopal-indore.jpg',
    description: 'LNCT (Bhopal) Indore Campus is an extension of the prestigious Lakshmi Narain College of Technology brand in Madhya Pradesh. Offering top-class technical facilities, systematic diagnostic tests, and strong campus placements, it remains a popular hub for engineering and business administrations.',
    facilities: ['High-speed Programming Labs', 'Mechanical & Electrical Labs', 'Central Library (35,000+ books)', 'Hostels (Boys & Girls)', 'Seminar & Auditorium Halls', 'Canteen', 'Bus Transport Network'],
    establishedYear: 2004,
    coordinates: { lat: 22.7830, lng: 75.9280 },
    contactEmail: 'admission.lnct@lnct.ac.in',
    contactPhone: '0731-4214400',
    website: 'https://www.lnctindore.com/',
    address: 'Bypass Road, Manglia Square, Indore - 453771, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 15 km)',
    approval: 'AICTE Approved, Affiliated to RGPV (B.Tech) & DAVV (MBA)',
    selectionCriteria: 'Entrance-based. B.Tech via JEE Main score and MP DTE Counseling. MBA via CMAT or state-level merit counseling.',
    updates: [
      'Registration forms for technical and management courses for the 2026-27 batch are open.',
      'Active placement workshops with industry leaders in IT and manufacturing sector are underway.'
    ],
    coursesList: [
      { name: 'Bachelor of Technology [B.Tech]', duration: '4 Years', fees: '₹80,000 (1st Year Fees)', specializations: ['Computer Science and Engineering', 'Information Technology', 'Civil Engineering', 'Mechanical Engineering'] },
      { name: 'Master of Business Administration [MBA]', duration: '2 Years', fees: '₹68,000 (1st Year Fees)', specializations: ['Marketing', 'Finance', 'HR'] }
    ],
    placements: {
      highest: 'INR 11.20 LPA',
      average: 'INR 4.05 LPA',
      lowest: 'INR 3.00 LPA',
      recruiters: ['TCS', 'Cognizant', 'Wipro', 'Infosys', 'Capgemini', 'Amdocs', 'L&T Infotech', 'Syntel']
    },
    facultyList: [
      { name: 'Dr. Amit Bodh Upadhyaya', qualification: 'Director' },
      { name: 'Prof. Anuj Sharma', qualification: 'Professor, Applied Sciences' },
      { name: 'Prof. Shalini Gupta', qualification: 'HOD, MBA Department' }
    ],
    scholarships: [
      { name: 'Meritorious Scholarship Slab A', criteria: 'Above 90% in 10+2 PCM', benefits: 'INR 15,000 Tuition Fee waiver' },
      { name: 'Government Welfare Schemes', criteria: 'SC/ST/OBC criteria compliance', benefits: 'Full state-sponsored tuition support' }
    ],
    cutoffs: [
      { course: 'B.Tech Computer Science and Engineering', rank: 'MP DTE Round 1 rank 680000' }
    ]
  },
  {
    id: 'patel-college',
    name: 'Patel College of Science and Technology',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'AICTE',
    location: 'Ralamandal',
    feePerAnnum: 68000,
    rating: 3.8,
    totalReviews: 18,
    image: '/patel-college.jpg',
    description: 'Patel College of Science and Technology (PCST Indore), established in 2005 under the Patel Group of Institutions, is set in a scenic environment near the Ralamandal wildlife sanctuary. Delivering stable, quality engineering skills and vocational workshops, it is dedicated to providing high-quality technical education to regional students.',
    facilities: ['Physics & Chemistry Laboratories', 'Seminar Hall', 'Canteen', 'Hostel Accommodations', 'Computer Hub', 'Sports Fields', 'Bus Services'],
    establishedYear: 2005,
    coordinates: { lat: 22.6590, lng: 75.9030 },
    contactEmail: 'admission.indore@patelcollege.com',
    contactPhone: '0731-2815333',
    website: 'http://www.patelcollege.com/',
    address: 'Ralamandal, Bypass Road, Indore - 452020, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 18 km)',
    approval: 'AICTE Approved, Affiliated to RGPV',
    selectionCriteria: 'Entrance-based & Merit-based. B.Tech via JEE Main / 12th board marks through MP DTE Counseling.',
    updates: [
      'Registrations for PCST engineering and diploma courses are now open for the 2026 academic year.',
      'Special scholarship benefits are being extended for girl students across all technical divisions.'
    ],
    coursesList: [
      { name: 'Bachelor of Technology [B.Tech]', duration: '4 Years', fees: '₹68,000 (1st Year Fees)', specializations: ['Computer Science and Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Electronics & Comm'] },
      { name: 'Diploma in Engineering (Polytechnic)', duration: '3 Years', fees: '₹28,000 (1st Year Fees)', specializations: ['Civil Engineering', 'Mechanical Engineering'] }
    ],
    placements: {
      highest: 'INR 7.50 LPA',
      average: 'INR 3.25 LPA',
      lowest: 'INR 2.40 LPA',
      recruiters: ['TCS', 'Infosys', 'Wipro', 'Collabera', 'Teleperformance', 'Force Motors', 'Pratibha Syntex']
    },
    facultyList: [
      { name: 'Dr. Vivek Sharma', qualification: 'Principal' },
      { name: 'Prof. Satish Patel', qualification: 'HOD, CSE' },
      { name: 'Prof. Preeti Jain', qualification: 'Assistant Professor, Humanities' }
    ],
    scholarships: [
      { name: 'Patel Group Merit Scholarship', criteria: 'Above 80% in Class 12th PCM', benefits: 'INR 8,000 Tuition Fee waiver' },
      { name: 'State Post Matric Scholarship', criteria: 'Reserved categories compliance', benefits: 'State tuition fee support waivers' }
    ],
    cutoffs: [
      { course: 'B.Tech Computer Science Engineering', rank: 'MP DTE Round 1 rank 850000 or board percentage PCM 50%+' }
    ]
  },
  {
    id: 'piemr-indore',
    name: 'Prestige Inst of Engineering Management & Research',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'AICTE',
    location: 'Scheme 54',
    feePerAnnum: 110000,
    rating: 4.1,
    totalReviews: 64,
    image: '/piemr-indore.jpg',
    description: 'Prestige Institute of Engineering Management & Research (PIEMR), established in 2008, is the premium private engineering wing of the Prestige Group of Institutions. Known for its advanced computer labs, robotics labs, high-tech academic setups, and dedicated placement training, it is highly sought after by technical aspirants in Indore.',
    facilities: ['Automated Labs', 'Placement Interview Cabin', 'Hi-tech Library', 'Robotics Wing', 'Smart Classrooms', 'Auditorium', 'Canteen', 'Indoor/Outdoor Sports Area'],
    establishedYear: 2008,
    coordinates: { lat: 22.7542, lng: 75.8858 },
    contactEmail: 'admissions.piemr@prestigecommon.org',
    contactPhone: '0731-4012222',
    website: 'https://piemr.edu.in/',
    address: 'Scheme No 54, Vijay Nagar, Indore - 452010, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 12 km)',
    approval: 'AICTE Approved, Affiliated to RGPV, accredited by NAAC',
    selectionCriteria: 'Entrance-based & Merit-based. B.Tech via JEE Main score and MP DTE Counseling.',
    updates: [
      'PIEMR B.Tech admissions 2026 are active; specializations in AI and Cyber Security are highly popular.',
      'The campus placement drive has started, with premium tech companies scheduling recruitment rounds.'
    ],
    coursesList: [
      { name: 'Bachelor of Technology [B.Tech]', duration: '4 Years', fees: '₹1,10,000 (1st Year Fees)', specializations: ['Computer Science and Engineering', 'Artificial Intelligence & Data Science', 'Automation & Robotics', 'Electronics & Comm'] }
    ],
    placements: {
      highest: 'INR 14.50 LPA',
      average: 'INR 5.40 LPA',
      lowest: 'INR 3.60 LPA',
      recruiters: ['Deloitte', 'TCS', 'Infosys', 'Cognizant', 'Capgemini', 'Wipro', 'Persistent Systems', 'Impetus', 'Force Motors']
    },
    facultyList: [
      { name: 'Dr. Manojkumar Deshpande', qualification: 'Director' },
      { name: 'Dr. Pyare Lal Choudhary', qualification: 'Professor, Mechanical Eng' },
      { name: 'Dr. Dharmesh Kumar Sen', qualification: 'Associate Professor, CSE' }
    ],
    scholarships: [
      { name: 'Prestige Trust Merit Scholarship', criteria: 'Above 85% in Class 12th PCM', benefits: 'INR 20,000 Tuition Fee waiver' },
      { name: 'Government Post Matric Scholarship', criteria: 'SC/ST/OBC category low-income students', benefits: 'Full/Partial Tuition Fee waiving' }
    ],
    cutoffs: [
      { course: 'B.Tech Computer Science and Engineering', rank: 'MP DTE Round 1 rank 390000' }
    ]
  },
  {
    id: 'vaishnav-polytechnic',
    name: 'Shri Vaishnav Polytechnic College',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'State Board',
    location: 'MOG Lines',
    feePerAnnum: 25000,
    rating: 4.1,
    totalReviews: 76,
    image: '/vaishnav-polytechnic.jpg',
    description: 'Shri Vaishnav Polytechnic College, established in 1962, is one of Central India\'s oldest, most prestigious public-aided technical diploma centers. Highly respected for its engineering workshops, machinery labs, and meticulous hands-on technical training, it produces highly skilled technicians and industry professionals.',
    facilities: ['Workshop Tool Rooms', 'Machinery Labs', 'Seminar Hall', 'Rich Library (Technical)', 'Sports Fields', 'Canteen', 'Hostel Accommodations'],
    establishedYear: 1962,
    coordinates: { lat: 22.7190, lng: 75.8450 },
    contactEmail: 'svpolytechnic@gmail.com',
    contactPhone: '0731-2722100',
    website: 'http://www.svpolytechnicindore.org/',
    address: 'MOG Lines, Indore - 452002, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 6 km)',
    approval: 'Approved by AICTE, Affiliated to RGPV Bhopal & Rajiv Gandhi Proudyogiki Vishwavidyalaya',
    selectionCriteria: 'Entrance-based. Admission via Madhya Pradesh Pre-Polytechnic Test (MP PPT) score or Class 10th merit list.',
    updates: [
      'Admission counselling schedules for diploma programs 2026 are published on the DTE MP portal.',
      'Modern electrical vehicle (EV) repair lab is being integrated into mechanical and electrical wings.'
    ],
    coursesList: [
      { name: 'Diploma in Engineering (Polytechnic)', duration: '3 Years', fees: '₹25,000 (1st Year Fees)', specializations: ['Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering', 'Electronics', 'Computer Science'] }
    ],
    placements: {
      highest: 'INR 5.50 LPA',
      average: 'INR 2.80 LPA',
      lowest: 'INR 1.80 LPA',
      recruiters: ['L&T', 'Force Motors', 'Tata Motors', 'John Deere', 'BHEL', 'Pratibha Syntex', 'Mahindra', 'Reliance Energy']
    },
    facultyList: [
      { name: 'Prof. Narendra S. Patel', qualification: 'Principal' },
      { name: 'Prof. S.K. Mishra', qualification: 'HOD, Civil Engineering' },
      { name: 'Prof. Mamta Dave', qualification: 'HOD, Computer Science' }
    ],
    scholarships: [
      { name: 'AICTE Pragati Scholarship for Girls', criteria: 'Girl child admitted to 1st year diploma, family income < 8L', benefits: 'INR 50,000 per annum scholarship' },
      { name: 'State Welfare Scholarship', criteria: 'SC/ST/OBC category low-income students', benefits: 'Complete state tuition waiving' }
    ],
    cutoffs: [
      { course: 'Diploma in Mechanical Engineering', rank: 'MP PPT merit rank under 1500 or board merit' }
    ]
  },
  {
    id: 'ips-ibmr',
    name: 'IPS Academy Institute of Business Management',
    type: 'college',
    category: 'Management',
    boardOrAffiliation: 'Autonomous',
    location: 'Rajendra Nagar',
    feePerAnnum: 135000,
    rating: 4.2,
    totalReviews: 124,
    image: '/ips-ibmr.jpg',
    description: 'IPS Academy Institute of Business Management & Research (IBMR), established in 1994, is a premier autonomous business school. Operating on a 58-acre Knowledge Town campus, IBMR is accredited with NAAC and offers highly popular dual-specialization MBA programs featuring deep corporate connections and advanced research frameworks.',
    facilities: ['Group Discussion Rooms', 'Corporate cells', 'Swimming Pool (Olympic size)', 'Bloomberg Terminal Lab', 'A/C Lecture Halls', 'Central Library', 'Indoor/Outdoor Sports Arenas'],
    establishedYear: 1994,
    coordinates: { lat: 22.6738, lng: 75.8282 },
    contactEmail: 'admission.ibmr@ipsacademy.org',
    contactPhone: '0731-4014611',
    website: 'https://ibmr.ipsacademy.org/',
    address: 'Knowledge Town, Rajendra Nagar, A.B. Road, Indore - 452012, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 12 km)',
    approval: 'AICTE Approved, Affiliated to DAVV, accredited by NAAC',
    selectionCriteria: 'Entrance-based. MBA via CMAT or state-level centralized counseling based on CAT/MAT scores. BBA/B.Com via merit lists.',
    updates: [
      'Registrations for MBA programs 2026 are open; dual-specializations are highly sought after by corporate aspirants.',
      'The career cell has initiated corporate soft skills and analytical grooming camps for management graduates.'
    ],
    coursesList: [
      { name: 'Master of Business Administration [MBA]', duration: '2 Years', fees: '₹1,35,000 (1st Year Fees)', specializations: ['Marketing', 'Finance', 'Human Resources', 'International Business', 'Systems', 'Hospital Administration'] },
      { name: 'Bachelor of Business Administration [BBA]', duration: '3 Years', fees: '₹75,000 (1st Year Fees)' },
      { name: 'Bachelor of Commerce [B.Com] (Hons.)', duration: '3 Years', fees: '₹55,000 (1st Year Fees)' }
    ],
    placements: {
      highest: 'INR 14.00 LPA',
      average: 'INR 5.50 LPA',
      lowest: 'INR 3.50 LPA',
      recruiters: ['ICICI Bank', 'HDFC Bank', 'Deloitte', 'Amul', 'Aditya Birla Group', 'TCS', 'Nestle', 'Asian Paints', 'Federal Bank']
    },
    facultyList: [
      { name: 'Dr. C.S. Ranawat', qualification: 'Director' },
      { name: 'Dr. Vivek S. Kushwaha', qualification: 'Professor, Finance' },
      { name: 'Dr. Preeti Sharma', qualification: 'Associate Professor, Human Resources' }
    ],
    scholarships: [
      { name: 'IPS Academy Merit Fellowship', criteria: 'Above 85% in graduation or high CMAT score', benefits: 'INR 15,000 Tuition Fee waiver' },
      { name: 'Government Domicile Schemes', criteria: 'SC/ST/OBC category low-income students', benefits: 'State-sponsored academic waivers' }
    ],
    cutoffs: [
      { course: 'Master of Business Administration (MBA)', rank: 'CMAT percentile 75+ or state counseling merit' }
    ]
  },
  {
    id: 'ims-davv',
    name: 'Institute of Management Studies, DAVV',
    type: 'college',
    category: 'Management',
    boardOrAffiliation: 'UGC',
    location: 'Takshashila Campus',
    feePerAnnum: 95000,
    rating: 4.3,
    totalReviews: 181,
    image: '/ims-davv.jpg',
    description: 'The Institute of Management Studies (IMS DAVV), established in 1969, is the premier management department of Devi Ahilya Vishwavidyalaya. Highly acclaimed for its affordable high-quality education, exceptional regional placement drives, and highly competitive entrance exams, it serves as a leading management hub in Central India.',
    facilities: ['IMS Hall', 'Computer Hub', 'Placement Auditorium', 'Takshashila Campus Wi-Fi', 'Central Library & e-Resources', 'Hostels (Boys & Girls)', 'Sports Playgrounds', 'Medical Center'],
    establishedYear: 1969,
    coordinates: { lat: 22.7129, lng: 75.8729 },
    contactEmail: 'director.ims@dauniv.ac.in',
    contactPhone: '0731-2513547',
    website: 'http://www.ims.dauniv.ac.in/',
    address: 'Khandwa Road, Takshashila Campus, Indore - 452020, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 10 km)',
    approval: 'UGC Recognized, Approved by AICTE, Autonomous Department of DAVV',
    selectionCriteria: 'Entrance-based. Admission via CUET-PG (Common University Entrance Test) scores followed by centralized counseling.',
    updates: [
      'Admissions 2026-27 for 2-year MBA and 5-year Integrated MBA are scheduled on CUET PG counseling schedule.',
      'Ranked among the premier public management institutes in the country by leading business surveys.'
    ],
    coursesList: [
      { name: 'Master of Business Administration [MBA]', duration: '2 Years', fees: '₹95,000 (1st Year Fees)', specializations: ['E-Commerce', 'Financial Administration', 'Marketing Management', 'Human Resource', 'Hospital Administration', 'Disaster Management'] },
      { name: 'Integrated MBA (MS)', duration: '5 Years', fees: '₹85,000 (1st Year Fees)' }
    ],
    placements: {
      highest: 'INR 18.00 LPA',
      average: 'INR 6.50 LPA',
      lowest: 'INR 4.00 LPA',
      recruiters: ['Deloitte', 'ICICI Bank', 'HDFC Bank', 'Infosys', 'TCS', 'Wipro', 'Aditya Birla Group', 'Amul', 'Nestle', 'Federal Bank']
    },
    facultyList: [
      { name: 'Dr. Sangeeta Jain', qualification: 'Director & Professor' },
      { name: 'Dr. Rajendra Singh', qualification: 'Professor, Marketing' },
      { name: 'Dr. Deepak Shrivastava', qualification: 'Professor, Finance' }
    ],
    scholarships: [
      { name: 'Mukhyamantri Medhavi Vidyarthi Yojana (MMVY)', criteria: 'MP State meritorious criteria compliance', benefits: 'Full tuition fee reimbursement' },
      { name: 'Post Matric Scholarship Scheme', criteria: 'Reserved categories SC/ST/OBC compliance', benefits: 'State-funded academic waivers' }
    ],
    cutoffs: [
      { course: 'MBA Financial Administration', rank: 'CUET PG cutoff score or high ranking in merit list' }
    ]
  },
  {
    id: 'jaipuria-indore',
    name: 'Jaipuria Institute of Management',
    type: 'college',
    category: 'Management',
    boardOrAffiliation: 'AICTE',
    location: 'Dakachya',
    feePerAnnum: 380000,
    rating: 4.4,
    totalReviews: 62,
    image: '/jaipuria-indore.jpg',
    description: 'Jaipuria Institute of Management Indore, established in 2010, is a premier management brand in India. Acclaimed for its elite PGDM program (equivalent to MBA), AACSB member status, AIU equivalence, outstanding digital systems, and top-tier national placements, it delivers premier leadership and corporate management competencies.',
    facilities: ['A/C Boardrooms', 'Central Wi-Fi Hub', 'Tennis Court', 'Hitech Study Pods', 'Bloomberg Lab', 'Central Library (e-journals)', 'Modern Gymnasium', 'A/C Hostels (Boys & Girls)', 'Amphitheatre'],
    establishedYear: 2010,
    coordinates: { lat: 22.8120, lng: 75.9450 },
    contactEmail: 'indore@jaipuria.ac.in',
    contactPhone: '0731-3069300',
    website: 'https://www.jaipuria.ac.in/campuses/indore/',
    address: 'Indore-Dewas Highway, Near Shipra, Dakachya, Indore - 453771, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 28 km)',
    approval: 'AICTE Approved, Recognized by AIU (Association of Indian Universities), NBA Accredited',
    selectionCriteria: 'Entrance-based. Admission via CAT / XAT / CMAT / MAT / GMAT score followed by Group Discussion and Personal Interview.',
    updates: [
      'Jaipuria PGDM 2026 admissions are open; scholarship slabs are available for high national percentile scorers.',
      'Consistently ranked among the top 100 management institutes in India by NIRF.'
    ],
    coursesList: [
      { name: 'Post Graduate Diploma in Management [PGDM]', duration: '2 Years', fees: '₹3,80,000 (1st Year Fees)', specializations: ['General Management', 'Financial Services', 'Marketing', 'Retail Management'] }
    ],
    placements: {
      highest: 'INR 19.10 LPA',
      average: 'INR 8.95 LPA',
      lowest: 'INR 5.50 LPA',
      recruiters: ['Deloitte', 'PwC', 'KPMG', 'EY', 'Amazon', 'ICICI Bank', 'Federal Bank', 'Colgate Palmolive', 'Asian Paints', 'Dabur', 'HDFC Bank']
    },
    facultyList: [
      { name: 'Dr. Harshvardhan Halve', qualification: 'Director' },
      { name: 'Dr. Jatin Pandey', qualification: 'Associate Professor, HR' },
      { name: 'Dr. Deepankar Chakrabarti', qualification: 'Professor, Economics' }
    ],
    scholarships: [
      { name: 'Jaipuria Entrance-based Merit Scholarship', criteria: 'Above 80 percentile in CAT / XAT / CMAT', benefits: 'Tuition Fee concessions up to INR 1,50,000' },
      { name: 'Sibling and Corporate Scholarship Support', criteria: 'Enrolled sibling or corporate sponsorship', benefits: 'Additional fee concessions' }
    ],
    cutoffs: [
      { course: 'PGDM General Management', rank: '75 Percentile (CAT / CMAT / XAT)' }
    ]
  },
  {
    id: 'nmims-law',
    name: 'SVKM\'s NMIMS School of Law',
    type: 'college',
    category: 'Law',
    boardOrAffiliation: 'Private University',
    location: 'Super Corridor',
    feePerAnnum: 420000,
    rating: 4.8,
    totalReviews: 39,
    image: '/nmims-law.jpg',
    description: 'SVKM\'s NMIMS School of Law, Indore is a premier legal institute established in 2017. Known for its world-class mock-trial courtrooms, specialized moot court coaching, highly rigorous legal research curriculum, and elite corporate placement links, it produces highly capable corporate lawyers and legal analysts.',
    facilities: ['Pristine Moot-Court Room', 'Law Library (e-journals)', 'Legal Aid Clinics', 'A/C Lecture Theatres', 'Hostels', 'High-speed Wi-Fi', 'Sports Complex', 'Canteen'],
    establishedYear: 2017,
    coordinates: { lat: 22.7714, lng: 75.8154 },
    contactEmail: 'admissions.indore@nmims.edu',
    contactPhone: '0731-2581500',
    website: 'https://www.nmimsindore.org/academics/programs/school-of-law/',
    address: 'Super Corridor, Off Budhaniya, Indore - 452005, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 6 km)',
    approval: 'Approved by Bar Council of India (BCI), constituent of SVKM\'s NMIMS (Deemed-to-be-University)',
    selectionCriteria: 'Entrance-based. Admission strictly through NLAT (NMIMS Law Aptitude Test) or CLAT (Common Law Admission Test) scores.',
    updates: [
      'NMIMS School of Law admissions for 2026 integrated BA LLB & BBA LLB programs are currently open.',
      'Active registration for national level Moot Court Competition has been declared.'
    ],
    coursesList: [
      { name: 'B.A. L.L.B. (Hons.)', duration: '5 Years', fees: '₹4,20,000 (1st Year Fees)' },
      { name: 'B.B.A. L.L.B. (Hons.)', duration: '5 Years', fees: '₹4,20,000 (1st Year Fees)' }
    ],
    placements: {
      highest: 'INR 16.50 LPA',
      average: 'INR 7.80 LPA',
      lowest: 'INR 5.00 LPA',
      recruiters: ['Khaitan & Co', 'Shardul Amarchand Mangaldas', 'Trilegal', 'ICICI Bank', 'HDFC Bank', 'PwC', 'Deloitte', 'L&T Finance']
    },
    facultyList: [
      { name: 'Dr. Ashutosh Hajela', qualification: 'Associate Dean' },
      { name: 'Prof. Amrish Shah', qualification: 'Assistant Professor, Corporate Law' },
      { name: 'Prof. Sneha Gupta', qualification: 'Assistant Professor, Constitutional Law' }
    ],
    scholarships: [
      { name: 'SVKM Merit Scholarship', criteria: 'Top ranking in NLAT/CLAT exams', benefits: 'Up to 30% Tuition Fee rebate' },
      { name: 'Economic Weaker Section Support', criteria: 'Annual family income < 3L', benefits: 'Custom tuition fee waivers' }
    ],
    cutoffs: [
      { course: 'B.A. L.L.B. (Hons.)', rank: 'CLAT rank under 8000 or high NLAT score' }
    ]
  },
  {
    id: 'index-medical',
    name: 'Index Medical College Hospital & Research Institute',
    type: 'college',
    category: 'Medical',
    boardOrAffiliation: 'UGC',
    location: 'Bypass Road (Manglia)',
    feePerAnnum: 1350000,
    rating: 4.4,
    totalReviews: 92,
    image: '/index-medical.jpg',
    description: 'Index Medical College Hospital & Research Institute, established in 2007 under the Mayank Welfare Society, is a leading private medical institution in Central India. Boasting a massive 1000+ bed state-of-the-art super-specialty hospital, it offers unparalleled clinical practice opportunities and comprehensive medical courses.',
    facilities: ['Super Specialty Hospital', 'Clinical Classrooms', 'Doctor Hostels', 'Medical Library', 'Modern Pathology Labs', 'ICUs & Operation Theatres', 'Sports Fields', 'Canteen'],
    establishedYear: 2007,
    coordinates: { lat: 22.7680, lng: 75.9390 },
    contactEmail: 'medical@indexgroup.co.in',
    contactPhone: '0731-4013700',
    website: 'http://www.indexgroup.co.in/medical/',
    address: 'Index City, Nemawar Road, NH-59A, Indore - 452016, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 22 km)',
    approval: 'Approved by Medical Council of India (MCI) / National Medical Commission (NMC), Affiliated to Malwanchal University',
    selectionCriteria: 'Entrance-based. MBBS via NEET-UG score followed by state-level centralized medical counseling.',
    updates: [
      'Admissions for MBBS and PG Medical MD/MS courses for 2026-27 are open under NMC and MP State counseling guides.',
      'A new trauma center and advanced neuro-pathology lab were recently inaugurated on campus.'
    ],
    coursesList: [
      { name: 'Bachelor of Medicine, Bachelor of Surgery [MBBS]', duration: '5.5 Years', fees: '₹13,50,000 (1st Year Fees)' },
      { name: 'MD / MS (Post Graduation)', duration: '3 Years', fees: '₹15,00,000 (1st Year Fees)', specializations: ['Pediatrics', 'General Medicine', 'General Surgery', 'Orthopedics', 'Anesthesiology'] }
    ],
    placements: {
      highest: 'INR 24.00 LPA',
      average: 'INR 9.50 LPA',
      lowest: 'INR 6.00 LPA',
      recruiters: ['Fortis Healthcare', 'Apollo Hospitals', 'Index Medical Hospital', 'Medanta', 'Max Healthcare', 'Choithram Hospital']
    },
    facultyList: [
      { name: 'Dr. G.S. Patel', qualification: 'Dean & Professor' },
      { name: 'Dr. Ramchandra S. Vyas', qualification: 'Professor, Anatomy' },
      { name: 'Dr. Sharda Sen', qualification: 'HOD, General Medicine' }
    ],
    scholarships: [
      { name: 'State Medhavi Vidyarthi Scheme', criteria: 'Low income and high NEET ranking (MP State domicile)', benefits: 'State-sponsored partial/full tuition fee rebates' },
      { name: 'Post Matric Scholarship', criteria: 'Reserved categories SC/ST/OBC compliance', benefits: 'Tuition Fee concessions' }
    ],
    cutoffs: [
      { course: 'MBBS', rank: 'NEET UG Madhya Pradesh State counseling closing rank approx 45000' }
    ]
  },
  {
    id: 'mgm-medical',
    name: 'Mahatma Gandhi Memorial (MGM) Medical College',
    type: 'college',
    category: 'Medical',
    boardOrAffiliation: 'UGC',
    location: 'Residency Area',
    feePerAnnum: 120000,
    rating: 4.8,
    totalReviews: 114,
    image: '/mgm-medical.jpg',
    description: 'Mahatma Gandhi Memorial Medical College (MGM Indore), established in 1948, is one of India\'s oldest and most prestigious government-run medical institutions. Attached to the massive Maharaja Yashwantrao Hospital (MYH) network, it is famous for its exceptional patient footfall, top-tier clinical training, and stellar academic reputation nationally.',
    facilities: ['MY Hospital Block', 'Surgical Amphitheatres', 'Digital Research desks', 'Hostels (Boys & Girls)', 'e-Library', 'Advanced Trauma Centers', 'Auditorium', 'Sports Grounds'],
    establishedYear: 1948,
    coordinates: { lat: 22.7090, lng: 75.8820 },
    contactEmail: 'mgmmcindore@dauniv.ac.in',
    contactPhone: '0731-2527383',
    website: 'http://www.mgmmcindore.in/',
    address: 'A.B. Road, Near MY Hospital, Residency Area, Indore - 452001, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 9 km)',
    approval: 'Recognized by National Medical Commission (NMC), Affiliated to MPMSU (Madhya Pradesh Medical Science University)',
    selectionCriteria: 'Entrance-based. MBBS via NEET-UG score followed by MCC (All India Quota 15%) & MP DME (State Quota 85%) counseling.',
    updates: [
      'NEET 2026 Round 1 state closing rank for MGM MBBS ended at extremely competitive merits.',
      'Research grants approved for community health projects in association with ICMR.'
    ],
    coursesList: [
      { name: 'Bachelor of Medicine, Bachelor of Surgery [MBBS]', duration: '5.5 Years', fees: '₹1,20,000 (1st Year Fees)' },
      { name: 'MD / MS (Post Graduation)', duration: '3 Years', fees: '₹1,05,000 (1st Year Fees)', specializations: ['Radio-diagnosis', 'General Medicine', 'General Surgery', 'Obstetrics & Gynecology', 'Pediatrics'] }
    ],
    placements: {
      highest: 'INR 35.00 LPA',
      average: 'INR 14.20 LPA',
      lowest: 'INR 9.00 LPA',
      recruiters: ['All India Institute of Medical Sciences (AIIMS)', 'Medanta', 'Apollo Hospitals', 'Max Healthcare', 'Fortis', 'State Government Medical Services']
    },
    facultyList: [
      { name: 'Dr. Sanjay Dixit', qualification: 'Dean & Professor' },
      { name: 'Dr. Anita Mutha', qualification: 'Professor & HOD, Microbiology' },
      { name: 'Dr. Sumit Shukla', qualification: 'Professor, Surgery & Superintendent, MYH' }
    ],
    scholarships: [
      { name: 'Mukhyamantri Medhavi Vidyarthi Yojana (MMVY)', criteria: 'MP Domicile, 12th board merit, NEET state merit', benefits: 'Full tuition fee sponsorship by MP government' },
      { name: 'Post-Matric Scholarship', criteria: 'Reserved categories low-income limits', benefits: 'Complete state-funded academic rebates' }
    ],
    cutoffs: [
      { course: 'MBBS (General Category - AIQ)', rank: 'NEET Closing Rank approx 6500' },
      { course: 'MBBS (General Category - State Quota)', rank: 'NEET Closing Rank approx 22000' }
    ]
  },
  {
    id: 'shubhdeep-ayurved',
    name: 'Shubhdeep Ayurved Medical College & Hospital',
    type: 'college',
    category: 'Medical',
    boardOrAffiliation: 'UGC',
    location: 'Chhatripura',
    feePerAnnum: 220000,
    rating: 4.3,
    totalReviews: 31,
    image: '/shubhdeep-ayurved.jpg',
    description: 'Shubhdeep Ayurved Medical College & Hospital, established in 2001, is a premier private ayurvedic institution in Indore. Highly praised for its advanced scientific research in ancient Ayurvedic formulations, organic herbal cultivation gardens, Panchkarma wellness OPD clinics, and high-quality BAMS training.',
    facilities: ['Ayurvedic OPD Clinic', 'Herbal Gardens (200+ species)', 'Panchkarma Rooms', 'Hostels', 'Central Library (Ayurvedic classics)', 'Yoga Hall', 'Canteen', 'Sports Areas'],
    establishedYear: 2001,
    coordinates: { lat: 22.7102, lng: 75.8340 },
    contactEmail: 'shubhdeepayurvedic@gmail.com',
    contactPhone: '0731-2811333',
    website: 'http://www.shubhdeepayurved.org/',
    address: 'Near Chhatripura Police Station, Chhatripura, Indore - 452002, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 5 km)',
    approval: 'Approved by CCIM / NCISM (National Commission for Indian System of Medicine), Ministry of AYUSH, Affiliated to MPMSU Jabalpur',
    selectionCriteria: 'Entrance-based. BAMS admission via NEET-UG score followed by AYUSH state-level counseling.',
    updates: [
      'AYUSH NEET counselling dates for BAMS admissions 2026-27 are published; seats are available under State and All India quotas.',
      'Successfully organized national workshop on Panchkarma detoxification procedures.'
    ],
    coursesList: [
      { name: 'Bachelor of Ayurvedic Medicine and Surgery [BAMS]', duration: '5.5 Years', fees: '₹2,20,000 (1st Year Fees)' }
    ],
    placements: {
      highest: 'INR 10.00 LPA',
      average: 'INR 4.50 LPA',
      lowest: 'INR 3.00 LPA',
      recruiters: ['Patanjali Ayurved', 'Dabur India', 'Himalaya Wellness', 'Baidyanath', 'Charak Pharma', 'Shubhdeep Ayurvedic Hospital', 'AyurVAID Hospitals']
    },
    facultyList: [
      { name: 'Dr. Sharad Chandra Sen', qualification: 'Principal & Professor' },
      { name: 'Dr. Meera Gupta', qualification: 'Professor, Shalya Tantra' },
      { name: 'Dr. Rajiv Patel', qualification: 'Associate Professor, Kayachikitsa' }
    ],
    scholarships: [
      { name: 'AYUSH National Scholarship Scheme', criteria: 'High merit in AYUSH entrance exams', benefits: 'INR 25,000 Tuition Fee waiver' },
      { name: 'State Post Matric Scholarship', criteria: 'SC/ST/OBC category low-income students', benefits: 'State-sponsored academic waivers' }
    ],
    cutoffs: [
      { course: 'BAMS', rank: 'NEET UG score 350+ out of 720 or state merit equivalent' }
    ]
  },
  {
    id: 'saims',
    name: 'Sri Aurobindo Institute of Medical Sciences (SAIMS)',
    type: 'college',
    category: 'Medical',
    boardOrAffiliation: 'UGC',
    location: 'Sanwer Road',
    feePerAnnum: 1250000,
    rating: 4.5,
    totalReviews: 89,
    image: '/saims.jpg',
    description: 'Sri Aurobindo Institute of Medical Sciences (SAIMS Indore), established in 2003, is a leading private medical university and hospital network. Delivering world-class clinical learning, advanced skills simulation labs, high-tech operation theatres, and extremely active hospital OPD blocks, it is highly recognized for both surgical training and patient care.',
    facilities: ['Super-Specialty Hospital (1200+ beds)', 'Advanced Skill Labs', 'Digital Library & e-Resources', 'Gymnasium', 'Sports Complex', 'Separate Hostels', 'Trauma Center', 'Swimming Pool'],
    establishedYear: 2003,
    coordinates: { lat: 22.7750, lng: 75.8450 },
    contactEmail: 'info@saimsonline.com',
    contactPhone: '0731-4231000',
    website: 'https://www.saimsonline.com/',
    address: 'Indore-Ujjain Highway, Near MR-10 Crossing, Sanwer Road, Indore - 453555, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 12 km)',
    approval: 'Recognized by Medical Council of India (MCI) / NMC, Ministry of Health & Family Welfare, Affiliated to MPMSU',
    selectionCriteria: 'Entrance-based. MBBS/BDS via NEET-UG scores and state-level counseling. MD/MS via NEET-PG score.',
    updates: [
      'SAIMS super-specialty departments have introduced high-end robotic surgery simulation suites for clinical fellows.',
      'NEET PG state counseling registration window is active for medical aspirants.'
    ],
    coursesList: [
      { name: 'Bachelor of Medicine, Bachelor of Surgery [MBBS]', duration: '5.5 Years', fees: '₹12,50,000 (1st Year Fees)' },
      { name: 'Bachelor of Dental Surgery [BDS]', duration: '5 Years', fees: '₹2,50,000 (1st Year Fees)' },
      { name: 'MD / MS (Post Graduation)', duration: '3 Years', fees: '₹14,00,000 (1st Year Fees)', specializations: ['Pediatrics', 'Radiology', 'General Medicine', 'General Surgery', 'Orthopedics'] }
    ],
    placements: {
      highest: 'INR 28.00 LPA',
      average: 'INR 11.20 LPA',
      lowest: 'INR 6.50 LPA',
      recruiters: ['Medanta Hospital', 'Apollo Hospitals', 'SAIMS Super Specialty Hospital', 'Fortis Healthcare', 'Choithram', 'Apex Hospitals']
    },
    facultyList: [
      { name: 'Dr. Jyoti Bindal', qualification: 'Dean & Professor' },
      { name: 'Dr. Vinod Bhandari', qualification: 'Chairman & Professor of Surgery' },
      { name: 'Dr. Rajendra S. Solanki', qualification: 'Professor, Pediatrics' }
    ],
    scholarships: [
      { name: 'SVKM Trust Medhavi Merit Slab', criteria: 'Exceptional board percentiles and high NEET rank', benefits: 'Up to 25% tuition fee waiver' },
      { name: 'Post-Matric State Support Schemes', criteria: 'SC/ST/OBC category low-income domicile', benefits: 'Partial/Full tuition fee state reimbursements' }
    ],
    cutoffs: [
      { course: 'MBBS', rank: 'NEET UG Madhya Pradesh State closing rank approx 38000' }
    ]
  },
  {
    id: 'cindrebay-design',
    name: 'Cindrebay School of Design',
    type: 'college',
    category: 'Design',
    boardOrAffiliation: 'Affiliated / Certified',
    location: 'Palasia',
    feePerAnnum: 130000,
    rating: 4.7,
    totalReviews: 34,
    image: '/cindrebay-design.jpg',
    description: 'Cindrebay School of Design is Indore\'s premier creative design institute established in 2014. Focused on highly practical, career-driven education, it provides industry-expert guidance in Interior Design, Fashion Styling, Commercial Art, and modern Digital UI/UX workflows backed by exceptional design placement bootcamps.',
    facilities: ['Studio Mockups', 'Fabrics Lab', 'Visual Screen Rooms', 'CAD Suite', 'Exhibition Hall', 'Creative Library', 'A/C Classrooms'],
    establishedYear: 2014,
    coordinates: { lat: 22.7240, lng: 75.8850 },
    contactEmail: 'indore@cindrebay.com',
    contactPhone: '0731-4972100',
    website: 'https://www.cindrebay.com/',
    address: '4th Floor, Scheme No. 54, PU-4, Near Palasia Square, A.B. Road, Indore - 452001, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 10 km)',
    approval: 'ISO Certified Design School, affiliated with international design councils and national assessment boards',
    selectionCriteria: 'Merit-based and Interview-based. Application followed by creative portfolio assessment and a personal interaction round.',
    updates: [
      'Registrations for the winter session of PG and Diploma in Interior and Fashion design are currently active.',
      'Successfully concluded the Annual Fashion & Interior Runway Design Exhibition with leading regional architects.'
    ],
    coursesList: [
      { name: 'B.Sc. in Interior Design', duration: '3 Years', fees: '₹1,30,000 (1st Year Fees)' },
      { name: 'B.Sc. in Fashion Design', duration: '3 Years', fees: '₹1,30,000 (1st Year Fees)' },
      { name: 'Diploma in Interior & Space Design', duration: '1 Year', fees: '₹85,000 (1st Year Fees)' }
    ],
    placements: {
      highest: 'INR 8.50 LPA',
      average: 'INR 4.20 LPA',
      lowest: 'INR 2.80 LPA',
      recruiters: ['Livspace', 'Design Cafe', 'Asian Paints', 'FabIndia', 'Aranyam Architects', 'Studio 99', 'Sabyasachi Associates']
    },
    facultyList: [
      { name: 'Prof. Shruti Kesavan', qualification: 'Director & Academic Head' },
      { name: 'Prof. Rohit Kothari', qualification: 'Lead Mentor, Architecture & Interior' },
      { name: 'Prof. Pooja Agrawal', qualification: 'Senior Faculty, Fashion Merchandising' }
    ],
    scholarships: [
      { name: 'Cindrebay Creative Talent Scholarship', criteria: 'Excellent performance in Cindrebay Design Aptitude Test', benefits: 'INR 15,000 Tuition Fee waiver' },
      { name: 'Early Bird Admission Rebate', criteria: 'Registration prior to first counseling rounds', benefits: 'INR 5,000 fee waiver' }
    ],
    cutoffs: [
      { course: 'B.Sc. in Interior Design', rank: 'Board merit 60% or performance in Design Aptitude Test (DAT)' }
    ]
  },
  {
    id: 'madrid-software',
    name: 'Madrid Software Training',
    type: 'college',
    category: 'Software Training',
    boardOrAffiliation: 'Affiliated / Certified',
    location: 'Vijay Nagar',
    feePerAnnum: 95000,
    rating: 4.6,
    totalReviews: 81,
    image: '/madrid-software.jpg',
    description: 'Madrid Software Training is a leading professional IT training bootcamp established in 2015. Delivering industry-aligned courses in Full-stack Software Engineering, Amazon Web Services (AWS) Cloud Architecture, Data Analytics, Python, and Salesforce development, it features direct placement channels and high-quality lab support in Indore.',
    facilities: ['Hi-speed Coding Desks', 'Cloud Simulators', 'Interview cabins', 'Collaboration Lounges', 'High Bandwidth Wi-Fi', 'Smart Boardrooms', 'Central e-Library'],
    establishedYear: 2015,
    coordinates: { lat: 22.7548, lng: 75.8950 },
    contactEmail: 'info@madridsoftwaretrainings.com',
    contactPhone: '09560088911',
    website: 'https://www.madridsoftwaretrainings.com/',
    address: 'Plot No. 12, Vijay Nagar, Near C21 Mall, AB Road, Indore - 452010, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 12 km)',
    approval: 'NASSCOM Associate Member, Certified Industry Partner',
    selectionCriteria: 'Merit-based. Basic aptitude assessment followed by coding interest interview.',
    updates: [
      'New batch registrations for Full-stack Web Development and Data Science are active.',
      'Partnered with 50+ multinational software houses for direct weekend placement hiring drives.'
    ],
    coursesList: [
      { name: 'Full-stack Software Engineering [MERN]', duration: '1 Year', fees: '₹95,000 (1st Year Fees)' },
      { name: 'Data Science & Machine Learning Program', duration: '6 Months', fees: '₹65,000 (1st Year Fees)' },
      { name: 'AWS Cloud Architecture Certification', duration: '3 Months', fees: '₹35,000 (1st Year Fees)' }
    ],
    placements: {
      highest: 'INR 15.00 LPA',
      average: 'INR 5.20 LPA',
      lowest: 'INR 3.50 LPA',
      recruiters: ['TCS', 'Cognizant', 'Capgemini', 'Wipro', 'Xoriant', 'Persistent', 'Systango', 'Impetus Technologies']
    },
    facultyList: [
      { name: 'Dr. Vivek Shrivastava', qualification: 'Academic Director' },
      { name: 'Prof. Sumeet Jain', qualification: 'Lead Instructor, Data Science' },
      { name: 'Prof. Anita Sharma', qualification: 'Senior Mentor, MERN Stack Development' }
    ],
    scholarships: [
      { name: 'Tech Excellence Merit Scholarship', criteria: 'Aptitude score > 90% in admission entrance test', benefits: 'INR 12,000 Tuition Fee waiver' },
      { name: 'Early Registration Incentive', criteria: 'First 20 applicants per tech batch', benefits: 'INR 5,000 fee waiver' }
    ],
    cutoffs: [
      { course: 'Full-stack Software Engineering [MERN]', rank: 'Aptitude Test Score 60% or PCM background' }
    ]
  },
  {
    id: 'govt-music-college',
    name: 'Government Music College Indore',
    type: 'college',
    category: 'Music',
    boardOrAffiliation: 'State Board',
    location: 'Palasia',
    feePerAnnum: 12000,
    rating: 4.5,
    totalReviews: 44,
    image: '/govt-music-college.jpg',
    description: 'Government Music College Indore, established in 1951, is a monumental state-run cultural institution. Dedicated to preserving and teaching classical music, it offers comprehensive B.Mus and M.Mus courses in classical vocal singing, Sitar, Tabla, Harmonium, and classical dance (Kathak) under the guidance of legendary exponents.',
    facilities: ['Riyaz Auditoriums', 'Historical Instruments Vault', 'Performance Stage', 'Acoustics Classrooms', 'Traditional Music Library', 'Exhibition Areas', 'Canteen'],
    establishedYear: 1951,
    coordinates: { lat: 22.7250, lng: 75.8860 },
    contactEmail: 'govtmusiccollege@gmail.com',
    contactPhone: '0731-2533100',
    website: 'http://www.govtmusiccollegeindore.mp.gov.in/',
    address: 'Near Old Palasia Square, A.B. Road, Palasia, Indore - 452001, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 9 km)',
    approval: 'UGC Recognized, Approved by Madhya Pradesh Culture Department, Affiliated to Raja Mansingh Tomar Music & Arts University, Gwalior',
    selectionCriteria: 'Aptitude-based & Audition-based. Direct audition evaluated by classical jury panel.',
    updates: [
      'Admissions for B.Mus and classical diploma programs for 2026 are active; application forms can be collected from Palasia office.',
      'Announced scheduling of annual classical music concert featuring eminent state music scholars.'
    ],
    coursesList: [
      { name: 'Bachelor of Music [B.Mus.]', duration: '3 Years', fees: '₹12,000 (1st Year Fees)', specializations: ['Vocal', 'Sitar', 'Tabla', 'Harmonium'] },
      { name: 'Master of Music [M.Mus.]', duration: '2 Years', fees: '₹15,000 (1st Year Fees)' },
      { name: 'Diploma in Classical Dance (Kathak)', duration: '2 Years', fees: '₹8,000 (1st Year Fees)' }
    ],
    placements: {
      highest: 'INR 6.00 LPA',
      average: 'INR 2.40 LPA',
      lowest: 'INR 1.50 LPA',
      recruiters: ['All India Radio', 'Doordarshan', 'State Cultural Centers', 'DPS Indore', 'Sharda Music Academies', 'Indore Symphonies']
    },
    facultyList: [
      { name: 'Dr. Sandhya Apte', qualification: 'Principal & Head of Department' },
      { name: 'Prof. Ramesh Gokhale', qualification: 'HOD, Classical Sitar' },
      { name: 'Prof. Hariprasad Chaturvedi', qualification: 'Associate Professor, Tabla Percussions' }
    ],
    scholarships: [
      { name: 'State Cultural Merit Scholarship', criteria: 'Outstanding classical vocal performance merit list', benefits: 'Complete tuition fee waivers' },
      { name: 'Post Matric Welfare Scholarship', criteria: 'SC/ST/OBC category low-income students', benefits: 'Government-sponsored financial waivers' }
    ],
    cutoffs: [
      { course: 'Bachelor of Music [B.Mus.]', rank: 'Successful performance in classical vocal/instrument audit rounds' }
    ]
  },
  {
    id: 'mit-indore',
    name: 'Malwa Institute of Technology (MIT)',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'AICTE',
    location: 'Nipania',
    feePerAnnum: 72000,
    rating: 3.9,
    totalReviews: 125,
    image: '/mit-indore.jpg',
    description: 'Malwa Institute of Technology (MIT Indore) is a premier engineering and technical education center established to foster exceptional learning in engineering disciplines. Approved by AICTE and affiliated to RGPV, the campus boasts modern laboratories, an impressive research library, and an active placement department securing outstanding employment for candidates.',
    facilities: ['Advanced Laboratories', 'Central Library', 'Computer Labs', 'Sports Facility', 'Cafeteria', 'Wi-Fi Campus'],
    establishedYear: 2003,
    coordinates: { lat: 22.7550, lng: 75.8950 },
    contactEmail: 'admissions@mitindore.co.in',
    contactPhone: '0731-2810000',
    website: 'http://www.mitindore.co.in',
    address: 'Indore-Dewas Bypass Road, Nipania, Indore - 452016, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 12 km)',
    approval: 'AICTE Approved, Affiliated to Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV)',
    selectionCriteria: 'Entrance-based. B.Tech admissions via JEE Main score and MP DTE Counseling.',
    updates: [
      'B.Tech admissions for academic year 2026 are currently open.',
      'MIT has signed a new partnership with local IT firms to enhance training.'
    ],
    coursesList: [
      { name: 'Bachelor of Technology [B.Tech]', duration: '4 Years', fees: '₹72,000 (1st Year Fees)', specializations: ['CS', 'IT', 'EC', 'ME', 'CE'] },
      { name: 'Master of Business Administration [MBA]', duration: '2 Years', fees: '₹60,000 (1st Year Fees)' }
    ],
    placements: {
      highest: 'INR 12.00 LPA',
      average: 'INR 4.20 LPA',
      lowest: 'INR 3.20 LPA',
      recruiters: ['TCS', 'Wipro', 'Infosys', 'Cognizant', 'Capgemini', 'Syntel']
    },
    facultyList: [
      { name: 'Dr. R. K. Shukla', qualification: 'Director' },
      { name: 'Prof. S. C. Verma', qualification: 'HOD, CSE' }
    ],
    scholarships: [
      { name: 'Merit Scholarship', criteria: 'Meritorious academic record', benefits: 'Partial tuition fee waiver' }
    ],
    cutoffs: [
      { course: 'B.Tech Computer Science Engineering', rank: '420500' }
    ]
  }
];

export const INDORE_LOCATIONS = [
  'Residency Area',
  'Jhalaria (Bypass)',
  'A.B. Road',
  'Manik Bagh',
  'LIG Colony',
  'Simrol',
  'Rau',
  'Vallabh Nagar',
  'Takshashila Campus',
  'Sanwer Road',
  'Bypass Road (Manglia)',
  'Vijay Nagar',
  'Palasia',
  'Khajrana',
  'Nipania',
  'Khandwa Road',
  'Rambagh',
  'Scheme 103',
  'Scheme 54',
  'Sudama Nagar',
  'Scheme 78',
  'Old Palasia',
  'Sukhliya',
  'Dwarkapuri',
  'Bicholi Mardana',
  'Gumasta Nagar',
  'Mahalaxmi Nagar',
  'Super Corridor',
  'Dhar Road',
  'Limbodi',
  'Garpiplaya',
  'Ralamandal',
  'Pigdamber',
  'Bhawarkua',
  'Dakachya',
  'Chhatripura',
  'Navlakha',
  'Raj Mohalla',
  'Saket',
  'Annapurna Road',
  'Rajendra Nagar',
  'MOG Lines'
];

export const CATEGORIES = {
  school: [],
  college: [
    'Engineering', 
    'Management', 
    'Medical', 
    'Law', 
    'Design', 
    'Music', 
    'Digital Marketing', 
    'Software Training',
    'Arts & Science'
  ]
};

export const BOARDS = {
  school: [],
  college: ['UGC', 'AICTE', 'Autonomous', 'Private University', 'State Board', 'Affiliated / Certified']
};

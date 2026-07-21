/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Institute {
  id: string;
  name: string;
  type: 'school' | 'college';
  category: string; // "Boarding" | "Day School" | "Engineering" | "Management" | "Medical" | "Arts & Science"
  boardOrAffiliation: string; // "CBSE" | "ICSE" | "CIE" | "State Board" | "UGC" | "AICTE" | "Autonomous"
  location: string; // e.g. "Residency Area", "Simrol", "Bypass Road", "Vijay Nagar", "Rau", "Sanwer Road", "Manik Bagh"
  feePerAnnum: number; // in INR
  rating: number;
  totalReviews: number;
  image: string;
  description: string;
  facilities: string[];
  establishedYear: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  address?: string;
  nearestAirport?: string;
  approval?: string;
  selectionCriteria?: string;
  updates?: string[];
  coursesList?: {
    name: string;
    duration: string;
    fees: string;
    specializations?: string[];
  }[];
  placements?: {
    highest: string;
    average: string;
    lowest?: string;
    recruiters: string[];
  };
  facultyList?: {
    name: string;
    qualification: string;
    role?: string;
  }[];
  scholarships?: {
    name: string;
    criteria?: string;
    benefits?: string;
  }[];
  cutoffs?: {
    course: string;
    rank: string;
  }[];
}

export interface SearchFilters {
  searchQuery: string;
  type: 'all' | 'school' | 'college';
  category: string; // "All" or specific category
  boardOrAffiliation: string; // "All" or specific board
  location: string; // "All" or specific location
  maxFee: number;
}

export interface CounselingRequest {
  id: string;
  parentName: string;
  studentName?: string;
  studentClassOrDegree: string; // e.g. "Class 9", "B.Tech", "MBA"
  phone: string;
  email: string;
  preferredSlot: string; // "Morning (9 AM - 12 PM)" | "Afternoon (12 PM - 4 PM)" | "Evening (4 PM - 7 PM)"
  date: string;
  query?: string;
  status: 'pending' | 'completed';
  createdAt: string;
}

export interface CallbackRequest {
  id: string;
  name: string;
  phone: string;
  instituteId?: string; // Optional reference to a specific school/college
  email?: string; // Optional reference to verified user email
  createdAt: string;
}

export interface Review {
  id: string;
  instituteId: string;
  authorName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface SchoolRegistrationRequest {
  id: string;
  name: string;
  type: 'school' | 'college';
  category: string;
  boardOrAffiliation: string;
  location: string;
  feePerAnnum: number;
  establishedYear: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  description: string;
  facilities: string[];
  createdAt: string;
  status: 'pending' | 'approved';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'orb';
  text: string;
  createdAt: string;
}

export interface UserProfile {
  email: string;
  name: string;
  fatherName?: string;
  fatherEmail?: string;
  motherName?: string;
  motherEmail?: string;
  childName?: string;
  childMotherTongue?: string;
  address?: string;
  pincode?: string;
  shortlistedIds?: string[];
  cartIds?: string[];
  createdAt: string;
}

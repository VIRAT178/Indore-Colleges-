import type { Institute } from '../frontend/src/types.js';

export function mergePartnerInstitute(
  existing: Institute,
  partner: Partial<Institute> & Pick<Institute, 'id'>
): Institute {
  const protectedFields: Partial<Institute> = partner.id === 'sgsits' ? {
    name: existing.name,
    type: existing.type,
    category: existing.category,
    description: existing.description,
    location: existing.location,
    feePerAnnum: existing.feePerAnnum,
    rating: existing.rating,
    googleRating: existing.googleRating,
    indoreRating: existing.indoreRating,
    ratingSource: existing.ratingSource,
    ratingReviewCount: existing.ratingReviewCount,
    totalReviews: existing.totalReviews,
    image: existing.image,
    videoUrl: existing.videoUrl,
    backgroundVideoUrl: existing.backgroundVideoUrl,
    contactEmail: existing.contactEmail,
    contactPhone: existing.contactPhone,
    boardOrAffiliation: existing.boardOrAffiliation,
    approval: existing.approval,
    approvals: existing.approvals,
    affiliations: existing.affiliations,
    regulatoryApprovals: existing.regulatoryApprovals,
    accreditations: existing.accreditations,
    affiliationType: existing.affiliationType,
    affiliationPrivateName: existing.affiliationPrivateName,
    establishedYear: existing.establishedYear,
    coordinates: existing.coordinates,
    website: existing.website,
    address: existing.address,
    nearestAirport: existing.nearestAirport,
    facilities: existing.facilities,
    campusPhoto: existing.campusPhoto,
    visionMission: existing.visionMission,
    achievements: existing.achievements,
    selectionCriteria: existing.selectionCriteria,
    updates: existing.updates,
    highestPackage: existing.highestPackage,
    lowestPackage: existing.lowestPackage,
    isDirectoryVerified: existing.isDirectoryVerified,
    scholarships: existing.scholarships,
    cutoffs: existing.cutoffs,
    facultyList: existing.facultyList,
    courses: existing.courses,
    coursesList: existing.coursesList,
    placements: existing.placements
  } : {};

  return {
    ...existing,
    ...partner,
    image: partner.id === 'sgsits' ? existing.image : partner.image || existing.image,
    ...protectedFields,
    isPartnerRegistered: true
  };
}

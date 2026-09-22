import React from 'react';
import ReviewsHierarchyTable from './ReviewsHierarchyTable';

export default function BlogsPage() {
  return (
    <div className="bg-slate-50/50 min-h-screen pb-24">
      {/* REVIEWS SECTION CONTAINER */}
      <section className="py-6 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:pl-14 sm:pr-6 lg:px-8">
          <ReviewsHierarchyTable />
        </div>
      </section>
    </div>
  );
}

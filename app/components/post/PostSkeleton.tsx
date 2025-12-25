"use client";

interface PostSkeletonProps {
  count?: number;
}

export default function PostSkeleton({ count = 1 }: PostSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md p-5 animate-fadeIn"
        >
          {/* Header Skeleton */}
          <div className="flex items-center mb-4">
            <div className="skeleton w-12 h-12 rounded-full mr-3"></div>
            <div className="flex-1">
              <div className="skeleton skeleton-title w-3/4"></div>
              <div className="skeleton skeleton-text w-1/2"></div>
            </div>
          </div>

          {/* Image Skeleton */}
          <div className="skeleton w-full h-96 mb-4"></div>

          {/* Content Skeleton */}
          <div className="space-y-2">
            <div className="skeleton skeleton-text w-full"></div>
            <div className="skeleton skeleton-text w-5/6"></div>
            <div className="skeleton skeleton-text w-4/6"></div>
          </div>
        </div>
      ))}
    </>
  );
}

// Form Skeleton for Create/Update Posts
export function FormSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 animate-fadeIn">
      <div className="skeleton skeleton-title w-full mb-4"></div>
      <div className="skeleton w-full h-80 mb-4"></div>
      <div className="flex gap-2 justify-between">
        <div className="skeleton w-56 h-10"></div>
        <div className="flex gap-2">
          <div className="skeleton w-24 h-10"></div>
          <div className="skeleton w-24 h-10"></div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { XMarkIcon, BookOpenIcon } from "@heroicons/react/24/outline";

interface PrevPostProps {
  image: string;
  title: string;
  readContent: boolean;
  creation: string;
  setReadContent: (value: boolean) => void;
}

const PrevPost: React.FC<PrevPostProps> = ({
  title,
  image,
  readContent,
  setReadContent,
  creation,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fadeIn">
      {/* Header with Title and Toggle */}
      {image && (
        <div className="flex justify-between items-center p-5 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-100">
          <h2 className="font-bold text-xl gradient-text line-clamp-1">
            {title}
          </h2>
          <button
            onClick={() => setReadContent(!readContent)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200 text-purple-600 font-medium"
            aria-label={readContent ? "Close content" : "Read content"}
          >
            {readContent ? (
              <>
                <XMarkIcon className="w-5 h-5" />
                <span>Close</span>
              </>
            ) : (
              <>
                <BookOpenIcon className="w-5 h-5" />
                <span>Read</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Content Area - Image and Text Split View */}
      <div className="relative flex flex-col md:flex-row h-[600px]">
        {/* Image Section */}
        <div
          className={`relative transition-all duration-500 ease-in-out ${
            readContent ? "md:w-1/2 w-full" : "w-full"
          } h-full`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${image})`,
            }}
          >
            {/* Gradient Overlay for better text readability */}
            {readContent && (
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
            )}
          </div>
        </div>

        {/* Content Section - Slides in from right */}
        <div
          className={`${
            readContent ? "md:w-1/2 w-full" : "w-0"
          } transition-all duration-500 ease-in-out overflow-hidden`}
        >
          {readContent && (
            <div className="h-full overflow-auto custom-scrollbar bg-gradient-to-br from-slate-50 to-purple-50 p-6 animate-slideInRight">
              {/* Content Text */}
              <div
                className="prose prose-sm max-w-none text-gray-700 leading-relaxed mb-6"
                style={{ whiteSpace: "pre-line" }}
                dangerouslySetInnerHTML={{ __html: creation }}
              />

              {/* Footer with Close Button */}
              <div className="sticky bottom-0 pt-4 pb-2 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 italic">
                    Thank you for reading! ✨
                  </p>
                  <button
                    onClick={() => setReadContent(false)}
                    className="text-red-500 hover:text-red-600 font-medium flex items-center gap-1 transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4" />
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrevPost;

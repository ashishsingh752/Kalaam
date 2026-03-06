"use client";
import Image from "next/image";
import { BookOpenIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

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
  const handleRead = () => {
    setReadContent(!readContent);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl shadow-purple-100/20 dark:shadow-black/30 border border-gray-100/50 dark:border-slate-700/50 my-10 overflow-hidden hover:shadow-2xl transition-all duration-500 animate-fadeIn group/card">
      {/* Header */}
      <div className="flex items-center p-6 bg-gradient-to-r from-white to-purple-50/30 dark:from-slate-800 dark:to-purple-900/10">
        <div className="flex-1">
          <h3 className="font-extrabold text-xl text-gray-900 dark:text-gray-100 tracking-tight leading-tight">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
              Just now
            </span>
          </div>
        </div>

        <div
          onClick={handleRead}
          className={`relative cursor-pointer overflow-hidden flex items-center gap-2 px-6 py-2.5 rounded-2xl font-bold  ${
            readContent
              ? "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300"
              : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-600 dark:hover:text-gray-300  hover:shadow-purple-200"
          }`}
        >
          {readContent ? <>Close</> : <>Read</>}
        </div>
      </div>

      {/* Content Area - Toggle between Image and Text */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          readContent ? "max-h-[1500px]" : "max-h-[600px]"
        }`}
      >
        {readContent ? (
          <div className="min-h-[450px] max-h-[450px] overflow-y-auto px-4 text-center font-serif text-xl sm:text-2xl leading-[2] text-gray-800 dark:text-gray-200 italic whitespace-pre-line drop-shadow-sm">
            <div dangerouslySetInnerHTML={{ __html: creation }} />
          </div>
        ) : (
          <div
            className="relative w-full aspect-[16/10] sm:aspect-[16/8] cursor-pointer overflow-hidden group/img"
            onClick={handleRead}
          >
            {image ? (
              <>
                {image.startsWith("blob:") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                ) : (
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover/card:opacity-60 transition-opacity"></div>

                <div className="absolute bottom-6 left-6 right-6 text-white transform translate-y-2 group-hover/card:translate-y-0 transition-transform duration-500">
                  <p className="text-lg font-serif italic line-clamp-2 drop-shadow-lg opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-100">
                    {creation?.replace(/<[^>]*>/g, "").substring(0, 150)}...
                  </p>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <p className="text-gray-400 dark:text-gray-500 text-lg">
                  No image selected
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-8 py-6 bg-white dark:bg-slate-800 border-t border-gray-50 dark:border-slate-700 flex items-center justify-between">
        {!readContent && (
          <div className="text-sm flex justify-center items-center gap-2 font-semibold text-gray-500 dark:text-gray-400">
            Preview
          </div>
        )}
        <div className="flex justify-end flex-1 items-center gap-4">
          {readContent && (
            <div className="text-sm text-gray-500 dark:text-gray-400 italic">
              Preview of your post ✨
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrevPost;

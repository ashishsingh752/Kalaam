import Image from "next/image";
import React, { useState, useEffect } from "react";

interface ProfileImageUploadProps {
  onUpload: (file: File) => void;
  imageUrl: string;
}

// ! this is  for the uploading the profile image of a user in this profile section. Status: 200 ( all good)

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  onUpload,
  imageUrl,
}) => {
  const [imagePreview, setImagePreview] = useState<string>(imageUrl);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setImagePreview(imageUrl);
  }, [imageUrl]);

  return (
    <div className="flex flex-col items-center group">
      <div className="relative w-32 h-32 rounded-full ring-4 ring-white shadow-lg overflow-hidden transition-transform duration-300 transform group-hover:scale-105">
        {imagePreview ? (
          <Image
            src={imagePreview}
            alt="Profile Preview"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        )}

        <label
          htmlFor="image"
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="image"
            onChange={handleImageChange}
          />
          <div className="text-white flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mb-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-xs font-semibold tracking-wide uppercase">
              Change
            </span>
          </div>
        </label>
      </div>
    </div>
  );
};

export default ProfileImageUpload;

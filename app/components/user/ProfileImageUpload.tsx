import Image from 'next/image';
import React, { useState, useEffect } from 'react';

interface ProfileImageUploadProps {
  onUpload: (file: File) => void;
  imageUrl: string;
}

// ! this is  for the uploading the profile image of a user in this profile section. Status: 200 ( all good)

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({ onUpload, imageUrl }) => {
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
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        {imagePreview ? (
          <Image
            src={imagePreview}
            alt="Profile Preview"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Upload</span>
          </div>
        )}
        <label
          htmlFor="image"
          className="absolute inset-0 rounded-full cursor-pointer"
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="image"
            onChange={handleImageChange}
          />
          <div className="absolute inset-0 rounded-full bg-black opacity-0 hover:opacity-50 flex items-center justify-center transition-opacity">
            <span className="text-white text-sm">Change</span>
          </div>
        </label>
      </div>
    </div>
  );
};

export default ProfileImageUpload;

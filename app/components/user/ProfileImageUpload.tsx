import Image from 'next/image';
import React, { useState } from 'react';

const ProfileImageUpload = () => {
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        {imagePreview ? (
          <Image
            src={imagePreview as string}
            alt="Profile Preview"
            height={100}
            width={100}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Upload</span>
          </div>
        )}
        <label htmlFor="image" className="absolute inset-0 rounded-full cursor-pointer">
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

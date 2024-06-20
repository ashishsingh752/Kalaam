import Image from "next/image";
import React, { useState, useEffect } from "react";

interface ProfileImageUploadProps {
  imageUrl?: string | null;
  onUpload: (file: File) => void;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  imageUrl,
  onUpload,
}) => {
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );

  useEffect(() => {
    if (imageUrl) {
      setImagePreview(imageUrl);
    }
  }, [imageUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file); // Call the passed in onUpload function with the selected file
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
            src={
              (imagePreview as string) ||
              "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
            }
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

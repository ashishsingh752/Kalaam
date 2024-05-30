"use client";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import PrevPost from "./PrevPost";

export default function CreateNewPost() {
  const imgeRef = useRef<HTMLInputElement | null>(null);
  const [preView, setPreView] = useState<String>("");
  const [image, setImage] = useState<File | null>(null);
  const [postTitle, setPostTitle] = useState<String>("");
  const [showPreview, setShowPreview] = useState(false);
  const router = useRouter();

  // function to select the image for the user device
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImage(selectedFile);
      const previewImageUrl = URL.createObjectURL(selectedFile);
      setPreView(previewImageUrl);
    }
  };

  const handlePostTitle = (event: any) => {
    setPostTitle(event.target.value);
  };

  const removeImage = () => {
    setImage(null);
    setPreView("");
  };

  return (
    <div className=" bg-white h-screen md:h-[calc(100vh-5rem)] flex flex-col justify-center items-center">
      <div className="bg-gray-300  w-full p-5   md:w-[calc(100vw-25rem)]   justify-center items-center ">
        {/* title for the content */}
        <textarea
          name="text"
          id="title"
          placeholder="Enter Title "
          onChange={handlePostTitle}
          className="w-full h-20 focus:ring-0 font-semibold text-lg resize-y outline-none scrollebar p-6"
        ></textarea>
        {/* content  */}
        <textarea
          name="text"
          id="content"
          placeholder="Enter Your creation"
          className="w-full h-80 focus:ring-0 outline-none resize-y p-6"
        ></textarea>
        {/* image selection  */}
        <div className="mt-3 flex flex-wrap md:flex-nowrap  gap-2 justify-between items-center">
          <div>
            <input
              type="file"
              className="w-56 cursor-pointer"
              id="images"
              accept="image/*"
              onChange={handleImageChange}
              ref={() => imgeRef}
            />
          </div>
          {/*  buttom to preview and post */}
          <div className="flex md:w-auto w-full gap-2 justify-between">
            <div
              onClick={() => setShowPreview(!showPreview)}
              className="bg-gray-700 cursor-pointer text-white px-4 py-2 rounded-md font-medium hover:bg-gray-950 transition ease-in-out duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {!showPreview ? "Preview" : "Hide Preview"}
            </div>
            <div className="bg-gray-700 cursor-pointer text-white px-4 py-2 rounded-md font-medium hover:bg-gray-950 transition ease-in-out duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Post
            </div>
          </div>
        </div>
      </div>
      {/* preview post  */}
      {showPreview && (
        <div className="bg-gray-300  w-full p-5   md:w-[calc(100vw-25rem)]  justify-center items-center h-auto">
          <PrevPost title={postTitle} image={preView} callback={removeImage} />
        </div>
      )}
    </div>
  );
}

"use client";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import PrevPost from "./PrevPost";

export default function CreateNewPost() {
  const imgeRef = useRef<HTMLInputElement | null>(null);
  const [preView, setPreView] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [postTitle, setPostTitle] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);
  const [readContent, setReadContent] = useState(false);
  const [content, setContent] = useState<string>("");
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

  const handlePostTitle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  return (
    <div className="min-h-screen pb-5 md:h-full bg-gray-200 flex flex-col justify-center items-center">
      <div className="bg-gray-300 sm:mt-5 w-full p-5 md:w-[calc(100vw-25rem)] justify-center items-center">
        {/* title for the content */}
        <textarea
          name="text"
          id="title"
          placeholder="Enter Title"
          onChange={handlePostTitle}
          className="w-full h-20 focus:ring-0 font-semibold text-lg resize-y outline-none scrollbar p-6"
        ></textarea>
        {/* content  */}
        <textarea
          name="text"
          id="content"
          placeholder="Enter Your creation"
          onChange={handleContentChange}
          className="w-full h-80 focus:ring-0 outline-none resize-y p-6"
        ></textarea>
        {/* image selection  */}
        <div className="mt-3 flex flex-wrap md:flex-nowrap gap-2 justify-between items-center">
          <div>
            <input
              type="file"
              className="w-56 cursor-pointer"
              id="images"
              accept="image/*"
              onChange={handleImageChange}
              ref={imgeRef}
            />
          </div>
          {/* button to preview and post */}
          <div className="flex md:w-auto w-full gap-2 justify-between">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="bg-gray-700 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-950 transition ease-in-out duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              disabled={!image}
            >
              {!showPreview ? "Preview" : "Hide Preview"}
            </button>
            <button
              disabled={!image || !postTitle}
              className="bg-gray-700 outline-none text-white px-4 py-2 rounded-md font-medium hover:bg-gray-950 transition ease-in-out duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            >
              Post
            </button>
          </div>
        </div>
      </div>
      {/* preview post */}
      {showPreview && image && (
        <div className="bg-gray-300 w-full pt-5 md:w-[calc(100vw-25rem)] justify-center items-center h-auto">
          <PrevPost
            title={postTitle}
            image={preView}
            readContent={readContent}
            creation={content}
            setReadContent={setReadContent}
          />
        </div>
      )}
    </div>
  );
}

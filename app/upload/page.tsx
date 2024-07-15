"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Dashboard from "../components/admin/Dashboard";


//! this was to test the image upload and delete functionality in clouiinary
export default function Page() {
  const [image, setImage] = useState<File | null>(null);
  const { data: session } = useSession();
  // const session: CustomSession | null =  getServerSession(authOptions);

  const OnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // if (!event.target.files) return console.error("No files selected");

    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const uploadImage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!image) return console.error("No image selected");

      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.post("/api/upload", formData);
      console.log(response.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const deleteImage = async (e: string) => {
    try {
      const response = await axios.delete(
        "/api/upload/" + e.replace("kalaam-images/", "")
      );
      console.log(response.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dashboard/>
      {/* <form
        onSubmit={uploadImage}
        className="flex justify-center items-center min-h-screen"
      >
        <input type="file" name="image" id="image" onChange={OnChangeHandler} />
        <button className="bg-black p-2 rounded-lg text-white">Upload</button>
      </form>
      <button
        className="bg-black p-2 rounded-lg text-white"
      >
        Delete
      </button> */}
    </div>
  );
}

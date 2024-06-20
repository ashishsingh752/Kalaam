import cloudinary from "@/lib/cloudinary";

export const UploadImage = async (file: File, folder: string) => {
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);

  return new Promise(async (resolve, reject) => {
    await cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: folder,
        },
        async (error, result) => {
          if (error) {
            return reject(error.message);
          }
          return resolve(result);
        }
      )
      .end(bytes);
  });
};

export const DeleteImage = async (public_id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await cloudinary.uploader.destroy(public_id);
      return resolve(result);
    } catch (error: any) {
      return reject(error.message);
    }
  });
};

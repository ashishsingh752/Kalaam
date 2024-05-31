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
  return (
    <div className="bg-white  rounded-md">
      {image && (
        <div className="flex justify-between items-center p-4">
          <div className="font-bold">{title}</div>
          <div>
            <div
              onClick={() => setReadContent(!readContent)}
              className="text-right mr-2 cursor-pointer"
            >
              {readContent ? "close" : "read"}
            </div>
          </div>
        </div>
      )}

      {/* post image */}
      <div className="h-auto">
        <div
          className="max-w-screen   flex justify-center items-center w-full h-screen bg-no-repeat bg-center bg-cover "
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>
      </div>
      <div className="">{creation}</div>
    </div>
  );
};

export default PrevPost;

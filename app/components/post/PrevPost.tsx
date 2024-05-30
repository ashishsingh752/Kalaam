import React from "react";

interface PrevPostProps {
  image: String;
  title: String;
  callback: () => void;
}

const PrevPost: React.FC<PrevPostProps> = ({ title, image, callback }) => {
  return (
    <div className="bg-white  rounded-md">
      {image && (
        <div className="flex justify-between items-center p-4">
          <div className="font-bold">{title}</div>
          <div>
            <div onClick={callback} className="text-right mr-2 cursor-pointer">
              X
            </div>
          </div>
        </div>
      )}

      {/* post image */}
      <div className="h-auto">
        <div
          className="max-w-screen flex justify-center items-center w-full h-screen bg-no-repeat bg-center bg-cover "
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default PrevPost;

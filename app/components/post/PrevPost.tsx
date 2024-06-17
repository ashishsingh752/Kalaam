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
      <div className="h-screen flex">
        <div
          className={`${
            readContent ? "w-1/2" : "w-full"
          }  flex justify-center items-center  h-screen bg-no-repeat bg-center bg-cover`}
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>
        {readContent && (
          <div className={`${readContent ? "w-1/2" : ""} overflow-auto pt-0 p-4 `}>
             <div
              className="text-sm ml-2 mt-2"
              style={{ whiteSpace: "pre-line" }}
              dangerouslySetInnerHTML={{ __html: creation }}
            ></div>           
           <div
              onClick={() => setReadContent(!readContent)}
              className="text-right mr-2 cursor-pointer"
            >
              {readContent ? "close" : "read"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrevPost;

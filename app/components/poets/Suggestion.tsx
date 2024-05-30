import Image from "next/image";

interface SuggestionProps {
  imgSrc: string;
  name: string;
  jobtitle: string;
}

const Suggestion: React.FC<SuggestionProps> = ({
  imgSrc,
  name,
  jobtitle,
}) => {
  return (
    <div className="flex items-center justify-between bg-white p-2">
      {/* <div className="flex justify-center items-center"> */}

      <div>
        <Image
          src={imgSrc}
          alt="user img"
          width={100}
          height={100}
          objectFit="cover"
          className="rounded-full h-14 w-14 border p-[2px]"
        />
      </div>
      
      <div className="flex-1 ml-4">
        <h2 className="font-bold">{name}</h2>
        <h3 className="text-gray-400 text-sm w-[165px] truncate">{jobtitle}</h3>
      </div>
      <button className=" font-semibold ml-10 text-blue-400">Read</button>
    </div>
  );
};

export default Suggestion;

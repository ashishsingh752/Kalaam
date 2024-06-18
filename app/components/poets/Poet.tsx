import Image from "next/image";

interface SuggestionProps {
  imgSrc: string;
  name: string;
  jobtitle: string;
}

const Suggestion: React.FC<SuggestionProps> = ({ imgSrc, name, jobtitle }) => {
  return (
    <div className="">
      <div className="flex flex-col  items-center rounded-lg justify-center bg-white p-2">
        {/* Image of the poet */}
        <div className="w-full">
          <Image
            src={imgSrc}
            alt="user img"
            width={100}
            height={100}
            objectFit="cover"
            className=" h-32 w-96 border p-[2px]"
          />
        </div>

        {/* other details of the poet  */}
        <div className=" flex-1 justify-center ">
          <h2 className="flex justify-center font-bold">{name}</h2>
          <h3 className="text-gray-400 text-sm w-[150px] truncate">
            {jobtitle}
          </h3>
        </div>
        <button className="flex justify-center font-semibold text-blue-400">
          Read
        </button>
      </div>
    </div>
  );
};

export default Suggestion;

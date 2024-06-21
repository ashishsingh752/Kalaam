import Image from "next/image";

interface SuggestionProps {
  imgSrc: string;
  name: string;
  jobtitle: string;
}
//! now useless component
const Suggestion: React.FC<SuggestionProps> = ({ imgSrc, name, jobtitle }) => {
  return (
    <div className="">
      <div className="flex flex-col  items-center rounded-lg justify-center bg-white p-2">
        {/* Image of the poet */}
        <div className="w-full">
          <div className="relative h-32 w-96 border p-[2px]">
            <Image src={imgSrc} alt="user img" fill className="object-cover" />
          </div>
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

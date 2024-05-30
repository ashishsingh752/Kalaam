import Image from "next/image";
import Stories from "./feed/Stories";

export default function Story({ imgSrc, name }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <Image
          src={imgSrc}
          alt="user img"
          width={80}
          height={80}
          className="rounded-full w-26 h-26 p-[1.5px] border-gray-500 border-2 cursor-pointer hover:scale-110 transition-transform duration-200 ease-out "
        />
      </div>
      <div>
        <p className="text-xs text-center w-20 truncate">{name}</p>
      </div>
    </div>
  );
}


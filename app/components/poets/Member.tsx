import "tailwind-scrollbar";
import Members from "./Members";
import MembersYearSelection from "./MembersYearSelection";

export default function Member() {
  return (
    <>
      <div className="relative max-w-screen pt-16 md:pl-10 md:pr-10 min-h-screen bg-gray-200 justify-center items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://static.vecteezy.com/system/resources/previews/025/043/689/large_2x/old-fashioned-quill-on-parchment-by-candlelight-generative-ai-free-photo.jpg')",
          }}
        ></div>
        <div className="relative pl-10 text-7xl flex justify-center items-center flex-col  md:text-9xl p-2  bg-opacity-70">
          <div className="pt-2 text-gray-100">This is</div>
          <div className="mt-2 text-gray-100">
            <div className="text-gray-100 md:flex">Kalaam</div> Family
          </div>
        </div>
      </div>
      <hr />
      <div className="flex bg-gray-100 flex-col">
        <div className="flex p-10 pt-20  font-normal text-4xl justify-center items-center">
          Our Team
        </div>
        <div>
          <MembersYearSelection />
        </div>
      </div>
    </>
  );
}

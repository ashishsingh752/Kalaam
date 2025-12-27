import "tailwind-scrollbar";
import Members from "./Members";
import MembersYearSelection from "./MembersYearSelection";

export default function Member() {
  return (
    <div className="min-h-screen -mt-24 bg-slate-50">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-fixed bg-center transition-transform duration-700 hover:scale-105"
          style={{
            backgroundImage:
              "url('https://static.vecteezy.com/system/resources/previews/025/043/689/large_2x/old-fashioned-quill-on-parchment-by-candlelight-generative-ai-free-photo.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-900/80"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 px-6 text-center">
          <h1 className="flex flex-col items-center">
            <span className="text-blue-400 font-medium tracking-widest uppercase text-sm mb-4 animate-fade-in-up">
              Meet the Visionaries
            </span>
            <span className="text-white text-6xl md:text-8xl font-serif font-bold tracking-tight animate-fade-in">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
                Team
              </span>
            </span>
          </h1>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed animate-fade-in-delay">
            A collective of passionate poets, writers, and artists dedicated to
            the art of Kalaam.
          </p>
        </div>
      </div>

      {/* Team Content Section */}
      <div className="relative -mt-10 z-20">
        <div className="bg-slate-50 rounded-t-[3rem] pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-slate-800 mb-4">
                Explore Our Generations
              </h2>
              <div className="w-20 h-1 bg-blue-500 rounded-full"></div>
            </div>

            <div className="mt-8">
              <MembersYearSelection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

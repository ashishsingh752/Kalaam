import Image from "next/image";
import Header from "./components/Header";
import Feed from "./components/Feed";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Feed/>
      </div>
    </>
  );
}

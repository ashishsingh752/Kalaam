import Image from "next/image";
import Header from "./components/Header";
import Feed from "./components/Feed";
import SidebarMannager from "./components/SidebarManager";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Header />
        {/* <SidebarMannager/> */}
        <Feed/>
      </div>
    </>
  );
}

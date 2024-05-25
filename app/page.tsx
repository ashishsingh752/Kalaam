import Image from "next/image";
import Header from "./components/Header";
import Feed from "./components/Feed";
import SidebarMannager from "./components/SidebarManager";
import Home from "./components/Home";


export default function Page() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Header />
        {/* <SidebarMannager/> */}
        {/* <Home/> */}
        <Feed/>
      </div>
    </>
  );
}

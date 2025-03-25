import { Link, Outlet } from "react-router";
import { SideNav } from "./components/sideNav.jsx";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="flex flex-row gap-5 overflow-hidden h-screen  bg-[#F6F6F6]">
      <Toaster position="top center" />
      <SideNav />
      <Outlet />
    </div>
  );
}

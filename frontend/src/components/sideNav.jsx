import { FaRegUser } from "react-icons/fa";
import { LuSquareActivity, LuListTodo } from "react-icons/lu";
import { TfiWrite } from "react-icons/tfi";
import { IoLogoAppleAr } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { NavLink } from "react-router";
import { Logo } from "./logo.jsx";
import { useAuth } from "../context.jsx/AuthContext.jsx";

export function SideNav() {
  const { logout } = useAuth();
  return (
    <div className="flex flex-col gap-10 px-6 w-[250px] bg-white">
      <Logo />

      <ul className="flex flex-col text-sm gap-5 items-start ">
        <NavLink
          to="/app/dashboard"
          className="flex flex-row gap-3 items-center w-[199px] px-3 py-3 cursor-pointer rounded-lg dark:text-white transition-all duration-200 nav-link"
        >
          <span>
            <IoLogoAppleAr />
          </span>
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/app/tasks"
          className="flex flex-row gap-3 items-center w-[199px] px-3 py-3 cursor-pointer rounded-lg dark:text-white transition-all duration-200 nav-link"
        >
          <span>
            <TfiWrite />
          </span>
          <span>Tasks</span>
        </NavLink>

        <NavLink
          to="/app/notes"
          className="flex flex-row gap-3 items-center w-[199px] px-3 py-3 cursor-pointer rounded-lg dark:text-white transition-all duration-200 nav-link"
        >
          <span>
            <TfiWrite />
          </span>
          <span>Notes</span>
        </NavLink>

        <NavLink
          to="/notes"
          className="flex flex-row gap-3 items-center w-[199px] px-3 py-3 cursor-pointer rounded-lg dark:text-white transition-all duration-200 nav-link"
        >
          <span>
            <IoIosSettings />
          </span>
          <span>Settings</span>
        </NavLink>
        <NavLink
          to="/app/todos"
          className="flex flex-row gap-3 items-center w-[199px] px-3 py-3 cursor-pointer rounded-lg dark:text-white transition-all duration-200 nav-link"
        >
          <span>
            <LuListTodo />
          </span>
          <span>Todos</span>
        </NavLink>
      </ul>

      <button
        onClick={logout}
        className="mt-10 cursor-pointer gap-2 text-red-500 text-sm flex flex-row items-center"
      >
        <CiLogout className="font-bold" size={22} /> <span>Logout</span>
      </button>
    </div>
  );
}

import { FaRegUser } from "react-icons/fa";
import { LuSquareActivity, LuListTodo } from "react-icons/lu";
import { TfiWrite } from "react-icons/tfi";
import { IoLogoAppleAr } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { useContext } from "react";
import { AuthContext } from "../context.jsx/AuthContext";

export function SideNav({ disPatch, activeTab }) {
  return (
    <div className="flex flex-col text-sm gap-5 items-start w-full">
      <button
        onClick={() =>
          disPatch({ type: "SET_ACTIVE_TAB", payLoad: "overview" })
        }
        className={`flex flex-row gap-3 items-center w-[199px] px-3 py-3 cursor-pointer rounded-lg dark:text-white transition-all duration-200 ${
          activeTab === "overview" ? " bg-blue dark:bg-blue-700 text-white" : ""
        }`}
      >
        <IoLogoAppleAr />
        Dashboard
      </button>
      <button
        onClick={() => disPatch({ type: "SET_ACTIVE_TAB", payLoad: "task" })}
        className={`flex flex-row gap-3 items-center w-[199px] px-3 py-3 cursor-pointer rounded-lg dark:text-white transition-all duration-200 ${
          activeTab === "task" ? " bg-blue dark:bg-blue-700 text-white" : ""
        }`}
      >
        <LuSquareActivity />
        Tasks
      </button>
      <button
        onClick={() => disPatch({ type: "SET_ACTIVE_TAB", payLoad: "note" })}
        className={`flex flex-row gap-3 items-center w-[199px] px-3 py-3 cursor-pointer rounded-lg dark:text-white transition-all duration-200 ${
          activeTab === "note" ? " bg-blue dark:bg-blue-700 text-white" : ""
        }`}
      >
        <TfiWrite /> Notes
      </button>
      <button
        onClick={() => disPatch({ type: "SET_ACTIVE_TAB", payLoad: "todo" })}
        className={`flex flex-row gap-3 items-center w-[199px] px-3 py-3 cursor-pointer rounded-lg dark:text-white transition-all duration-200 ${
          activeTab === "todo" ? " bg-blue dark:bg-blue-700 text-white" : ""
        }`}
      >
        <LuListTodo />
        Todos
      </button>
      <button
        onClick={() => disPatch({ type: "SET_ACTIVE_TAB", payLoad: "setting" })}
        className={`flex flex-row gap-3 items-center w-[199px] px-3 py-3 cursor-pointer rounded-lg dark:text-white transition-all duration-200 ${
          activeTab === "setting" ? " bg-blue dark:bg-blue-700 text-white" : ""
        }`}
      >
        <IoIosSettings />
        Setting
      </button>
    </div>
  );
}

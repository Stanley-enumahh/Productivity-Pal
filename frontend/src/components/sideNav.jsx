import { FaRegUser } from "react-icons/fa";
import { LuSquareActivity, LuListTodo } from "react-icons/lu";
import { TfiWrite } from "react-icons/tfi";
import { IoLogoAppleAr } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";

export function SideNav({ disPatch, activeTab }) {
  return (
    <div className="flex flex-col text-sm gap-3 items-start w-full  font-semibold">
      <button
        onClick={() =>
          disPatch({ type: "SET_ACTIVE_TAB", payLoad: "overview" })
        }
        className={`flex flex-row gap-3 items-center px-7 py-3 cursor-pointer rounded-lg hover:bg-gray-600 dark:text-white  hover:text-white transition-all duration-200 ${
          activeTab === "overview"
            ? "ml-5 bg-black dark:bg-blue-700 text-white"
            : ""
        }`}
      >
        <IoLogoAppleAr /> Overview
      </button>
      <button
        onClick={() => disPatch({ type: "SET_ACTIVE_TAB", payLoad: "task" })}
        className={`flex flex-row gap-3 items-center px-7 py-3 cursor-pointer rounded-lg hover:bg-gray-600 dark:text-white hover:text-white transition-all duration-200 ${
          activeTab === "task"
            ? "ml-5 bg-black dark:bg-blue-700 text-white"
            : ""
        }`}
      >
        <LuSquareActivity />
        Tasks
      </button>
      <button
        onClick={() => disPatch({ type: "SET_ACTIVE_TAB", payLoad: "note" })}
        className={`flex flex-row gap-3 items-center px-7 py-3 cursor-pointer rounded-lg hover:bg-gray-600 dark:text-white hover:text-white transition-all duration-200 ${
          activeTab === "note"
            ? "ml-5 bg-black dark:bg-blue-700 text-white"
            : ""
        }`}
      >
        <TfiWrite /> Notes
      </button>
      <button
        onClick={() => disPatch({ type: "SET_ACTIVE_TAB", payLoad: "todo" })}
        className={`flex flex-row gap-3 items-center px-7 py-3 cursor-pointer rounded-lg hover:bg-gray-600 dark:text-white hover:text-white transition-all duration-200 ${
          activeTab === "todo"
            ? "ml-5 bg-black dark:bg-blue-700 text-white"
            : ""
        }`}
      >
        <LuListTodo />
        Todos
      </button>
      <button
        onClick={() => disPatch({ type: "SET_ACTIVE_TAB", payLoad: "setting" })}
        className={`flex flex-row gap-3 items-center px-7 py-3 cursor-pointer rounded-lg hover:bg-gray-600 dark:text-white hover:text-white transition-all duration-200 ${
          activeTab === "setting"
            ? "ml-5 bg-black dark:bg-blue-700 text-white"
            : ""
        }`}
      >
        <IoIosSettings />
        Setting
      </button>
    </div>
  );
}

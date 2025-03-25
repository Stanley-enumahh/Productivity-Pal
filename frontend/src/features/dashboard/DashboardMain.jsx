import { IoSearchOutline } from "react-icons/io5";
import illustration from "../../assets/4889345-removebg-preview.png";
import hand from "../../assets/noto_waving-hand.png";
import { Milestone } from "./Milestone";
import { CiSquarePlus } from "react-icons/ci";
import emptyTask from "../../assets/add-files-concept-illustration 1.png";
import { useAuth } from "../../context.jsx/AuthContext";

export function DashboardMain() {
  return (
    <div className="h-[700px] flex flex-col gap-16 w-[70%] overflow-auto">
      <GreetingsDiv />
      <SecondDivInMainBoard />
      <RecentTasks />
    </div>
  );
}

function GreetingsDiv() {
  const { user, storedUserName } = useAuth();
  return (
    <div className="w-full relative flex-col flex gap-2 py-4 px-7 overflow-hidden bg-white h-[184px] justify-between">
      <span className="border-[#2563EB4D] border-2 z-10 top-[-208px] w-[300px] h-[300px] rounded-full absolute left-[-100px]"></span>
      <span className="border-[#2563EB1A] border-2 z-10 top-[-245px] w-[300px] h-[300px] rounded-full absolute left-[-50px]"></span>
      <div className="flex flex-row justify-between items-center mt-2">
        <span className="flex flex-row gap-3">
          <img src={hand} alt="" className="w-[22px] object-cover h-[22px]" />
          <span className="text-sm text-start flex flex-col gap-1">
            <p className="capitalize"> {user || storedUserName || ""}</p>

            <p className="text-[#3E3E3E] text-[10px]">
              how can we help you today
            </p>
          </span>
        </span>
        <SearchBar />
      </div>
      <div className="flex flex-row justify-between items-end ">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl">Welcome! Back</h1>
          <p className="text-xs text-[#3E3E3E]">Real men don’t procrastinate</p>
          <button className="bg-blue cursor-pointer text-white rounded-[12px] px-2 w-[120px] justify-center text-xs mt-1 h-[33px] items-center flex">
            Add new task
          </button>
        </div>
        <img
          src={illustration}
          alt=""
          className="w-[160px] h-[80px] object-cover z-20"
        />
      </div>
      <span className="border-[#2563EB80] border-3 z-10 bottom-[-250px] w-[300px] h-[300px] rounded-full absolute right-[-150px]"></span>
      <span className="border-[#2563EB1A] border-2 z-10 bottom-[-256px] w-[300px] h-[300px] rounded-full absolute right-[-40px]"></span>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="bg-[#F4F4F4] w-[400px] items-center h-[33px] rounded-xl px-3 flex flex-row gap-2">
      <IoSearchOutline size={20} className="text-[#1C274C]" />
      <input
        type="text"
        placeholder="search tasks, projects, users"
        className="border-none outline-none text-xs w-[70%]"
      />
    </div>
  );
}

function SecondDivInMainBoard() {
  return (
    <div className="w-full flex h-[210px] flex-row justify-between">
      <div className="h-full w-[29%] flex flex-col gap-3">
        <p className="text-xs">Milestone</p>
        <Milestone />
      </div>

      <div className="h-full w-[68%] flex flex-col gap-3">
        <p className="text-xs">Add Task, Note, Todo</p>
        <div className=" h-full flex flex-row gap-2 justify-evenly items-center bg-white rounded-[12px]">
          <button className="button cursor-pointer bg-[#FBFCFF] h-[48%] w-[20%] flex flex-col justify-center items-center rounded-xl">
            <CiSquarePlus className="text-[#9BBAFF] font-bold" size={48} />
            <p className="text-center text-[10px] text-[#2563EB]">
              create your first <br /> task now
            </p>
          </button>
          <button className="button cursor-pointer bg-[#FBFCFF] h-[48%] w-[20%] flex flex-col justify-center items-center rounded-xl">
            <CiSquarePlus className="text-[#9BBAFF] font-bold" size={48} />
            <p className="text-center text-[10px] text-[#2563EB]">
              create your first <br /> task now
            </p>
          </button>
          <button className="button cursor-pointer bg-[#FBFCFF] h-[48%] w-[20%] flex flex-col justify-center items-center rounded-xl">
            <CiSquarePlus className="text-[#9BBAFF] font-bold" size={48} />
            <p className="text-center text-[10px] text-[#2563EB]">
              create your first <br /> task now
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
function RecentTasks() {
  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-sm">Recent tasks</h1>
      <div className="bg-[#FBFCFF] flex w-full flex-row justify-between px-16 items-center py-3 rounded-[12px]">
        <p className="text-sm">Progress on recent tasks would show here</p>
        <img src={emptyTask} alt="" className="w-[170px] object-cover" />
      </div>
    </div>
  );
}

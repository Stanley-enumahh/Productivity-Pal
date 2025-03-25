import { LuMoon } from "react-icons/lu";
import { IoNotificationsOutline } from "react-icons/io5";
import noProfile from "../../assets/blank-profile-picture-973460_1280.png";

export function DashboardSidebar() {
  return (
    <div className="w-[320px] bg-white h-full mr-[40px] items-center flex flex-col">
      <Topbar />
    </div>
  );
}
function Topbar() {
  return (
    <div className="flex flex-row gap-6 items-center justify-center w-full mt-7">
      <button>
        <LuMoon className="text-xl cursor-pointer" />
      </button>
      <button>
        <IoNotificationsOutline className="text-xl cursor-pointer" />
      </button>
      <span>
        <img src={noProfile} alt="" className="w-7 rounded-full" />
      </span>
    </div>
  );
}

import noProfile from "../assets/blank-profile-picture-973460_1280.png";
import { TiWeatherSunny } from "react-icons/ti";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context.jsx/AuthContext";
import { IoSearchOutline } from "react-icons/io5";

export function MainBoard({ profile, profileImg }) {
  return (
    <div className="w-full bg-white h-full">
      {/* <Topbar profile={profile} profileImg={profileImg} /> */}
      <GreetingsDiv />
    </div>
  );
}

function GreetingsDiv() {
  return (
    <div className="w-full flex-col gap-2 p-4">
      <div className="flex flex-row">
        <span className="flex flex-col gap-2">
          <p>
            Hi,Isaiah <br /> how can we help you today
          </p>
        </span>
        <SearchBar />
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="bg-[#F4F4F4] w-[400px] h-[44px] rounded-lg flex flex-row gap-2">
      <IoSearchOutline />
      <input
        type="text"
        placeholder="search tasks, projects, users"
        className="border-none outline-none"
      />
    </div>
  );
}

function Topbar({ profile, profileImg }) {
  const { user } = useContext(AuthContext);
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  function ToggleDarkmode() {
    setDark((d) => !d);
  }

  useEffect(
    function () {
      if (dark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    },
    [dark]
  );
  return (
    <div className="w-full h-[70px] bg-white dark:text-white flex flex-row justify-between">
      <p className="mt-1">
        Welcome back{" "}
        <span className="font-bold  capitalize">
          {user ? user.userName : ""}!
        </span>
      </p>
      <span className="flex flex-row gap-3 items-center">
        <button
          onClick={ToggleDarkmode}
          className="p-2 rounded-full bg-white dark:bg-black transition-all duration-200 cursor-pointer dark:text-white"
        >
          <TiWeatherSunny size={25} />
        </button>
        <img
          src={profileImg ? profileImg : noProfile}
          alt=""
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
      </span>
    </div>
  );
}

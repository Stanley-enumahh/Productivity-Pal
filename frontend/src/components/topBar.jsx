import noProfile from "../assets/blank-profile-picture-973460_1280.png";
import { TiWeatherSunny } from "react-icons/ti";
import { useState, useEffect } from "react";

export function TopBar({ profile, profileImg }) {
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
    <div className="w-full h-[70px] dark:text-white flex flex-row justify-between">
      <p className="mt-1">
        Welcome back{" "}
        <span className="font-bold  capitalize">
          {profile ? profile.userName : ""}!
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

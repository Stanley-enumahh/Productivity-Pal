import { useReducer, useState, useEffect, useContext } from "react";
import { Logo } from "./components/logo";
import { SideNav } from "./components/sideNav";

import { NoteUI } from "./components/notes";
import { TodoUI } from "./components/todoUI";
import { Setting } from "./components/AccountSetting";
import { TaskUI } from "./components/taskUI";
import { Overview } from "./components/overview";
import { SlLogout } from "react-icons/sl";
import { LastBoard } from "./components/lastBoard";
import { useAuth } from "./context.jsx/AuthContext";

const initialState = {
  activeTab: "overview",
};

function activeTabReducer(state, action) {
  switch (action.type) {
    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.payLoad };
  }
}

export default function App() {
  const { logout } = useAuth();
  const [Activestate, disPatch] = useReducer(activeTabReducer, initialState);
  const activeTab = Activestate.activeTab;
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("profile");
    return savedProfile ? JSON.parse(savedProfile) : null;
  });
  const [profileImg, setProfileImg] = useState(() => {
    const savedProfileImg = localStorage.getItem("profileImg");
    return savedProfileImg ? savedProfileImg : null;
  });
  const [taskArray, setTaskArray] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile"));
    const savedProfileImg = localStorage.getItem("profileImg");

    if (savedProfile) {
      setProfile(savedProfile);
    }
    if (savedProfileImg) {
      setProfileImg(savedProfileImg);
    }
  }, []);

  return (
    <div className="w-full flex h-screen overflow-hidden bg-[#F6F6F6] dark:bg-[#262730]  flex-row justify-between items-center transition-all duration-200">
      <div
        className="flex flex-col px-6 transition-all duration-200 bg-white 
      gap-8 w-[250px] h-full "
      >
        <Logo />
        <SideNav disPatch={disPatch} activeTab={activeTab} />
        <button
          onClick={logout}
          className="cursor-pointer flex flex-row gap-2 mt-16 pl-2 items-center text-sm text-red-500"
        >
          <SlLogout size={20} /> logout
        </button>
      </div>
      <div className="w-[55%] px-8 h-full flex flex-col">
        {activeTab === "note" && <NoteUI />}
        {activeTab === "todo" && <TodoUI />}
        {activeTab === "setting" && (
          <Setting
            profile={profile}
            setProfile={setProfile}
            profileImg={profileImg}
            setProfileImg={setProfileImg}
          />
        )}
        {activeTab === "task" && (
          <TaskUI taskArray={taskArray} setTaskArray={setTaskArray} />
        )}
        {activeTab === "overview" && (
          <Overview
            taskArray={taskArray}
            setTaskArray={setTaskArray}
            profile={profile}
            profileImg={profileImg}
          />
        )}
      </div>

      <LastBoard />
    </div>
  );
}

import { IoFlagSharp } from "react-icons/io5";
import avatarF from "../assets/ei_1740419592412-removebg-preview.png";
import avatarM from "../assets/ei_1740419755317-removebg-preview.png";
import { Flex, Progress } from "antd";
import { useEffect, useState } from "react";
import { Activities } from "./activities";

const quotes = [
  "Let's get some work done!",
  "No room for efficiencies!",
  "Great men do not procasinate!",
  "The earlier, the better",
];

export function Overview({ taskArray, profile }) {
  const [count, setCount] = useState(0);
  const [activityArray, setActivityArray] = useState(() => {
    const savedActivities = localStorage.getItem("activities");
    return savedActivities ? JSON.parse(savedActivities) : [];
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((c) => {
        if (c === quotes.length - 1) return 0;
        return c + 1;
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const displayedArray = taskArray.length > 3 ? taskArray.slice(-3) : taskArray;
  return (
    <div className="w-full flex flex-row">
      <div className="flex flex-col gap-5 w-full">
        <Greetings count={count} profile={profile} />
        <h2 className="font-semibold  transition-all duration-200 dark:text-white tet-xl">
          Recent Tasks
        </h2>
        <div className="flex flex-row justify-between w-full gap-5">
          {displayedArray.length < 1 ? (
            <div className="w-full flex justify-center items-center">
              <p className="text-gray-600 font-bold">
                Add tasks to access recent tasks
              </p>
            </div>
          ) : (
            <RecentTaskDisplay displayedArray={displayedArray} />
          )}
          <Activities
            activityArray={activityArray}
            setActivityArray={setActivityArray}
          />
        </div>
      </div>
    </div>
  );
}

function Greetings({ profile, count }) {
  return (
    <div className="w-[480px] h-[130px] rounded-xl shadow-xl bg-blue-700 flex flex-row gap-4">
      <span className="flex h-full justify-end items-end">
        <img
          // src={profile.gender === "male" ? avatarM : avatarF}
          src={avatarM}
          alt=""
          className="w-[100px] h-[100px] object-cover"
        />
      </span>
      <div className="flex flex-col text-white h-full justify-center">
        <h1 className=" text-2xl font-bold">Welcome back!</h1>
        <h3 className="text-sm">{quotes[count]}</h3>
      </div>
    </div>
  );
}

function RecentTaskDisplay({ displayedArray }) {
  return (
    <ul className="flex flex-col gap-4 w-[55%]">
      {displayedArray.map((recentTask) => (
        <li
          key={recentTask.id}
          className=" h-[80px]  transition-all duration-200 dark:bg-[#3f4045] items-center cursor-pointer justify-between w-full  rounded-xl bg-white shadow-lg  p-4 text-sm flex flex-row"
        >
          <span className="flex flex-col gap-3">
            <p className="font-bold leading-4  transition-all duration-200 dark:text-neutral-100">
              {recentTask.title}
            </p>
            <p
              className={`w-fit ${
                recentTask.priority === "low"
                  ? "text-green-500 bg-green-100"
                  : recentTask.priority === "medium"
                  ? "text-yellow-500 bg-yellow-100"
                  : recentTask.priority === "high" && "text-red-500 bg-red-100"
              } px-3 py-1 text-xs font-semibold rounded-sm`}
            >
              {recentTask.priority}
            </p>
          </span>

          <span className="flex flex-row gap-3 items-center w-[160px] justify-between">
            <Progress
              type="circle"
              percent={recentTask.completeness}
              strokeWidth={9}
              size={38}
              format={(percent) => percent + "%"}
            />
            {!recentTask.remainingDays ? (
              <p className="bg-gray-300 rounded-lg py-1 px-3 text-gray-700 text-xs">
                no deadline
              </p>
            ) : (
              <p className="bg-gray-300 text-nowrap text-xs rounded-lg py-1 px-3">
                {recentTask.remainingDays > 1
                  ? recentTask.remainingDays + " days left"
                  : recentTask.remainingDays === 0
                  ? " today"
                  : recentTask.remainingDays === 1
                  ? recentTask.remainingDays + " day left"
                  : recentTask.remainingDays < 0 &&
                    Math.abs(recentTask.remainingDays) + "days ago"}
              </p>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

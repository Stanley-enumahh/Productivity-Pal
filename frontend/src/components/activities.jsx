import { use, useEffect, useState } from "react";
import { TimePicker } from "antd";
import dayjs from "dayjs";
const format = "HH:mm";
import { MdDelete } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export function Activities({ activityArray, setActivityArray }) {
  const [activity, setActivity] = useState({ name: "", time: "" });
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  function handleAddActivity(e) {
    e.preventDefault();
    if (!activity.name || !activity.time) return;

    const newActivity = {
      name: activity.name,
      time: activity.time,
      id: crypto.randomUUID(),
    };
    setActivityArray((activityArray) => [...activityArray, newActivity]);
    localStorage.setItem("activities", JSON.stringify(activityArray));
    setActivity({ name: "", time: "" });
  }

  const onTimeChange = (time, timeString) => {
    setActivity({ ...activity, time: timeString });
  };

  function handleDeleteActivity(id) {
    const updatedActivities = activityArray.filter(
      (activity) => activity.id !== id
    );
    setActivityArray(updatedActivities);
    localStorage.setItem("activities", JSON.stringify(updatedActivities));
  }

  useEffect(
    () => localStorage.setItem("activities", JSON.stringify(activityArray)),
    [activityArray]
  );

  return (
    <div className="h-[270px] w-[55%] flex gap-3 flex-col p-5 rounded-lg justify-between bg-white shadow-lg  transition-all duration-200 dark:bg-transparent">
      <ActivityHeader activityArray={activityArray} />
      <div className="w-full flex flex-row justify-end gap-3">
        <ActivityDisplay
          activityArray={activityArray}
          settings={settings}
          handleDeleteActivity={handleDeleteActivity}
        />
        <ActivityForm
          setActivity={setActivity}
          activity={activity}
          handleAddActivity={handleAddActivity}
          onTimeChange={onTimeChange}
        />
      </div>
    </div>
  );
}

function ActivityDisplay({
  activityArray,
  settings,
  setActivityArray,
  handleDeleteActivity,
}) {
  return (
    <div className="flex flex-row gap-2 w-[340px]  rounded-lg">
      <div className="gap-2 w-full">
        {activityArray.length === 0 ? (
          <div className="w-full flex h-full justify-center items-center">
            <p className="text-gray-700 font-bold dark:text-neutral-400">
              you have no planned activities
            </p>
          </div>
        ) : activityArray.length < 2 ? (
          <ul className="flex flex-col gap-2">
            {activityArray.map((activity) => (
              <li
                key={activity.id}
                className="bg-[#f2f2f2] dark:bg-[#3f4045] dark:text-neutral-200 transition-all duration-200 mx-4 cursor-grab rounded-lg w-[150px] h-[150px] text-sm p-3 justify-between shadow-lg relative"
              >
                <span className="flex justify-end">
                  <p
                    className="p-2 rounded-full bg-white cursor-pointer"
                    onClick={() => handleDeleteActivity(activity.id)}
                  >
                    <MdDelete className="text-red-500" />
                  </p>
                </span>
                <span className="absolute bottom-2">
                  <p className="font-bold">{activity.name}</p>
                  <p className="text-lg">{activity.time}</p>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="Slider-Container">
            <Slider {...settings}>
              {activityArray.map((activity) => (
                <div key={activity.id} className="list-none ">
                  <li className="bg-[#f2f2f2] dark:bg-[#3f4045] dark:text-neutral-200  duration-200 transition-all rounded-lg w-[150px] cursor-grab h-[150px] text-sm p-3 justify-between shadow-lg relative">
                    <span className="flex justify-end ">
                      <p className="p-2 rounded-full bg-white">
                        <MdDelete
                          className="cursor-pointer text-red-500"
                          onClick={() => handleDeleteActivity(activity.id)}
                        />
                      </p>
                    </span>
                    <span className="absolute bottom-2">
                      <p className="font-bold">{activity.name}</p>
                      <p className="text-lg">{activity.time}</p>
                    </span>
                  </li>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
}

function ActivityForm({
  activity,
  setActivity,
  handleAddActivity,
  onTimeChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-[150px] relative flex justify-center items-center rounded-lg bg-blue-700 font-bold text-xs text-white h-[150px] border-dashed border-blue">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col gap-2 cursor-pointer w-full h-full justify-center items-center"
        >
          +<p>Add activity</p>
        </button>
      ) : (
        <form
          onSubmit={handleAddActivity}
          className="flex flex-col gap-2 p-2 w-full h-full"
        >
          <input
            value={activity.name}
            onChange={(e) => setActivity({ ...activity, name: e.target.value })}
            type="text"
            placeholder="Activity"
            className="w-full text-xs flex items-center justify-center border-gray-400 border py-2 px-2 rounded-lg outline-none"
          />
          <TimePicker
            onChange={onTimeChange}
            defaultValue={dayjs("00:00", format)}
            format={format}
          />
          <button className="bg-gray-500 w-[90%] py-1.5 rounded-sm absolute bottom-2 cursor-pointer">
            Add
          </button>
        </form>
      )}
    </div>
  );
}

function ActivityHeader({ activityArray }) {
  return (
    <div className="flex text-sm flex-row  transition-all duration-200 dark:text-neutral-200 w-full justify-between">
      <h1>My activities</h1>
      <p>You have {activityArray.length} planned activities</p>
    </div>
  );
}

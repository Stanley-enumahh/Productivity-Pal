import { useEffect, useState } from "react";
import { Tasks } from "./tasks";
import { DatePicker } from "antd";
import { MdOutlineWidgets } from "react-icons/md";
import { getTaskInsights } from "../geminiAI";

export function TaskUI({ taskArray, setTaskArray }) {
  const [isOpen, setIsOpen] = useState(false);
  const [progressReport, setProgressReport] = useState("Loading insights...");

  const [memberName, setMemberName] = useState("");

  const [task, setTask] = useState({
    title: "business talks with peter",
    info: "we will be introducing new AI features today, especially the voice ",
    priority: "low",
    dueDate: "",
    completeness: 0,
    remainingDays: "",
    members: [],
  });

  function handleAddMembers() {
    if (!memberName.trim()) return;
    if (task.members.length < 3) {
      const newMember = { name: memberName, id: crypto.randomUUID() };

      setTask((prevTask) => ({
        ...prevTask,
        members: [...prevTask.members, newMember],
      }));
      setMemberName("");
    }
  }

  function handleAddTask(e) {
    e.preventDefault();
    if (!task.title) {
      return;
    }
    const newTask = {
      id: crypto.randomUUID(),
      title: task.title,
      info: task.info,
      dueDate: task.dueDate,
      priority: task.priority,
      completeness: task.completeness,
      completed: false,
      members: [...task.members],
      remainingDays: Math.ceil(
        (new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24)
      ),
    };

    setTaskArray((taskArray) => {
      const updatedTasks = [...taskArray, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });

    setTask({
      title: "",
      info: "",
      priority: "low",
      dueDate: "",
      completeness: 0,
      members: [],
    });
    setIsOpen(false);
  }

  const onDateChange = (date, dateString) => {
    setTask({
      ...task,
      dueDate: dateString,
    });
  };

  useEffect(
    function () {
      localStorage.setItem("tasks", JSON.stringify(taskArray));
    },
    [taskArray]
  );

  useEffect(() => {
    async function fetchAIInsights() {
      const insights = await getTaskInsights(taskArray);
      setProgressReport(insights);
    }

    if (taskArray.length > 0) {
      fetchAIInsights();
    } else {
      setProgressReport("No tasks available.");
    }
  }, [taskArray]);

  return (
    <div className="flex flex-col w-full gap-5">
      <h1 className=" transition-all duration-200 dark:text-white text-xl">
        My Tasks
      </h1>
      <div className="flex flex-row w-full h-full relative justify-between gap-5">
        <div className="w-fit">
          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              className="bg-blue-800 text-white rounded-lg py-2 cursor-pointer text-xs w-[100px]"
            >
              Add Task +
            </button>
          )}
        </div>
        {isOpen && (
          <TaskForm
            handleAddTask={handleAddTask}
            task={task}
            setTask={setTask}
            onDateChange={onDateChange}
            setIsOpen={setIsOpen}
            memberName={memberName}
            setMemberName={setMemberName}
            handleAddMembers={handleAddMembers}
          />
        )}

        <Tasks
          taskArray={taskArray}
          setTask={setTask}
          setTaskArray={setTaskArray}
          progressReport={progressReport}
        />
      </div>
    </div>
  );
}

function TaskForm({
  handleAddTask,
  setTask,
  task,
  onDateChange,
  setIsOpen,
  memberName,
  setMemberName,
  handleAddMembers,
}) {
  return (
    <div className="w-[330px] dark:bg-[#0b3954] transition-all duration-200 dark:text-neutral-200 h-[400px] relative p-4 rounded-lg flex flex-col gap-4 items-center bg-gray-200">
      <span className="w-full flex justify-end">
        <button
          onClick={() => setIsOpen(false)}
          className="text-red-500 text-sm cursor-pointer"
        >
          x
        </button>
      </span>
      <input
        required
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        name="title"
        type="text"
        className="border px-3 w-full text-xs py-2 outline-none border-gray-400 rounded-md placeholder:dark:text-neutral-400"
        placeholder="task title"
      />

      <textarea
        value={task.info}
        onChange={(e) => setTask({ ...task, info: e.target.value })}
        name="info"
        type="text"
        className="border px-3 w-full h-[70px] text-gray-800 text-xs outline-none border-gray-400 rounded-md dark:text-neutral-200 transition-all duration-200 placeholder:dark:text-neutral-400"
        placeholder="task"
      />

      <div className="flex flex-row w-full justify-between">
        <select
          name=""
          id=""
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
          className="outline-none w-[30%] text-sm text-black dark:text-neutral-200"
        >
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>

        <DatePicker onChange={onDateChange} className="w-[40%]" />
      </div>

      <div className="flex flex-row justify-between w-full">
        <input
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
          type="text"
          placeholder="+ Add task member"
          className="border outline-none border-gray-300 rounded-lg py-1 w-[70%] text-xs px-3"
        />

        <button
          onClick={handleAddMembers}
          className="px-2 rounded-md border border-gray-300 text-xs cursor-pointer hover:bg-gray-400 transition-all duration-200"
        >
          add
        </button>
      </div>
      <ul className="flex flex-row gap-2 flex-wrap w-full text-xs justify-start">
        {task.members.map((member) => (
          <li
            key={member.id}
            className="border border-gray-300  px-2 rounded-sm flex flex-row gap-2"
          >
            <p className=" py-1 capitalize">{member.name}</p>
            <button
              onClick={() =>
                setTask((prevTask) => ({
                  ...prevTask,
                  members: prevTask.members.filter((m) => m.id !== member.id),
                }))
              }
              className="text-sm text-red-700 cursor-pointer"
            >
              x
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleAddTask}
        className="bg-blue-800 cursor-pointer rounded-lg shadow-lg hover:opacity-80 duration-200 transition-all text-white text-xs py-2 absolute bottom-3 w-[85%]"
      >
        Save task
      </button>
    </div>
  );
}

function EmptyUI({ setIsOpen }) {
  return (
    <div className="w-[330px] h-[310px] p-4 relative rounded-lg flex flex-col gap-4 items-center bg-gray-200">
      <MdOutlineWidgets size={120} className="text-gray-400 mt-10" />
      <div className="flex flex-col">
        <h1 className="font-semibold text-sm">New Task</h1>
        <p className="text-xs text-justify">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt autem
          eos cum ipsa,
        </p>
      </div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-800 cursor-pointer rounded-lg shadow-lg hover:opacity-80 duration-200 transition-all text-white text-xs py-2 absolute bottom-3 w-[86%]"
      >
        + Add new task
      </button>
    </div>
  );
}

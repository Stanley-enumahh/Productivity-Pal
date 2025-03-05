import { useState } from "react";
import { Popover } from "antd";
import { AiOutlineMore } from "react-icons/ai";
import { MdExpandMore } from "react-icons/md";
import { getTaskInsights } from "../geminiAI";

export function Tasks({ taskArray, setTaskArray }) {
  const [filter, setfilter] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [taskInsight, setTaskInsight] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const filteredItems = taskArray.filter((tasks) => {
    if (filter === "Completed") return tasks.completed;
    if (filter === "Idle") return tasks.completeness === 0;
    if (filter === "In Progress")
      return tasks.completeness > 1 && !tasks.completed;
    return true;
  });

  async function handleSelectedTask(task) {
    setSelectedTask(task);

    const insight = await getTaskInsights(task);
    setTaskInsight(insight);
  }

  function toggleIsOpen() {
    setIsOpen((s) => !s);
  }

  function handleDelete(selectedId) {
    setTaskArray(taskArray.filter((tasks) => tasks.id !== selectedId));
  }

  function toggleCompleteMilestone(taskId, milestoneId) {
    const updatedTasks = taskArray.map((task) => {
      if (task.id !== taskId) return task;

      const updatedMilestones = task.milestones.map((milestone) =>
        milestone.id === milestoneId
          ? { ...milestone, completed: !milestone.completed }
          : milestone
      );

      const totalMilestone = updatedMilestones.length;
      const completedMilestone = updatedMilestones.filter(
        (m) => m.completed
      ).length;
      const completeness =
        totalMilestone > 0
          ? Math.round((completedMilestone / totalMilestone) * 100)
          : 0;

      return {
        ...task,
        milestones: updatedMilestones,
        completeness,
        completed: completeness === 100,
      };
    });

    setTaskArray(updatedTasks);
    localStorage.setItem("task", JSON.stringify(updatedTasks));
  }

  return (
    <div className="w-full flex flex-col gap-3">
      {taskArray.length > 1 && (
        <Popover
          content={
            <div className="flex flex-col items-start text-xs px-3 gap-3">
              <button
                onClick={() => setfilter("All")}
                className="cursor-pointer w-full text-start "
              >
                All
              </button>
              <button
                onClick={() => setfilter("Completed")}
                className="cursor-pointer w-full text-start "
              >
                Completed
              </button>
              <button
                onClick={() => setfilter("In Progress")}
                className="cursor-pointer w-full text-start "
              >
                In Progress
              </button>

              <button
                onClick={() => setfilter("Idle")}
                className="cursor-pointer w-full text-start "
              >
                Idle
              </button>
            </div>
          }
        >
          <button className="rounded-lg gap-2 flex flex-row bg-blue-800 w-fit cursor-pointer text-xs shadow-lg text-white px-4 py-2 items-center">
            Sort by <MdExpandMore />
          </button>
        </Popover>
      )}
      <ul className="w-full h-[400px] mt-2 gap-y-4 overflow-y-auto overflow-x-hidden flex flex-row flex-wrap gap-4 ">
        {filteredItems.map((task) => (
          <li
            key={task.id}
            className="w-[280px] py-8 border transition-all duration-200 dark:bg-[#3f4045] border-gray-300 bg-white h-fit gap-3 rounded-lg shadow-lg flex flex-col px-5 text-xs dark:border-none"
          >
            <div className="flex flex-row justify-between w-full items-center">
              <span className="flex flex-row gap-3 items-center">
                <p
                  className={`capitalize ${
                    task.priority === "low"
                      ? "text-green-500 bg-green-100"
                      : task.priority === "medium"
                      ? "text-yellow-500 bg-yellow-100"
                      : task.priority === "high" && "text-red-500 bg-red-100"
                  } px-3 py-1 font-semibold rounded-sm`}
                >
                  {task.priority}
                </p>
                {task.dueDate && (
                  <p className="px-3 py-1 font-semibold bg-gray-100 rounded-sm">
                    {task.dueDate || "No Due Date"}
                  </p>
                )}
              </span>
              <Popover
                placement="topLeft"
                content={
                  <div className="flex flex-col gap-3 items-start text-xs">
                    <button
                      className="cursor-pointer text-red-500"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </button>
                    <button className="cursor-pointer text-gray-800">
                      Edit
                    </button>
                  </div>
                }
              >
                <AiOutlineMore
                  size={22}
                  className="dark:text-neutral-300 transition-all duration-200"
                />
              </Popover>
            </div>
            <p className="text-sm font-semibold capitalize dark:text-neutral-100 transition-all duration-200">
              {task.title}
            </p>
            <p className="text-gray-800 dark:text-neutral-200 transition-all duration-200">
              {task.info}
            </p>

            <div className="flex flex-row justify-between items-center">
              <div
                style={{ width: `${task.completeness}%` }}
                className="bg-red-300 h-2 rounded-md"
              ></div>

              <p className="text-blue-600 font-semibold dark:text-neutral-200 transition-all duration-200">
                {task.completeness}%
              </p>
            </div>

            {task.completed && (
              <p className="px-3 py-1 rounded-lg text-[10px] bg-green-400 w-fit text-white">
                Completed
              </p>
            )}
            {task.completeness === 0 && (
              <p className="px-3 py-1 rounded-lg text-[10px] bg-gray-400 w-fit text-white">
                Not Started
              </p>
            )}

            {task.completeness > 1 && task.completeness < 100 && (
              <p className="px-3 py-1 rounded-lg text-[10px] text-white bg-blue-500 w-fit">
                In Progress
              </p>
            )}

            <ul className="flex flex-col gap-2">
              {task.milestones?.map((milestone) => (
                <li
                  key={milestone.id}
                  className="flex flex-row items-center gap-2"
                >
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={milestone.completed}
                    onChange={() =>
                      toggleCompleteMilestone(task.id, milestone.id)
                    }
                  />
                  <p>{milestone.title}</p>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSelectedTask(task)}
              className="bg-green-400 rounded-xl py-2 text-white"
            >
              get AI suggestions
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

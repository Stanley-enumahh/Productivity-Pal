import milestoneAnimation from "../../assets/3d-render-frosted-glass-blast-off-rocket 1.png";

export function Milestone() {
  return (
    <div className="h-[181px] justify-end items-center py-3 text-white bg-blue w-full rounded-[12px] flex flex-col">
      <img
        src={milestoneAnimation}
        alt=""
        className="w-[60%] object-cover mb-1 ml-4"
      />
      <div className="flex flex-col gap-1 justify-center w-full items-center">
        <span className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-3xl">0/0</h1>
          <p className="text-[10px] font-light">Tasks completed</p>
        </span>

        <p className="text-[8px] text-center font-light">
          Complete tasks to achieve milestone
        </p>
      </div>
    </div>
  );
}

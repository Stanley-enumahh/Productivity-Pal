import { HiMiniXMark } from "react-icons/hi2";

export const SeeMoreComponent = ({ expandedNote, closeSelectedNotelModal }) => {
  return (
    <div className="w-full h-full flex flex-col gap-5 bg-[#E4EDFF]">
      <span className="w-full flex justify-end">
        <HiMiniXMark
          className="cursor-pointer"
          onClick={closeSelectedNotelModal}
        />
      </span>
      <h1 className="text-[16px] font-medium capitalize w-[70%]">
        {expandedNote?.title}
      </h1>
      <p className="text-sm leading-[24px] font-light break-words">
        {expandedNote?.content}
      </p>
    </div>
  );
};

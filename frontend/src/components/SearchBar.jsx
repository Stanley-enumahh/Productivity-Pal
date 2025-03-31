import { CiSearch } from "react-icons/ci";

export const SearchBar = () => {
  return (
    <div className="flex px-3 flex-row w-[500px] gap-3 items-center bg-white rounded-xl">
      <CiSearch size={22} className="font-bold" />
      <input
        type="text"
        placeholder="search tasks, projects, users  "
        className="py-4 w-[70%] outline-none text-sm placeholder:text-xs text-[#09091480] font-light"
      />
    </div>
  );
};

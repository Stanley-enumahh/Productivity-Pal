import { CiSearch } from "react-icons/ci";

export const SearchBar = () => {
  return (
    <div className="flex px-3 flex-row w-[500px] items-center bg-white border-[] rounded-xl">
      <CiSearch size={22} className="font-bold" />
      <input
        type="text"
        placeholder="search tasks, projects, users  "
        className="py-3 px-2 placeholder:text-xs text-[#09091480] font-light"
      />
    </div>
  );
};

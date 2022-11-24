import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { FormEvent, FunctionComponent, useState } from "react";

export const SearchBar: FunctionComponent<{
  onSearch: (searchTerm: string) => void;
}> = ({ onSearch }) => {
  const [value, setValue] = useState("");
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  const onSearchButtonClick = (e: FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };
  return (
    <form
      onSubmit={onSearchButtonClick}
      className="m-1 h-full flex border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
    >
      <div className="flex items-center px-3 pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 fill-black hover:opacity" />
      </div>

      <input
        className="w-full text-sm pr-2 text-gray-900 bg-white outline-none"
        placeholder="Search artworks..."
        required
        value={value}
        onChange={onChange}
      />
      <div className="h-full px-1 flex items-center ">
        <button
          type="submit"
          className="text-white font-medium rounded-lg text-sm px-4 py-2 bg-red-700 disabled:opacity-40 diabled:cursor-not-allowed hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
          disabled={value === ""}
        >
          Search
        </button>
      </div>
    </form>
  );
};

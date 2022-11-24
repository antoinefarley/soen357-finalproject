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
        <SearchIcon />
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

const SearchIcon = () => (
  <svg
    aria-hidden="true"
    className="w-5 h-5 text-gray-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

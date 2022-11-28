import { Dispatch, SetStateAction, KeyboardEvent } from "react";

import search_icon from "../../assets/search-icon.svg";

import "./SearchBar.css";

type Props = {
  onSearch: Dispatch<SetStateAction<string>>;
};

const SearchBar = ({ onSearch }: Props) => {
  const handleSearch = ({ key, target }: KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") {
      onSearch(target.value);
    }
  };

  return (
    <div className="search">
      <img className="search__icon" src={search_icon} alt="Magnifying glass" />
      <input
        className="search__input"
        type="text"
        placeholder="Search photos"
        onKeyDown={handleSearch}
      />
    </div>
  );
};

export default SearchBar;

import { forwardRef } from "react";

import search_icon from "../../assets/search-icon.svg";

import type {
  Dispatch,
  ForwardedRef,
  KeyboardEvent,
  SetStateAction,
} from "react";

import "./SearchBar.css";

type Props = {
  onSearch: Dispatch<SetStateAction<string>>;
};

const SearchBar = forwardRef(
  ({ onSearch }: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const handleSearch = ({ key, target }: KeyboardEvent<HTMLInputElement>) => {
      if (key === "Enter") {
        onSearch(target.value);
      }
    };

    return (
      <div className="search">
        <img
          className="search__icon"
          src={search_icon}
          alt="Magnifying glass"
        />
        <input
          ref={ref}
          className="search__input"
          type="text"
          placeholder="Search photos"
          onKeyDown={handleSearch}
        />
      </div>
    );
  }
);

export default SearchBar;

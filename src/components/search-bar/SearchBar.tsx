import { forwardRef, useState } from "react";

import search_icon from "../../assets/search-icon.svg";
import close_icon from "../../assets/close.svg";

import type {
  Dispatch,
  ForwardedRef,
  SetStateAction,
  ChangeEvent,
  FormEvent,
} from "react";

import "./SearchBar.css";

type Props = {
  onSearch: Dispatch<SetStateAction<string>>;
};

const SearchBar = forwardRef(
  ({ onSearch }: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const [searchInput, setSearchInput] = useState("");

    const handleSearchInputChange = ({
      target: input,
    }: ChangeEvent<HTMLInputElement>): void => setSearchInput(input.value);

    const handleSearch = (e: FormEvent<HTMLFormElement>): void => {
      e.preventDefault();

      onSearch(searchInput);
    };

    const handleClearSearch = (): void => setSearchInput("");

    return (
      <form
        className="search"
        onSubmit={handleSearch}
        onReset={handleClearSearch}
      >
        <img
          className="search__icon"
          src={search_icon}
          alt="Magnifying glass"
        />

        {/* Search input */}
        <input
          ref={ref}
          className="search__input"
          type="text"
          placeholder="Search photos"
          onChange={handleSearchInputChange}
        />

        {/* Clear search input button */}
        {searchInput.length > 0 && (
          <button className="search__clear__button" type="reset">
            <img
              className="search__clear__button__icon"
              src={close_icon}
              alt="'x' icon to clear search input"
            />
          </button>
        )}
      </form>
    );
  }
);

export default SearchBar;

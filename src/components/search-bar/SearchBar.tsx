import CloseSVG from "../svgs/CloseSVG";
import MagnifyingGlassSVG from "../svgs/MagnifyingGlassSVG";

import type { Dispatch, SetStateAction, ChangeEvent, FormEvent } from "react";

import "./SearchBar.css";

type Props = {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  onSearch: Dispatch<SetStateAction<string>>;
};

const SearchBar = ({ input, setInput, onSearch }: Props) => {
  const handleSearch = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    onSearch(input);
  };

  const handleInputChange = ({
    target: input,
  }: ChangeEvent<HTMLInputElement>): void => setInput(input.value);

  const handleInputClear = (): void => setInput("");

  return (
    <form
      className="search"
      onSubmit={handleSearch}
      onReset={handleInputClear}
      role="search"
      aria-label="Search bar for photos"
      aria-live="polite"
      aria-relevant="additions removals"
    >
      <MagnifyingGlassSVG className="search__icon" />

      {/* Search input */}
      <input
        className="search__input"
        type="text"
        value={input}
        placeholder="Search for photos"
        onChange={handleInputChange}
        data-test="search-input"
      />

      {/* Clear search input button */}
      <button
        className="search__clear__button"
        style={{ visibility: input.length > 0 ? "visible" : "hidden" }}
        type="reset"
        aria-label="Clear search bar input"
        data-test="search-bar-clear"
      >
        <CloseSVG className="search__clear__button__icon" />
      </button>
    </form>
  );
};

export default SearchBar;

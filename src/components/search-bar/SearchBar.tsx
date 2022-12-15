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
    <form className="search" onSubmit={handleSearch} onReset={handleInputClear}>
      <MagnifyingGlassSVG className="search__icon" />

      {/* Search input */}
      <input
        className="search__input"
        type="text"
        value={input}
        placeholder="Search photos"
        onChange={handleInputChange}
        data-test="search-input"
      />

      {/* Clear search input button */}
      {input.length > 0 && (
        <button className="search__clear__button" type="reset" data-test="search-bar-clear">
          <CloseSVG className="search__clear__button__icon" />
        </button>
      )}
    </form>
  );
};

export default SearchBar;

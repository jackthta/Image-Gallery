import { useRef } from "react";

import SearchBar from "../search-bar/SearchBar";

import hero_icon from "../../../public/aperture.svg";

import type { Dispatch, SetStateAction } from "react";

import "./Header.css";

type Props = {
  onSearch: Dispatch<SetStateAction<string>>;
};

function Header({ onSearch }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleHeroIcon = () => {
    // Searching an empty query string will
    // search for random photos.
    onSearch("");

    // Ensure <SearchBar>'s <input> value is empty
    // after "resetting" search query.
    // AKA `if (inputRef.current) inputRef.current.value = "";`
    // (but wanted to try out this syntax just once)
    inputRef.current && (inputRef.current.value = "");
  };

  return (
    <header className="header">
      <button className="header__icon-button" onClick={handleHeroIcon}>
        <img className="header__icon" src={hero_icon} alt="Aperture lens" />
      </button>
      <SearchBar ref={inputRef} onSearch={onSearch} />
    </header>
  );
}

export default Header;

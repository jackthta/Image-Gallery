import { useState } from "react";

import SearchBar from "../search-bar/SearchBar";
import ThemeSwitch from "../theme-switch/ThemeSwitch";

import BrandSVG from "../svgs/BrandSVG";

import type { Dispatch, SetStateAction } from "react";

import "./Header.css";

type Props = {
  onSearch: Dispatch<SetStateAction<string>>;
};

function Header({ onSearch }: Props) {
  const [input, setInput] = useState("");

  const brandButtonTitle = input ? "Refresh home page" : "";

  const handleResetSearch = (): void => {
    setInput("");
    onSearch("");
  };

  return (
    <header className="header">
      <button
        className="header__icon-button"
        title={brandButtonTitle}
        onClick={handleResetSearch}
        data-test="header-brand-button"
      >
        <BrandSVG className="header__icon" />
      </button>
      <SearchBar input={input} setInput={setInput} onSearch={onSearch} />

      <div className="header__divider"></div>
      <ThemeSwitch />
    </header>
  );
}

export default Header;

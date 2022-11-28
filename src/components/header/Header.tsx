import { Dispatch, SetStateAction } from "react";

import SearchBar from "../search-bar/SearchBar";

import hero_icon from "../../../public/aperture.svg";

import "./Header.css";

type Props = {
  onSearch: Dispatch<SetStateAction<string>>;
};

function Header({ onSearch }: Props) {
  return (
    <header className="header">
      <img className="header__icon" src={hero_icon} alt="Aperture lens" />
      <SearchBar onSearch={onSearch} />
    </header>
  );
}

export default Header;

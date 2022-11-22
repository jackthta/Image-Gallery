import icon from "../../../public/favicon.svg";

import "./Header.css";

function Header() {
  return (
    <header className="header">
      <img className="header__icon" src={icon} alt="Home icon" />
    </header>
  );
}

export default Header;

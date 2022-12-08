import { useEffect, useState } from "react";

import SunSVG from "../svgs/Sun";
import MoonSVG from "../svgs/Moon";

import "./ThemeSwitch.css";

enum THEME {
  LIGHT = "light",
  DARK = "dark",
}

type Theme = THEME.LIGHT | THEME.DARK;

function ThemeSwitch() {
  const HTML = document.querySelector("HTML");

  const [theme, setThemeState] = useState<Theme | null>(null);

  const handleToggleTheme = (): void => {
    switch (theme) {
      case THEME.LIGHT:
        setTheme(THEME.DARK);
        break;
      case THEME.DARK:
        setTheme(THEME.LIGHT);
        break;
    }
  };

  const setTheme = (theme: Theme): void => {
    // NOTE: need to sync <html>'s `data-theme` attribute
    // for proper CSS rules to apply for respective theme.
    HTML?.setAttribute("data-theme", theme!);
    setThemeState(theme);
  };

  // Sync theme state to user system preferred theme
  // + event listeners for system theme change.
  useEffect(() => {
    const prefersLightMode = "(prefers-color-scheme: light)";
    const prefersDarkMode = "(prefers-color-scheme: dark)";

    if (matchMedia(prefersLightMode).matches) setTheme(THEME.LIGHT);
    if (matchMedia(prefersDarkMode).matches) setTheme(THEME.DARK);

    const createSystemThemeChangeHandler = (
      theme: Theme
    ): ((mQuery: MediaQueryListEvent) => void) => {
      const handleSystemThemeChange = (mQuery: MediaQueryListEvent) => {
        // NOTE: Need to explicitly check `matches` property
        // b/c both `matchMedia(prefersLightMode | prefersDarkMode)`
        // event listener callbacks will trigger on user system
        // preference theme change. This ensures that the proper
        // system theme is sync'd to the theme state.
        if (mQuery.matches) setTheme(theme);
      };

      return handleSystemThemeChange;
    };

    const handleSystemLightTheme = createSystemThemeChangeHandler(THEME.LIGHT);
    matchMedia(prefersLightMode).addEventListener(
      "change",
      handleSystemLightTheme
    );
    const handleSystemDarkTheme = createSystemThemeChangeHandler(THEME.DARK);
    matchMedia(prefersDarkMode).addEventListener(
      "change",
      handleSystemDarkTheme
    );
    return () => {
      matchMedia(prefersLightMode).removeEventListener(
        "change",
        handleSystemLightTheme
      );
      matchMedia(prefersDarkMode).removeEventListener(
        "change",
        handleSystemDarkTheme
      );
    };
  }, []);

  let SwitchIcon;
  switch (theme) {
    case THEME.LIGHT:
      SwitchIcon = <SunSVG />;
      break;
    case THEME.DARK:
      SwitchIcon = <MoonSVG />;
      break;
  }

  return (
    <button className="switch" onClick={handleToggleTheme}>
      {SwitchIcon}
    </button>
  );
}

export default ThemeSwitch;

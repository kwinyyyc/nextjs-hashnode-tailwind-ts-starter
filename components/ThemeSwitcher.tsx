import * as React from "react";

export const ThemeContext = React.createContext<{
  theme: string;
  toggleTheme: () => void;
  darkThemeName: string;
  lightThemeName: string;
  isDark: boolean;
}>({
  theme: "light",
  toggleTheme: () => {},
  darkThemeName: "dark",
  lightThemeName: "light",
  isDark: false,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => React.useContext(ThemeContext);

export const useTheme = () => {
  const darkThemeName = "dark";
  const lightThemeName = "light";
  const [theme, setTheme] = React.useState(lightThemeName);
  const toggleTheme = () => {
    setTheme(theme === darkThemeName ? lightThemeName : darkThemeName);
  };
  React.useEffect(() => {
    setTheme(
      localStorage.getItem("currentTheme") === null
        ? lightThemeName
        : JSON.parse(localStorage.getItem("currentTheme") as string),
    );
  }, []);
  React.useEffect(() => {
    localStorage.setItem("currentTheme", JSON.stringify(theme));
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  const isDark = React.useMemo(() => {
    return theme === darkThemeName;
  }, [theme]);

  return {
    theme,
    toggleTheme,
    darkThemeName,
    lightThemeName,
    isDark,
  };
};

export interface IThemeSwitcherProps {}

export const ThemeSwitcher: React.FC<IThemeSwitcherProps> = () => {
  const { toggleTheme } = React.useContext(ThemeContext);

  return (
    <>
      <label className="flex cursor-pointer gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
        <input type="checkbox" onClick={toggleTheme} className="toggle" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </label>
    </>
  );
};

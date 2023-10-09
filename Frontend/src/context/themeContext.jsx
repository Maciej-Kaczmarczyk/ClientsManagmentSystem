import { useThemeStore } from "../stores/useThemeStore";

const ThemeContext = ({ children }) => {
  const { theme } = useThemeStore();

  return <div className={theme}> {children}</div>;
};

export default ThemeContext;

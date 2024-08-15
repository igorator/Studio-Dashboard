import { ConfigProvider } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { lightTheme, darkTheme } from '../../data/theme-config';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  return (
    <ConfigProvider theme={darkMode ? darkTheme : lightTheme}>
      {children}
    </ConfigProvider>
  );
};

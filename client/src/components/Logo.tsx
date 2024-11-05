import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { routes } from '../data/routes-config';
import logo from '../assets/logo.svg';

export const Logo = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <Link to={routes.dashboard.path} style={{ display: 'flex' }}>
      <img
        src={logo}
        alt='Studio'
        style={{ filter: `invert(${darkMode ? 1 : 0})` }}
      />
    </Link>
  );
};

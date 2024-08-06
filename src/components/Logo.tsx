import { routes } from '../data/routes-data';
import logo from '../assets/logo.svg';

export const Logo = () => {
  return (
    <a href={routes.root} style={{ display: 'flex' }}>
      <img src={logo} alt='Studio' />
    </a>
  );
};

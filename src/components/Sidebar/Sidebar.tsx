import styles from './sidebar.module.css';

import { Sidemenu } from '../Sidemenu/Sidemenu';

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Sidemenu />
    </aside>
  );
}

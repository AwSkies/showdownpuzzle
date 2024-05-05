import { NavLink } from 'react-router-dom';
import { pages } from '../utils/navigation';
import styles from './NavBar.module.css';

function NavBar() {
  return (
    <div className={styles.navBar}>
      <h1>Showdown Puzzle</h1>
      <div>
        {pages.map(
          (page, index) => <NavLink to={`/showdownpuzzle/${page.path}`} className={styles.navLink} key={`key${index}`}>{page.display}</NavLink>
        )}
      </div>
    </div>
  );
}

export default NavBar;

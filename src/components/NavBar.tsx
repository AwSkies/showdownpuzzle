import { NavLink } from 'react-router-dom';
import { pages, mapPages } from '../utils/navigation';
import styles from './NavBar.module.css';

function NavBar() {
  return (
    <div className={styles.navBar}>
      <h1>Showdown Puzzle</h1>
      <div>
        {mapPages(
          (name) => <NavLink to={`/showdownpuzzle/${name}`} className={styles.navLink}>{pages[name].name}</NavLink>
        )}
      </div>
    </div>
  );
}

export default NavBar;

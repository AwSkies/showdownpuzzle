import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

function NavBar() {
  return (
    <div className={styles.navBar}>
      <h1>Showdown Puzzle</h1>
      <div>
        <NavLink to={'/showdownpuzzle'}  className={styles.navLink}>Home</NavLink>
        <NavLink to={'/showdownpuzzle/play'}  className={styles.navLink}>Play</NavLink>
        <NavLink to={'/showdownpuzzle/create'}  className={styles.navLink}>Create</NavLink>
      </div>
    </div>
  );
}

export default NavBar;

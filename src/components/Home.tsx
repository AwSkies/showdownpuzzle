import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.home}>
      <h2>Under Construction</h2>
      <p>
        <a href="https://github.com/awskies">AwSky</a> is currently working on bringing Showdown Puzzles to the browser.
        To keep an eye on the progress, visit the <a href="https://github.com/awskies/showdownpuzzle">GitHub repository</a>.
      </p>
      <p>
        Most pages are not finished and probably won't work fully.
        If you want to play showdown puzzles right now, see <a href="https://github.com/awskies/ShowdownPuzzle-Prototype">the prototype</a>.
      </p>
    </div>
  );
}

export default Home;
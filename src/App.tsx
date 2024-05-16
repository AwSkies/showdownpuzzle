import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import { pages } from "./utils/navigation";
import { getSavedPuzzles, savePuzzles } from "./utils/save-utils";
import styles from "./App.module.css";

const loadedPuzzles = getSavedPuzzles();

function App() {
  const [puzzles, setPuzzles] = useState(loadedPuzzles);

  // Save puzzles when they are changed
  useEffect(() => {
    savePuzzles(puzzles);
  }, [puzzles]);

  // Since the navbar is being procedurally generated, the same props object will be passed into every component
  const props = { puzzles, setPuzzles };

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          {pages.map(
            (page, index) => <Route path={`/showdownpuzzle/${page.path}`} element={page.element(props)} key={`key${index}`} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;

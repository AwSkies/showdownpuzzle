import { useEffect, useState } from "react";
import PuzzleEditor from "./PuzzleEditor";
import PuzzleSelector from "./PuzzleSelector";
import { puzzleDefaults } from "../utils/puzzle";
import { print } from "../utils/print-colored";
import { getPuzzles, savePuzzles } from "../utils/save-utils";
import styles from "./Create.module.css";

function Create() {
  const [puzzles, setPuzzles] = useState(getPuzzles());
  const [current, setCurrent] = useState(puzzleDefaults);
  const [index, setIndex] = useState(-1);

  // Save puzzles when they are changed
  useEffect(() => {
    savePuzzles(puzzles)
    print(`Saved puzzles: ${JSON.stringify(puzzles)}`);
  }, [puzzles]);

  return (
    <div className={styles.Create}>
      <div className={styles.Selector}>
        <PuzzleSelector puzzles={puzzles} onSelect={(puzzle, i) => { setCurrent(puzzle); setIndex(i); }} />
        <button onClick={e => { setCurrent(puzzleDefaults); setIndex(-1); }}>New Puzzle</button>
      </div>
      <PuzzleEditor puzzle={current} onChange={setCurrent} onSave={puzzle => {
        // If index is -1, then this is a new puzzle
        if (index === -1) {
          // Append new puzzle to end of old ones and change index to match
          setPuzzles([...puzzles, puzzle]);
          setIndex(puzzles.length);
        } else {
          // Copy puzzles into new array
          const newPuzzles = [...puzzles];
          // Replace old puzzle at this index with a new puzzle
          newPuzzles[index] = puzzle;
          // Replace old puzzles array with new one
          setPuzzles(newPuzzles);
        }
      }} />
    </div>
  );
}

export default Create;

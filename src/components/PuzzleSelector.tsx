import { Puzzle } from "../utils/puzzle";
import styles from "./PuzzleSelector.module.css";

function PuzzleSelector({ puzzles, onSelect }: { puzzles: Puzzle[], onSelect: (puzzle: Puzzle, index: number) => void }) {
  return (
    // TODO: Make this prettier, use a MultiPanel or some other invention to actually make it look nice
    <ul className={styles.PuzzleSelector}>
      {puzzles.map((puzzle, index) => <li key={`key${index}`}><button onClick={e => onSelect(puzzle, index)}>{puzzle.name}</button></li>)}
    </ul>
  );
}

export default PuzzleSelector;

import { useState } from "react";
import LabeledElement from "./LabeledElement";
import { PUZZLE_DEFAULTS, Puzzle } from "../utils/puzzle";
import styles from "./CreatePuzzle.module.css";

function CreatePuzzle({onSave}: {onSave: (puzzle: Puzzle) => void}) {
  const [puzzle, setPuzzle] = useState(PUZZLE_DEFAULTS);

  return (
    <div className={styles.CreatePuzzle}>
      <h2>Create Puzzle</h2>
      <form className={styles.create} onSubmit={e => {
        e.preventDefault();
        onSave(puzzle as Puzzle);
      }}>
        <LabeledElement label="Name" description="The name the puzzle will be saved as." element={
          <input id="create-puzzle-name" value={puzzle.name} placeholder="Name" required onChange={e => setPuzzle({ ...puzzle, name: e.target.value })} />
        } />
        <LabeledElement label="Author" description="The person to be credited with creating this puzzle." element={
          <input id="create-puzzle-author" value={puzzle.author} placeholder="Author" onChange={e => setPuzzle({ ...puzzle, author: e.target.value })} />
        } />
        <LabeledElement label="Description" description="The description of the puzzle" element={
          <textarea id="create-puzzle-description" value={puzzle.description} placeholder="Description" onChange={e => setPuzzle({ ...puzzle, description: e.target.value })} />
        } />
        {/* TODO: Team */}
        {/* TODO: Commands */}
        {/* TODO: Hints */}
        <LabeledElement label="Critical hits allowed" description="Whether critical hits are allowed to occur during the puzzle. If not, the bot will forfeit the battle and rematch the user if a critical hits occurs." element={
          <input id="create-puzzle-crits" type="checkbox" checked={puzzle.crits} onChange={e => setPuzzle({ ...puzzle, crits: e.target.checked })} />
        } />
        <LabeledElement label="Timer" description="Whether the timer should be turned on during the puzzle, at the beginning of the battle. This will mean the player will have a limited amount of time to complete the puzzle." element={
          <input id="create-puzzle-timer" type="checkbox" checked={puzzle.timer} onChange={e => setPuzzle({ ...puzzle, timer: e.target.checked })} />
        } />
        <input type="submit" value="Save puzzle"/>
      </form>
    </div>
  );
}

export default CreatePuzzle;

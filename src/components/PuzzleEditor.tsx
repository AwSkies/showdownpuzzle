import LabeledElement from "./LabeledElement";
import { Puzzle } from "../utils/puzzle";
import styles from "./PuzzleEditor.module.css";

function PuzzleEditor({ puzzle, onChange, onSave }: { puzzle: Partial<Puzzle>, onChange: (puzzle: Partial<Puzzle>) => void, onSave: (puzzle: Puzzle) => void }) {
  return (
    <div className={styles.PuzzleEditor}>
      <h2>Create Puzzle</h2>
      <h3>Editing: {puzzle.name}</h3>
      <form className={styles.create} onSubmit={e => {
        e.preventDefault();
        onSave(puzzle as Puzzle);
      }}>
        <LabeledElement label="Name" description="The name the puzzle will be saved as.">
          <input id="create-puzzle-name" value={puzzle.name} placeholder="Name" required onChange={e => onChange({ ...puzzle, name: e.target.value })} />
        </LabeledElement>
        <LabeledElement label="Author" description="The person to be credited with creating this puzzle.">
          <input id="create-puzzle-author" value={puzzle.author} placeholder="Author" onChange={e => onChange({ ...puzzle, author: e.target.value })} />
        </LabeledElement>
        <LabeledElement label="Description" description="The description of the puzzle">
          <textarea id="create-puzzle-description" value={puzzle.description} placeholder="Description" onChange={e => onChange({ ...puzzle, description: e.target.value })} />
        </LabeledElement>
        {/* TODO: Team */}
        {/* TODO: Commands */}
        {/* TODO: Hints */}
        <LabeledElement label="Critical hits allowed" description="Whether critical hits are allowed to occur during the puzzle. If not, the bot will forfeit the battle and rematch the user if a critical hits occurs.">
          <input id="create-puzzle-crits" type="checkbox" checked={puzzle.crits} onChange={e => onChange({ ...puzzle, crits: e.target.checked })} />
        </LabeledElement>
        <LabeledElement label="Timer" description="Whether the timer should be turned on during the puzzle, at the beginning of the battle. This will mean the player will have a limited amount of time to complete the puzzle.">
          <input id="create-puzzle-timer" type="checkbox" checked={puzzle.timer} onChange={e => onChange({ ...puzzle, timer: e.target.checked })} />
        </LabeledElement>
        <input type="submit" value="Save puzzle" />
      </form>
    </div>
  );
}

export default PuzzleEditor;

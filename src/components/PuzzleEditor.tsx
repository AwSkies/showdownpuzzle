import { AvatarIdent } from "@pkmn/protocol";
import Avatar from "./Avatar";
import LabeledElement from "./LabeledElement";
import { Puzzle } from "../utils/puzzle";
import styles from "./PuzzleEditor.module.css";

function PuzzleEditor({ puzzle, onChange, onSave }: { puzzle: Partial<Puzzle>, onChange: (puzzle: Partial<Puzzle>) => void, onSave: (puzzle: Puzzle) => void }) {
  return (
    <div className={styles.PuzzleEditor}>
      <h2>Create Puzzle</h2>
      <form onSubmit={e => {
        e.preventDefault();
        onSave(puzzle as Puzzle);
      }}>
        <fieldset>
          <legend>{puzzle.name || "Unnamed puzzle"}</legend>
          <fieldset>
            <legend>Details</legend>
            <LabeledElement label="Name" description="The name this puzzle will be saved as.">
              <input id="create-puzzle-name" value={puzzle.name} placeholder="Name" required onChange={e => onChange({ ...puzzle, name: e.target.value })} />
            </LabeledElement>
            <LabeledElement label="Author" description="The person to be credited with creating this puzzle.">
              <input id="create-puzzle-author" value={puzzle.author} placeholder="Author" onChange={e => onChange({ ...puzzle, author: e.target.value })} />
            </LabeledElement>
            <LabeledElement label="Description" description="The description of this puzzle">
              <textarea id="create-puzzle-description" value={puzzle.description} placeholder="Description" onChange={e => onChange({ ...puzzle, description: e.target.value })} />
            </LabeledElement>
          </fieldset>
          <fieldset>
            <legend>Content</legend>
            <fieldset>
              <legend>Team</legend>
              TODO: Team
            </fieldset>
            <fieldset>
              <legend>Commands</legend>
              TODO: Commands
            </fieldset>
            <fieldset>
              <legend>Hints</legend>
              TODO: Hints
            </fieldset>
          </fieldset>
          <fieldset>
            <legend>Options</legend>
            <LabeledElement label="Critical hits allowed" description="Whether critical hits are allowed to occur during this puzzle. If not, the bot will forfeit the battle and rematch the user if a critical hits occurs.">
              <input id="create-puzzle-crits" type="checkbox" checked={puzzle.crits} onChange={e => onChange({ ...puzzle, crits: e.target.checked })} />
            </LabeledElement>
            <LabeledElement label="Timer" description="Whether the timer should be turned on during this puzzle, at the beginning of the battle. This will mean the player will have a limited amount of time to complete this puzzle.">
              <input id="create-puzzle-timer" type="checkbox" checked={puzzle.timer} onChange={e => onChange({ ...puzzle, timer: e.target.checked })} />
            </LabeledElement>
            <LabeledElement label="Avatar" description="The avatar which the bot account will use on Showdown during this puzzle. Also used as the icon/thumbnail to represent this puzzle.">
              <input id="create-puzzle-avatar" value={puzzle.avatar} placeholder="Avatar" onChange={e => onChange({ ...puzzle, avatar: e.target.value as AvatarIdent })} />
            </LabeledElement>
            <Avatar avatar={puzzle.avatar as AvatarIdent} />
            <span><a href="https://play.pokemonshowdown.com/sprites/trainers/">List of avatars</a></span>
          </fieldset>
          <input type="submit" value="Save puzzle" />
        </fieldset>
      </form>
    </div>
  );
}

export default PuzzleEditor;

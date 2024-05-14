import CreatePuzzle from "./CreatePuzzle";
import PuzzleSelector from "./PuzzleSelector";
import { print } from "../utils/print-colored";
import styles from "./Create.module.css";

function Create() {
  return (
    <div className={styles.Create}>
      {/* TODO: Make puzzle viewer */}
      <PuzzleSelector /> 
      <CreatePuzzle onSave={puzzle => {
        print(`Saving puzzle: ${JSON.stringify(puzzle)}`);
      }}/>
    </div>
  );
}

export default Create;

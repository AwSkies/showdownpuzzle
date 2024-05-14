import CreatePuzzle from "./CreatePuzzle";
import PuzzlesViewer from "./PuzzlesViewer";
import styles from "./Create.module.css";
import { print } from "../utils/print-colored";

function Create() {
  return (
    <div className={styles.Create}>
      {/* TODO: Make puzzle viewer */}
      <PuzzlesViewer /> 
      <CreatePuzzle onSave={puzzle => {
        print(`Saving puzzle: ${JSON.stringify(puzzle)}`);
      }}/>
    </div>
  );
}

export default Create;

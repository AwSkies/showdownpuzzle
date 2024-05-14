import CreatePuzzle from "./CreatePuzzle";
import PuzzlesViewer from "./PuzzlesViewer";
import { print } from "../utils/print-colored";
import styles from "./Create.module.css";

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

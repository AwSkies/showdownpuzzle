import { getCookie, setCookie } from "typescript-cookie";
import { Puzzle, puzzleDefaults } from "./puzzle";
import { print } from "./print-colored";

function getSavedPuzzles(): Puzzle[] {
    // Get cookie
    const puzzlesCookie = getCookie('puzzles');
    // Parse JSON if the cookie existed before, use an empty array otherwise
    // Then cast to array of partial puzzles
    const partials: Partial<Puzzle>[] = puzzlesCookie ? JSON.parse(puzzlesCookie) : [];
    // Fill in defaults for partial puzzles and cast to full puzzle
    const puzzles = partials.map(puzzle => { return { ...puzzleDefaults, ...puzzle } as Puzzle; });
    print(`Loaded puzzles: ${JSON.stringify(puzzles)}`);
    return puzzles;
}

function savePuzzles(puzzles: Puzzle[]) {
    setCookie('puzzles', JSON.stringify(puzzles));
    print(`Saved puzzles: ${JSON.stringify(puzzles)}`);
}

export { getSavedPuzzles, savePuzzles };

import { getCookie, setCookie } from "typescript-cookie";
import { Puzzle } from "./puzzle";

function getPuzzles(): Puzzle[] {
    const puzzlesCookie = getCookie('puzzles');
    return puzzlesCookie ? JSON.parse(puzzlesCookie) : [];
}

function savePuzzles(puzzles: Puzzle[]) {
    setCookie('puzzles', JSON.stringify(puzzles));
}

export { getPuzzles, savePuzzles };
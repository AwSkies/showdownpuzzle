import { getCookie, setCookie } from "typescript-cookie";
import { Team } from "@pkmn/sets";
import { Puzzle, puzzleDefaults } from "./puzzle";
import { print } from "./print-colored";

function getSavedPuzzles(): Puzzle[] {
    // Get cookie
    const puzzlesCookie = getCookie('puzzles');
    // Parse JSON if the cookie existed before, use an empty array otherwise
    // Then cast to array of partial puzzles
    const partials: Partial<Puzzle>[] = puzzlesCookie ? JSON.parse(puzzlesCookie) : [];
    // Fill in defaults for partial puzzles and cast to full puzzle
    const puzzles = partials.map(puzzle => {
        let team = puzzle.team;
        if (team && team.format === 'json') {
            team = {
                format: 'team',
                value: Team.fromJSON(team.value)!
            };
        }
        return {
            ...puzzleDefaults,
            ...puzzle,
            team
        } as Puzzle;
    });
    // TODO: Corruption detection
    print(`Loaded puzzles: ${JSON.stringify(puzzles)}`);
    return puzzles;
}

function savePuzzles(puzzles: Puzzle[]) {
    setCookie('puzzles', JSON.stringify(puzzles.map(puzzle => {
        return {
            ...puzzle,
            team: puzzle.team.format === 'team' ? {
                format: 'json',
                value: puzzle.team.value.export()
            } : puzzle.team
        };
    })));
    print(`Saved puzzles: ${JSON.stringify(puzzles)}`);
}

export { getSavedPuzzles, savePuzzles };

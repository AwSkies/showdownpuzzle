import { Team } from '@pkmn/sets';

type BattleCommand = {
    kind: 'move' | 'switch' | 'setswitch',
    name: string
};

type CommandGroup = {
    kind: 'group',
    commands: BattleCommand[]
};

export type Command = BattleCommand | CommandGroup;

export type Puzzle = {
    name?: string,
    author?: string,
    description?: string,
    team?: Team,
    commands?: Command[],
    hints?: string[]
};

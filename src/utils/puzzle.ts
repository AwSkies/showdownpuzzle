import { AvatarIdent } from '@pkmn/protocol';
import { Team } from '@pkmn/sets';

type BattleCommand = {
    action: 'move' | 'switch' | 'setswitch',
    name: string
};

type CommandGroup = {
    action: 'group',
    commands: BattleCommand[]
};

export type Command = BattleCommand | CommandGroup;

export type Puzzle = {
    /**
     * The name of the puzzle.
     */
    name?: string,
    /**
     * The author of the puzzle.
     */
    author?: string,
    /**
     * The description of the puzzle.
     */
    description?: string,
    /**
     * The team for the bot to use for the puzzle.
     */
    team?: Team,
    /**
     * The sequence of commands to execute during the puzzle.
     */
    commands?: Command[],
    /**
     * The hints to be given during the puzzle at the user's request.
     */
    hints?: string[],
    /**
     * Whether critical hits are allowed to occur during the puzzle. The bot should forfeit if a critical hit occurs and this is `false`.
     */
    crits?: boolean,
    /**
     * Whether the timer should be turned on during the puzzle, at the beginning of the battle.
     */
    timer?: boolean,
    /**
     * The avatar the bot should use for the puzzle.
     */
    avatar?: AvatarIdent
};

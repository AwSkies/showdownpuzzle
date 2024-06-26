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
    name: string,
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
    team: {
        /**
         * The team format.
         */
        format: "team",
        /**
         * The team value.
         */
        value: Team
    } | {
        /**
         * The team format.
         */
        format: "json" | "pokepaste" | "link",
        /**
         * The team value.
         */
        value: string
    },
    /**
     * The sequence of commands to execute during the puzzle.
     */
    commands: Command[],
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
     * The avatar the bot should use for the puzzle. Also used as the icon/thumbnail to represent the puzzle.
     */
    avatar?: AvatarIdent
};

export const puzzleDefaults: Partial<Puzzle> = {
    name: '',
    author: '',
    description: '',
    team: {
        format: 'pokepaste',
        value: ''
    },
    commands: [],
    hints: [],
    crits: true,
    timer: false,
    avatar: '' as AvatarIdent
}

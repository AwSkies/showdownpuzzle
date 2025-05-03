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
         * The team is a `Team` object.
         */
        format: "team",
        /**
         * The team.
         */
        value: Team
    } | (({
        /**
         * The format is an object to saved in and loaded from json.
         */
        format: "json",
        /**
         * The arbitrary object.
         */
        value: any
    } | {
        /**
         * The team is in PokePaste format or is a link to a PokePaste page.
         */
        format: "pokepaste" | "link",
        value: string,
    }) & {
        /**
         * The format on Pokemon Showdown for the battle to be in.
         */
        battleFormat: string
    }),
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
        value: '',
        battleFormat: ''
    },
    commands: [],
    hints: [],
    crits: true,
    timer: false,
    avatar: '' as AvatarIdent
}

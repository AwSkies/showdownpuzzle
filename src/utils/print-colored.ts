// https://en.wikipedia.org/wiki/ANSI_escape_code#3-bit_and_4-bit
const colors = {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    none: ""
};

type Color = typeof colors[keyof typeof colors];

function print(message: string, fn: (message?: any) => void = console.log, color: Color = colors.none) {
    fn(`${color}${message}`);
}

export { colors, print };
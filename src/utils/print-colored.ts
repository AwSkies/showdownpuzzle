type Color = "\x1b[30m" | "\x1b[31m" | "\x1b[32m" | "\x1b[33m" | "\x1b[34m" | "\x1b[35m" | "\x1b[36m" | "\x1b[37m" | "";

const colors = {
    black: "\x1b[30m" as Color,
    red: "\x1b[31m" as Color,
    green: "\x1b[32m" as Color,
    yellow: "\x1b[33m" as Color,
    blue: "\x1b[34m" as Color,
    magenta: "\x1b[35m" as Color,
    cyan: "\x1b[36m" as Color,
    white: "\x1b[37m" as Color,
    none: "" as Color
}

function print(message: string, fn: (message?: any) => void = console.log, color: Color = colors.none) {
    fn(`${color}${message}`);
}

export { colors, print };
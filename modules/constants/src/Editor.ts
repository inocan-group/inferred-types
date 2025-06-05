type os = "win" | "mac" | "linux" | "unix";

type Editor = {
    name: string;
    exec: string;
    os: readonly os[];
    console: boolean;
}

export const EDITORS = [
    { name: "Atom", exec: "atom", console: false, os: ["win","mac","linux"] },
    { name: "Brackets", exec: "brackets", console: false, os: ["win","mac","linux"] },
    { name: "Eclipse", exec: "eclipse", console: false, os: ["win","mac","linux"] },
    { name: "Emacs", exec: "emacs", console: false, os: ["win","mac","linux"] },
    { name: "gedit", exec: "gedit", console: false, os: ["linux"] },
    { name: "IntelliJ IDEA", exec: "indea", console: false, os: ["win","mac","linux"] },
    { name: "Kate", exec: "kate", console: false, os: ["win","mac","linux"] },
    { name: "Nano", exec: "nano", console: true, os: ["win","mac","linux"] },
    { name: "Neovim", exec: "neovim", console: true, os: ["win","mac","linux"] },
    { name: "Vim", exec: "vim", console: true, os: ["win","mac","linux"] },
    { name: "Vi", exec: "vi", console: true, os: ["win","mac","linux"] },
    { name: "Notepad", exec: "notepad", console: false, os: ["win"] },
    { name: "Notepad++", exec: "notepad++", console: false, os: ["win"] },
    { name: "PyCharm", exec: "pycharm", console: false, os: ["win","mac","linux"] },
    { name: "TextEdit", exec: "open -e", console: false, os: ["mac"] },
    { name: "Sublime Text", exec: "subl", console: false, os: ["win","mac","linux"] },
    { name: "Textmate", exec: "mate", console: false, os: ["win","mac","linux"] },
    { name: "Zed", exec: "zed", console: false, os: ["win","mac","linux"] },
] as const satisfies readonly Editor[];



import { narrow } from "./utils/narrow"

/**
 * An array of all the lower-cased alphabetic characters
 */
export const LOWER_ALPHA_CHARS = narrow(
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
 );

/**
 * An array of all the upper-cased alphabetic characters
 */
export const UPPER_ALPHA_CHARS = narrow(
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
);

/**
 * An array of all alphabetic characters (upper and lower)
 */
export const ALPHA_CHARS = narrow(
    ...LOWER_ALPHA_CHARS,
    ...UPPER_ALPHA_CHARS,
);

import type { IsGreaterThan } from "inferred-types/types";

/**
 * **StringIsAfter**`<A,B>`
 *
 * tests whether `A` is _after_ `B` in alphabetic order.
 */
export type StringIsAfter<
    A extends string,
    B extends string
>
    = A extends B ? false
        : A extends `${infer AHead}${infer ATail}`
            ? B extends `${infer BHead}${infer BTail}`
                ? AHead extends BHead
                    ? StringIsAfter<ATail, BTail>
                    : AHead extends keyof CharOrder
                        ? BHead extends keyof CharOrder
                            ? CharOrder[AHead] extends number
                                ? CharOrder[BHead] extends number
                                    ? IsGreaterThan<CharOrder[AHead], CharOrder[BHead]>
                                    : false
                                : false
                            : false
                        : false
                : true // B is empty, so A is after
            : false; // A is empty, so not after

// Example CharOrder mapping (expand as needed)
type CharOrder = {
    "0": 0;
    "1": 1;
    "2": 2;
    "3": 3;
    "4": 4;
    "5": 5;
    "6": 6;
    "7": 7;
    "8": 8;
    "9": 9;
    "A": 10;
    "B": 11;
    "C": 12;
    "D": 13;
    "E": 14;
    "F": 15;
    "G": 16;
    "H": 17;
    "I": 18;
    "J": 19;
    "K": 20;
    "L": 21;
    "M": 22;
    "N": 23;
    "O": 24;
    "P": 25;
    "Q": 26;
    "R": 27;
    "S": 28;
    "T": 29;
    "U": 30;
    "V": 31;
    "W": 32;
    "X": 33;
    "Y": 34;
    "Z": 35;
    "a": 36;
    "b": 37;
    "c": 38;
    "d": 39;
    "e": 40;
    "f": 41;
    "g": 42;
    "h": 43;
    "i": 44;
    "j": 45;
    "k": 46;
    "l": 47;
    "m": 48;
    "n": 49;
    "o": 50;
    "p": 51;
    "q": 52;
    "r": 53;
    "s": 54;
    "t": 55;
    "u": 56;
    "v": 57;
    "w": 58;
    "x": 59;
    "y": 60;
    "z": 61;
    "-": 62;
    "_": 63;
    ".": 64;
    ":": 65;
    "/": 66;
    " ": 67;
};

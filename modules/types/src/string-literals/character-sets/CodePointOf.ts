import type { Chars, Err, IsWideString } from "inferred-types/types";

type CharCodeMap = {
    // — Letters —
    A: 65;
    B: 66;
    C: 67;
    D: 68;
    E: 69;
    F: 70;
    G: 71;
    H: 72;
    I: 73;
    J: 74;
    K: 75;
    L: 76;
    M: 77;
    N: 78;
    O: 79;
    P: 80;
    Q: 81;
    R: 82;
    S: 83;
    T: 84;
    U: 85;
    V: 86;
    W: 87;
    X: 88;
    Y: 89;
    Z: 90;

    a: 97;
    b: 98;
    c: 99;
    d: 100;
    e: 101;
    f: 102;
    g: 103;
    h: 104;
    i: 105;
    j: 106;
    k: 107;
    l: 108;
    m: 109;
    n: 110;
    o: 111;
    p: 112;
    q: 113;
    r: 114;
    s: 115;
    t: 116;
    u: 117;
    v: 118;
    w: 119;
    x: 120;
    y: 121;
    z: 122;

    // — Digits —
    "0": 48;
    "1": 49;
    "2": 50;
    "3": 51;
    "4": 52;
    "5": 53;
    "6": 54;
    "7": 55;
    "8": 56;
    "9": 57;

    // — Common punctuation & symbols —
    " ": 32;
    "!": 33;
    "\"": 34;
    "#": 35;
    "$": 36;
    "%": 37;
    "&": 38;
    "'": 39;
    "(": 40;
    ")": 41;
    "*": 42;
    "+": 43;
    ",": 44;
    "-": 45;
    ".": 46;
    "/": 47;

    ":": 58;
    ";": 59;
    "<": 60;
    "=": 61;
    ">": 62;
    "?": 63;
    "@": 64;

    "[": 91;
    "\\": 92;
    "]": 93;
    "^": 94;
    "_": 95;
    "`": 96;

    "{": 123;
    "|": 124;
    "}": 125;
    "~": 126;
};

type CodePointsTuple<T extends readonly string[]>
  = T extends [infer H extends string, ...infer R extends string[]]
      ? H extends keyof CharCodeMap
          ? [CharCodeMap[H], ...CodePointsTuple<R>]
          : [1, ...CodePointsTuple<R>]
      : [];

/**
 * **CodePointOf**`<T>`
 *
 * A type utility which will convert a single character passed in
 * to a numeric code point for that character.
 *
 * - if you pass in _more_ than just a single character then it will
 * return a tuple of code points
 * - if you pass in an empty string literal or a wide string type
 * you will get an `invalid-value/empty` or `invalid-value/wide-string`
 * error back respectively.
 */
export type CodePointOf<T extends string>
  = IsWideString<T> extends true
      ? Err<`invalid-value/wide-string`, `Call to the type utility CodePointOf<T> with a wide string value is not allowed!`>
      : Chars<T> extends [infer Char extends string]
          ? Char extends keyof CharCodeMap
              ? CharCodeMap[Char]
              : 1
          : Chars<T>["length"] extends 0
              ? Err<`invalid-value/empty`, `Call to the type utility CodePointOf<T> with an empty string literal value!`>
              : CodePointsTuple<Chars<T>>;

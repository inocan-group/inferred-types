

export const HASH_TABLE_WIDE = {
  string: "318",
  number: "523",
  boolean: "21",
  never: "!!!",
  unknown: "ed",
  undefined: "ce",
  null: "cc",
  symbol: "78",
  object: "fe8",
  array: "17",
  record:"ee",
  map: "e65",
  weakMap: "e64",
  set: "f62",
  union: "f61"
} as const;

export const HASH_TABLE_ALPHA_LOWER = {
  "a": "8",
  "b": "~",
  "c": "^",
  "d": ".",
  "e": "82",
  "f": "89",
  "g": ",",
  "h": "!",
  "i": "-7",
  "j": "-8",
  "k": "88",
  "l": "8f",
  "m": "8e",
  "n": "6e",
  "o": "44",
  "p": "60",
  "q": "61",
  "r": "71",
  "s": ":",
  "t": "-45",
  "u": "-5",
  "v": "-9",
  "w": "-f",
  "x": "+1",
  "y": ";",
  "z": "*1",
} as const;


export const HASH_TABLE_SPECIAL = {
  "!": "1",
  "@": "8",
  "#": "5",
  "$": "4",
  "%": "3",
  "^": "2",
  "&": "9",
  "*": "7",
  "(": "6",
  ")": "12",
  "{": "33",
  "}": "54",
  "[": "x8",
  "]": "y4",
  ":": "z2",
  ";": "e88",
  "\"": "c11",
  "'": "c12",
  "<": "p3",
  ",": "45",
  ">": "e9",
  ".": "f2",
  "?": "ee",
  "/": "u9",
  "\\": "f9",
  "|": "q1",
  "~": "fe",
  "`": "8e"
} as const;

export const HASH_TABLE_DIGIT = {
  "0": "-2",
  "1": "-9",
  "2": "ff",
  "3": "fe",
  "4": "2e",
  "5": "cd",
  "6": "54",
  "7": "27",
  "8": "49",
  "9": "51",
} as const;

export const HASH_TABLE_ALPHA_UPPER = {
  "A": "b8",
  "B": "~9",
  "C": "6^",
  "D": ".8",
  "E": "5<",
  "F": ">7",
  "G": "1,",
  "H": "!7",
  "I": "8#",
  "J": "@9",
  "K": "1*",
  "L": "4&",
  "M": "+5",
  "N": "j|",
  "O": "-l",
  "P": "q{",
  "Q": "]9",
  "R": "f%",
  "S": ":3",
  "T": "?+",
  "U": "}5",
  "V": "'4",
  "W": "1@g",
  "X": "0+1",
  "Y": "4;",
  "Z": "a*1",
} as const;


export const HASH_TABLE_CHAR = {
  ...HASH_TABLE_ALPHA_LOWER,
  ...HASH_TABLE_ALPHA_UPPER,
  ...HASH_TABLE_SPECIAL
} as const;

export const HASH_TABLE_OTHER = "999" as const;

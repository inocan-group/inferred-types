/* eslint @typescript-eslint/no-unused-vars: "off" */

type Consonant =
  | "b"
  | "c"
  | "d"
  | "f"
  | "g"
  | "h"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "v"
  | "w"
  | "x"
  | "z"
  | "y";

type Exceptions =
  | "photo => photos"
  | "piano => pianos"
  | "halo => halos"
  | "foot => feet"
  | "man => men"
  | "woman => women"
  | "person => people"
  | "mouse => mice"
  | "series => series"
  | "sheep => sheep"
  | "money => monies"
  | "deer => deer";

// @ts-ignore
type SingularException<T = Exceptions> = T extends `${infer SINGULAR} => ${infer PLURAL}`
  ? SINGULAR
  : never;

// @ts-ignore
type PluralException<
  T extends SingularException,
  E extends Exceptions = Exceptions
> = E extends `${T} => ${infer PLURAL}` ? PLURAL : never;

type SingularNoun = "s" | "sh" | "ch" | "x" | "z" | "o";
type F = "f" | "fe";
type Y = `${Consonant}y`;

type RemoveTrailingY<T> = T extends `${infer HEAD}y` ? HEAD : T;

/** validates that a word ends with a pluralization exception */
type isException<T extends string> = T extends SingularException ? T : never;

/** validates that a string literal ends in "is" */
// @ts-ignore
type EndsIn_IS<T extends string> = T extends `${infer HEAD}is` ? T : never;

/** validates that a string literal is a singular noun */
// @ts-ignore
type EndsInSingularNoun<T extends string> = T extends `${infer HEAD}${SingularNoun}` ? T : never;

/** validates that a string literal ends in "f" or "fe" */
// @ts-ignore
type EndsIn_F<T extends string> = T extends `${infer HEAD}${F}` ? T : never;

/** validates that a string literal ends a consonant followed by "y" */
// @ts-ignore
type EndsIn_Y<T extends string> = T extends `${infer HEAD}${Y}` ? T : never;

/**
 * strings which end in the letters "is" should have an "es" added to the end
 */
type PluralizeEndingIn_IS<T extends string> = T extends `${infer HEAD}is` ? `${HEAD}ises` : T;

/**
 * singular nouns should have "es" added to the end
 */
// @ts-ignore
type PluralizeEndingSingularNoun<T extends string> = T extends `${infer HEAD}${SingularNoun}`
  ? `${T}es`
  : T;

/**
 * strings which end in the letters "f" or "fe" should have "ves" replace the ending
 */
type PluralizeEnding_F<T extends string> = T extends `${infer HEAD}${F}` ? `${HEAD}ves` : T;

/**
 * singular nouns should have "es" added to the end
 */
// @ts-ignore
type PluralizeEndingIn_Y<T extends string> = T extends `${infer HEAD}${Y}`
  ? `${RemoveTrailingY<T>}ies`
  : T;

export type Pluralize<T extends string> = T extends isException<T>
  ? PluralException<T>
  : T extends EndsIn_IS<T>
    ? PluralizeEndingIn_IS<T>
    : T extends EndsInSingularNoun<T>
      ? PluralizeEndingSingularNoun<T>
      : T extends EndsIn_F<T>
        ? PluralizeEnding_F<T>
        : T extends EndsIn_Y<T>
          ? PluralizeEndingIn_Y<T>
          : `${T}s`;

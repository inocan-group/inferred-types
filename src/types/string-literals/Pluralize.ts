/* eslint @typescript-eslint/no-unused-vars: "off" */

import { EnsureTrailing } from "./EnsureTrailing";
import { StripTrailing } from "./StripTrailing";

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

type SingularException<T = Exceptions> = T extends `${infer SINGULAR} => unknown`
  ? SINGULAR
  : never;

type PluralException<
  T extends SingularException,
  E extends Exceptions = Exceptions
> = E extends `${T} => ${infer PLURAL}` ? PLURAL : never;

type SingularNoun = "s" | "sh" | "ch" | "x" | "z" | "o";
type F = "f" | "fe";
type Y = `${Consonant}y`;

/** validates that a word ends with a pluralization exception */
type isException<T extends string> = T extends SingularException ? T : never;

/** validates that a string literal ends in "is" */
type EndsIn_IS<T extends string> = T extends `${string}is` ? T : never;

/** validates that a string literal is a singular noun */
type EndsInSingularNoun<T extends string> = T extends `${string}${SingularNoun}` ? T : never;

/** validates that a string literal ends in "f" or "fe" */
type EndsIn_F<T extends string> = T extends `${string}${F}` ? T : never;

/** validates that a string literal ends a consonant followed by "y" */
type EndsIn_Y<T extends string> = T extends `${string}${Y}` ? T : never;

/**
 * strings which end in the letters "is" should have an "es" added to the end
 */
type PluralizeEndingIn_IS<T extends string> = T extends `${infer HEAD}is` ? `${HEAD}ises` : T;

/**
 * singular nouns should have "es" added to the end
 */
type PluralizeEndingSingularNoun<T extends string> = EnsureTrailing<T, "es">;

/**
 * strings which end in the letters "f" or "fe" should have "ves" replace the ending
 */
type PluralizeEnding_F<T extends string> = T extends `${infer HEAD}${F}` ? `${HEAD}ves` : T;

/**
 * singular nouns should have "es" added to the end
 */
type PluralizeEndingIn_Y<T extends string> = EnsureTrailing<StripTrailing<T,"y">, "ies">;


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

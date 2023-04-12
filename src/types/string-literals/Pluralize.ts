/* eslint @typescript-eslint/no-unused-vars: "off" */

import { PLURAL_EXCEPTIONS } from "src/constants";
import { 
  Consonant, 
  IfContains, 
  IfStringLiteral, 
  Filter, 
  GetEach, 
  Mutable, 
  EnsureTrailing, 
  StripTrailing
} from "src/types";

type Exceptions = Mutable<typeof PLURAL_EXCEPTIONS>;
type SingularExceptions = GetEach<Exceptions, 0>;

type SingularNoun = "s" | "sh" | "ch" | "x" | "z" | "o";
type F = "f" | "fe";
type Y = `${Consonant}y`;

/** validates that a word `T` has an _exception_ rule defined for it */
type IsException<T extends string> = IfContains<SingularExceptions, T, true, false>;

type PluralException<T extends string> = Filter<Exceptions, [T, string], "extends">[0] extends [infer _, infer Plural] ? Plural : never;

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


export type Pluralize<T extends string> = 
IfStringLiteral<
  T,
  IsException<T> extends true
    ? PluralException<T>
    : T extends EndsIn_IS<T>
      ? PluralizeEndingIn_IS<T>
      : T extends EndsInSingularNoun<T>
        ? PluralizeEndingSingularNoun<T>
        : T extends EndsIn_F<T>
          ? PluralizeEnding_F<T>
          : T extends EndsIn_Y<T>
            ? PluralizeEndingIn_Y<T>
            : `${T}s`,
  string
>;




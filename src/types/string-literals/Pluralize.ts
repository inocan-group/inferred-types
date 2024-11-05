/* eslint @typescript-eslint/no-unused-vars: "off" */

import { PLURAL_EXCEPTIONS } from "inferred-types/dist/constants/index";
import {
  Consonant,
  IsStringLiteral,
  EnsureTrailing,
  StripTrailing,
  Whitespace,
  TrimRight,
  Join,
  RightWhitespace,
} from "src/types/index";

type ExceptionLookup = typeof PLURAL_EXCEPTIONS;

type SingularNoun = "s" | "sh" | "ch" | "x" | "z" | "o";
type F = "f" | "fe";
type Y = `${Consonant}y`;

type IsException<T extends string> = T extends keyof ExceptionLookup ? true : false;

/**
 * Looks up a singular word `T` as a possible singular exception and converts it
 * to the plural equivalent. Will return `never` if `T` is not an exception.
 */
type PluralException<
  T extends string
> = T extends keyof ExceptionLookup
  ? ExceptionLookup[T]
  : never;

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
type PluralizeEndingIn_IS<
  T extends string
> = T extends `${infer HEAD}is` ? `${HEAD}ises` : T;

/**
 * singular nouns should have "es" added to the end
 */
type PluralizeEndingSingularNoun<
  T extends string
> = EnsureTrailing<T, "es">;

/**
 * strings which end in the letters "f" or "fe" should have "ves" replace the ending
 */
type PluralizeEnding_F<
  T extends string
> = T extends `${infer HEAD}${F}` ? `${HEAD}ves` : T;

/**
 * singular nouns should have "es" added to the end
 */
type PluralizeEndingIn_Y<
  T extends string
> = EnsureTrailing<StripTrailing<T,"y">, "ies">;


type _Pluralize<
  T extends string
> = IsException<T> extends true
    ? PluralException<T>
    : T extends EndsIn_IS<T>
      ? PluralizeEndingIn_IS<T>
      : T extends EndsInSingularNoun<T>
        ? PluralizeEndingSingularNoun<T>
        : T extends EndsIn_F<T>
          ? PluralizeEnding_F<T>
          : T extends EndsIn_Y<T>
            ? PluralizeEndingIn_Y<T>
            : `${T}s`



/**
 * **Pluralize**`<T>`
 *
 * Pluralizes the word `T`, using _language rules_ on pluralization for English as well as
 * leveraging many known exceptions to the linguistic rules.
 */
export type Pluralize<
  T extends string
> = IsStringLiteral<T> extends true
? T extends `${string}${Whitespace}`
  ? Join<[
      _Pluralize< TrimRight<T> >,
      RightWhitespace<T>
  ]>
  : _Pluralize<T>
: string;



import type { NonAlpha, Replace } from "~/types";

/**
 * Strips the non-alpha characters that lead a string
 */
export type StripLeftNonAlpha<S extends string> = S extends `${infer First}${infer Rest}` ? First extends NonAlpha ? StripLeftNonAlpha<Rest> : S : never;

/**
 * identifies the leading characters which are _not_ alphabetical
 */
export type LeadingNonAlpha<S extends string> = Replace<S, StripLeftNonAlpha<S>, "">;

/**
 * Capitalize the first alphabetical character in the string
 */
export type CapFirstAlpha<T extends string> = LeadingNonAlpha<T> extends string
  ? `${LeadingNonAlpha<T>}${Capitalize<Replace<T, LeadingNonAlpha<T>, "">>}`
  : Capitalize<T>;


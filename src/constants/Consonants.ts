import { Mutable, TupleToUnion } from "src/types";

export const CONSONANTS = [
  "b",
  "c",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "m",
  "n",
  "p",
  "q",
  "r",
  "s",
  "t",
  "v",
  "w",
  "x",
  "z",
  "y",
] as const;

/**
 * **Consonants**
 * 
 * An array of all consonant characters/letters.
 * 
 * **Related:** `Consonant`
 */
export type Consonants = Mutable<typeof CONSONANTS>;

/**
 * **Consonant**
 * 
 * A union type that includes all _consonants_.
 * 
 * **Related:** `Consonants`
 */
export type Consonant = TupleToUnion<Consonants>;

import  { CONSONANTS } from "inferred-types";

/**
 * **Consonants**
 *
 * An array of all consonant characters/letters.
 *
 * **Related:** `Consonant`
 */
export type Consonants = typeof CONSONANTS;

/**
 * **Consonant**
 *
 * A union type that includes all _consonants_.
 *
 * **Related:** `Consonants`
 */
export type Consonant = typeof CONSONANTS[number];

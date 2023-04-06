import { Mutable, TupleToUnion } from "src/types";
import { CONSONANTS } from "src/constants";

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

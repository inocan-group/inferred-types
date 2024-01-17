import { Mutable, TupleToUnion } from "src/types/index";
import { CONSONANTS } from "src/constants/index";

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

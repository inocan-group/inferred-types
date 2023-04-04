import { TupleToUnion, Mutable } from "src/types";

/**
 * Singular nouns typically end in the characters represented by this array.
 * 
 * **Related:** `SingularNounEnding`
 */
export const SINGULAR_NOUN_ENDINGS = [
  "s", "sh", "ch", "x", "z", "o"
] as const;

/**
 * **SingularNounEnding**
 * 
 * A union of characters which when found at the end of a word are a strong
 * indicator that the word is a singular noun.
 * 
 * **Related:** `SINGULAR_NOUN_ENDINGS`, `SingularNoun`, `SINGULAR_NOUN_RE`
 */
export type SingularNounEnding = TupleToUnion<Mutable<typeof SINGULAR_NOUN_ENDINGS>>;




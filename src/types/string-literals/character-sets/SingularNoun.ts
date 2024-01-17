import { SINGULAR_NOUN_ENDINGS } from "src/constants/index";
import { AlphaChar , IfAllExtend, Split , TupleToUnion, Mutable } from "src/types/index";
/**
 * **SingularNounEnding**
 * 
 * A union of characters which when found at the end of a word are a strong
 * indicator that the word is a singular noun.
 * 
 * **Related:** `SINGULAR_NOUN_ENDINGS`, `SingularNoun`, `SINGULAR_NOUN_RE`
 */
export type SingularNounEnding = TupleToUnion<Mutable<typeof SINGULAR_NOUN_ENDINGS>>;

/**
 * **SingularNoun**`<T>`
 * 
 * Type utility which provides an _identity_ mapping to `T` for singular nouns but maps
 * to _never_ in all other cases.
 * 
 * Singular nouns are words which contain only `Alpha` characters and end in one of the 
 * character sequences specified in `SingularNounEnding`.
 * 
 * ```ts
 * // never
 * type T1 = SingularNoun<"foobar">;
 * // rush
 * type T2 = SingularNoun<"rush">;
 * ```
 */
export type SingularNoun<T extends string> = T extends `${infer Prelude}${SingularNounEnding}`
  ? IfAllExtend<Split<Prelude>, AlphaChar, T, never>
  : never;

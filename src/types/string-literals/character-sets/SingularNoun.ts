import { SingularNounEnding } from "src/constants";
import { AlphaChar , IfAllExtend, Split } from "src/types";

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

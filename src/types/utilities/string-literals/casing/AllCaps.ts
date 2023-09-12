import { Tuple, Chars, Concat, AsArray} from "src/types";


type Process<
  TChars extends Tuple<string>
> = {
  [K in keyof TChars]: Capitalize<TChars[K]>
};

/**
 * **AllCaps**`<T>`
 * 
 * Type utility which converts all alphabetic characters to their
 * UPPERCASE variant.
 */
export type AllCaps<T extends string> = Concat<
  AsArray<Process<Chars<T>>>
>;

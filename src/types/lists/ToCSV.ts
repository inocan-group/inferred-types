import { AfterFirst, AsString, First, Replace, StripLeading, Tuple } from "inferred-types/dist/types/index";

type Process<
  T extends Tuple,
  TReplace extends string,
  TResult extends string = ""
> = [] extends T
? StripLeading<TResult, ",">
: Process<
    AfterFirst<T>,
    TReplace,
    First<T> extends string
      ? `${TResult},${Replace<First<T>, ",", TReplace>}`
      : `${TResult},${AsString<First<T>>}`
    >;


/**
 * **ToCSV**`<TTuple,[TReplace]>`
 *
 * Converts a tuple into a CSV string. For any elements
 * in the tuple which are strings the `,` character will
 * be replaced with the value of `TReplace` (which defaults
 * to `<comma>`).
 */
export type ToCSV<
  TTuple extends Tuple,
  TReplace extends string = "<comma>"
> = Process<TTuple, TReplace>;

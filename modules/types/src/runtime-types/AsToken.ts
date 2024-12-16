import type { Join, Slice } from "inferred-types/types";

export interface AsTokenOpt {
  start?: string;
  delimiter?: string;
  end?: string;
}

type Delimiter<
  T extends readonly string[] | readonly [AsTokenOpt, ...string[]],
> = T extends string[]
  ? "::"
  : T extends [AsTokenOpt, ...string[]]
    ? T[0]["delimiter"] extends string
      ? T[0]["delimiter"]
      : "::"
    : never;

type Start<
  T extends readonly string[] | readonly [AsTokenOpt, ...string[]],
> = T extends string[]
  ? "::"
  : T extends [AsTokenOpt, ...string[]]
    ? T[0]["start"] extends string
      ? T[0]["start"]
      : "<<"
    : never;

type End<
  T extends readonly string[] | readonly [AsTokenOpt, ...string[]],
> = T extends string[]
  ? "::"
  : T extends [AsTokenOpt, ...string[]]
    ? T[0]["end"] extends string
      ? T[0]["end"]
      : ">>"
    : never;

type ActualParams<
  T extends readonly string[] | readonly [AsTokenOpt, ...string[]],
> = T extends string[]
  ? T
  : T extends [AsTokenOpt, ...string[]]
    ? Slice<T, 1>
    : never;

type ParamsAsString<
  T extends readonly string[] | readonly [AsTokenOpt, ...string[]],
> = ActualParams<T> extends string[]
  ? Join<ActualParams<T>, Delimiter<T>>
  : never;

/**
 * **AsToken**`<TName, TParams>`
 *
 * A simple builder for a token; typically used with the runtime `asToken()` function.
 *
 * - **Related:** `AsTypeToken`, `AsSimpleToken`
 */
export type AsToken<
  TName extends string,
  TParams extends readonly string[] | readonly [AsTokenOpt, ...string[]],
> = ActualParams<TParams>["length"] extends 0
  ? `${Start<TParams>}${TName}${End<TParams>}`
  : `${Start<TParams>}${Delimiter<TParams>}${ParamsAsString<TParams>}${End<TParams>}`;

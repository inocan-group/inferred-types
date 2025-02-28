import type {
    NumericChar,
    NumericCharZeroToFive,
    NumericCharZeroToThree,
    Opt,
    StripAfter,
    StripLeading,
    Timezone,
} from "inferred-types/types";

type JustTime<T extends `${Opt<"T">}${number}:${number}:${number}${Opt<Timezone>}`> =
  StripAfter<
      StripLeading<T, "T">,
      "Z"
  >;

type HMS<T extends `${Opt<"T">}${number}:${number}:${number}${Opt<Timezone>}`> =
  JustTime<T> extends `${number}:${number}:${number}`
      ? JustTime<T> extends `${infer H}:${infer M}:${infer S}`
          ? [H, M, S]
          : never
      : never;

type Validate<T extends readonly [string, string, string]> =
  T[0] extends `${NumericCharZeroToThree}${NumericChar}`
      ? T[1] extends `${NumericCharZeroToFive}${NumericChar}`
          ? T[2] extends `${NumericCharZeroToFive}${number}`
              ? true
              : false
          : false
      : false;

/**
 * **IsIsoTime**`<T>`
 *
 * Boolean operator which returns `true` when `T` is a valid ISO 8601 time string of the
 * format `HH:MM:SS`, `HH:MM:SS.ms`, `HH:MM:SSZ`, etc.
 *
 * Note: starting the upppercase "T" is optional but a valid way to start the string.
 */
export type IsIsoTime<T> = T extends `${Opt<"T">}${number}:${number}:${number}${Opt<Timezone>}`
    ? Validate<HMS<T>> extends true
        ? true
        : false
    : false;

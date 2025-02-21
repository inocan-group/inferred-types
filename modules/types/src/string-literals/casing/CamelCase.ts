import type {
  Concat,
  If,
  IsTrue,
  LeftWhitespace,
  PascalCase,
  RightWhitespace,
} from "inferred-types/types";

type Process<
  TString extends string,
  TPreserveWhitespace extends boolean = false,
> = If<
  IsTrue<TPreserveWhitespace>,
  string extends TString
    ? string
    : Concat<[
      LeftWhitespace<TString>,
      Uncapitalize<PascalCase<TString>>,
      RightWhitespace<TString>,
    ]>,
  string extends TString
    ? string
    : Uncapitalize<PascalCase<TString>>
>;

/**
 * **CamelCase**`<TString,TPreserveWhitespace>`
 *
 * Converts a string to `CamelCase` format while optionally preserving
 * surrounding whitespace.
 */
export type CamelCase<
  T extends string | readonly unknown[],
> = T extends string
  ? Process<T>
  : T extends readonly unknown[]
    ? {
        [K in keyof T]: T[K] extends string
          ? CamelCase<T[K]>
          : T[K]
      }
    : never;

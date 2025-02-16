import type {
  As,
  Concat,
  DashUppercase,
  LeftWhitespace,
  LowerAllCaps,
  Replace,
  RightWhitespace,
  Trim,
} from "inferred-types/types";

type Process<
  TString extends string,
  TPreserve extends boolean = false,
> = TPreserve extends true
  ? // preserve
  Concat<[
    LeftWhitespace<TString>,
    KebabCase<TString, false>,
    RightWhitespace<TString>,
  ]>

  : // remove whitespace
  string extends TString
    ? string
    : DashUppercase<Trim<LowerAllCaps<TString>>> extends `${infer Begin}${"_" | " "}${infer Rest}`
      ? KebabCase<`${Lowercase<Begin>}-${Rest}`>
      : Replace<
        Lowercase<
          DashUppercase<Uncapitalize<Trim<LowerAllCaps<TString>>>>
        >,
        "--",
        "-"
      >;

/**
 * **KebabCase**`<TString,TPreserve>`
 *
 * Converts a string literal into a `kebab-case` format while optionally
 * allowing surrounding whitespace.
 *
 * ```ts
 * // "foo-bar"
 * type Dash = Dasherize<"foo_bar">;
 * type Dash = Dasherize<"fooBar">;
 * type Dash = Dasherize<"FooBar">;
 * // "\n  foo-bar \t"
 * type Dash = Dasherize<"\n  foo bar \t">;
 * ```
 */
export type KebabCase<
  TInput extends string | readonly unknown[],
  TPreserve extends boolean = false,
> = TInput extends string
  ? Process<TInput, TPreserve> extends string
    ? Process<TInput, TPreserve>
    : never
  : TInput extends readonly unknown[]
    ? As<{
      [K in keyof TInput]: TInput[K] extends string
        ? KebabCase<TInput[K]>
        : TInput[K]
    }, readonly unknown[]>
    : never;

/* eslint @typescript-eslint/no-unused-vars: "off" */
import {
  IsTrue,
  If,
  LeftWhitespace,
  RightWhitespace,
  Trim,
  Concat,
  DashUppercase,
  LowerAllCaps
} from "inferred-types/types";

/** convert space to dash */
type SpaceToDash<T extends string> = T extends `${infer Begin}${" "}${infer Rest}`
  ? SpaceToDash<`${Begin}-${Rest}`>
  : T;

/**
 * **SnakeCase**`<TString,TPreserve>`
 *
 * Converts a string literal type to _snake_case_ and optionally preserves
 * surrounding whitespace.
 * ```ts
 * // "foo_bar"
 * type T = SnakeCase<"fooBar">;
 * type T = SnakeCase<"\n foo bar \t">;
 * ```
 */
export type SnakeCase<
  S extends string,
  TPreserve extends boolean = false
> = If<
  IsTrue<TPreserve>,
  string extends S
    ? string
    : DashUppercase<
        Uncapitalize<SpaceToDash<Trim<LowerAllCaps<S>>>
      >
    > extends `${infer Begin extends string}${"-"}${infer Rest extends string}`
      ? Concat<[
          LeftWhitespace<S>,
          `${Lowercase<Begin>}_${Rest}` extends string
          ? SnakeCase<`${Lowercase<Begin>}_${Rest}`>
          : never,
          RightWhitespace<S>
      ]>
      : Concat<[
        LeftWhitespace<S>,
        Lowercase<DashUppercase<Uncapitalize<LowerAllCaps<S>>>>,
        RightWhitespace<S>,
      ]>,
  string extends S
    ? string
    : DashUppercase<
        Uncapitalize<SpaceToDash<Trim<LowerAllCaps<S>>>>
      > extends `${infer Begin}${"-"}${infer Rest}`
    ? Trim<SnakeCase<`${Lowercase<Begin>}_${Rest}`>>
    : Trim<Lowercase<DashUppercase<Uncapitalize<LowerAllCaps<S>>>>>
>;


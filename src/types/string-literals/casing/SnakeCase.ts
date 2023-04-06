/* eslint @typescript-eslint/no-unused-vars: "off" */
import { IfTrue } from "src/types/boolean-logic";
import { 
  LeftWhitespace, 
  RightWhitespace, 
  Trim
, Concat , DashUppercase , LowerAllCaps , LowerCase } from "src/types";

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
> = IfTrue<
  TPreserve,
  string extends S
    ? string
    : DashUppercase<
        Uncapitalize<SpaceToDash<Trim<LowerAllCaps<S>>>>
    > extends `${infer Begin}${"-"}${infer Rest}`
      ? Concat<[
          LeftWhitespace<S>,
          SnakeCase<`${LowerCase<Begin>}_${Rest}`>,
          RightWhitespace<S>
      ]>
      : Concat<[
        LeftWhitespace<S>,
        LowerCase<DashUppercase<Uncapitalize<LowerAllCaps<S>>>>,
        RightWhitespace<S>,
      ]>,
  string extends S
    ? string
    : DashUppercase<
        Uncapitalize<SpaceToDash<Trim<LowerAllCaps<S>>>>
      > extends `${infer Begin}${"-"}${infer Rest}`
    ? SnakeCase<`${LowerCase<Begin>}_${Rest}`>
    : LowerCase<DashUppercase<Uncapitalize<LowerAllCaps<S>>>>
>;

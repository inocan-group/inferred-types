
import { IfLiteral, IfStartsWith,  ToString } from "src/types/index";

type Process<
  TTarget extends string | number, 
  TLeading extends string
>= IfLiteral<
    TTarget,
    // target is literal
    IfLiteral<
      TLeading,
      // leading is literal
      IfStartsWith<
        TTarget & string, TLeading, 
        TTarget & `${TLeading}${string}`, 
        `${TLeading}${TTarget}`
      >,
      string
    >,
    string
  >

/**
 * **EnsureLeading**`<TTarget, TLeading>`
 *
 * Will ensure that `TTarget` starts with the _substring_ `TLeading` when
 * both are string literals.
 *
 * ```ts
 * type T = "World";
 * type U = "Hello ";
 * // "Hello World"
 * type R = EnsureLeading<T,U>;
 * ```
 * 
 * **Related:** `EnsureLeadingEvery`, `EnsureTrailing`, `EnsureSurround`, `Surround`
 */
export type EnsureLeading<
  TTarget extends string | number, 
  TLeading extends string
> = TTarget extends number
? Process<ToString<TTarget>, TLeading>
: Process<TTarget, TLeading>;



import { IfLiteral, IfStartsWith, IsNumber,  ToString } from "src/types";

/**
 * **EnsureLeading**`<TTarget, TLeading>`
 *
 * Will ensure that `TTarget` starts with the _substring_ `TLeading` when
 * both are string literals.
 *
 * ```ts
 * type T = " World";
 * type U = "Hello";
 * // "Hello World"
 * type R = EnsureLeading<T,U>;
 * ```
 * 
 * **Related:** `EnsureLeadingEvery`, `EnsureTrailing`
 */
export type EnsureLeading<
  TTarget extends string | number, 
  TLeading extends string
> = //
  IsNumber<TTarget> extends true
  ? EnsureLeading<ToString<TTarget>, TLeading> // convert target to string
  : IfLiteral<
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
    >;


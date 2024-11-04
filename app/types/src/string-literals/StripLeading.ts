import {
  And,
  AsNumber,
  AsStringUnion,
  IsStringLiteral
} from "@inferred-types/types";

type Process<
  TContent extends string,
  TStrip extends string
> = And<[ IsStringLiteral<TContent>, IsStringLiteral<TStrip>]> extends true
  ? TContent extends `${TStrip & string}${infer After}`
    ? After
    : TContent
  : string;

/**
 * **StripLeading**`<T, U>`
 *
 * Will strip off of `T` the starting string defined by `U` when
 * both are string literals.
 * ```ts
 * type T = "Hello World";
 * type U = "Hello ";
 * // "World"
 * type R = StripLeading<T,U>;
 * ```
 *
 * Note:
 *   - if `T` is a non-string type then no transformation will be done
 *   - same applies to `U`
 */
export type StripLeading<
  TContent extends string|number,
  TStrip extends string|number
> = TContent extends number
? AsNumber<
    Process<
      `${TContent}`,
      AsStringUnion<TStrip>
    >
  >
: TContent extends string
  ? Process<
    TContent,
    AsStringUnion<TStrip>
  >
  : never

import type { Container, TypedFunction } from "../base-types";
import type { If, IsUnset } from "../boolean-logic";
import type { Unset } from "../literals";
import type { FnFrom } from "./FnFrom";
import type { AsNarrowingFn } from "./NarrowingFn";

/**
 * **WrapperFn**`<TFn,TTransform,[TState]>`
 *
 * A function which consumes a known function `TFn` and exposes the
 * same parameters externally while allowing it to _transform_ the
 * original functions return value before completing.
 *
 * Optionally, you can express some amount of _state_ which will be available
 * to the `TTransform` function to do it's work.
 *
 * ```ts
 * type Fn = (name: string) => `Hello ${string}`;
 * // (name: string) => `Hello ${name}!`;
 * type Wrapped = WrapperFn<Fn, v => `${v}!`>
 * ```
 */
export type WrapperFn<
  TFn extends TypedFunction,
  TTransform extends <TRtn extends ReturnType<TFn>>(rtn: TRtn) => unknown,
  TState extends Container | Unset = Unset,
> = If<
  IsUnset<TState>,
  FnFrom<
    Parameters<TFn>,
    ReturnType<AsNarrowingFn<TTransform>>
  >,
  <T extends TState>(state: T) => FnFrom<
    Parameters<TFn>,
    ReturnType<AsNarrowingFn<TTransform>>
  >
>;

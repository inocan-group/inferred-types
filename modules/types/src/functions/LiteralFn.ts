import type {
  AnyFunction,
  AsFnMeta,
  Dictionary,
  EmptyObject,
  IsEqual,
  IsNonEmptyObject,
  Tuple,
} from "inferred-types/types";

/**
 * **LiteralFn**`<TFn>`
 *
 * Receives any function `TFn` and makes sure that it is not using
 * generics to narrow the inputs coming into the function.
 *
 * **Related:** `IsLiteralFn`, `NarrowingFn`
 */
export type LiteralFn<
  TFn extends AnyFunction,
> =
AsFnMeta<TFn>["hasProps"] extends true
  ? AsFnMeta<TFn>["hasArgs"] extends true
    ? ((...args: AsFnMeta<TFn>["args"]) => AsFnMeta<TFn>["returns"]) & AsFnMeta<TFn>["props"]
    : (() => AsFnMeta<TFn>["returns"]) & AsFnMeta<TFn>["props"]
  : AsFnMeta<TFn>["hasArgs"] extends true
    ? (...args: AsFnMeta<TFn>["args"]) => AsFnMeta<TFn>["returns"]
    : () => AsFnMeta<TFn>["returns"];

/**
 * **AsLiteralFn**`<TParams,TReturns,TProps>`
 *
 * Constructs a `LiteralFn` from component aspects of
 * a function.
 *
 * **Related:** `LiteralFn`, `NarrowingFn`, `AsNarrowingFn`
 */
export type AsLiteralFn<
  TParams extends Tuple | AnyFunction,
  TReturn = unknown,
  TProps extends Dictionary = EmptyObject,
> = TParams extends AnyFunction
  ? LiteralFn<TParams>
  : TParams extends Tuple
    ? IsNonEmptyObject<TProps> extends true
      ? IsEqual<TParams, []> extends true
        ? (() => TReturn) & TProps
        : ((...args: TParams) => TReturn) & TProps
      : IsEqual<TParams, []> extends true
        ? () => TReturn
        : (...args: TParams) => TReturn
    : never;

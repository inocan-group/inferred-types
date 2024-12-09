import type { TypedFunction } from "inferred-types/types";

type Process<
  T extends readonly unknown[],
> = {
  [K in keyof T]: T[K] extends TypedFunction
    ? ReturnType<T[K]>
    : T[K];
};

/**
 * **ValueOrReturnValue**`<TEval>`
 *
 * Takes a value or a tuple of values in `TEval` and evaluates what
 * the item's _return type_ is when an element is a function; otherwise it just proxies
 * the element's type forward.
 *
 * ### Example
 * ```ts
 * // [true, "foo", "bar"]
 * type T = ValueOrReturns<[true, "foo", () => "bar"]>;
 * ```
 */
export type ValueOrReturnValue<TEval> = TEval extends readonly unknown[]
  ? Process<TEval>
  : Process<[TEval]>[0];

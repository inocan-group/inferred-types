type Process<TVal, TFallback> = [TVal] extends [undefined]
    ? TFallback
    : [TVal] extends [null]
        ? TFallback
        : TVal;

/**
 * **Fallback**`<TVal,TFallback>`
 *
 * Branching operator which allows giving a value `TVal` a _default value_ when
 * it's value is either `null` or `undefined`.
 */
export type Fallback<
    TVal,
    TFallback,
> = Process<TVal, TFallback>;

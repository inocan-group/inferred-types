

/**
 * Base interface for all runtime types
 */
export interface BaseRuntimeType<
    T extends string = string,
    U = unknown
> {

    /**
     * the _kind_ of type this is:
     *
     * - `atomic` (e.g., null, undefined, true, false)
     * - `literal` (e.g., string | number)
     * - `kv` (e.g., Record<K,V>, Map<K,V>, WeakMap<K,V>)
     * - `set` (e.g., Set<V>)
     * - `function`
     * - `generator`
     * - `class`
     *
     * and then two set variants:
     *
     * - `union`
     * - `intersection`
     */
    readonly kind: string;

    /** the runtime `InputToken` */
    readonly token: T;
    /** the type which the runtime token represents */
    readonly type: U;

    /**
     * Type guard which validates that `val` is the type represented
     * by the runtime token.
     */
    extends(val: unknown): val is U;

    /**
     * Converts to an explanatory string of the form: `${token} -> ${type}`
     */
    toString(): string;
}


import type { Container, Dictionary, Expand, FromKv, KeyValue, ToKv, Unbrand } from "inferred-types/types";

/**
 * **UnbrandValues**`<T>`
 *
 * Unbrand's any values in a tuple or dictionary.
 *
 * **Related:** `Unbrand`, `Brand`, `IsBranded`, `GetBrand`
 */
// Helper to map Unbrand over tuple/array elements without touching array prototype keys.
type UnbrandTuple<
    T extends readonly unknown[],
    R extends readonly unknown[] = []
> = T extends [infer Head, ...infer Rest]
    ? UnbrandTuple<Rest, [...R, Unbrand<Head>]>
: R;

export type UnbrandValues<T extends Container> = T extends readonly unknown[]
    ? UnbrandTuple<T>
    : T extends Dictionary
        ? ToKv<T> extends infer KeyValues extends readonly KeyValue[]
            ? {
                [K in keyof KeyValues]: KeyValues[K] extends infer KV extends KeyValue
                    ? Expand<Omit<KV, "value"> & Record<"value", Unbrand<KV["value"]>>>
                    : never
            } extends infer Result extends readonly KeyValue[]
                ? FromKv<Result>
                : never
            : never
        : never;

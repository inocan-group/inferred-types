import type { Brand, BrandSymbol, Container, Dictionary, Expand, FromKv, KeyValue, ToKv } from "inferred-types/types";

/**
 * **UnbrandValues**`<T>`
 *
 * Unbrand's any values in a tuple or dictionary.
 *
 * **Related:** `Unbrand`, `Brand`, `IsBranded`, `GetBrand`
 */
// Helper to map Unbrand over tuple/array elements without touching array prototype keys.
type UnbrandOne<V> = V extends Brand<infer B, any> ? B : V;

// Helper to map shallow unbranding over tuple/array elements.
type UnbrandTuple<
    T extends readonly unknown[]
> = { [K in keyof T]: UnbrandOne<T[K]> };

type UnbrandIfBranded<V> = UnbrandOne<V>;

export type UnbrandValues<T extends Container> = T extends readonly unknown[]
    ? UnbrandTuple<T>
    : T extends Dictionary
        ? ToKv<T> extends infer KeyValues extends readonly KeyValue[]
            ? {
                [K in keyof KeyValues]: KeyValues[K] extends infer KV extends KeyValue
                    ? Expand<Omit<KV, "value"> & Record<"value", UnbrandIfBranded<KV["value"]>>>
                    : never
            } extends infer Result extends readonly KeyValue[]
                ? FromKv<Result>
                : never
            : never
        : never;

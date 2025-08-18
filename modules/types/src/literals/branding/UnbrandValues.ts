import { Container, Dictionary, Expand, FromKv, KeyValue, ToKv, Unbrand } from "inferred-types/types";


/**
 * **UnbrandValues**`<T>`
 *
 * Unbrand's any values in a tuple or dictionary.
 *
 * **Related:** `Unbrand`, `Brand`, `IsBranded`, `GetBrand`
 */
export type UnbrandValues<T extends Container> = T extends readonly unknown[]
? {
    [K in keyof T]: Unbrand<T[K]>
}
: T extends Dictionary
    ? ToKv<T> extends infer KeyValues extends readonly KeyValue[]
        ?  {
            [K in keyof KeyValues]: KeyValues[K] extends infer KV extends KeyValue
                ? Expand<Omit<KV, "value"> & Record<"value", Unbrand<KV["value"]>>>
                : never
        } extends infer Result extends readonly KeyValue[]
            ? FromKv<Result>
            : never
    : never
: never;

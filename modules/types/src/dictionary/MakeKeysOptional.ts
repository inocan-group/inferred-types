import type {
    Dictionary,
    ExpandRecursively,
    ObjectKey,
    OptionalKeysTuple,
    WithKeys,
    WithoutKeys,
} from "inferred-types/types";

type Iterate<
    TObj extends Dictionary,
    TOptional extends readonly ObjectKey[]
> = ExpandRecursively<
    WithoutKeys<TObj, TOptional> & {
        [K in keyof WithKeys<TObj, TOptional>]?: K extends keyof TObj
            ? TObj[K]
            : never
    }
>;

/**
 * **MakeKeysOptional**`<TObj, TKeys>`
 *
 * Makes a set of keys on a known object `TObj` become
 * _optional_ parameters while leaving the other properties
 * "as is".
 *
 * **Related:** `MakeKeysRequired`
 */
export type MakeKeysOptional<
    TObj extends Dictionary,
    TKeys extends readonly ObjectKey[]
> = OptionalKeysTuple<TObj> extends readonly ObjectKey[]
    ? Iterate<TObj, TKeys>
    : never;

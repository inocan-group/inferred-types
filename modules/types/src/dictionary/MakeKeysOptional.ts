import type {
    AfterFirst,
    First,
    Dictionary,
    EmptyObject,
    Expand,
    IsWideObject,
    Keys,
    ObjectKey,
    OptionalKeysTuple,
    WithKeys,
    WithoutKeys,
    Contains,
    If,
} from "inferred-types/types";

type ProcessTupleKeys<
    TObj extends Dictionary,
    TKeys extends readonly ObjectKey[],
> = Expand<
    WithoutKeys<TObj, TKeys> & {
        [K in keyof WithKeys<TObj, TKeys>]?: K extends keyof TObj
            ? TObj[K]
            : never
    }
>;

type AddOpt<
    TKey extends ObjectKey,
    TVal
> = ProcessTupleKeys<Record<TKey,TVal>, [TKey]>;

type X = AddOpt<"foo",1>;




type Iterate<
    TObj extends Dictionary,
    TMake extends readonly ObjectKey[],
    TWas extends readonly ObjectKey[],
    TKeys extends readonly ObjectKey[],
    TResult extends Dictionary = EmptyObject
> = [] extends TKeys
? Expand<TResult>
: First<TKeys> extends keyof TObj
? Iterate<
    TObj,
    TMake,
    TWas,
    AfterFirst<TKeys>,
    If<
        Contains<TMake, First<TKeys>>,
        TResult & AddOpt<First<TKeys>,TObj[First<TKeys>]>,
        Contains<TWas, First<TKeys>> extends true
            ? TResult & AddOpt<First<TKeys>, TObj[First<TKeys>] >
            : TResult & Record<First<TKeys>, TObj[First<TKeys>] >
    >
>
: never;

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
    TKeys extends IsWideObject<TObj> extends true ? readonly ObjectKey[] : readonly (keyof TObj & ObjectKey)[]
> = OptionalKeysTuple<TObj> extends readonly ObjectKey[]
    ? Keys<TObj> extends readonly ObjectKey[]
        ? Iterate<TObj,TKeys,OptionalKeysTuple<TObj>,Keys<TObj>>
        : never
    : never;


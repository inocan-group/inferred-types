import type {
    AfterFirst,
    AnyObject,
    Dictionary,
    ExpandDictionary,
    First,
    Keys,
    ObjectKey,
} from "inferred-types/types";

type Convert<
    TKeys extends readonly (ObjectKey & keyof TObj)[],
    TObj extends Dictionary,
    TResult extends Dictionary,
> = [] extends TKeys
    ? ExpandDictionary<TResult>
    : Convert<
        AfterFirst<TKeys>,
        TObj,
    TResult & Record<First<TKeys>, <T extends TObj[First<TKeys>]>() => T>
    >;

/**
 * **ObjectToApi**`<TObj>`
 *
 * Converts any object `TObj` to an object with:
 *
 * - the _same_ keys plus a done() function
 * - all the values of `T` -- which are not functions already --
 * will be made into a function returning the value.
 * - the `TDef` property is the value _type_ to return;
 * use utilities like `shape()`, `union()` etc. to define
 */
export type ObjectToApi<
    TObj extends AnyObject,
    TDef = never,
> = Keys<TObj> extends readonly (ObjectKey & keyof TObj)[]
    ? Convert<
        Keys<TObj>,
        TObj,
        { __kind: "ObjectApi"; done: () => TDef }
    >
    : never;

/**
 * A callback signature for an object converted via `ObjectToApi`
 */
export type ObjectApiCallback<
    TObj extends AnyObject,
    TDef = never,
> = ((api: ObjectToApi<TObj, TDef>) => unknown);

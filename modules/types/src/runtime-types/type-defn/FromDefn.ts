import type {
    Contains,
    DefineObject,
    Dictionary,
    FromDefineObject,
    FromSimpleRecordKey,
    FromWideTokens,
    HandleDoneFn,
    NarrowableScalar,
    RecordKeyWideTokens,
    ShapeCallback,
    SimpleToken,
    SimpleType,
    Tuple,
    TupleToUnion,
    UnionElDefn,
    Unset,
    Values,
    WideContainerNames,
    WideTokenNames,
} from "inferred-types/types";

type ProcessUnion<
    T extends UnionElDefn,
> = T extends Tuple
    ? TupleToUnion<T>
    : T extends ShapeCallback
        ? HandleDoneFn<ReturnType<T>>
        : never;
type IterateUnion<T extends readonly UnionElDefn[]> = {
    [K in keyof T]: ProcessUnion<T[K]>
};

/**
 * **AsUnion**
 *
 * Receives a `UnionTokenSet`, a `ShapeCallback` or just a tuple of values
 * and makes this into _union type_.
 */
export type AsUnion<T extends UnionElDefn | readonly [UnionElDefn, ...UnionElDefn[]]> = T extends UnionElDefn[]
    ? TupleToUnion<IterateUnion<T>>
    : T extends UnionElDefn
        ? ProcessUnion<T>
        : never;

export type IsDictionaryDefinition<T> = T extends Dictionary
    ? Contains<Values<T>, ShapeCallback>
    : false;

/**
 * converts non-tuple definition types to actual type
 */
type ToType<
    T,
    TElse,
> = T extends ShapeCallback
    ? FromShapeCallback<T>
    : T extends SimpleToken
        ? FromSimpleToken<T>
        : T extends RecordKeyWideTokens
            ? FromSimpleRecordKey<T>
            : T extends WideTokenNames | WideContainerNames
                ? FromWideTokens<T>
                : T extends RecordKeyWideTokens
                    ? FromSimpleRecordKey<T>
                    : TElse;

/**
 * iterates over tuple definition types to convert into real types
 */
type IterateOverDefinitions<
    T extends readonly unknown[],
    TElse,
> = {
    [K in keyof T]: ToType<T[K], TElse>;
};

export type TypeDefinition = NarrowableScalar | ShapeCallback;

/**
 * converts a `ShapeCallback` into the _type_ which it is defining
 */
export type FromShapeCallback<
    TShape extends ShapeCallback,
    TAsToken extends boolean = false,
> = TAsToken extends false
    ? ReturnType<HandleDoneFn<TShape>>
    : string; // TODO

/**
 * converts a `SimpleToken` into the _type_ which it is defining
 */
export type FromSimpleToken<T extends SimpleToken> = SimpleType<T>;

/**
 * **FromDefn**`<T, [TElse]>`
 *
 * Takes either a singular `T` or a tuple of values for `T` and
 * looks for any cases where a `ShapeCallback` is found:
 *
 * - where it is found, it will resolve the type
 * - if the type is a `SimpleToken` then this too is resolved
 * - in other cases it simply proxies the values through
 * - if `TElse` is set you can redirect values which don't use
 * the ShapeCallback API to a specific type.
 *
 * Note: when dictionary objects are found the _values_ will be
 * interrogated for ShapeCallback's.
 */
export type FromDefn<
    T,
    TElse = Unset,
> = T extends DefineObject
    ? FromDefineObject<T>
    : T extends SimpleToken
        ? SimpleType<T>
        : T extends readonly unknown[]
            ? IterateOverDefinitions<T, TElse>
            : ToType<T, TElse>;

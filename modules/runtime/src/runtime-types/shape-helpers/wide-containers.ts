import type {
    ArrayTypeDefn,
    As,
    AsArray,
    DictionaryTypeDefn,
    FromDefn,
    HandleDoneFn,
    MapKeyDefn,
    MapValueDefn,
    RecordValueTypeDefn,
    ShapeCallback,
    WeakMapKeyDefn,
    WeakMapValueDefn,
    WideTokenNames,
} from "inferred-types/types";

export function record<
    TKey extends DictionaryTypeDefn,
    TValue extends RecordValueTypeDefn = "unknown",
>(_key?: TKey, _value?: TValue) {
    // TODO
    return null as unknown as Record<As<FromDefn<TKey>, string>, FromDefn<TValue>>;
}

export function array<T extends ArrayTypeDefn = "Array<unknown>">(_type?: T) {
    // TODO
    return null as unknown as AsArray<FromDefn<T>>;
}

export function set<T extends WideTokenNames | ShapeCallback = "unknown">(_type?: T) {
    return null as unknown as T extends ShapeCallback
        ? Set<HandleDoneFn<ReturnType<T>>>
        : T extends WideTokenNames
            ? Set<FromDefn<T>>
            : Set<unknown>;
}

export function map<
    TKey extends MapKeyDefn = "unknown",
    TValue extends MapValueDefn = "unknown",
>(_key?: TKey, _value?: TValue) {
    // TODO
    return null as unknown as Map<FromDefn<TKey>, FromDefn<TValue>>;
}

export function weakMap<
    TKey extends WeakMapKeyDefn = "object",
    TValue extends WeakMapValueDefn = "unknown",
>(_key?: TKey, _value?: TValue) {
    // TODO
    return null as unknown as WeakMap<
        FromDefn<TKey> extends object
            ? FromDefn<TKey>
            : never,
        FromDefn<TValue>
    >;
}

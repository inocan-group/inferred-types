import {
  ArrayTypeDefn,
  AsArray,
  FromDefn,
  HandleDoneFn,
  MapKeyDefn,
  MapValueDefn,
  ObjKeyDefn,
  RecordValueTypeDefn,
  ShapeCallback,
  WeakMapKeyDefn,
  WeakMapValueDefn,
  WideTokenNames
} from "inferred-types/types";


export const record = <
  TKey extends ObjKeyDefn = "string | symbol",
  TValue extends RecordValueTypeDefn = "unknown"
>(_key?: TKey, _value?: TValue) => {
  // TODO
  return null as unknown as Record<FromDefn<TKey>, FromDefn<TValue>>
}

export const array = <T extends ArrayTypeDefn = "unknown[]">(
  _type?: T
) => {
  // TODO
  return null as unknown as AsArray<FromDefn<T>>
};

export const set = <T extends WideTokenNames | ShapeCallback = "unknown">(_type?: T) => {
  return null as unknown as T extends ShapeCallback
    ? Set<HandleDoneFn<ReturnType<T>>>
    : T extends WideTokenNames
      ? Set<FromDefn<T>>
      : Set<unknown>;
};

export const map = <
  TKey extends MapKeyDefn = "unknown",
  TValue extends MapValueDefn = "unknown"
>(_key?: TKey, _value?: TValue) => {
  // TODO
  return null as unknown as Map<FromDefn<TKey>, FromDefn<TValue>>;
}

export const weakMap = <
  TKey extends WeakMapKeyDefn = "object",
  TValue extends WeakMapValueDefn = "unknown"
>(_key?: TKey, _value?: TValue) => {
  // TODO
  return null as unknown as WeakMap<
    FromDefn<TKey> extends object
    ? FromDefn<TKey>
    : never,
    FromDefn<TValue>
  >;
}


import { 
  AnyObject, 
  UnionToTuple, 
  NumericKeys,
  Tuple,
  IfEqual,
  IfNever,
  IsRef,
} from "src/types";

/**
 * **Keys**`<TValue>`
 * 
 * Provides the _keys_ of the container (aka, object or array) `TValue`.
 * 
 * - if a _non-container_ is passed as `TValue` the type will always be an empty readonly array
 *
 * ```ts
 * type T1 = { foo: 1, bar: 2 };
 * // readonly ["foo", "bar"]
 * type K1 = Keys<T1>;
 * ```
 */
export type Keys<
  TValue,
  _TOnlyStringKeys extends boolean = false
  > = IfNever<
    keyof TValue,
     PropertyKey[],
    TValue extends Tuple
      ? NumericKeys<TValue>
      : TValue extends AnyObject
        ? IfEqual<
            keyof TValue, string,
             (string | symbol)[],
            IsRef<TValue> extends true
              ?  ["value"]
              : UnionToTuple<keyof TValue>
          >
        :  PropertyKey[]
>;

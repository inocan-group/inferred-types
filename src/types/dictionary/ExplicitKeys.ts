import { AfterFirst, AnyObject, Container, EmptyObject, First, IfLiteral, IfNever, ObjValues, RemoveIndex, RemoveNever, ToNumber, Tuple, UnionToTuple } from "src/types";


type _Keys<
  T extends Container
> = {
  [K in keyof T]: IfLiteral<
    K, 
    T extends Tuple ? ToNumber<K> : K,
    never
  > 
};

// type _IntoArr<
//   T extends AnyObject,
//   V extends readonly unknown[] = []
// > 

type _Values<
  TObj extends AnyObject, 
  TKeys extends readonly unknown[] = readonly UnionToTuple<keyof TObj>[],
  TResult extends readonly unknown[] = readonly unknown[]
> = [] extends TKeys
  ? TKeys
  : First<TKeys> extends keyof TObj
    ? IfNever<
          TObj[First<TKeys>],
          _Values<TObj, AfterFirst<TKeys>, TResult>,
          _Values<TObj, AfterFirst<TKeys>, [...TResult, First<TKeys>]>
    >
    : never;

/**
 * **ExplicitKeys**`<T> -> union`
 * 
 * Given a container `T`, this utility will return the explicit/literal
 * keys which are known on it and discard any generic index parameters.
 */
export type ExplicitKeys<T extends Container> = T extends Tuple
  ? _Keys<T> extends never[] 
    ? readonly [] 
    : Readonly<_Keys<T>>
  : T extends AnyObject
    ? T extends EmptyObject
      ? readonly []
      : Readonly<UnionToTuple<keyof RemoveIndex<T>>>
    : readonly [];

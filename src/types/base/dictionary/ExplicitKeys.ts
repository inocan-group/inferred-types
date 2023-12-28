import {  AnyObject, Container, EmptyObject,  IfLiteral,  RemoveIndex, ToNumber, Tuple, UnionToTuple } from "..";


type _Keys<
  T extends Container
> = {
  [K in keyof T]: IfLiteral<
    K, 
    T extends Tuple ? ToNumber<K> : K,
    never
  > 
};



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

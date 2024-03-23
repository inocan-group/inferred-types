import { IfNever } from "../boolean-logic/branching/IfNever";

type _Get<T, K, Acc=never> = K extends `${infer A}.${infer B}` 
? A extends keyof T ? _Get<T[A], B, _Get<T[A], B>> : Acc 
: K extends keyof T ? _Get<T[K], K, T[K]> : Acc;

export type Get<T, K, TDefVal = undefined> = IfNever<
  _Get<T,K>,
  TDefVal,
  _Get<T,K> extends undefined
    ? TDefVal
    : _Get<T,K>
>

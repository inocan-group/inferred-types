import {  And,  AsTuple, Container, DoesExtend,   IsTuple, ObjectKey,RemoveIndexKeys,  UnionToTuple } from "src/types/index"



type Process<
  A extends readonly unknown[],
  B extends readonly unknown[],
> = And<{
  [K in keyof A]: K extends keyof B
    ? true
    : false
}>

type _Keys<T extends object> = UnionToTuple<keyof RemoveIndexKeys<T>> extends readonly ObjectKey[]
? UnionToTuple<keyof RemoveIndexKeys<T>>
: never

type ObjWrapper<
  A extends Container,
  B extends Container
> = 
A extends object
? B extends object
    ? Process<
      _Keys<A> extends readonly ObjectKey[]
        ? _Keys<A>
        : never,
      _Keys<B> extends readonly ObjectKey[]
        ? _Keys<B>
        : never
      >
  : false
: false;


/**
 * **HasSameKeys**`<A,B>`
 * 
 * Boolean operator which compares two lists to see if they have the same keys.
 */
export type HasSameKeys<
  A extends Container,
  B extends Container
> = 
IsTuple<A> extends true
  ? IsTuple<B> extends true
    ? AsTuple<A>["length"] extends AsTuple<B>["length"]
      ? Process<AsTuple<A>,AsTuple<B>>
      : false
  : false
: DoesExtend<A,object> extends true
  ? DoesExtend<B,object> extends true
    ? _Keys<A>["length"] extends _Keys<B>["length"]
      ? ObjWrapper<A,B>
      : false
    : false
  : false;

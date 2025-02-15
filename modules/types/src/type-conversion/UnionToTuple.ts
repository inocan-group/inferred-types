import { AfterFirst, And, AnyObject, First, IsFalse, IsTrue, Scalar } from "inferred-types/types"

type HasBoolean<
  T extends readonly unknown[],
  TTrue extends boolean = false,
  TFalse extends boolean = false
> = [] extends T
  ? And<[TTrue, TFalse]>
  : HasBoolean<AfterFirst<T>, First<T> extends true ? true : TTrue, First<T> extends false ? true : TFalse>


type PreserveBoolean<T extends readonly unknown[]> = {
  [K in keyof T]: IsTrue<T[K]> extends true
  ? boolean
  : IsFalse<T[K]> extends true
  ? never
  : T[K]
}


/**
 * UnionToIntersection<{ foo: string } | { bar: string }> =
 *  { foo: string } & { bar: string }.
 */
type UnionToIntersection<U> = (
  U extends undefined | Scalar | AnyObject ? (arg: U) => 0 : never
) extends (arg: infer I) => 0
  ? I
  : never;

/**
 * LastInUnion<1 | 2> = 2.
 */
export type LastInUnion<U> = UnionToIntersection<
  U extends undefined | Scalar | AnyObject ? (x: U) => 0 : never
> extends (x: infer L) => 0
  ? L
  : never;

type Process<
  U extends undefined | Scalar | AnyObject,
  Last = LastInUnion<U>
> = [U] extends [never]
  ? []
  : [...UnionToTuple<Exclude<U, Last>>, Last]

/**
 * **UnionToTuple**`<1 | 2>` => [1, 2]
 *
 * Converts union members into a tuple.
 *
 * **Related**: `UnionArrayToTuple`
 */
export type UnionToTuple<
  U extends undefined | Scalar | AnyObject
> = HasBoolean<Process<U>> extends true
  ? PreserveBoolean<Process<U>>
  : Process<U>;

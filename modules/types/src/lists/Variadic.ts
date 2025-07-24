import { TupleMeta, Slice, FixedLengthArray, Mutable } from "inferred-types/types";

export type GetNonVariadicLength<
    T extends readonly unknown[],
    F extends readonly unknown[] = [],
> = [] extends Required<T>
    ? F["length"]
    : Required<Mutable<T>> extends [infer Explicit, ...infer REST]
        ? GetNonVariadicLength<
            REST,
            [...F, Explicit]
        >
        : F["length"];


export type GetOptionalElementCount<T extends readonly unknown[]> = Required<{
        [K in keyof T]: {} extends Pick<T,K>
            ? true
            : false
}>;

type IsOptionalIndex<
  T extends readonly unknown[],
  I extends NumericKeys<T>
> = {} extends Pick<T, I> ? true : false;

/**
 * **ExcludeVariadicTail**`<T>`
 *
 *
 */
export type ExcludeVariadicTail<
    T extends readonly unknown[]
> = T extends [...FixedLengthArray<unknown, GetNonVariadicLength<T>>, ...infer Rest]
    ? [GetNonVariadicLength<T>, ...Rest]
    : [];



/** Does T have at least one fixed (non-variadic) element? */
type HasFixedHead<T extends readonly unknown[]> =
  Exclude<keyof T, keyof any[]> extends never ? false : true;


/**
 * **HasVariadicTail**`<T>`
 *
 * Boolean operator which tests whether the tuple `T` concludes with
 * a _variadic_ type.
 *
 * - **Note**: while all wide type arrays like `number[]` or even `[...number[]]` (
 * which are the same type) are by nature _variadic_ this utility will return `false`
 * for wide types so we can isolate only literal types that have variadic tails.
 *
 * **Related:**
 * - `GetNonVariadicLength`, `NonVariadic`, `VariadicType`
 * - `IsWideArray`, `IsLiteralArray`
 */
export type HasVariadicTail<T extends readonly unknown[]> =
  number extends T['length']                                   // tuple-with-rest OR wide array
    ? HasFixedHead<T> extends true                              // exclude wide arrays (no fixed head)
      ? (T extends readonly [...infer _H, ...infer R]
          ? number extends R['length']                          // the tail is variadic
            ? true
            : false
          : false)
      : false
    : false;



/**
 * **VariadicType**`<T>`
 *
 * Returns the element type of a tuple's variadic tail.
 *
 * - Returns `never` if the tuple has no variadic tail
 * - For tuples with variadic tails like `[1, 2, ...number[]]`, returns the element type (`number`)
 * - Empty tuples and tuples with only optional elements return `never`
 *
 * **Related:** `GetNonVariadicLength`, `NonVariadic`, `VariadicType`
 */
export type VariadicType<
    T extends readonly unknown[],
    R extends readonly unknown[] = Required<T>
> =
    HasVariadicTail<Required<T>> extends true
        ? Slice<
            T,
            ExcludeVariadicTail<R>["length"]
        >
        : never;

type TupleIndices<T extends readonly unknown[]> =
  Exclude<keyof T, keyof any[]> extends infer K
    ? K extends `${infer N extends number}` // parse the string literal back to a number literal
      ? N
      : never
    : never;

type NumericKeys<T> = Extract<keyof T, number>;
type NK = TupleIndices<[1,2,3,4]>; // =>





type A = [1, 2, 3];
type B = [1, 2, 3, number?];
type BLen = B["length"];
type BFix = GetNonVariadicLength<Required<B>>; // =>
type BSlice = Slice<B, 0, 3> //
type C = [1, 2, 3, ...number[]];
type CFix = GetNonVariadicLength<C>; // =>
type X = Required<[1, 2, 3?, 4?, ...number[]]>; // =>
type XFix = GetNonVariadicLength<X>; // =>
type NV = ExcludeVariadicTail<X>; // =>
type D = [number?, number?];
type DFix = GetNonVariadicLength<D>;
type DLen = D["length"]
type M = TupleMeta<[1,2,number?,string?,...number[]]>; // =>
type R = [1,2,number?,string?,...number[]]; // =>

type V1 = VariadicType<[]>; // =>
type V2 = VariadicType<[string,number,string?, ...string[]]>; // =>
type R2 = Required<[string,number,string?, ...string[]]>; // =>
type S2 = ExcludeVariadicTail<Required<[string,number,string?, ...string[]]>>; // =>
type L2 = ExcludeVariadicTail<Required<[string,number,string?, ...string[]]>>["length"]; // =>


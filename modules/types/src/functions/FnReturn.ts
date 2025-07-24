import {
    ArgUnion,
    FillStringHole,
    FnFrom,
    IsTemplateLiteral,
    IsAny,
    AnyMap,
    AnySet,
    AnyWeakMap,
    Dictionary,
    TypedFunction,
    TemplateParams
} from "inferred-types/types";

type Comparators<T extends readonly unknown[]> = [
    FnFrom<T, string>,
    FnFrom<T, number>,
    FnFrom<T, boolean>,
    FnFrom<T, Dictionary>,
    FnFrom<T, AnyMap>,
    FnFrom<T, AnyWeakMap>,
    FnFrom<T, AnySet>,
    FnFrom<T, string[]>,
    FnFrom<T, number[]>,
    FnFrom<T, boolean[]>,
    FnFrom<T, readonly unknown[]>,
];

type Similar<
  TFn extends TypedFunction,
  TParam extends readonly unknown[],
  /** comparable functions based on parameter signature and static enum of return types */
  TComp extends readonly TypedFunction[] = Comparators<TParam>
> = TComp[number] extends infer C
? C extends TypedFunction
    ? TFn extends C
    ? ReturnType<C>           // keep it
    : never                   // drop it
    : never
: never;



;

/**
 * **FnReturn**`<TFn, [TOpt]>`
 *
 * Determines the return type of a function.
 *
 * - if the function passed in a "literal function" then the return type can be quite narrow
 * - however, if you're using generics in your function, you will sometimes find that the built-in `ReturnType<T>`
 * will just report `any` as the return! To avoid this we will need some trickery:
 *
 *     - we generate a bunch of _similar_ functions
 *     - these functions will have the same parameters as the provided function but with variant return types
 *     - we can then compare the passed in function with all the variants to deduce the general return type
 *
 * - the second bit of "magic" is to detect the signature of literal templates found in the return type (
 * e.g., `${string}`, `${number}`, etc.) and see if there's a clear type mapping available from the parameters
 *
 *      - when there is a match there is a potential _narrowing_ opportunity
 *      - if the parameter type is a _literal union_ type (e.g., `"Mr." | "Mrs."`) we can replace a `${string}` or `${number}`
 *      template immediately without any additional information
 *          - this increased type resolution, however, means the return type will become a union and too many
 *          union types can lead to unmanageable type complexity if we're not careful.
 *          - for this reason, if you'd prefer to **not** interpolate parameter unions into the return type you
 *          can set the optional `TOpt` property to `false` and this interpolation will not happen
 *          - if instead you'd like to take a "half-way approach" you can add a number to the `TOpt` generic and
 *          if the number of union types is _below_ the number specified we will interpolate but not if if the
 *          number of union types reaches or exceeds this limiter number.
 *      - in cases where a parameter is either a `string` or `number` but not a union of literal types, we
 *      can't narrow the type without more information but if you add a tuple of data which can be matched to the
 *      return signature then we will interpolate it in.
 *          - Note: this can be used with parameters with a _literal union_ too as a way to intersect a singular literal
 *          type instead of carrying the weight of the union.
 *
 * ```ts
 * // `Hi Bob` | `Hi Mary`
 * type LiteralUnion = FnReturn<(name: "Bob" | "Mary") => `Hi ${name}`>
 * // `Bob is 45 years old`
 * type Explicit = FnReturns<
 *     (name: string, age: number) => `${typeof name} is ${typeof age} years old`>,
 *     [ "Bob", 45 ]
 * ```
 */
export type FnReturn<TFn extends TypedFunction> = [IsAny<ReturnType<TFn>>] extends [true]
    ? Similar<TFn, Parameters<TFn>>
    : IsTemplateLiteral<ReturnType<TFn>> extends true
        ? Parameters<TFn>["length"] extends 1
            ? FillStringHole<ReturnType<TFn>, ArgUnion<TFn>[0]>
            : ReturnType<TFn>
    : ReturnType<TFn>;


// DEBUG

type F1 = <A extends number>(age: A) => `${A} years old`;
type F2 = (age: number) => `${typeof age} years old`;
type F3 = <T extends readonly [age: number]>(...args: T) => `${T[0]} years old`;



type A2 = ArgUnion<F1>; // =>

type RT1 = ReturnType<F1>; // =>
type RT2 = ReturnType<F2>; // =>
type RT3 = ReturnType<F3>; // =>

type TP1 = TemplateParams<ReturnType<F1>>; // =>


type P1 = Parameters<F1>; // =>
type P2 = Parameters<F2>; // =>
type P3 = Parameters<F3>; // =>

type C1 = Comparators<P1>; // =>
type C2 = Comparators<P2>; // =>
type C3 = Comparators<P2>; // =>

type Similar1 = Similar<F1,P1>; // =>
type Similar2 = Similar<F2,P2>; // =>
type Similar3 = Similar<F3,P2>; // =>

type R1 = FnReturn<F1>; // =>
type R2 = FnReturn<F2>; // =>
type R3 = FnReturn<F3>; // =>

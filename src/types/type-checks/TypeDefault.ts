import { IsObject } from "src/types/type-checks";
import { SimplifyObject } from "../SimplifyObject";
import { IfExtends } from "./Extends";
import { IfOptionalLiteral } from "./IsLiteral";
import { IfUndefined } from "./IsUndefined";

/**
 * **TypeDefault**
 *
 * A type utility designed to help maintain strong and narrow types where
 * you have a value `T` which _might_ be **undefined** and a type `D` which
 * defines all the _default_ type for `T`.
 *
 * - In all cases we compare first whether `T` is undefined and replace it's
 * type with `D` 1-for-1 if it is
 * - To address a larger set of use cases, when `D` _extends_ an object we will
 * compare each property of `D` against `T`
 * ```ts
 * type I = { foo?: "foo" |  undefined; bar?: 42 | 53 | undefined };
 * type D = { foo: "foo"; bar: 53 };
 * type DF = TypeDefault<I,D>; // `D`
 * const i = { foo: undefined, bar: 99 } as const;
 * type DF2 = TypeDefault<typeof i, D>; // `{ foo: "foo"; bar: 99 }`
 * ```
 */
export type TypeDefault<T, D> = //
  IsObject<D> extends true //
    ? IsObject<T> extends true
      ? // both T and D are objects; start by iterating over D
        SimplifyObject<{
          [K in keyof D]: K extends keyof T
            ? // both D[T] and K[T] are present
              TypeDefault<T[K], D[K]>
            : // only D[K] present
              D[K];
        }>
      : // T is not an object, but D is
        IfUndefined<
          T, // check if T is undefined
          D, // use D as the type
          Exclude<T, undefined> // use T as the type but remove "undefined"
        >
    : // neither D or T is an object
      IfUndefined<
        T, // check whether is T is undefined
        D, // assign to D if it is
        IfOptionalLiteral<
          T, // if T is a literal
          IfExtends<
            D,
            T,
            D, // use D since it extends the value of T
            Exclude<T, undefined> // use T's literal value minus "undefined"
          >,
          // T is a wide type
          Exclude<T, undefined>
        >
      >;

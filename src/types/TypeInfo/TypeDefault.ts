import { SimplifyObject } from "../SimplifyObject";
import { IfLiteral } from "./IsLiteral";
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
export type TypeDefault<T, D> = D extends {} //
  ? T extends {}
    ? SimplifyObject<{
        [K in keyof D]: K extends keyof T
          ? D[K] extends T[K] //
            ? T[K] extends string | boolean | number
              ? IfLiteral<T[K], D[K], T[K]>
              : T[K] extends {}
              ? TypeDefault<T[K], D[K]>
              : D[K]
            : IfUndefined<T[K], D[K], T[K]>
          : D[K];
      }>
    : D
  : IfUndefined<T, D, T>;

import { IfStringLiteral } from "src/types/type-checks";

/**
 * **EndsWith**<T,U>
 *
 * A type utility which checks whether `T` _ends with_ the string literal `U`.
 *
 * If both `T` and `U` are string literals then the type system will resolve
 * to a literal `true` or `false` but if either is not a literal that it will
 * just resolve to `boolean` as the value can not be known at design time..
 */
export type EndsWith<T extends unknown, U extends unknown> = T extends string
  ? U extends string
    ? T extends `${string}${U}`
      ? IfStringLiteral<
          T, //
          IfStringLiteral<U, true, boolean>,
          boolean
        >
      : IfStringLiteral<T, false, boolean>
    : false
  : false;

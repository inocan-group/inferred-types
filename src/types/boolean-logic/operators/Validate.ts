import { ErrorCondition, If, IsFalse, IsTrue, IsWideType, LogicFunction, ToString } from "../..";


type WideBooleanNotAllowed = ErrorCondition<
  "wide-boolean-not-allowed", 
  `Call to Validate<T,E> received a wide boolean type for T!`
>;

type WideReturnNotAllowed<T> = ErrorCondition<
  "wide-return-not-allowed", 
  `Call to Validate<T,E> returned a wide type: ${ToString<T>}!`
>;


/**
 * **Validate**`<T,[E]>`
 * 
 * Branching utility which proxies through the value of `T` when it is
 * **not** `false` or _returns_ false, otherwise it passes along `E`.
 * 
 * - `E` by default is _never_
 * - if `T` is a wide boolean type an `ErrorCondition<"wide-boolean-not-allowed">`
 * will be returned
 * 
 * ```ts
 * const fn = <T extends string>(dp: T & Validate<IsDotPath<T>>) => {}
 * ```
 */
export type Validate<
  T,
  E = never
> = T extends boolean
  ? If<
      IsTrue<T>,
      T,
      If<IsFalse<T>, E, WideBooleanNotAllowed>
    >
  : T extends LogicFunction 
    ? If<
        IsTrue<ReturnType<T>>,
        T,
        If<IsFalse<ReturnType<T>>, E, WideBooleanNotAllowed>
      >
    : If<
        IsWideType<T>, 
        WideReturnNotAllowed<T>, 
        T
      >;

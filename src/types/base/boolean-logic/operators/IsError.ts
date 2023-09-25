import { ErrorCondition, IfNever, Includes } from "src/types";

export interface IsErrorOptions {
  /** evaluate the `never` type as an error in this utility */
  neverAsError?: boolean;
  /** evaluate JS's `Error` constructor as an error in this utility */
  errorAsError?: boolean;
  /** only identify `ErrorConditions<TKind>` as errors */
  kind?: string;
  /**  */
  msgIncludes?: string;
}

type Process<
  T extends ErrorCondition,
  O extends IsErrorOptions
> = O["msgIncludes"] extends string
? Includes<T["message"], O["msgIncludes"]> extends true
  ? true
  : false
: true;

/**
 * **IsError**`<T, [IsErrorOptions]>`
 * 
 * A boolean utility which detects whether T represents an error condition.
 * 
 * - the primary criteria is whether `T` extends `ErrorCondition`
 * - Error Scope
 *    - the option `{ neverAsError: true }` will make the type `never`
 * evaluate to `true`; it evaluates to `false` by default
 *    - the option `errorAsError` set to true does the same thing for
 * Javascript's `Error` type.
 * - Filtering
 *    - the `kind` option property will to filter down the _kind_ property
 * of the `ErrorCondition`'s you looking for
 *    - the `msgIncludes` property filters down errors to those which _include_ the
 * text specified as part of the error message. Useful for type tests.
 */
export type IsError<
  T,
  O extends IsErrorOptions = IsErrorOptions
> = IfNever<
  T,
  O["neverAsError"] extends true ? true : false,
  // not never
  T extends Error 
    ? O["errorAsError"] extends true ? true : false
    : O["kind"] extends string 
      ? T extends ErrorCondition<O["kind"]> ? Process<T,O> : false
      : T extends ErrorCondition ? Process<T,O> : false

>;

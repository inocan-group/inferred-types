import type {
  EmptyObject,
  ExpandRecursively,
  RemoveNever,
} from "inferred-types/types";

export interface TypeErrorInfo<
  TContext extends Record<string, unknown> = EmptyObject,
> {
  /**
   * if there is a particular "id" value which is useful to separate from the error message
   * you can add it here.
   */
  id?: string | number;

  /**
   * a _key_ involved in the ErrorCondition
   */
  key?: unknown;

  keys?: readonly unknown[];
  /**
   * a _value_ involved in the ErrorCondition
   */
  value?: any | readonly any[];

  extends?: any | readonly any[];

  doesNotExtend?: any | readonly any[];

  values?: readonly unknown[];

  offset?: unknown;

  index?: unknown;

  /**
   * If this error condition is originating in a library/repo then you can
   * mark this as being the case.
   */
  library?: string;
  /**
   * used typically for boolean operators to indicate the value
   * being tested
   */
  test?: unknown;
  /**
   * used typically for boolean operators to indicate the value
   * if the test is `true`
   */
  if?: unknown;
  /**
   * used typically for boolean operators to indicate the value
   * if the test is `false`
   */
  else?: unknown;
  /**
   * used typically for boolean operators to indicate the value
   * if the test is `boolean`
   */
  maybe?: unknown;
  /**
   * an underlying ErrorCondition for which this ErrorCondition
   * is based
   */

  underlying?: ErrorCondition;
  /**
   * In cases where a utility provides a means to handle the "never" value
   * then this indicates what type _never_ would be mapped to.
   */

  handleNever?: any;

  container?: any | readonly any[];

  /**
   * A place to add a dictionary of key/value pairs specifically related
   * to the error which don't fit into the other props provided.
   */
  ctx?: TContext;

  [key: string]: unknown;
}

/**
 * **ErrorConditionShape**
 *
 * Represents the basic shape of any `ErrorCondition`
 */
export interface ErrorConditionShape extends TypeErrorInfo {
  __kind: "ErrorCondition";
  kind: string;
  msg: string;
}

/**
 * **ErrorCondition**`<TKind,[TMsg],[TDomain],[TVars]>`
 *
 * A way to express a meaningful error message in type system.
 *
 * **Related:** `Throw`, `ProxyError`, `MapError`, `IsErrorCondition`
 */
export type ErrorCondition<
  // identifier for this type of error
  TKind extends string = string,
  // unique description for this instance of the condition
  TMsg extends string = never,
  TUtility extends string = never,
  TStack extends readonly string[] = never,
  TRest extends TypeErrorInfo = EmptyObject,
> = ExpandRecursively<
  RemoveNever<{
  /** the kind/category of error this is */
    kind: TKind;
    /** an error about the message */
    msg: TMsg;
    /** the originating type utility which threw the error */
    utility: TUtility;
    /** the stack of utility types which were used to get to this error */
    stack: TStack;
    __kind: "ErrorCondition";
  }> & TRest
>;

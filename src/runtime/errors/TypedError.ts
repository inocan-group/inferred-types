
import {  addFnToProps, addPropsToFn, narrowFn } from "src/runtime";
import {  AnyFunction,   AnyObject,   AsFnMeta,   EmptyObject,   ExplicitKeys,   Narrowable,  NarrowableScalar, } from "src/types";

export interface TypedError<
  TKind extends string = string,
  TMsg extends string = string, 
  TContext extends AnyObject = AnyObject
> extends Error {
  kind: TKind;
  msg: TMsg;
  context: TContext;
  stack?: string;
}

/**
 * **KindedApi**
 * 
 * An error builder where the `kind` property has already been set.
 */
export type KindedApi<TKind extends string> = <
  TMsg extends string, 
  K extends PropertyKey,
  V extends Narrowable,
  TContext extends Record<K,V>
>(msg: TMsg, context?: TContext) => TypedError<TKind,TMsg,TContext>;

export type ErrorApi = {
  /**
   * A simple API surface to create an error with a `kind` and `msg` type.
   */
  kinded<TKind extends string, TMsg extends string>(
    kind: TKind, 
    msg: TMsg): TypedError<TMsg,TKind>;
  
  /**
   * Allows expressing the `kind` of error initially
   * and then provides a function to supply specific
   * errors.
   */
  asKind<TKind extends string>(kind: TKind): KindedApi<TKind>;
};


const fn = <TKind extends string>(kind: TKind) => 
  <TMsg extends string>(msg: TMsg) => ({
    kind,
    msg,
    context: {}
  } as TypedError<TKind, TMsg, EmptyObject>);



const api: ErrorApi = {
  kinded: (kind, msg) => fn(kind)(msg),
  asKind: (kind) => (msg, context) => ({ kind, msg,context: context || ({} as EmptyObject) })

} as ErrorApi;

const basic = <TMsg extends string>(msg: TMsg) => ({
  kind: "unknown" as const,
  msg,
  context: {}
});


export const TypedError = addFnToProps(api)(basic);


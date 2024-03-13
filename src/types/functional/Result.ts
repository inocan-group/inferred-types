/* eslint-disable no-use-before-define */
import {RESULT} from "src/constants/index"
import {  ObjectKey } from "../base-types";
import { DoesExtend, IfAnd, IfExtends, IfOr, IfTrue, IfUndefined, IsTrue } from "../boolean-logic";
import { TakeProp } from "../dictionary/TakeProp";
import { AsDefined } from "../type-conversion";

type ErrorContext = Record<ObjectKey, unknown> | null;

type OK = typeof RESULT.Ok;
type ERR = typeof RESULT.Err;

/**
 * **ResolvedErr**`<TMsg,TKind>`
 * 
 * Represents a finalized `Err` structure for a `Result` type.
 * When a user uses the `Err` or `err()` utilities they are 
 * provided a bit of a shorthand by allowing any variant of
 * `BaseErr` but when running it through the `Err<E>` utility
 * it will be converted to this format.
 */
export type ResultErr<
  TMsg extends string = string, 
  TKind extends string = string,
  TContext extends ErrorContext = ErrorContext
> = {
    msg: TMsg;
    kind: TKind;
    context: TContext;
}

/**
 * **BaseErr**
 * 
 * The base error structure that should be used when using the `Result<T,E>`
 * type utility:
 * 
 * - it requires that a "message" be provided for the error; this can be
 * a plain string or a dictionary with the `msg` property.
 * - when using the object notation you may optionally specify a `kind`
 * property who's value will be preserved as literal (where possible)
 */
export type BaseErr<
  TMsg extends string = string,
  TKind extends string = string,
  TContext extends ErrorContext = ErrorContext
> = TMsg | ( { msg: TMsg; kind?: TKind; context?: TContext } );

/** 
 * **Ok**`<T>`
 * 
 * The **ok** state of a `Result<T,E>` structure.
 */
export type Ok<T = unknown> = { 
  state: typeof RESULT.Ok; 
  val: T;
};

/**
 * **ErrTuple**`[msg,kind,[context]]`
 * 
 * A tuple which can be used with `Err<T>` to describe
 * the structure of the error fully.
 */
export type ErrTuple = readonly [msg: string, kind: string] | 
  readonly [msg: string, kind: string, context: ErrorContext];

/** 
 * **Err**`<T>`
 * 
 * The **error** state of a `Result<T,E>` structure.
 * 
 * **Related:** `Ok`, `ErrMsg`, `ErrKind`, and `ErrContext`
 */
export type Err<
  T extends BaseErr | ErrTuple = BaseErr | ErrTuple,
> = {
  state: typeof RESULT.Err;
  err: AsResultErr<T>;
}

type GetContext<E extends BaseErr> = E extends string
  ? null
  : E extends { msg: string; kind?: string; context?: ErrorContext }
    ? "context" extends keyof E 
      ? E["context"] extends Record<ObjectKey, unknown>
        ? E["context"]
        : null
      : null
    : null;

/** 
 * **AsResultErr**`<E>`
 * 
 * Receives a valid error type -- defined by `BaseErr` -- and converts
 * this into `Err<E>` when working with the `Result<T,E>` type.
 */
export type AsResultErr<
  E extends BaseErr | ErrTuple
> = E extends string
    ? ResultErr<E, "undefined", null>
    : E extends { msg: string }
      ? "kind" extends keyof E
        ? E["kind"] extends string
          ? ResultErr<E["msg"], E["kind"], GetContext<E>>
          : E["kind"] extends undefined
            ? ResultErr<E["msg"], "undefined", GetContext<E>>
            : never
        : ResultErr<E["msg"], "undefined", GetContext<E>>
      : E extends ErrTuple
        ? E extends  [
          infer Msg extends string, 
          infer Kind extends string, 
          infer Context extends ErrorContext
        ]
          ? AsResultErr<{ msg: Msg; kind: Kind; context: Context }>
          : E extends [
              infer Msg extends string, 
              infer Kind extends string
            ] 
            ? AsResultErr<{ msg: Msg; kind: Kind; context: null}>
            : never
        : never;

export type AsBaseErr<
  E extends ResultErr
> = E extends ResultErr<infer Msg, infer Kind, infer Context>
? BaseErr<Msg,Kind,Context>
: never;

/**
 * **ErrMsg**`<E>`
 * 
 * Type utility which extracts the error message from
 * an `Err` type.
 */
export type ErrMsg<
  E,
> = E extends {err: {msg: string}}
? E["err"]["msg"]
: never;

/**
 * **ErrKind**`<E>`
 * 
 * Extracts the "kind" from an `Err`
 */
export type ErrKind<E> = IsErr<E> extends true
? E extends { err: ResultErr }
  ? "kind" extends keyof E["err"]
    ? E["err"]["kind"]
    : "undefined"
  : "undefined"
: "undefined";

/**
 * **Result**`<T,E>`
 * 
 * A construct derived from the **Rust** programming language which
 * represents both a potential "Ok" result as well as a possible "Err"
 * result.
 * 
 * **See Also:** `Ok`, `Err`, `IsOk`, `IsErr`, and runtime equivalents
 */
export type Result<
  T = undefined,
  E extends BaseErr | ErrTuple = BaseErr | ErrTuple
> = Ok<T> | Err<E>;

export type GetErr<
  R
> = R extends Result<undefined, infer E>
?  E extends BaseErr | ErrTuple 
  ? AsResultErr<E>
  : never
: never;

/**
 * **IsOk**`<TTest,[TVal]>`
 * 
 * Boolean utility which detects whether `TTest` is in the "Ok" state
 * for a `Result<T,E>`.
 */
export type IsOk<
  TTest,
  TVal = unknown
> = TTest extends { state: OK; val: TVal } ? true : false; 

/**
 * **IsErr**`<TTest, [TErr]>`
 * 
 * Boolean utility which detects whether `TTest` is in the "Err" state
 * for a `Result<T,E>`.
 */
export type IsErr<
  TTest,
  TErr extends undefined | BaseErr | ErrTuple = undefined
> = IfExtends<
  TakeProp<TTest, "state">, ERR,
  // in error state
  IfUndefined<
    TErr,
    true, 
    IfExtends<
      TakeProp<TTest, "err">, AsResultErr<Exclude<TErr, undefined>>, 
        true, 
        false
      >
    >,
    // not in strict error state
    IfExtends<
      TakeProp<TTest, "state">, ERR | OK,
      IfUndefined<
        TErr, 
        boolean, 
        IfTrue<
          DoesExtend<GetErr<TTest>,AsResultErr<AsDefined<TErr>>>,
          boolean,
          false
        >
      >,
      false
    >
>;
 
type AssertResultVariant<
  TTest,
  TOk,
  TErr extends BaseErr | ErrTuple | undefined
> = IfExtends<
  TTest, Ok<TOk> | IfUndefined<TErr, Err, Err<AsResultErr<AsDefined<TErr>>>>,
  true,
  // looks like an Ok<T> or Err<T>
  IfAnd<
    [
      IfExtends<
        TTest, Ok<TOk>,
        true,
        false
      >,
      IfUndefined<
        TErr,
        true,
        IfExtends<
          TakeProp<TTest, "err">, AsResultErr<AsDefined<TErr>>,
          true,
          false
        >
      >
    ]
  >
>;

/** 
 * **IsResult**`<TTest,[TOk],[TErr]>`
 * 
 * Boolean utility which tests whether `TTest` qualifies as a `Result<T,E>` type.
 * 
 * **Note:** you may include explicit `TOk` or `TErr` values if you want to narrow 
 * the check condition but they are not required.
 */
export type IsResult<
  TTest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TOk = unknown,
  TErr extends undefined | BaseErr | ErrTuple = undefined
> = IfOr<
  [ 
    IsTrue<IsOk<TTest, TOk>>,
    IsTrue<IfUndefined<
      TErr,
      IsErr<TTest>,
      IsErr<TTest, AsDefined<TErr>>
    >>,
    AssertResultVariant<TTest, TOk, TErr> 
  ]
>


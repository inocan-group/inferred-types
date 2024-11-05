import {
  AsString,
  TupleToUnion,
  Widen,
  KebabCase,
  RuntimeUnion,
  Narrowable,
  TypeGuard,
  StackTrace,
  TakeProp,
  DoesExtend,
  If,
  IsFunction,
  Something,
  IsEqual,
  And
} from "src/types/index";

import { RESULT } from "inferred-types/dist/constants/index";

type OK = typeof RESULT.Ok;
type ERR = typeof RESULT.Err;

/**`
 * **ResultErr**
 *
 * A `ResultErr` provides the structure of an
 */
export type ResultErr<
  K extends string = string,
  C extends Record<string, unknown> = Record<string, unknown>,
  S extends boolean = boolean
> = {
  /**
   * **kind**
   *
   * The _kind_ property in a `ResultErr` is used **categorize** an error
   * and can be highly useful when people are attempting to recover from the
   * error.
   */
  kind: KebabCase<K>;
  /**
   * **msg**
   *
   * The `msg` property allows developer to use _prose_ to describe the error.
   * It is useful for people debugging an error as it may provide some additional
   * summary insight into the error but it is typically not used programmatically
   * to recover from an error.
   */
  msg: string;
  /**
   * **context**
   *
   * The `context` property is a dictionary of key/value pairs that allows for
   * deeper context to be provided when an error is encountered.
   */
  context?: C;

  /**
   * **stack**
   *
   * Allows a user to express whether a stack trace should be generated for
   * a given error.
   */
  stack?: S;
}

/**
 * **ResultErrInputs**
 *
 * The types which can _represent_ an error within an `Err` block.
 */
export type ErrInput = string
  | ResultErr
  | ResultErr[]
  | RuntimeUnion<ResultErr[]>;

/**
 * **AsErr**`<T>`
 *
 * **Related:** `AsErrKind`, `ResultErr`
 */
export type AsErr<T extends ErrInput> = TupleToUnion<
T extends RuntimeUnion<ResultErr[]>
  ? T["type"]
  : T extends string
  ? [{ msg: T; kind: KebabCase<T>; context: NonNullable<unknown>; stack: false }]
  : T extends ResultErr
  ? [{
    kind: TakeProp<T, "kind", "undefined">;
    msg: TakeProp<T, "msg", "undefined">;
    context: TakeProp<T, "context", NonNullable<unknown>>;
    stack: TakeProp<T, "stack", false>;
  }]
  : T extends readonly Required<ResultErr>[]
  ? T
  : never
>;;

/**
 * **AsErrKind**
 *
 * Provides a useful way to build a `ResultErr` which will be used as a "template"
 * (aka., "msg" is always just a wide string value)
 *
 * **Related:** `AsErr`, `ResultErr`
 */
export type AsErrKind<
  T extends string | {  kind: string; context?: Record<string, unknown>; stack?: boolean },
> = T extends string
? {  kind: KebabCase<T>; msg: string; context: NonNullable<unknown>; stack: false }
: T extends { kind: string; context: Record<string, unknown>; stack?: boolean }
  ? {
    kind: KebabCase<AsString<T["kind"]>>;
    msg: string;
    context: "context" extends keyof T
      ? T["context"] extends Record<string, unknown>
        ? Widen<T["context"]>
        : NonNullable<unknown>
      : NonNullable<unknown>;
    stack: TakeProp<T, "stack", false>;
  }
  : never;


/**
 * **ResultTuple**
 *
 * A tuple containing the types of both possible OK and ERR conditions and
 * are stored in the `__kind` property of a `Result<T,E>`.
 */
export type ResultTuple<
  T = unknown,
  E extends ErrInput = ErrInput
> = {
  __kind: ["Result", ok: T, err: E];
};


export type RealizedErr<T extends ResultErr = ResultErr> = Exclude<T, "stack"> & {
  stack: T["stack"] extends true ? StackTrace : never;
};

/**
 * **Err**`<E>`
 *
 * A type utility which receives a _representation_ of an error when using
 * the `Result<T,E>` structure. It will expand this _representation_ to a fully
 * formed **state** and **err** property.
 */
export type Err<E extends ErrInput = ErrInput, T =unknown> = {
  state: ERR;
  err: AsErr<E>;
} & ResultTuple<T,E>

/**
 * **Ok**`<T>`
 *
 * The **ok** state of a `Result<T,E>` structure.
 */
export type Ok<T = unknown, E extends ErrInput = ErrInput> = {
  state: OK;
  val: T;
} & ResultTuple<T,E>;

/**
 * **Result**`<T,E>`
 *
 * A structure which contains the union of either an OK or ERR
 * state. This is meant to resemble the **Rust** type of the same
 * name as much as possible.
 */
export type Result<
  T = unknown,
  E extends ErrInput = ErrInput
> = Ok<T,E> | Err<E,T>

/**
 * **ErrFrom**`<T>`
 *
 * Extracts the `Err` type from a `Result<T,E>`.
 */
export type ErrFrom<
  TResult extends Result,
> = TResult["__kind"][2]

/**
 * **KindFrom**`<T>`
 *
 * Extracts the _kind_ property from the `Err` type of a `Result<T,E>`.
 */
export type KindFrom<
  TResult extends Result
> = AsErr<TResult["__kind"][2]>["kind"];

export type OkFrom<
  TResult extends Result

> = TResult["__kind"][1];

type _IsResult<
TTest extends Something,
TVal = unknown,
TErr extends ErrInput = ErrInput
> = TTest extends Result
? OkFrom<TTest> extends TVal
  ? KindFrom<TTest> extends AsErr<TErr>["kind"]
    ? true
    : false
  : false
: false

/**
 * **IsResult**`<TTest,[TOk],[TErr]>`
 *
 * Boolean utility which tests whether `TTest` qualifies as a `Result<T,E>` type.
 *
 * **Note:** you may include explicit `TOk` or `TErr` values if you want to narrow
 * the check condition but they are not required.
 */
export type IsResult<
  TTest extends Something,
  TVal = unknown,
  TErr extends ErrInput = ErrInput
> = TTest extends ResultTuple
? If<
    IsEqual<_IsResult<TTest,TVal,TErr>, boolean>,
      false,
      _IsResult<TTest,TVal,TErr>
    >
: false;


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
  TErr extends ErrInput = ErrInput
> = If<
      And<[
        DoesExtend<TTest, { state: ERR }>,
        TTest extends { err: {kind: string}}
        ? AsErr<TErr> extends  { kind: string}
          ? TTest["err"]["kind"] extends AsErr<TErr>["kind"]
            ? true
            : false
          : true
        : true
      ]>,
      true,
      false
>

export type ResultApi<
  T,
  E extends ErrInput = ErrInput
> = {
  kind: "Result API";
  /**
   * **Result<T,E>**
   *
   * the _type_ of the result created
   */
  result: Result<T,E>;
  /**
   * **ok**`<T>`(val: T) -> Ok`<T>`
   *
   * Allows a developer inside of a function with a `Result<T,E>`
   * return type to express the "OK" variant in a type safe manner.
   */
  ok: <V extends T>(v: V) =>  Ok<V,E>;
  /**
   * **err**`<E>`(err: E) => Err`<E>`
   *
   * Allows a developer inside of a function with a `Result<T,E>`
   * return type to express the "ERR" variant in a type safe manner.
   */
  err: <TErr extends E>(e: Err) => Err<TErr, T>;

  /**
   * **isOk**(val)
   *
   * A type guard which helps to _narrow_ a `Result` type into the `Ok` variant.
   */
  isOk: TypeGuard<Ok<T>, IsEqual<T, unknown> extends true ? Narrowable : T >;
  /**
   * **isErr**(val)
   *
   * A type guard which helps to _narrow_ a `Result` type into the `Err` variant.
   */
  isErr: TypeGuard<Err<AsErr<E>>,ErrInput>;

  /**
   * **okOrElse**(val, otherwise)
   *
   * Allows you to accept the `Ok` variant's value when it arrives but
   * handle the `Err` variant with another value.
   *
   * The handler for the `Err` condition can be a static value or a function
   * (which will receive the `Err` as it's input).
   */
  okOrElse: <V extends Result<T,E>, TElse>(v: V, otherwise: TElse) => V extends Ok<V>
    ? Ok<V>
    : If<IsFunction<TElse>>;
  /**
   * **okOrThrow**(val) -> Ok<T>["val"]
   *
   * A function which either returns the _value_ of the `Ok` variant or
   * throws a JS error.
   */
  okOrThrow: <V extends Result<T,E>>(v: V) => Ok<V>["val"];
}

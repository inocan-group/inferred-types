/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-use-before-define */
import { RESULT } from "src/constants/Functional"
import { 
  Ok, 
  AsErr, 
  BaseErr, 
  Result,  
  IsOk, 
  IfFunction, 
  AsFunction, 
  Narrowable, 
  IsErr, 
  ResultErr, 
  Err, 
  ErrorContext, 
} from "src/types/index"
import { isFunction } from "../type-guards";

/**
 * **ok**(val)
 * 
 * Places a value into the `Ok` state of a `Result` structure.
 * 
 * Note: if you need/want the value to be narrowly typed then use `okN()` instead.
 */
export function ok<T>(val: T): Ok<T> {
  return { state: RESULT.Ok, val }
}

/**
 * **ok**(val)
 * 
 * Places a value into the `Ok` state of a `Result` structure.
 * 
 * Note: this can only receive _narrowable_ types in order to provide the
 * narrowest type possible for `T` but if you don't need this then use the
 * `ok(val)` function instead.
 */
export function okN<T extends Narrowable>(val: T): Ok<T> {
  return { state: RESULT.Ok, val }
}

function to_result_error<
  TMsg extends string,
  TKind extends string,
  TContext extends ErrorContext
>(b: BaseErr<TMsg,TKind,TContext>): AsErr<BaseErr<TMsg,TKind,TContext>> {
  return {
    context: null,
    kind: "undefined",
    ...(typeof b === "string" 
      ? { msg: b } 
      : {
          ...(b as object)
      }
    )
  } as AsErr<BaseErr<TMsg,TKind,TContext>>
}

/**
 * **err**(val)
 * 
 * Places a value into the `Err` state of a `Result` error structure.
 */
export function err<
  TMsg extends string,
  TKind extends string = "undefined",
  TContext extends ErrorContext = null
>(msg: TMsg, kind?: TKind, context?: TContext): Err<[TMsg,TKind,TContext]> {
  return { 
    state: RESULT.Err, 
    err: to_result_error({msg, kind: kind || "undefined", context: context || null}) 
  } 
}

/**
 * **isOk**(result)
 * 
 * Type guard which tests whether the `Result<T,E>` is in the **Ok** state.
 */
export function isOk<
  T,
  E extends BaseErr
>(result: Result<T,E>): result is Ok<T> {
  return result.state === RESULT.Ok;
}


/**
 * **okOrThrow**(result)
 * 
 * Returns the Ok _value_ if it's in the Ok status; otherwise throws
 * an error.
 */
export function okOrThrow<
  R extends Result<T,E>,
  T = undefined,
  E extends BaseErr = BaseErr
>(result: R): IsOk<R> extends true ? T : never {
  if(result.state === RESULT.Err) {
    if (typeof result.err === "string") {
      throw new Error(result.err);
    } else {
      let e = new Error(result.err.msg);
      for (const key of Object.keys(result.err)) {
        if(key !== "msg") {
          e = {...e, [key]: result.err[key as keyof typeof result.err]}
        }
      }
      throw e;
    }
  }
  return result.val as IsOk<R> extends true ? T : never;
}

/**
 * **okOrElse**(result, els)
 * 
 * Returns the _value_ of the `Result<T,E>` if in the **Ok** state, otherwise
 * returns `els`.
 * 
 * - **Note:** if `els` is a function it will be called while passing the error
 * object to the function.
 */
export function okOrElse<
  R extends Result<T,E>,
  T,
  E extends BaseErr,
  Els
>(
  result: R, 
  els: Els
): IsOk<R> extends true ? T : IfFunction<Els, ReturnType<AsFunction<Els>>, Els> {
  return result.state === RESULT.Err
  ? isFunction(els)
    ? els(result.err)
    : els
  : result.val;
}

export function isErr<
  T,
  E extends BaseErr
>(result: Result<T,E>): result is Err<E> {
  return (
    typeof result === "object" &&
    (result as any).state === RESULT.Err && "err" in (result as object) && (
      typeof (result as any).err === "string" ||
      typeof (result as any).err === "object"
    )
    ? true 
    : false
  ) as IsErr<typeof result>;
}

/**
 * **assertErr**(result)
 * 
 * Asserts that a _result_ is of the `Err` type.
 */
export function assertErr<
  T
>(result: T): IsErr<T> {
  return (
    typeof result === "object" &&
    (result as any).state === RESULT.Err && "err" in (result as object) && (
      typeof (result as any).err === "string" ||
      typeof (result as any).err === "object"
    )
    ? true 
    : false
  ) as IsErr<typeof result>;
}

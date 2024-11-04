// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable no-use-before-define */
// import { RESULT } from "src/constants/Functional"
// import {
//   Ok,
//   Result,
//   AsFunction,
//   Narrowable,
//   Err,
//   ResultErr,
//   ObjectKey,
//   ResultTuple,
//   TupleToUnion,
//   ResultApi,
//   IfEqual,
//   IsOk,
//   IsErr,
//   ErrInput,
//   IsFunction,
//   If,
// } from "src/types/index"
// import { Never } from "inferred-types";
// import { isFunction, isObject, isString } from "../type-guards/index";
// import { toKebabCase } from "../literals/toKebabCase";
// import { asUnion } from "../type-conversion/asUnion";
// import { isRuntimeUnion } from "../type-guards/isRuntimeUnion";
// import { takeProp } from "../dictionary";
// import { kindError } from "../errors";
// import { toPascalCase } from "../literals";

// const errInputs: ErrInput = "undefined" as const;

// export const isResult = (val: unknown): val is Result => {
//   return typeof val === "object" &&
//     "__kind" in (val as object) &&
//     "state" in (val as object) &&
//     [RESULT.Err, RESULT.Ok].includes((val as any).state)
// }


// function resultTuple<
//   T,
//   E extends ErrInput
// >(val: T, err: E) {
//   return {
//     __kind: ["Result", val, err]
//   } as ResultTuple<T,E>;
// }

// export const asResult = <
//   T,
//   E extends ErrInput
// >(val: T, err: E): ResultApi<T,E> => ({
//   kind: "Result API",
//   result: null as unknown as Result<T,E>,
//   ok: (v) => {
//     return {
//       ...resultTuple(val,err), state: RESULT.Ok, val: v
//     } as Ok<T>
//   },
//   err: (e) => {
//     return {
//       ...resultTuple(val,err),
//       state: RESULT.Err,
//       err: transformErrInput(e)
//     } as unknown as Err<E>
//   },
//   isErr: (v) => {
//     return isResult(v) && v.state === RESULT.Err;
//   },
//   isOk: (v) => {
//     return isResult(v) && v.state === RESULT.Ok;
//   },
//   okOrElse: (result, otherwise) => {
//     return result.state === RESULT.Ok
//       ? result.val
//       : typeof otherwise === "function"
//         ? otherwise(result)
//         : otherwise
//   },
//   okOrThrow: (result) => {
//     if (isErr(result)) {
//       const { msg, kind, context } = result.err;
//       throw kindError(kind)(msg, context);
//     }
//   }
// }) as ResultApi<T,E>;



// /**
//  * **ok**(val)
//  *
//  * Places a value into the `Ok` state of a `Result` structure.
//  *
//  * Note: if you need/want the value to be narrowly typed then use `okN()` instead.
//  */
// export function ok<
//   T,
//   E extends ErrInput
// >(val: T, _err: E = errInputs as E): IfEqual<E, ErrInput, Ok<T>, Ok<T,E>> {
//   const tuple = resultTuple(val, _err) as unknown as ResultTuple<T,E>;
//   return { ...tuple, state: RESULT.Ok, val }
// }


// /**
//  * **ok**(val)
//  *
//  * Places a value into the `Ok` state of a `Result` structure.
//  *
//  * Note: this can only receive _narrowable_ types in order to provide the
//  * narrowest type possible for `T` but if you don't need this then use the
//  * `ok(val)` function instead.
//  */
// export function okN<
//   T extends Narrowable,
//   E extends ErrInput
// >(val: T, _err: E = errInputs as E): Ok<T> {
//   const tuple = resultTuple(val, "unknown") as unknown as ResultTuple<T,E>;
//   return { ...tuple, state: RESULT.Ok, val }
// }

// /**
//  * Used to convert an `ErrInput` into `ResultErr[]`
//  */
// const transformErrInput = <
//   T extends ErrInput
// >(input: T): TupleToUnion<Err<T>> => {
//   const members = (
//     isRuntimeUnion(input)
//     ? input.members
//     : typeof input === "string"
//     ? [{ msg: input, kind: toKebabCase(input as string), context: {} }]
//     : typeof input === "object"
//     ? [{
//       msg: takeProp((input as Record<ObjectKey, unknown>), "msg", "" as string),
//       kind: toKebabCase(takeProp((input as Record<ObjectKey, unknown>), "kind", "unspecified-kind") as string),
//       context: takeProp((input as Record<ObjectKey, unknown>), "context", {} as NonNullable<unknown>),
//       trace: takeProp((input as Record<ObjectKey, unknown>), "trace", false),
//     }]
//     : Array.isArray(input)
//     ? input
//     : Never
//   ) as ResultErr[];

//   const union =  asUnion(...members);

//   return union as unknown as TupleToUnion<Err<T>>;
// }

// /**
//  * **createErr**(e) → `<ResultErr>`
//  *
//  * Creates a reusable error template which will allow for:
//  *
//  * - a strict `kind` definition
//  * - a _shape_ and default values for the `context` property
//  * - a strict `stack` definition (default is false)
//  *
//  * The `msg` property will be left as `string` allowing each variant of
//  * this type of error to add their own.
//  */
// export const createErr = <
//   TKind extends string,
//   TContextDefn extends Record<string, unknown> = NonNullable<unknown>
// >(kind: TKind, contextDefn?: TContextDefn) => {
//   return {
//     msg: "" as string,
//     kind,
//     context: (contextDefn || {}) as TContextDefn
//   } as ResultErr<TKind, TContextDefn>
// }

// /**
//  * **err**(input) -> Err`<E>`
//  *
//  * Creates a `Err` error for use inside a `Result<T,E>` block.
//  */
// export function err<
//   TErr extends string | ResultErr<any, any>,
//   TVal = unknown
// >(
//   err: TErr,
//   _val: TVal = null as unknown as ErrInput as TVal
// ): IfEqual<TVal, unknown, Err<TErr>, Err<TErr,TVal>> {
//   return {
//     ...(resultTuple(_val, err)),
//     state: RESULT.Err,
//     err: transformErrInput(err)
//   } as unknown as IfEqual<TVal, unknown, Err<TErr>, Err<TErr,TVal>>
// }


// /**
//  * **isOk**(result)
//  *
//  * Type guard which tests whether the `Result<T,E>` is in the **Ok** state.
//  */
// export const isOk = <
//   T,
// >(result: Result<T>): result is T & Ok<T> => {
//   return result.state === RESULT.Ok;
// }


// /**
//  * **okOrThrow**(result)
//  *
//  * Returns the Ok _value_ if it's in the Ok status; otherwise throws
//  * an error.
//  */
// export function okOrThrow<
//   R extends Result<T,E>,
//   T = undefined,
//   E extends ErrInput = ErrInput
// >(result: R): IsOk<R> extends true ? T : never {
//   if(result.state === RESULT.Err) {
//     if (typeof result.err === "string") {
//       throw new Error(result.err);
//     } else {
//       let e = new Error(result.err.msg);
//       for (const key of Object.keys(result.err)) {
//         if(key !== "msg") {
//           e = {...e, [key]: result.err[key as keyof typeof result.err]}
//         }
//       }
//       throw e;
//     }
//   }
//   return result.val as IsOk<R> extends true ? T : never;
// }

// /**
//  * **okOrElse**(result, els)
//  *
//  * Returns the _value_ of the `Result<T,E>` if in the **Ok** state, otherwise
//  * returns `els`.
//  *
//  * - **Note:** if `els` is a function it will be called while passing the error
//  * object to the function.
//  */
// export function okOrElse<
//   R extends Result<T,E>,
//   T,
//   E extends ResultErr,
//   Els
// >(
//   result: R,
//   els: Els
// ): IsOk<R> extends true ? T : If<IsFunction<Els>, ReturnType<AsFunction<Els>>, Els> {
//   return result.state === RESULT.Err
//   ? isFunction(els)
//     ? els(result.err)
//     : els
//   : result.val;
// }

// export function isErr<
//   T,
//   E extends ErrInput
// >(result: Result<T,E>): result is Err<E,T> {
//   return (
//       isString(result)
//       ? {
//           state: RESULT.Err,
//           err:{
//             msg: result,
//             kind: toPascalCase(result),
//             context: {},
//             stack: false
//           }
//         }
//       : isObject(result)
//         ? {
//           state: RESULT.Err,
//           err: {
//             msg: result.err.msg || "no message",
//             kind: takeProp(result, "kind", "no-kind"),
//             context: takeProp(result, "context", {}),
//             stack: takeProp(result, "stack", false)
//           }
//         }
//         : false
//     )
//     ? true
//     : false
// }

// /**
//  * **assertErr**(result)
//  *
//  * Asserts that a _result_ is of the `Err` type.
//  */
// export function assertErr<
//   T
// >(result: T): IsErr<T> {
//   return (
//     typeof result === "object" &&
//     (result as any).state === RESULT.Err && "err" in (result as object) && (
//       typeof (result as any).err === "string" ||
//       typeof (result as any).err === "object"
//     )
//     ? true
//     : false
//   ) as IsErr<typeof result>;
// }

export const result = "NOT READY"

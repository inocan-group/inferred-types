
import {
  As,
  Join,
  Tuple
 } from "inferred-types/types";


type AsJsonArray<T extends Tuple> = Join<
  [
    "[ ",
    ...T,
    " ]"
  ]
>;

// type ToJsonScalar<T> = T extends string
// ? `"${T}"`
// : T extends number
// ? `${T}`
// : T extends boolean
// ? `${T}`
// : T extends undefined
// ? "undefined"
// : T extends null
// ? "null"
// : never;

// type KeyAndValue<
//   TKey,
//   TValue
// > = [
//   ", ",
//   ToJsonScalar<TKey>,
//   ": ",
//   ToJsonScalar<TValue>,
// ];

// type Joined<
//   TContent extends readonly string[]
// > = Join<TContent>;

// type JsonKeyValues<
//   TObj extends Dictionary,
//   TKeys extends readonly (ObjectKey & keyof TObj)[],
//   TResult extends string = ""
// > = [] extends TKeys
// ? TResult
// : JsonKeyValues<
//     TObj,
//     AfterFirst<TKeys>,
//     Joined<[
//       TResult, ...KeyAndValue<First<TKeys>, TObj[First<TKeys>]>
//     ]>
//   >;

// type ToJsonObj<T extends Dictionary> = JsonKeyValues<T, Keys<T>>;


export type ToJsonValue<T> = T extends string
? `"${T}"`
: T extends number
? `${T}`
: T extends boolean
? `${T}`
: T extends undefined
? "undefined"
: T extends null
? "null"
: T extends Tuple
? AsJsonArray<
    As<{[K in keyof T]: ToJsonValue<T[K]>}, Tuple>
  >
: never;



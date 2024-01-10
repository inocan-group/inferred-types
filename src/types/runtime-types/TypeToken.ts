import { 
  Surround, 
  TupleToUnion , 
  Date,
  Time,
  DateTime,
  IfNull,
  RetainFromList
} from "src/types";
import { 
  TYPE_TOKEN_IDENTITIES, 
  TYPE_TOKEN_PARAM_STR, 
  TYPE_TOKEN_PARAM_CSV, 
  TYPE_TOKEN_PARAM_DATETIME,
  TYPE_TOKEN_PARAM_DATE,
  TYPE_TOKEN_PARAM_TIME,
  TYPE_TOKEN_ALL,
} from "src/constants";

/**
 * **TypeTokenName**
 * 
 * A union of all `TypeToken` types
 */
export type TypeTokenName = TupleToUnion<typeof TYPE_TOKEN_ALL>;

/**
 * **GenericTypeToken**
 * 
 * All `TypeToken`'s are represented _generically_ as a string surrounded by
 * "<<" and ">>" characters.
 */
export type GenericTypeToken = `<<${string}>>`;

type TT = Readonly<[
  ...Surround<typeof TYPE_TOKEN_IDENTITIES, "<<", ">>">,
  ...Surround<typeof TYPE_TOKEN_PARAM_STR, "<<", `:${string}>>`>,
  ...Surround<typeof TYPE_TOKEN_PARAM_CSV, "<<", `:${string}>>`>,
  ...Surround<typeof TYPE_TOKEN_PARAM_DATETIME, "<<", `:${DateTime}>>`>,
  ...Surround<typeof TYPE_TOKEN_PARAM_DATE, "<<", `:${Date}>>`>,
  ...Surround<typeof TYPE_TOKEN_PARAM_TIME, "<<", `:${Time}>>`>,
]>;

/**
 * **TypeTokens**`<[TFind]>`
 * 
 * A union of "type tokens" where a token is a string representation
 * of a type. These string representations fit into the following
 * categories.
 * 
 * - all type tokens follow the generic pattern imposed by `GenericTypeToken`.
 * - if a string literal is provided to `TFind` then only the type of a particular
 * type literal will be returned.
 */
export type TypeToken<
  TFind extends string | null = null
> = IfNull<
  TFind,
  TupleToUnion<TT>, 
  TupleToUnion<RetainFromList<TT, "extends", `<<${TFind}${">>" | `:${string}>>`}`>>
>;


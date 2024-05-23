import { 
  TupleToUnion , 
  Mutable,
  Split,
  StripLeading,
  StripTrailing,
  As,
  AfterFirst,
  First,
  AsNumber,
  AnyFunction,
  Dictionary,
  IsNever,
  Throw
} from "src/types/index";
import { 
  TT_Atomics,
  TT_Containers,
  TT_Functions,
  TT_SEP,
  TT_START,
  TT_STOP,
  TT_Singletons,
  TT_Sets
} from "src/constants/index";


export type TypeTokenAtomics = TupleToUnion<Mutable<typeof TT_Atomics>>;
export type TypeTokenContainers = TupleToUnion<Mutable<typeof TT_Containers>>;
export type TypeTokenFunctions = TupleToUnion<Mutable<typeof TT_Functions>>;
export type TypeTokenSingletons = TupleToUnion<Mutable<typeof TT_Singletons>>;
export type TypeTokenSets = TupleToUnion<Mutable<typeof TT_Sets>>;
export type TypeTokenKind = 
  | TypeTokenAtomics 
  | TypeTokenContainers 
  | TypeTokenFunctions
  | TypeTokenSets
  | TypeTokenSingletons;

export type TypeToken<
  T extends TypeTokenKind = TypeTokenKind
> =`${typeof TT_START}${T}${"" | `::${string}`}${typeof TT_STOP}`;

type Parse<T extends TypeToken> = As<
Split<
  As<StripTrailing<StripLeading<T, typeof TT_START>,typeof TT_STOP>, string>,
  typeof TT_SEP
>, readonly [string, ...string[]]>;

type Kind<T extends TypeToken> = Parse<T>[0] extends TypeTokenKind
  ? Parse<T>[0]
  : never;

type Data<T extends TypeToken> = AfterFirst<Parse<T>>;

type Categories = "atomics" | "containers" | "functions" | "singletons";

type Category<T extends TypeToken> = Kind<T> extends TypeTokenAtomics
  ? "atomics"
  : Kind<T> extends TypeTokenContainers
  ? "containers"
  : Kind<T> extends TypeTokenFunctions
  ? "functions"
  : Kind<T> extends TypeTokenSingletons
  ? "singletons"
  : never;

type GetAtomic<T extends TypeTokenKind> = T extends "undefined"
? undefined
: T extends "null"
? null
: T extends [boolean, "true"]
? true
: T extends [boolean, "false"]
? false
: never;

type GetSingleton<T extends TypeTokenKind, D extends readonly string[]> = 
  T extends "string"
    ? D["length"] extends 0
      ? string
      : First<D> extends string 
        ? [string, First<D>]
        : never
  : T extends "number"
    ? D["length"] extends 0
      ? number
      : First<D> extends `${number}` 
        ? [number, AsNumber<First<D>>]
        : never
  : never;

type GetFunction<T extends TypeTokenKind, _D extends readonly string[]> = 
  T extends "fn"
  ? AnyFunction
  : T extends "gen"
  ? Generator
  : never;

type GetContainer<
  T extends TypeTokenKind, 
  _D extends readonly string[]
> = T extends "obj"
? Dictionary
: T extends "arr"
? unknown[]
: T extends "set"
? Set<unknown>
: T extends "map"
? Map<unknown,unknown>
: T extends "weak"
? WeakMap<object, unknown>
: never;

type Type<
  TCat extends Categories,
  TKind extends TypeTokenKind,
  TData extends readonly string[]
> = TCat extends "atomics" ? GetAtomic<TKind>
: TCat extends "singletons" ? GetSingleton<TKind, TData>
: TCat extends "functions" ? GetFunction<TKind, TData>
: TCat extends "containers" ? GetContainer<TKind, TData>
: never;



type TypeHelper<
  T
> = IsNever<T> extends true
? {baseType: never}
: T extends readonly [infer First, infer Second]
  ? { baseType: First; literalType: Second }
  : { baseType: T }


/**
 * **ParseToken**`<T>`
 * 
 * Attempts to parses the passed in string in `T` as a
 * `TypeToken` and if successful returns meta characteristics:
 * 
 * - `token` - the raw token in `T`
 * - `kind` - the specific _kind_ of token; which uniquely identifies the token
 * - `category` - the category of token (e.g., atomic, singleton, etc.)
 * - `baseType` - the broad / base type of the token
 * - _`literal`_ - where appropriate, the _literal_ type of the token
 * 
 * **Notes:**
 * - deeper type analysis must be done at runtime.
 * - if `T` is not a valid token then an `ErrorCondition<"invalid-token">`
 * will be raised.
 */
export type ParseToken<T extends string> = T extends TypeToken
? {
    /** the raw token text */
    token: T;
    /** the _kind_ or _token name_ for this type */
    kind: Kind<T>;
    /** the category of type this is (atomics, singleton, etc.) */
    category: Category<T>;
    /** data/config parameters available for this token */
    data: Data<T>;
  } & TypeHelper<Type<Category<T>, Kind<T>, Data<T>>>
: Throw<
    "invalid-token",
    `Call to ParseToken<T> with an invalid token: ${T}`,
    "ParseToken",
    {library: "inferred-types"}
  >

/**
 * **TokenKind**`<T>`
 * 
 * Reveals the _kind_ of a given `TypeToken`
 */
export type TokenKind<T extends TypeToken> = Kind<T>;

/**
 * **TokenBaseType**`<T>`
 * 
 * Reveals the _base_ type of a given `TypeToken`
 */
export type TokenBaseType<T extends TypeToken> = ParseToken<T>["baseType"];


export type TokenLiteralType<T extends TypeToken> = "literal" extends keyof ParseToken<T>
? ParseToken<T>["literal"]
: never;


export type IsTypeToken<T> = T extends string
  ? T extends TypeToken 
    ? true
    : false
  : false;



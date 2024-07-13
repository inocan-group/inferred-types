import {
  Split,
  AfterFirst,
  First,
  AsNumber,
  AnyFunction,
  Dictionary,
  IsNever,
  Throw,
  Contains,
  If,
} from "src/types/index";
import {
  TT_Atomics,
  TT_Containers,
  TT_Functions,
  TT_SEP,
  TT_START,
  TT_STOP,
  TT_Singletons,
  TT_Sets,
  SIMPLE_TOKENS,
  SIMPLE_SCALAR_TOKENS,
  SIMPLE_CONTAINER_TOKENS,
  SIMPLE_UNION_TOKENS
} from "src/constants/index";


/**
 * **SimpleToken**
 *
 * An enumeration of string values which point to _types_ in the
 * the type system.
 *
 * **Related:**
 * - `SimpleScalarToken`, `SimpleContainerToken`, `SimpleUnionToken`,
 * - `TypeToken`
 */
export type SimpleToken = typeof SIMPLE_TOKENS[number];

/**
 * **SimpleScalarToken**
 *
 * A subset of the `SimpleToken` which may be more useful for building
 * simple string literal values.
 */
export type SimpleScalarToken = typeof SIMPLE_SCALAR_TOKENS[number];

/**
 * **SimpleUnionToken**
 *
 * A subset of `SimpleToken` which represents union types.
 */
export type SimpleUnionToken = typeof SIMPLE_UNION_TOKENS[number];

/**
 * **BaseTypeToken**
 *
 * A very simple structure for `TypeTokens` to fit into.
 *
 * Use this type if you need to preserve type simplicity, otherwise
 * prefer `TypeToken` (or subsets like `AtomicToken`, `SingletonToken`, etc.)
 */
export type BaseTypeToken = `${TypeTokenStart}${string}${TypeTokenStop}`

/**
 * **SimpleContainerToken**
 *
 * A subset of `SimpleToken` which provides shortcut's for expressing
 * _container_ types via a simple token.
 */
export type SimpleContainerToken = typeof SIMPLE_CONTAINER_TOKENS[number];


/**
 * TypeTokenAtomics
 *
 * The token names which are considered "atomic"
 */
export type TypeTokenAtomics = typeof TT_Atomics[number];

/**
 * **AtomicToken**
 *
 * A fully formed `TypeToken` of the "atomic" type.
 */
export type AtomicToken<
  T extends TypeTokenAtomics = TypeTokenAtomics
> = T extends TypeTokenAtomics
? `<<${T}>>`
: never;

// type KvToken = `{ "key": "${string}", "value": ${SimpleToken} }`

export type TypeTokenContainers = typeof TT_Containers[number];
// TODO
export type UnionToken<_TEls extends readonly unknown[] = unknown[]> = `<<union::[ ${string} ]>>`

/**
 * **UnionSetToken**
 *
 * - static `<<union-set::`, then
 * - set _name_ `${string}`, then
 * - static `::[ `, then
 * - set _parameters_ `${string}`, then
 * - static ` ]>>`
 */
export type UnionSetToken = `<<union-set::${string}::[ ${string} ]>>`

export type ObjectToken = `<<obj::{ ${string} }>>`;
export type TupleToken = `<<tuple::[ ${string} ]>>`;
export type ArrayToken = `<<arr::${BaseTypeToken}>>`;
export type RecordToken = `<<rec::${BaseTypeToken}::${BaseTypeToken}>>`

export type SetToken = `<<set::${BaseTypeToken}>>`
export type MapToken = `<<map::${BaseTypeToken}::${BaseTypeToken}>>`
export type WeakMapToken = `<<weak::${BaseTypeToken}::${BaseTypeToken}>>`

export type FnToken = `<<fn::${string}::${BaseTypeToken}>>`
export type GeneratorToken = `<<gen::${string}::${BaseTypeToken}>>`

/**
 * **ContainerToken**
 *
 * A `TypeToken` which represents a _container_ type.
 */
export type ContainerToken = ObjectToken | TupleToken | ArrayToken | RecordToken | SetToken | MapToken | WeakMapToken | UnionToken | UnionSetToken;

export type TypeTokenFunctions = typeof TT_Functions[number];
export type TypeTokenSingletons = typeof TT_Singletons[number];

/**
 * **SingletonToken**
 *
 * Shapes:
 * - Wide: `<<string>>` or `<<number>>`
 * - Literal: `<<string::{string}>` or `<number::{number}>`
 * - Union Literal: `<<string::{UnionToken}>>`
 * - Sets: `<<string-set::[set]::[...params]>`
 */
export type SingletonToken =
| `<<${TypeTokenSingletons}>>`
| `<<${TypeTokenSingletons}::${string}>>`
| `<<${TypeTokenSingletons}::${UnionToken}>>`
| `<<string-set::${string}::[${string}]>>`
| `<<number-set::${string}::[${string}]>>`
``


export type TypeTokenSets = typeof TT_Sets[number];

/**
 * **TypeTokenKind**
 *
 * The full set of _type token_ kinds (aka, the first and
 * identifying part of the string token after the initial
 * token identifier)
 */
export type TypeTokenKind =
  | TypeTokenAtomics
  | TypeTokenContainers
  | TypeTokenFunctions
  | TypeTokenSets
  | TypeTokenSingletons;


/**
 * string which indicates the start of a `TypeToken`
 */
export type TypeTokenStart = typeof TT_START;
/**
 * string which indicates the end of a `TypeToken`
 */
export type TypeTokenStop = typeof TT_STOP;

export type TypeTokenSeparator = typeof TT_SEP;

/**
 * **TypeToken**
 *
 *
 */
export type TypeToken<
  T extends TypeTokenKind = TypeTokenKind
> =`${TypeTokenStart}${T}${"" | `::${string}`}${TypeTokenStop}`;

type Parse<T extends TypeToken> = T extends `${TypeTokenStart}${infer Data}${TypeTokenStop}`
? If<
    Contains<Data, TypeTokenSeparator>,
    Split<Data, TypeTokenSeparator>,
    [ Data ]
  >
: never;

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



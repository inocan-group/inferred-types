import type {

    TT_ATOMICS,
    TT_CONTAINERS,
    TT_DELIMITER,
    TT_FUNCTIONS,
    TT_SETS,
    TT_SINGLETONS,
    TT_START,
    TT_STOP,
} from "inferred-types/constants";
import type {
    IsEqual,
    IsUnion,
    TypeTokenLookup
} from "inferred-types/types";

/**
 * **BaseTypeToken**
 *
 * A very simple structure for `TypeTokens` to fit into.
 *
 * Use this type if you need to preserve type simplicity, otherwise
 * prefer `TypeToken` (or subsets like `AtomicToken`, `SingletonToken`, etc.)
 */
export type BaseTypeToken = `${TypeTokenStart}${string}${TypeTokenStop}`;

/**
 * TypeTokenAtomics
 *
 * The token names which are considered "atomic"
 */
export type TypeTokenAtomics = typeof TT_ATOMICS[number];
export type TypeTokenContainers = typeof TT_CONTAINERS[number];
export type TypeTokenFunctions = typeof TT_FUNCTIONS[number];
export type TypeTokenSingletons = typeof TT_SINGLETONS[number];
export type TypeTokenSets = typeof TT_SETS[number];

/**
 * **TypeTokenKind**
 *
 * The full set of _type token_ kinds (aka, the first and
 * identifying part of the string token after the initial
 * token identifier)
 */
export type TypeTokenKind
    = | TypeTokenAtomics
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

/** the _delimiter_ token used in a `TypeToken` */
export type TypeTokenDelimiter = typeof TT_DELIMITER;

type Delim = TypeTokenDelimiter;

/**
 * **TypeToken**
 *
 * A **TypeToken** represents the general shape of all variants of the
 * TypeToken family. Variants are distinguished at the highest level
 * by their `TypeTokenKind`.
 *
 * You can use the generic `T` to isolate to one or more of these kinds
 * if you like but by default all are represented.
 */
export type TypeToken<
    T extends TypeTokenKind = TypeTokenKind,
> = IsEqual<T, TypeTokenKind> extends true
    ? `${TypeTokenStart}${T}${"" | `${Delim}${string}`}${TypeTokenStop}`
    : T extends TypeTokenKind
        ? IsUnion<T> extends true
            ? null
            : T extends TypeTokenSets
                ? `${TypeTokenStart}${T}${Delim}${TypeTokenLookup<T>}${TypeTokenStop}`
                : T extends TypeTokenAtomics
                    ? `${TypeTokenStart}${T}${TypeTokenStop}`
                    : `${TypeTokenStart}${T}${TypeTokenStop}`
                        | `${TypeTokenStart}${T}${Delim}${TypeTokenLookup<T>}${TypeTokenStop}`
        : never;

/**
 * the shape of `TypeToken` variants which represent one of the Singleton variants
 */
export type TT_Singleton = TypeToken<TypeTokenSingletons>;
/** the shape of `TypeToken` variants which represent one of the Atomic variants */
export type TT_Atomic = TypeToken<TypeTokenAtomics>;
/** the shape of `TypeToken` variants which a "set" of pattern based types */
export type TT_Set = TypeToken<TypeTokenSets>;
/** the shape of `TypeToken` variants which represent a function */
export type TT_Function = TypeToken<TypeTokenFunctions>;
/** the shape of `TypeToken` variants which represent a container */
export type TT_Container = TypeToken<TypeTokenContainers>;

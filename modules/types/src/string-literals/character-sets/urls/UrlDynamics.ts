import type {
    AfterFirst,
    AlphaChar,
    AlphaNumericChar,
    As,
    CsvToUnion,
    Dictionary,
    EmptyObject,
    ErrMsg,
    ExpandDictionary,
    First,
    FromSimpleToken,
    GetUrlPath,
    GetUrlQueryParams,
    IsVariable,
    Keys,
    MergeObjects,
    SimpleToken,
    Some,
    Split,
    StringKeys,
    Variable,
} from "inferred-types/types";

type SegmentType = (
  "string" | "number" | "boolean" | "Opt<string>" | "Opt<number>" | "Opt<boolean>"
) & SimpleToken;

/**
 * **DynamicSegment**
 *
 * Is a simple token which expresses a dynamic
 * type which might show up in a URL, query params, etc.
 *
 * - this placeholder token can be converted to an actual
 * _type_ with `FromDynamicSegment<T>`
 * - at runtime you can use `isDynamicSegment()` or
 * `hasDynamicSegment()`
 *
 * **Related:** `NamedDyamicSegment`
 */
export type DynamicSegment = `<${SegmentType}>`;

export type FromDynamicSegment<T extends string> = T extends `<string>`
    ? string
    : T extends `<number>`
        ? number
        : T extends `<boolean>`
            ? boolean
            : T extends `<Opt<string>>`
                ? string | undefined
                : T extends `<Opt<number>>`
                    ? number | undefined
                    : T extends `<Opt<boolean>>`
                        ? boolean | undefined
                        : T extends `<string(${infer Params})>`
                            ? CsvToUnion<Params>
                            : never;

export type NamedDynamicSegment = `<${SegmentType}::${string}>`
    | `<string(${string})::${string}>`;

export type FromNamedDynamicSegment<T extends string> = T extends `<string::${string}>`
    ? string
    : T extends `<${string} as number>`
        ? number
        : T extends `<${string} as boolean>`
            ? boolean
            : T extends `<${string} as Opt<string>>`
                ? string | undefined
                : T extends `${string} as Opt<number>>`
                    ? number | undefined
                    : T extends `<Opt<boolean>::${string}>`
                        ? boolean | undefined
                        : T extends `<string(${infer Params})::${string}>`
                            ? CsvToUnion<Params>
                            : T extends `<${AlphaChar}${string}${AlphaNumericChar}>`
                                ? string
                                : never;

type PathDynamics<
    T extends readonly string[],
    Kv extends Dictionary = EmptyObject,
> = [] extends T
    ? ExpandDictionary<Kv>
    : PathDynamics<
        AfterFirst<T>,
        First<T> extends `${string}<${infer Candidate}>${string}`
            ? Candidate extends `${infer Name extends Variable} as string(${infer Params})`
                ? Kv & Record<Name, CsvToUnion<Params>>
                : Candidate extends `${infer Name extends Variable} as ${infer Type extends SegmentType}`
                    ? Kv & Record<Name, FromSimpleToken<Type>>
                    : IsVariable<Candidate> extends true
                        ? Kv & Record<Candidate, string>
                        : never
            : Kv
    >;

/**
 * **GetUrlPathDynamics**`<T>`
 *
 * Extracts a key/value pairing of `NamedDynamicSegment`'s
 * found within the Url string.
 */
export type GetUrlPathDynamics<
    T extends string,
> = As<PathDynamics<
    Split<T, "<", "after">
>, Record<string, unknown>>;

type QueryParameterDynamics<
    T extends readonly string[],
    R extends Dictionary = EmptyObject,
> = [] extends T
    ? As<ExpandDictionary<R>, Record<string, unknown>>
    : QueryParameterDynamics<
        AfterFirst<T>,
        First<T> extends `${infer Var}=<string(${infer Params})>`
            ? R & Record<Var, CsvToUnion<Params>>
            : First<T> extends `${infer Var}=<${infer Type extends SegmentType}>`
                ? R & Record<Var, FromSimpleToken<Type>>
                : First<T> extends `${infer Var}=${infer Val}`
                    ? R & Record<Var, Val>
                    : R
    >;

export type GetQueryParameterDynamics<
    T extends string,
> = QueryParameterDynamics<
    GetUrlQueryParams<T> extends `?${infer REST}`
        ? Split<REST, "&">
        : Split<GetUrlQueryParams<T>, "&">
>;

type PathAndQueryDynamics<T extends string> = GetUrlPathDynamics<GetUrlPath<T>> extends Dictionary
    ? GetQueryParameterDynamics<GetUrlQueryParams<T>> extends Dictionary
        ? Some<
            StringKeys<GetUrlPathDynamics<GetUrlPath<T>>>,
            "extends",
            GetQueryParameterDynamics<GetUrlQueryParams<T>>
        > extends true
            ? ErrMsg<"overlapping-keys", { path: Keys<GetUrlPathDynamics<GetUrlPath<T>>>; qp: Keys<GetQueryParameterDynamics<GetUrlQueryParams<T>>> }>
            : MergeObjects<
                GetUrlPathDynamics<GetUrlPath<T>>,
                GetQueryParameterDynamics<GetUrlQueryParams<T>>
            >
        : never
    : never;

export interface GetUrlDynamics<T extends string> {
    /**
     * A key/value of dynamic path variables found
     */
    pathVars: GetUrlPathDynamics<GetUrlPath<T>>;
    /**
     * A key/value of dynamic (and fixed) query parameters found in the URL
     */
    qpVars: GetQueryParameterDynamics<GetUrlQueryParams<T>>;

    /** A key/value of both path and query parameter variables */
    allVars: PathAndQueryDynamics<T>;
}

import type {
    AfterFirst,
    AlphaChar,
    AlphanumericChar,
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
    Keys,
    MergeObjects,
    SimpleToken,
    Some,
    Split,
    StringKeys,
    StripAfter,
    StripLeading,
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
 * **Related:** `NamedDynamicSegment`
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
                            : T extends `<${AlphaChar}${string}${AlphanumericChar}>`
                                ? string
                                : never;

type ParseUrlPath<
    TParts extends readonly string[],
    TResult extends Record<string, string> = EmptyObject
> = TParts extends [infer Head extends string, ...infer Rest extends readonly string[]]
    ? Head extends `${infer Name}>${infer _Remaining}`
        ? Name extends `${infer VarName} as number`
            ? ParseUrlPath<Rest, TResult & Record<VarName, number>>
            : Name extends `${infer VarName} as string(${infer Enum})`
                ? ParseUrlPath<Rest, TResult & Record<VarName, CsvToUnion<Enum>>>
                : ParseUrlPath<Rest, TResult & Record<Name, string>>
        : ParseUrlPath<Rest, TResult>
    : ExpandDictionary<
        TResult
    >;

/**
 * **GetUrlPathDynamics**`<T>`
 *
 * A URL's path can include dynamic segments in the path. If the string `T` has a
 * `<name>` segment inside the path part of a URL then this will be consider a dynamic
 * segment and assume the "name" given. All dynamic segments in the URL are of the
 * the type `string`.
 *
 * **Related:** `GetQueryParameterDynamics`, `GetUrlDynamics`
 */
export type GetUrlPathDynamics<
    T extends string,
    TPath extends string = StripLeading<StripAfter<T, "?">, "http://" | "https://">
> = Split<TPath, "<", "omit"> extends infer Parts extends readonly string[]
    ? ParseUrlPath<Parts>
    : never;

;

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
            StringKeys<GetQueryParameterDynamics<GetUrlQueryParams<T>>>
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

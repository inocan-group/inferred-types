import type { As, DefineObject, EmptyObject, ExpandRecursively, FromDefineObject, FromInputToken__String, GetTemplateBlocks, InputToken, IsUnion, StringKeys, TemplateBlock, TemplateBlocks, UnionToTuple } from "inferred-types/types";

type Map = {
    "{{string}}": string;
    "{{number}}": number;
    "{{boolean}}": boolean;
};

/**
 * **TemplateParams**`<T>`
 *
 * Extracts a tuple of wide types which are needed to complete a given literal template.
 *
 * @deprecated use `GetTemplateParams<T>` instead
 */
export type TemplateParams<
    T extends string,
    B extends readonly TemplateBlock[] = TemplateBlocks<T>
> = {
    [K in keyof B]: B[K] extends keyof Map
        ? Map[B[K]]
        : never
};


type StripCurly<T extends string> = T extends `{{${infer Inner}}}`
? Inner
: T;

type AsMap<
    T extends readonly (string | DefineObject)[],
    M extends DefineObject = EmptyObject
> = T extends [ infer Head extends string | DefineObject, ...infer Rest extends readonly (string | DefineObject)[] ]
    ? Head extends string
        ? AsMap<Rest, M & Record<StripCurly<Head>, FromInputToken__String<StripCurly<Head>>>>
    : Head extends DefineObject
        ? AsMap<Rest, M & FromDefineObject<Head>>
    : never
: ExpandRecursively<M>

;

/**
 * converts all union members into a DefineObject where the _keys_
 * represent the dynamic segments and the _values_ are the type
 * this segment needs to extend.
 */
type SegmentMap<
    T extends string | DefineObject
> = IsUnion<T> extends true
    ? UnionToTuple<T> extends infer Config extends readonly (string | DefineObject)[]
        ? AsMap<Config>
        : never
: T extends string
    ? string extends T
        ? { string: string, number: number, boolean: boolean } // Wide strings converted to basic map
        : Record<T, `${T}`>
: T extends DefineObject
    ? FromDefineObject<T>
: never;

type AsDynamicSegment<T extends Record<string, unknown>> = As<
    StringKeys<T> extends infer Keys extends readonly string[]
    ? {
        [K in keyof Keys]: `{{${Keys[K]}}}`
    }[number]
    : never,
    string
>;

type Lookup<
    T extends string,
    M extends Record<string,unknown>
> = T extends keyof M
? M[T]
: unknown;

/**
 * **GetTemplateParams**`<T,[O]>`
 *
 * A more flexible variant of `TemplateParams<T>` which allows for providing your own
 * _dynamic segments_ as well as a type mapping layer so that your segments can be
 * mapped to a type.
 *
 * By default the usage is exactly the same as `TemplateParams<T>`:
 *
 * ```ts
 * // [string, number]
 * type T = GetTemplateParams<"Hi {{string}}, you're age is {{number}}">;
 * ```
 *
 * However, you can also do things like:
 *
 * ```ts
 * // [ string, `${string}@`${string}.${string}` ]
 * type T = GetTemplateParams<
 *     "Hi {{string}}, you're email is {{email}}",
 *     TemplateBlock | { email: `${string}@`${string}.${string}` }
 * >;
 * ```
 */
export type GetTemplateParams<
    TContent extends string,
    TDynSegments extends string | DefineObject = TemplateBlock,
    TMap extends Record<string, unknown> = SegmentMap<TDynSegments>,
    TFoundSegments extends readonly string[] = GetTemplateBlocks<TContent, AsDynamicSegment<TMap>>
> = {
    [K in keyof TFoundSegments]: Lookup< StripCurly<TFoundSegments[K]>, TMap>
}


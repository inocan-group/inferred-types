import type { As, DefineObject, EmptyObject, ExpandRecursively, FromDefineObject, FromInputToken__String, GetTemplateBlocks, InputToken, IsUnion, StringKeys, DefaultTemplateBlocks, TemplateBlocks, UnionToTuple } from "inferred-types/types";

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
    B extends readonly DefaultTemplateBlocks[] = TemplateBlocks<T>
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
 * Extracts the _types_ of the dynamic segments from left to right found in the template.
 *
 * ```ts
 * // [string, number]
 * type T = GetTemplateParams<"Hi {{string}}, you're age is {{number}}">;
 * ```
 *
 * However, you can also add your own dynamic segments by providing a dictionary who's _keys_
 * represent the segment name (you don't need to surround with curly braces) and the _values_
 * are the **type** you would like to map to (in the form of a string `InputToken`).
 *
 * ```ts
 * // [ string, `${string}@`${string}.${string}` ]
 * type T = GetTemplateParams<
 *     "Hi {{string}}, you're email is {{email}}",
 *     { string: "string", email: `${string}@`${string}.${string}` }
 * >;
 * ```
 *
 * **Note:**
 * - when creating your own segments, consider using one of the helper utils:
 *     - `TemplateMap<T>` - adds your definition from `T` to the standard set of segments
 *     - `TemplateMap__Generics<T>` - provided a tuple of `GenericParam`'s, this will use the generic's types
 *     as part of the template.
 *
 * **Related:** `TemplateBlocks`, `IntoTemplate`, `Interpolate`
 */
export type GetTemplateParams<
    TContent extends string,
    TDynSegments extends string | DefineObject = DefaultTemplateBlocks,
    TMap extends Record<string, unknown> = SegmentMap<TDynSegments>,
    TFoundSegments extends readonly string[] = GetTemplateBlocks<TContent, AsDynamicSegment<TMap>>
> = {
    [K in keyof TFoundSegments]: Lookup< StripCurly<TFoundSegments[K]>, TMap>
}


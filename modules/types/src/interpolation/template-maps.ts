import type { EmptyObject, GenericParam, InputTokenSuggestions, MergeObjects } from "inferred-types/types";

export interface TemplateMap__Basic {
    string: "string";
    number: "number";
    boolean: "boolean";
}

type AddGeneric<
    G extends Record<string, InputTokenSuggestions>,
    T extends GenericParam,
> = {
    [K in keyof G | T["name"]]: K extends T["name"]
        ? T["token"]
        : K extends keyof G
            ? G[K]
            : never;
};

/**
 * **TemplateMap__Generics**`<T>`
 *
 * Provides a static template based on the generic types provided. It also
 * always includes the basics for `string`, `number`, and `boolean`.
 */
export type TemplateMap__Generics<
    T extends readonly GenericParam[],
    G extends Record<string, InputTokenSuggestions> = TemplateMap__Basic
> = T extends [ infer Head extends GenericParam, ...infer Rest extends readonly GenericParam[]]
    ? TemplateMap__Generics<Rest, AddGeneric<G, Head>>
    : G;

/**
 * **TemplateMap**`<[T]>`
 *
 * By default it provides the basics of _string_, _number_, and _boolean_ but when
 * you set the generic `T` using a `DefineObject` this map will be combined with the
 * basics.
 */
export type TemplateMap<T extends Record<string, InputTokenSuggestions> = EmptyObject> = MergeObjects<TemplateMap__Basic, T>;

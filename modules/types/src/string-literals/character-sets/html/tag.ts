import type { HTML_ATOMIC_TAGS, HTML_BLOCK_TAGS } from "inferred-types/constants";
import type { IsWideString, KebabCase, PascalCase } from "inferred-types/types";

/**
 * a valid HTML "block tag" (aka, a tag which requires
 * an openning and closing tag pair to be valid HTML)
 */
export type Html__BlockTag = typeof HTML_BLOCK_TAGS[number];

/**
 * a valid HTML "atomic tag" (aka, a tag which does
 * NOT have a closing tag)
 */
export type Html__AtomicTag = typeof HTML_ATOMIC_TAGS[number];

/**
 * A union of valid _openning_ HTML Block Tags.
 *
 * - You can use the generic `T` to isolate down to a subset
 */
export type HtmlTagOpen<T extends Html__BlockTag = Html__BlockTag> = `<${T}${string}>`;

/**
 * A union of valid _closing_ HTML Block Tags.
 *
 * - You can use the generic `T` to isolate down to a subset
 */
export type HtmlTagClose<T extends Html__BlockTag = Html__BlockTag> = `</${T}>`;

/**
 * A union type of valid _atomic_ tags.
 *
 * - you can use the generic `T` to isolate down to a subset
 * of Atomic Tags
 */
export type HtmlTagAtomic<T extends Html__AtomicTag = Html__AtomicTag> = `<${T}${string}>`;

/**
 * Allows for any valid HTML tag: openning, closing and atomic.
 */
export type HtmlTag = HtmlTagOpen | HtmlTagClose | HtmlTagAtomic;

/**
 * boolean operator which validates that `T` is an HTML _closing_ tag
 */
export type IsHtmlClosingTag<T> = T extends `</${infer Tag}>`
    ? Tag extends Html__BlockTag
        ? true
        : false
    : false;

/**
 * boolean operator which validates that `T` is an Atomic tag
 */
export type IsAtomicTag<T> = T extends `<${infer Tag}>`
    ? Tag extends `${infer Name}${string}`
        ? Name extends Html__AtomicTag
            ? true
            : false
        : false
    : false;

type OpenOrAtomic<TScope extends Html__AtomicTag | Html__BlockTag>
    = | HtmlTagOpen<Exclude<TScope, Html__AtomicTag>>
        | HtmlTagAtomic<Extract<TScope, Html__AtomicTag>>;

type AsOpenOrAtomic<
    TInput,
    TScope extends Html__AtomicTag | Html__BlockTag
> = TInput extends OpenOrAtomic<TScope>
    ? TInput
    : TInput extends `<${string}`
        ? OpenOrAtomic<TScope>
        : never;

type IsComponentName<T extends string> = T extends PascalCase<T>
    ? true
    : T extends KebabCase<T>
        ? true
        : false;

/**
 * A narrowing utility which takes an input and ensures it's type
 * is within the _scope_ of the tags provided in `TScope`.
 */
export type AsHtmlTag<
    TInput,
    TScope extends Html__AtomicTag | Html__BlockTag,
> = TInput extends HtmlTagAtomic
    ? TInput
    : TInput extends HtmlTagOpen
        ? TInput
        : TInput extends HtmlTagClose
            ? TInput
            : TInput extends `</${string}>`
                ? HtmlTagClose<Exclude<TScope, Html__AtomicTag>>
                : TInput extends `<${string}`
                    ? AsOpenOrAtomic<TInput, TScope>
                    : IsWideString<TInput> extends true
                        ? HtmlTag
                        : never;

/**
 * **AsHtmlComponentTag**`<T>`
 *
 * A type utility that narrows the input type to valid HTML component tags
 * (`kebab-case` or `PascalCase`) and ensures valid attributes.
 */
export type AsHtmlComponentTag<T>
    = T extends `<${infer Name} ${infer _Attr}/>`
        ? IsComponentName<Name> extends true ? T : never
        : T extends `<${infer Name} ${infer _Attr}>`
            ? IsComponentName<Name> extends true ? T : never
            : T extends `<${infer Name}/>`
                ? IsComponentName<Name> extends true ? T : never
                : T extends `<${infer Name}>`
                    ? IsComponentName<Name> extends true ? T : never
                    : T extends string // Wide string matching
                        ? IsWideString<T> extends true
                            ? `<${string}>`
                            : never
                        : never;

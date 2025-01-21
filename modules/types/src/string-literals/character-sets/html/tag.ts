import type { HTML_ATOMIC_TAGS, HTML_BLOCK_TAGS } from "inferred-types/constants";
import type { KebabCase, PascalCase, StripSurround } from "inferred-types/types";
import type { IsWideString } from "src/boolean-logic";

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
  ? Tag extends HtmlTagOpen
    ? true
    : false
  : false;

/**
 * boolean operator which validates that `T` is an Atomic tag
 */
export type IsAtomicTag<T> = T extends `<${infer Tag}>`
  ? Tag extends HtmlTagAtomic
    ? true
    : false
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
          ? HtmlTagOpen<Exclude<TScope, Html__AtomicTag>> | HtmlTagAtomic extends TInput
            ? HtmlTagOpen<Exclude<TScope, Html__AtomicTag>> | HtmlTagAtomic
            : never
          : IsWideString<TInput> extends true
            ? HtmlTag
            : never;

/**
 * **AsHtmlComponentTag**`<T>`
 *
 * A type utility that narrows the input type to valid HTML component tags
 * (`kebab-case` or `PascalCase`) and ensures valid attributes.
 */
export type AsHtmlComponentTag<T> =
  T extends `<${infer Name} ${infer Attr}/>`
    ? T & (`<${PascalCase<Name>} ${Attr}/>` | `<${KebabCase<Name>} ${Attr}/>`)
    : T extends `<${infer Name} ${infer Attr}>`
      ? T & (`<${PascalCase<Name>} ${Attr}>` | `<${KebabCase<Name>} ${Attr}>`)
      : T extends `<${infer Name}/>`
        ? T & (`<${PascalCase<Name>}/>` | `<${KebabCase<Name>}/>`)
        : T extends `<${infer Name}>`
          ? T & (`<${PascalCase<Name>}` | `<${KebabCase<Name>}`)
          : T extends string // Wide string matching
            ? IsWideString<T> extends true
              ? T & `<${PascalCase<StripSurround<T, "<" | ">">>}${string}>`
              : never
            : never;

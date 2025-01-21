import type { HTML_ATOMIC_TAGS, HTML_BLOCK_TAGS } from "inferred-types/constants";

/**
 * a valid HTML "block tag" (aka, a tag which requires
 * an openning and closing tag pair to be valid HTML)
 */
export type HtmlBlockTag = typeof HTML_BLOCK_TAGS[number];


/**
 * a valid HTML "atomic tag" (aka, a tag which does
 * NOT have a closing tag)
 */
export type HtmlAtomicTag = typeof HTML_ATOMIC_TAGS[number];

/**
 * A union of valid _openning_ HTML Block Tags.
 *
 * - You can use the generic `T` to isolate down to a subset
 */
export type HtmlTagOpen<T extends HtmlBlockTag = HtmlBlockTag> = `<${T}${string}>`;

/**
 * A union of valid _closing_ HTML Block Tags.
 *
 * - You can use the generic `T` to isolate down to a subset
 */
export type HtmlTagClose<T extends HtmlBlockTag = HtmlBlockTag> = `</${T}>`;


/**
 * A union type of valid _atomic_ tags.
 *
 * - you can use the generic `T` to isolate down to a subset
 * of Atomic Tags
 */
export type HtmlTagAtomic<T extends HtmlAtomicTag = HtmlAtomicTag> = `<${T}${string}>`;

/**
 * Allows for any valid HTML tag: openning, closing and atomic.
 */
export type HtmlTag = HtmlTagOpen | HtmlTagClose | HtmlTagAtomic;

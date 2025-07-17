import type {
    AsHtmlComponentTag
} from "inferred-types/types";
import {
    toKebabCase,
    toPascalCase,
    validHtmlAttributes
} from "inferred-types/runtime";

/**
 * **isHtmlComponentTag**`(...names)`
 *
 * A type guard that validates if a value matches a valid HTML component tag.
 * Supports both `kebab-case` and `PascalCase` component names.
 *
 * Attributes are validated using `areAttributesValid()`.
 */
export function isHtmlComponentTag<T extends readonly string[]>(...names: T) {
    return <V>(val: V): val is V & AsHtmlComponentTag<T[number]> => {
        if (typeof val !== "string")
            return false;

        const trimmedVal = val.trim();

        // Match opening, closing, and self-closing tags
        const tagRegex = /^<\/?([\w-]+)(.*?)>$/;
        const match = tagRegex.exec(trimmedVal);

        if (!match) {
            return false; // Not a valid tag structure
        }

        const [, tagName, attributes] = match;
        const isClosingTag = trimmedVal.startsWith("</");

        const isKebabCase = /^[a-z][a-z0-9-]*$/.test(tagName);
        const isPascalCase = /^[A-Z][a-zA-Z0-9]*$/.test(tagName);

        const normalizedKebabCase = toKebabCase(tagName);
        const normalizedPascalCase = toPascalCase(tagName);

        const isValidName = names.some(
            name =>
                (isKebabCase && normalizedKebabCase === toKebabCase(name))
                || (isPascalCase && normalizedPascalCase === toPascalCase(name)),
        );

        if (!isValidName) {
            return false;
        }

        if (isClosingTag) {
            return attributes.trim() === "";
        }

        return validHtmlAttributes(attributes);
    };
}

import type { OptSpace } from "inferred-types/types";

type PropertyFormat =
    | "*"
    | "color"
    | "image"
    | "length"
    | "size"
    | "number"
    | "integer"
    | "string"
    | "angle"
    | "time"
    | "frequency"
    | "resolution";

/**
 * **CssProperty**
 *
 * Produces a valid string literal for the CSS `@property`
 * feature.
 *
 * ```css
 * \@property {
 *    syntax: "<number>";
 *    inherits: true;
 *    initial-value: 500px;
 * }
 * ```
 */
export type CssProperty = `@property --${string}${OptSpace}{${string}syntax: "${PropertyFormat}";${string}inherits: ${"true" | "false"};${string}initial-value: ${string};${string}}`;

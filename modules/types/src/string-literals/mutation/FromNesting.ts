import type { NestedString, ReplaceAll } from "inferred-types/types";

/**
 * Reconstructs a single child with its enter/exit characters
 */
type ReconstructChild<T extends NestedString>
    = T["enterChar"] extends string
        ? T["exitChar"] extends string
            ? `${T["enterChar"]}${ReconstructSegment<T>}${T["exitChar"]}`
            : `${T["enterChar"]}${ReconstructSegment<T>}`
        : ReconstructSegment<T>;

/**
 * Reconstructs a single NestedString segment
 */
type ReconstructSegment<T extends NestedString>
    = T["children"] extends readonly []
        ? ReplaceAll<T["content"], "{{child}}", "">
        : ReplaceChildMarkers<T["content"], T["children"]>;

/**
 * Replaces successive `{{child}}` markers in content with each reconstructed child
 */
type ReplaceChildMarkers<
    TContent extends string,
    TChildren extends readonly NestedString[]
> = TChildren extends readonly [infer Head extends NestedString, ...infer Rest extends readonly NestedString[]]
    ? TContent extends `${infer Before}{{child}}${infer After}`
        ? `${Before}${ReconstructChild<Head>}${ReplaceChildMarkers<After, Rest>}`
        // no placeholder found; append remaining reconstructed children (fallback)
        : `${TContent}${JoinChildren<TChildren>}`
    // no more children; strip any remaining placeholders
    : ReplaceAll<TContent, "{{child}}", "">;

/**
 * Joins multiple children by reconstructing each with enter/exit chars
 */
type JoinChildren<TChildren extends readonly NestedString[]>
    = TChildren extends readonly [infer Head extends NestedString, ...infer Rest extends readonly NestedString[]]
        ? `${ReconstructChild<Head>}${JoinChildren<Rest>}`
        : "";

/**
 * Joins multiple segments by reconstructing each and concatenating
 */
type JoinSegments<TSegments extends readonly NestedString[]>
    = TSegments extends readonly [infer Head extends NestedString, ...infer Rest extends readonly NestedString[]]
        ? `${ReconstructSegment<Head>}${JoinSegments<Rest>}`
        : "";

/**
 * **FromNesting**`<TNest>`
 *
 * Converts a nested string back to originating string.
 *
 * **Related:** `Nest`
 */
export type FromNesting<
    TNest extends NestedString | readonly NestedString[]
> = TNest extends readonly NestedString[]
    ? JoinSegments<TNest>
    : TNest extends NestedString
        ? ReconstructSegment<TNest>
        : never;

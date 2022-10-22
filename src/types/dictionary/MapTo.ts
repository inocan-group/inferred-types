/**
 * Maps from one type `I` to another `O`, where:
 *
 * - a **null** value indicates that there is no valid mapping for the given input
 * - you can either return a 1:1 or 1:M output as `O` or `O[]` when there is a mapping
 *
 * This type utility will ensure both `I` and `O` are honoured but if the runtime only
 * uses the type utility it's worth bearing in mind that while _typing_ will be as expected
 * the output parameter can assume properties that in fact do not reside
 *
 * ```ts
 * const mapper: ModelMapper<{title: string}, {title: string, kind: string}> = i => {
 *    title: i.title,
 *    kind: "markdown"
 * }
 * ```
 */
export type MapTo<I extends {}, O extends {}> = (i: I) => O[];

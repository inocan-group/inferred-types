import type { FromLiteralTemplate } from "types/interpolation";

/**
 * **FillStringHole**`<TTpl, U>`
 *
 * Fills in a template literal string with the contents of `U`.
 *
 * ```ts
 * // 1,2,3
 * const Filled = FillStringHole<`1,${string},3`, "2">;
 * ```
 */
export type FillStringHole<
    TTpl extends string,
    U extends string
> = FromLiteralTemplate<TTpl> extends `${infer Pre extends string}{{string}}${infer Post extends string}`
    ? `${Pre}${U}${Post}`
    : never;

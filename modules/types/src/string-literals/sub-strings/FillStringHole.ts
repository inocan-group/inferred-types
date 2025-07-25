import { ReplaceAll } from "inferred-types/types";
import type { FromLiteralTemplate } from "types/interpolation";

/**
 * **FillStringHole**`<TTpl, U>`
 *
 * Fills in a template literal string with the contents of `U`.
 *
 * - if there are more than one `${string}` holes the same value will be
 * placed into all of them
 * - if you prefer to have more control over which ones you're filling in
 * then you likely should be using the `IntoTemplate` utility
 *
 * ```ts
 * // 1,2,3
 * const Filled = FillStringHole<`1,${string},3`, "2">;
 * ```
 *
 * **Related:** `IntoTemplate`
 */
export type FillStringHole<
    TTpl extends string,
    U extends string
> = ReplaceAll<FromLiteralTemplate<TTpl>, "{{string}}", U>

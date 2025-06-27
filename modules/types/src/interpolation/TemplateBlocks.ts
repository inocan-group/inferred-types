import type {
    INTERPOLATION_BLOCKS
} from "inferred-types/constants";
import type { Mutable } from "inferred-types/types";

type Blocks = Mutable<typeof INTERPOLATION_BLOCKS>;

/**
 * **TemplateBlock**
 *
 * A static string which represents a _future_ dynamic segment
 * (of the specified type).
 */
export type TemplateBlock = Blocks[number];

/**
 * A `TemplateBlock` with the curly braces surrounding it stripped off.
 */
export type TemplateBlock__BARE = {
    [K in keyof Blocks]: Blocks[K] extends `{{${infer Bare extends string}}}`
        ? Bare
        : never
}[number];

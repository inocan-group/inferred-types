import type { TemplateBlock } from "inferred-types/types";

/**
 * **AsTemplateType**
 *
 * Converts a static template block tag into the _type_ which will go into
 * this dynamic segment.
 *
 * **Related:** `AsTemplateTypes`
 */
export type AsTemplateType<T extends TemplateBlock>
= [T] extends [`{{string}}`]
    ? string
    : [T] extends [`{{number}}`]
        ? number
        : [T] extends [`{{boolean}}`]
            ? boolean
            : never;

/**
 * **AsTemplateTypes**`<T>`
 *
 * Converts all elements in `T` from template block tags to the underlying
 * types that these tags represent.
 *
 * **Related:** `AsTemplateType`
 */
export type AsTemplateTypes<T extends readonly TemplateBlock[]> = {
    [K in keyof T]: T[K] extends TemplateBlock
        ? AsTemplateType<T[K]>
        : never
};

/**
 * **ErrType**`<T>`
 *
 * Return the `type` property of `T` if:
 *
 * - T is an Error
 * - T has the property `type`
 *
 * **Related:** `Err`, `ErrSubType`
 */
export type ErrType<T> = T extends Error
    ? "type" extends keyof T
        ? T["type"] extends infer Type
            ? Type
            : undefined
        : undefined
    : undefined;

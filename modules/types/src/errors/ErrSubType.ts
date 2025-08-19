/**
 * **ErrSubType**`<T>`
 *
 * Return the `subType` property of `T` if:
 *
 * - T is an Error
 * - T has the property `subType`
 *
 * **Related:** `Err`, `ErrType`
 */
export type ErrSubType<T> = T extends Error
    ? "subType" extends keyof T
        ? T["subType"] extends infer Type
            ? Type
            : undefined
        : undefined
    : undefined;

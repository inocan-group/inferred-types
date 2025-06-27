/**
 * **AsBoolean**`<T>`
 *
 * Converts any `BooleanLike` value to a boolean value
 * and return `never` otherwise.
 */
export type AsBoolean<T> = T extends boolean
    ? T
    : T extends "true"
        ? true
        : T extends "false"
            ? false
            : T extends "boolean"
                ? boolean
                : never;

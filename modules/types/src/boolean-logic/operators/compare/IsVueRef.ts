import type { And, Keys } from "inferred-types/types";

/**
 * **IsVueRef**`<T>`
 *
 * Boolean type utility that detects whether the type passed in
 * is a VueJS `Ref<...>` type or this library's `VueRef<...>`
 * (which serves as a lightweight proxy type for Vue's `Ref`).
 */
export type IsVueRef<T> = T extends object
    ? And<[
        Keys<T>["length"] extends 2 ? true : false,
        "value" extends keyof T ? true : false
    ]> extends true
        ? true
        : false

    : false;

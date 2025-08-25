/**
 * **Negative**`<T>`
 *
 * Ensures that the number represented by `T` is a _negative_ number.
 */
export type Negative<T extends number | `${number}`> = T extends `${number}`
    ? T extends `-${string}`
        ? T
        : `-${T}`
    : T extends number
        ? `${T}` extends `-${string}`
            ? T
            : `-${T}` extends `${infer Neg extends number}`
                ? Neg
                : never
        : never;

import type { IsEqual, TemplateParams } from "inferred-types/types";

/**
 * Process args array helper
 */
type NextArg<T extends readonly unknown[]> = T extends readonly [unknown, ...infer Rest] ? Rest : T;
type FirstArg<T extends readonly unknown[]> = T extends readonly [infer First, ...unknown[]] ? First : never;

/**
 * Process template character by character, replacing placeholders in order
 */
type ProcessTemplate<
    TContent extends string,
    TArgs extends readonly unknown[],
    TResult extends string = ""
> = TContent extends `${infer First}${infer Rest}`
    ? [IsEqual<First, `${string}`>] extends [true]
        ? TArgs extends readonly [unknown, ...unknown[]]
            ? ProcessTemplate<
                Rest,
                NextArg<TArgs>,
                `${TResult}${FirstArg<TArgs> & (string | number | boolean)}`
            >
            : ProcessTemplate<Rest, TArgs, `${TResult}${First}`>
        : [IsEqual<First, `${number}`>] extends [true]
            ? TArgs extends readonly [unknown, ...unknown[]]
                ? ProcessTemplate<
                    Rest,
                    NextArg<TArgs>,
                    `${TResult}${FirstArg<TArgs> & (string | number | boolean)}`
                >
                : ProcessTemplate<Rest, TArgs, `${TResult}${First}`>
            : [IsEqual<First, `${boolean}`>] extends [true]
                ? TArgs extends readonly [unknown, ...unknown[]]
                    ? ProcessTemplate<
                        Rest,
                        NextArg<TArgs>,
                        `${TResult}${FirstArg<TArgs> & (string | number | boolean)}`
                    >
                    : ProcessTemplate<Rest, TArgs, `${TResult}${First}`>
                : ProcessTemplate<Rest, TArgs, `${TResult}${First}`>
    : [TContent] extends [""]
        ? TResult
        : [IsEqual<TContent, `${string}`>] extends [true]
            ? TArgs extends readonly [unknown, ...unknown[]]
                ? `${TResult}${FirstArg<TArgs> & (string | number | boolean)}`
                : `${TResult}${TContent}`
            : [IsEqual<TContent, `${number}`>] extends [true]
                ? TArgs extends readonly [unknown, ...unknown[]]
                    ? `${TResult}${FirstArg<TArgs> & (string | number | boolean)}`
                    : `${TResult}${TContent}`
                : [IsEqual<TContent, `${boolean}`>] extends [true]
                    ? TArgs extends readonly [unknown, ...unknown[]]
                        ? `${TResult}${FirstArg<TArgs> & (string | number | boolean)}`
                        : `${TResult}${TContent}`
                    : `${TResult}${TContent}`;

/**
 * **IntoTemplate**`<TTpl, TArgs>`
 *
 * Takes a template literal type and a tuple of values, and returns the
 * interpolated string literal type.
 *
 * This implementation processes template literals in left-to-right order,
 * correctly matching template placeholders to arguments sequentially.
 *
 * ```ts
 * // "Hello World!"
 * type Result = IntoTemplate<`Hello ${string}!`, ["World"]>;
 * // "Age: 42"
 * type Age = IntoTemplate<`Age: ${number}`, [42]>;
 * // "Bob is 45 years old and his favorite color is blue."
 * type Complex = IntoTemplate<`${string} is ${number} years old and his favorite color is ${string}.`, ["Bob", 45, "blue"]>;
 * ```
 */
export type IntoTemplate<
    TTpl extends string,
    TArgs extends TemplateParams<TTpl>
> = TArgs extends readonly unknown[]
    ? ProcessTemplate<TTpl, TArgs>
    : never;

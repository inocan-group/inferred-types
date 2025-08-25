/**
 * **RemoveIndex**`<T>`
 *
 * Removes an index like below while retaining other key/value pairs.
 * ```ts
 * interface Foo {
 *    foo: string;
 *    [key: string]: any;
 * }
 * // { foo: string }
 * type T = RemoveIndex<Foo>;
 * ```
 *
 * @deprecated use `RemoveIndexKeys` instead
 *
 */
export type RemoveIndex<T extends Record<any, any>> = {
    [
    P in keyof T as string extends P
        ? never
        : number extends P
            ? never
            : symbol extends P
                ? never
                : P
    ]: T[P]
};

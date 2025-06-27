/**
 * **never**(val)
 *
 * You can pass a value into this utility and it's runtime type
 * will be unchanged but it's _type_ will be converted to `never`.
 *
 * **Related:** if you prefer to keep runtime and type system in sync
 * there is also the `Never` constant which can be used.
 */
export function never(val: unknown): never {
    return val as never;
}

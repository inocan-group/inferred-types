/**
 * **TypeToken**
 *
 * a `TypeToken` is meant to resemble an `InputToken` but has clear start and
 * end markers (aka., `<<` and `>>`) to more demarcate it. It also has:
 *
 * - can carry a bit more metadata about a type
 * - can also
 *
 * **Note:** the `TypeToken` is still a work in progress; use `InputToken` exclusively for now.
 */
export type TypeToken = `<<${string}>>`;

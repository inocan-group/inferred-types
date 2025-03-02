/**
 * A string literal which is divided by the `/` character to represent
 * a Type-and-Subtype relationship.
 */
export type TypeSubtype<
    T extends string = string,
    S extends string = string
> = `${string}/${string}`;

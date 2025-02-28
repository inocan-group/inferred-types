/**
 * A string literal which is divided by the `/` character to represent
 * a Type-and-Subtype relationship.
 */
export type TypeSubtype = `${string}/${string}` & {
    brand: "type-subtype";
};

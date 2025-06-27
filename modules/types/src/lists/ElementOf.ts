/**
 * **ElementOf**`<T>`
 *
 * Pulls the type of an array's element out of the array type itself.
 */
export type ElementOf<T> = T extends (infer U)[] ? U : never;

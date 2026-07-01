/**
 * **Email<T>**
 *
 * A simple email address representation
 *
 * **Related:** `IsEmail`, `isEmail()`
 */
export type Email<T extends string> = `${string}@${string}.${T}`;

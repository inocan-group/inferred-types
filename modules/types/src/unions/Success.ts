/**
 * **Sucess**`<T>`
 *
 * Removes an Error from `T` where an error is part of the union
 * type of `T`; otherwise has no impact on the type.
 */
export type Success<T> = Exclude<T, Error>;

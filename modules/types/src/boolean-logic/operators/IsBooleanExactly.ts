
/**
 * **IsBooleanExactly**`<T>`
 *
 * tests whether `T` is the wide type of `boolean` versus it's
 * literal cousins `true` or `false`.
 */
export type IsBooleanExactly<T> = [T] extends [boolean]
    ? ([boolean] extends [T] ? true : false)
    : false;


/**
 * **IsWideBoolean**`<T>`
 *
 * tests whether `T` is the wide type of `boolean` versus it's
 * literal cousins `true` or `false`.
 */
export type IsWideBoolean<T> = IsBooleanExactly<T>;

/**
 * **IsDefined**
 *
 * Boolean type utility returns `true` if `T` is defined; `false` if undefined
 */
export type IsDefined<T> = T extends undefined ? false : true;

/**
 * **NonNumericKeys**`<T>`
 *
 * The keys in an array/object `T` which are _not_ numeric keys.
 */
export type NonNumericKeys<T extends object> = {
    [K in keyof T]: K extends number ? never : Readonly<K>;
}[keyof T];

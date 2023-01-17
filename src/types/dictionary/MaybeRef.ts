/**
 * **MaybeRef**`<T>`
 * 
 * Used to represent a value that may be of type `T` or _might_ be
 * of type `Ref<T>` where the **Ref<T>** definition is from VueJS's
 * popular reference objects.
 * 
 * **Related:** `IsRef`, `IfRef`
 * ```ts
 * // number | { value: Readonly<T> }
 * type T = MaybeRef<number>;
 * ```
 */
export type MaybeRef<T> = T & { value: T };

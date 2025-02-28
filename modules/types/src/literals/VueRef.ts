/**
 * **VueRef**`<T>`
 *
 * Intended to be the same type as VueJS's `Ref<T>` but without the need
 * to include any of the VueJS framework in deps.
 *
 * **Notes:**
 *
 *  - a real `Ref<T>` has both the `value` property and a _private_ symbol
 * exposed to the runtime as a type (but the type is intentionally not exported).
 *  - whenever using this type, please use it with `IsRef()`,`isRef()` utils
 *
 * **Related:**
 *
 * - `IsRef<T>`, `isRef()`, `VueComputedRef<T>`
 */
export interface VueRef<T = any> {
    value: T;
}

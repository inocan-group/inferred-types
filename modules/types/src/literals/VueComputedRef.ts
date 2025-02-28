/**
 * **VueComputedRef**
 *
 * The goal of this type is to _appear_ to the runtime and type systems
 * to be a `ComputedRef` (aka, **Computed** property).
 *
 * None of the functionality is provided by this but it allows us to create
 * _types_ and _type guards_ which can respond to this structure without
 * needing to have `Vue` but a dependency on this package.
 */

export interface VueComputedRef<T = any> {
    value: T;
    effect: any;
}

/**
 * **IsComputedRef**`<T>`
 *
 * Boolean operator which determines whether `T` is seen to be a `ComputedRef`
 * property from **VueJS**.
 */
export type IsComputedRef<T> = T extends { value: unknown; effect: object }
    ? true
    : false;

/**
 * **AsVueComputedRef**
 *
 * Narrowing type that takes an _unknown_ `T` and tests to see if is
 * a **VueJS** `ComputedRef` property. If it is then the narrowed type
 * is returned, otherwise `never`.
 *
 * **Related:** `VueComputedRef`, `IsVueComputedRef`
 */
export type AsVueComputedRef<T> = T extends VueComputedRef
    ? T & VueComputedRef
    : never;

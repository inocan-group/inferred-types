type MyEqual<A, B> = (<X>() => X extends A ? 0 : 1) extends <X>() => X extends B
    ? 0
    : 1
    ? true
    : false;

type isReadonly<T, K extends keyof T> = MyEqual<
    { [P in K]: T[P] },
    { readonly [P in K]: T[P] }
>;

/**
 * **ReadonlyKeys**`<T>`
 *
 * Creates a union of properties in `T` which are readonly.
 */
export type ReadonlyKeys<T extends object> = keyof {
    [K in keyof T as isReadonly<T, K> extends true ? K : never]: T[K];
};

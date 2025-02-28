/**
 * **UnionWithAll**`<TList,TUnion>`
 *
 * Type utility which iterates through each element of `TList` and creates a
 * a union between the current value and `TUnion`.
 * ```ts
 * type Arr = [1,2,"foo"];
 * // [1,2, "foo" | number]
 * type Num = UnionWithAll<Arr, number>;
 * ```
 */
export type UnionWithAll<
    TList extends readonly unknown[],
    TUnion,
> = {
    [K in keyof TList]: TList[K] | TUnion
};

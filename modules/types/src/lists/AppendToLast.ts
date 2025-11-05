/**
 * **AppendToLast**`<TList,TAppend>`
 *
 * Appends some text `TAppend` to the last element of `TList`.
 */
export type AppendToLast<
    TList extends readonly string[],
    TAppend extends string
> = TList extends readonly [
    ...infer LeadIn extends readonly string[],
    infer Last extends string
]
    ? [...LeadIn, `${Last}${TAppend}`]
// case where we're starting from an empty array
    : [TAppend];

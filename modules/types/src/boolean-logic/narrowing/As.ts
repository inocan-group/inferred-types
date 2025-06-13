/**
 * **As**`<TContent,TType>`
 *
 * Ensures that `TContent` _extends_ `TType` or turns type to `never`.
 */
export type As<
    TContent,
    TType,
> = [TContent] extends [TType]
    ? TContent
    : never;

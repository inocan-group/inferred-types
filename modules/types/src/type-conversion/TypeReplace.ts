import type {  ReplaceType } from "inferred-types/types";


/**
 * **TypeReplace**`<TContent, TFind, TReplace>`
 *
 * @deprecated use `ReplaceType` instead
 */
export type TypeReplace<
    TContent,
    TFind,
    TReplace,
> = ReplaceType<TContent,TFind,TReplace>;

import type { RetainAfter, StripAfter } from "inferred-types/types";


export type RetainBetween<
    TContent extends string,
    TBegin extends string,
    TEnd extends string
> = StripAfter<
    RetainAfter<TContent, TBegin>,
    TEnd
>;

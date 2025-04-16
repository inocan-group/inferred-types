import { RetainAfter } from "src/string-literals/RetainAfter";
import { StripAfter } from "src/string-literals/StripAfter";


export type RetainBetween<
    TContent extends string,
    TBegin extends string,
    TEnd extends string
> = StripAfter<
    RetainAfter<TContent, TBegin>,
    TEnd
>;

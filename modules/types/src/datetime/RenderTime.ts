import { As } from "types/boolean-logic";
import { ThreeDigitMillisecond, TimezoneOffset, TwoDigitHour, TwoDigitMinute, TwoDigitSecond } from "types/datetime/general";
import { Err } from "types/errors";

type N<
    T extends string | null,
    P extends string = ""
> = As<T extends null
    ? ""
    : T extends string
    ? `${P}${T}`
    : never,
    string
>;


/**
 * Renders an ISO time string based on generics passed in.
 */
export type RenderTime<
    THour extends TwoDigitHour | null = "00",
    TMin extends TwoDigitMinute | null = "00",
    TSec extends TwoDigitSecond | null = null,
    TMs extends ThreeDigitMillisecond | null = null,
    TTz extends TimezoneOffset | null = "Z"
> = THour extends null
    ? Err<`render-time/hour`, `To render a time you MUST have an hour!`>
    : TMin extends null
    ? Err<`render-time/min`, `To render a time you MUST have a minute!`>
    : `${THour}:${TMin}${N<TSec, ":">}${N<TMs, ".">}${N<TTz>}`;



import { TypedFunction } from "inferred-types/types";

export type TemporalInstanceLike = {
    equals: TypedFunction;
    add: TypedFunction;
    subtract: TypedFunction;
    until: TypedFunction;
    since: TypedFunction;
    round: TypedFunction;
    toZoneDateTimeISO: TypedFunction;
    toLocaleString: TypedFunction;
    toJSON(): string;
    toString: TypedFunction;
    [key: string | symbol]: any;
}

export type TemporalZonedDateTimeLike = {
    era: string | undefined;
    eraYear: number | undefined;
    year: number;
    month: number;
    monthCode: string;
    day: number;
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
    microsecond: number;
    nanosecond: number;
    timeZoneId: string;
    calenderId: string;
    dayOfWeek: number;
    dayOfYear: number;
    hoursInDay: number;
    daysInWeek: number;
    isLeapYear: boolean;
    offset: string;
    epochMilliseconds: number;
    [key: string | symbol]: any;
}


export type TemporalTimeZoneLike = string | TemporalZonedDateTimeLike;

export type TemporalPlainDateTimeLike = {
    era: string | undefined;
    eraYear: number | undefined;
    year: number;
    month: number;
    monthCode: string;
    day: number;
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
    microsecond: number;
    nanosecond: number;
    calendar: any;
    equals: TypedFunction;
    with: TypedFunction;
    withPlainTime: TypedFunction;
    toZonedDateTime(tzLike: TemporalTimeZoneLike, options?: any): TemporalZonedDateTimeLike;
    add: TypedFunction;
    toPlainDate: TypedFunction;
    toPlainTime: TypedFunction;
    since: TypedFunction;
    toJSON(): string;
    toString: TypedFunction;
    readonly [Symbol.toStringTag]: 'Temporal.PlainDateTime';
    [key: string | symbol]: any;
};

export interface TemporalLike {
    toString(): string;
    toJSON(): string;
    toPlainDate?(): object;
    toPlainTime?(): object;
    toInstant?(): { epochSeconds: number };
    [key: string | symbol]: any;
}

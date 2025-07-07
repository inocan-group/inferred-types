
export interface DayJsLike {
    isValid(): boolean;
    /** converts a DayJS object to a Javascript Date */
    toDate(): Date;
    format(formatStr?: string): string;
    utc(): DayJsLike;
    local(): DayJsLike;
    add(amount: number, unit: string): DayJsLike;
    subtract(amount: number, unit: string): DayJsLike;
    [key: string]: any;
}

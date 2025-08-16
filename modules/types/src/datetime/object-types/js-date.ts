export interface JsDateLike extends Date {
    getTime(): number;
    toIsoString(): string;
    getFullYear(): number;
    setFullYear(year: number, month?: number, date?: number): number;
    getDate(): number;
    /** Gets the day of the week, using local time. */
    getDay(): number;
    getHours(): number;
    getMonth(): number;
    getMinutes(): number;
    [key: string | symbol]: any;
};

import { DateLike, Err } from "inferred-types/types";


export type DaysInMonth<T> = T extends DateLike
?
: Err<
    `invalid-date/days-in-month`,
    `The DaysInMonth<T> utility expects T to be 'date like' but it was unable to be parsed into a date!`,
    { T: T }
>

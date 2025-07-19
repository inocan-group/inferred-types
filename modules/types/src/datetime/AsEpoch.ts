import {
    FourDigitYear,
    TwoDigitDate,
    TwoDigitMonth
} from "types/datetime/general";
import { ParsedDate } from "types/datetime/ParseDate";
import { Err, TypedError } from "types/errors";
import { Multiply } from "types/numeric-literals";
import { AsNumber } from "types/type-conversion";

type SEC_IN_YEAR = 31536000;
type SEC_IN_MONTH = 0; // TODO
type SEC_IN_DAY = 86400;

/**
 * Lookup the number of days in the year prior to a given month
 */
type Lookup = {

    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,

} & Record<number, number>;

type ToEpoch<
    Y extends number,
    M extends number,
    D extends number
> = [
    Multiply<Y, SEC_IN_YEAR>,
    Multiply<Lookup[M], SEC_IN_DAY>,
    Multiply<D, SEC_IN_DAY>
];


/**
 * **AsEpoch**`<T>`
 *
 * Converts a `ParsedDate` to an Epoch timestamp (in seconds).
 *
 * - valid dates which do not define year, month and date return
 * an Error
 * - if `T` is not a valid `ParsedDate` it will return an error;
 * and if `T` _was_ an error it will be proxied
 */
export type AsEpoch<T> = T extends ParsedDate
? T extends [
    infer Year extends FourDigitYear<"branded">,
    infer Month extends TwoDigitMonth<"branded">,
    infer Date extends TwoDigitDate<"branded">
]
    ? ToEpoch<AsNumber<Year>,AsNumber<Month>,AsNumber<Date>>
    : Err<"invalid-date/missing">

: T extends TypedError
    ? T
    : Err<`invalid-type/not-parsed-date`>;

// ---------------------------------------------------------

import {  FourDigitYear, IsoYear, ParseDate } from "inferred-types/types";

type EndDiv4 =
    | '00' | '04' | '08' | '12' | '16' | '20' | '24' | '28'
    | '32' | '36' | '40' | '44' | '48' | '52' | '56' | '60'
    | '64' | '68' | '72' | '76' | '80' | '84' | '88' | '92' | '96';

type DivBy4<Y extends string> = Y extends `${string}${EndDiv4}` ? true : false;
type DivBy100<Y extends string> = Y extends `${string}00` ? true : false;
type DivBy400<Y extends string> =
    Y extends `${infer Pre}00`
    ? Pre extends `${string}${EndDiv4}` ? true : false
    : false;

type Detect<Y extends string> =
    DivBy400<Y> extends true
    ? true
    : DivBy100<Y> extends true
    ? false
    : DivBy4<Y>;

/**
 * **IsLeapYear**`<T>`
 *
 * A boolean operator which tests whether the year component of `T` represents a _leap year_
 * or not.
 *
 * - attempts to resolve this to `true`/`false` at design time
 * - however, many of the object-based representations of date/datetime can
 * only be resolved at runtime so it will return `boolean` in these situations.
 */
export type IsLeapYear<
    T
> = T extends IsoYear<"branded"> | FourDigitYear<"branded">
    ? Detect<T>

    : T extends string
    ? string extends T
    ? boolean
    : ParseDate<T> extends Error
    ? false
    : ParseDate<T> extends [
        infer Year extends FourDigitYear,
        ...unknown[]
    ]
    ? Detect<Year>
    : boolean
    : boolean;


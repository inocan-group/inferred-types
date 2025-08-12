import type {
    And,
    Err,
    IsDateLike,
    IsNumber,
    IsString,
    ParseDate,
    ParsedDate,
    BaseType,
    Sort
} from "inferred-types/types";

type MS_IN_DAY = 86400000;
type SEC_IN_DAY = 86400;

type StrComparison<
    A extends string,
    B extends string
> = ParseDate<A> extends ParsedDate
    ? ParseDate<B> extends ParsedDate
    ? IsEqual<ParseDate<A>[1], ParseDate<B>[1]>
    : Err<`invalid-date/string`, `the string value for B in IsSameDay<A,B> could not be parsed as a ISO datetime value`, { a: A, b: B, underlying: ParseDate<T> }>
    : Err<`invalid-date/string`, `the string value for B in IsSameDay<A,B> could not be parsed as a ISO datetime value`, { a: A, b: B }>
    ;

type NumComparison<
    A extends string,
    B extends string
> = IsFloat<A> extends true
    ? Err<`invalid-date/a`, `A non-integer based number can not represent a date!`>
    : IsFloat<B> extends true
    ? Err<`invalid-date/b`, `A non-integer based number can not represent a date!`>
    : IsEqual<A, B>;

/**
 * **IsSameDay**`<A,B>`
 *
 * Boolean operator which indicates whether `A` and `B` represent
 * the same calendar day.
 *
 * A literal true/false is returned where that is
 * possible other wise you'll just `boolean` for things which
 * can only be validated at runtime.
 *
 * Note:
 *
 * - literal values should be possible at _design time_ when ISO strings
 * are being used
 * - if both values are numeric we can return `false` when epoch based dates
 * aren't close enough to be on the same day.
 * - if an epoch timestamp is encountered and timestamps are identical then we
 * can return `true` at design time.
 * - if a `year-month` ISO string encountered, this utility will return a
 * a `InvalidDate` error because the date has no concept of a concrete calendar date.
 */
export type IsSameDay<
    A,
    B
> = string extends A
    ? boolean
    : string extends B
    ? boolean
    : number extends A
    ? boolean
    : number extends B
    ? boolean
    : IsNotEqual<BaseType<A>, BaseType<B>> extends true
        ? boolean
    : IsDateLike<A> extends true
    ? IsDateLike<B> extends true
    ? And<[IsString<A>, IsString<B>]> extends true
    ? StrComparison<A, B>
    : And<[IsNumber<A>, IsNumber<B>]> extends true
    ? NumComparison<A, B>
    : boolean
    : Err<`invalid-date/b`, `The second parameter B in IsSameDay<A,B> was not DateLike!`, { a: A, b: B }>
    : Err<`invalid-date/a`, `The first parameter A in IsSameDay<A,B> was not DateLike!`, { a: A, b: B }>;


// Or<[
//     And<[IsNumericLiteral<A>, Not<IsInteger<A>>]>,
//     And<[IsNumericLiteral<B>, Not<IsInteger<B>>]>
// ]> extends true
//     ? Err<
//         `invalid-date/non-integer`,
//         `The IsSameDay<A,B> utility was passed at least one non-integer number which is not allowed!`,
//         { a: A; b: B }
//     >
//     : And<[
//         IsNumericLiteral<A>,
//         IsNumericLiteral<B>,
//         IsEqual<A, B>,
//         IsInteger<A>
//     ]> extends true
//         ? true

//         : Or<[
//             Not<Extends<A, DateLike>>,
//             Not<Extends<B, DateLike>>,
//         ]> extends true
//             ? Err<
//                 `invalid-date`,
//                 `The IsSameDay<A,B> type utility expects both A and B to be a DateLike value but at least one was not!`,
//                 { a: A; b: B }
//             >
//             : And<[
//                 IsString<A>,
//                 IsString<B>
//             ]> extends true
//                 ? Or<[
//                     string extends A ? true : false,
//                     string extends B ? true : false,
//                 ]> extends true
//                     ? boolean
//                     : AsDateMeta<A> extends Error
//                         ? Err<
//                             "invalid-date",
//                     `The string passed into the first parameter of IsSameDay -- ${As<A, string>} -- is not a valid ISO date!`,
//                     { a: A; b: B }
//                         >
//                         : AsDateMeta<B> extends Error
//                             ? Err<
//                                 "invalid-date",
//                     `The string passed into the second parameter of IsSameDay -- ${As<B, string>} -- is not a valid ISO date!`,
//                     { a: A; b: B }
//                             >
//                             : AsDateMeta<A> extends DateMeta
//                                 ? AsDateMeta<B> extends DateMeta
//                                     ? And<[
//                                         IsEqual<AsDateMeta<A>["year"], AsDateMeta<B>["year"]>,
//                                         IsEqual<AsDateMeta<A>["month"], AsDateMeta<B>["month"]>,
//                                         IsEqual<AsDateMeta<A>["date"], AsDateMeta<B>["date"]>,
//                                         IsNotEqual<AsDateMeta<A>["date"], null>,
//                                         IsNotEqual<AsDateMeta<A>["year"], null>,
//                                     ]>
//                                     : never
//                                 : never

//                 : boolean;

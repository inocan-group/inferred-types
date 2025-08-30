import type {
    As,
    AsDateMeta,
    DateLike,
    DateMeta,
    Err,
    Fallback,
    IsAny,
    IsEqual,
    IsLessThan,
    IsNull,
    ThreeDigitMillisecond,
    TwoDigitHour,
    TwoDigitMinute,
    TwoDigitSecond,
    Xor
} from "inferred-types/types";
import type { IsTemplateLiteral } from "types/interpolation";

type DateProps = ["year","month","date"];
type Lookup = {
    hour: TwoDigitHour<"00">;
    minute: TwoDigitMinute<"00">;
    second: TwoDigitSecond<"00">;
    ms: ThreeDigitMillisecond<"000">;
    year: null;
    month: null;
    date: null;
    offset: null;
}

type Check<
    A extends DateMeta,
    B extends DateMeta,
    O extends readonly (keyof A & keyof B & string & keyof Lookup)[] = ["year","month","date","hour","minute","second","ms"]
> = O extends [
    infer Head extends string & keyof A & keyof B & keyof Lookup & keyof DateMeta,
    ...infer Rest extends readonly (keyof A & keyof B & string & keyof Lookup & keyof DateMeta)[]
]
    ? // normalize values for this component
      Fallback<A[Head], Lookup[Head]> extends infer AV
        ? Fallback<B[Head], Lookup[Head]> extends infer BV
            ? // if exactly one side is null, comparison is indeterminate
              Xor<IsNull<AV>, IsNull<BV>> extends true
                ? boolean
                : // if both null, move to next component
                [AV] extends [null]
                    ? Check<A, B, Rest>
                    : // both sides have comparable numeric-like strings
                    IsLessThan<As<AV, `${number}`>, As<BV, `${number}`>> extends true
                        ? true
                        : IsEqual<As<AV, `${number}`>, As<BV, `${number}`>> extends true
                            ? Check<A, B, Rest>
                            : false
            : false
        : false
    : // ran out of components with all equal -> not before
      false;


/**
 * **IsBefore**`<A,B>`
 *
 * Tests whether `A` is _before_ (in time) `B`.
 */
export type IsBefore<
    A extends DateLike,
    B extends DateLike,
> = [IsAny<A>] extends [true]
    ? boolean
: [IsAny<B>] extends [true]
    ? boolean
: A extends object
    ? boolean
: B extends object
    ? boolean
: A extends number
    ? B extends number
        ? IsEqual<A,B> extends true
            ? false // A === B
        : IsLessThan<A,B>
    : boolean
: A extends string
    ? IsTemplateLiteral<A> extends true
        ? boolean
        : string extends A
            ? boolean
            : B extends string
                ? IsTemplateLiteral<B> extends true
                    ? boolean
                    : string extends B
                        ? boolean
                        : AsDateMeta<A> extends infer AParsed
                            ? AsDateMeta<B> extends infer BParsed
                                ? [Extract<AParsed, Error>] extends [never]
                                    ? [Extract<BParsed, Error>] extends [never]
                                        ? Check<As<AParsed, DateMeta>, As<BParsed, DateMeta>>
                                        : boolean
                                    : boolean
                                : Err<
                                    `invalid-date/B`,
                                    `The second parameter 'B' was not a valid date!`,
                                    { a: A; b: B }
                                >
                            : Err<
                                `invalid-date/A`,
                                `The first parameter 'A' was not a valid date!`,
                                { a: A; b: B }
                            >
    : AsDateMeta<A> extends infer AParsed
        ? AsDateMeta<B> extends infer BParsed
            ? // if either parse is potentially an Error (wide/ambiguous), return boolean
              [Extract<AParsed, Error>] extends [never]
                ? [Extract<BParsed, Error>] extends [never]
                    ? Check<As<AParsed, DateMeta>, As<BParsed, DateMeta>>
                    : boolean
                : boolean
            : Err<
                `invalid-date/B`,
                `The second parameter 'B' was not a valid date!`,
                { a: A; b: B }
            >
        : Err<
            `invalid-date/A`,
            `The first parameter 'A' was not a valid date!`,
            { a: A; b: B }
        >
    : boolean;

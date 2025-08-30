import type {
    AfterFirst,
    As,
    AsDateMeta,
    Contains,
    DateLike,
    DateMeta,
    Err,
    Extends,
    Fallback,
    First,
    IsEqual,
    IsGreaterThan,
    IsLessThan,
    IsNull,
    Not,
    Or,
    ThreeDigitMillisecond,
    TwoDigitHour,
    TwoDigitMinute,
    TwoDigitSecond,
    Xor
} from "inferred-types/types";
import { UnbrandValues } from "types/literals/branding/UnbrandValues";

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
> =
O extends [infer Head extends string & keyof A & keyof B & keyof Lookup & keyof DateMeta, ...infer Rest extends readonly (keyof A & keyof B & string& keyof Lookup & keyof DateMeta )[] ]
? Fallback<A[Head], Lookup[Head]> extends infer APlus extends DateMeta
    ? Fallback<B[Head], Lookup[Head]> extends infer BPlus extends DateMeta
        ? Xor<
            IsNull<APlus[Head]>,
            IsNull<BPlus[Head]>
        > extends true
            ? boolean // can not compare dates where one has a value and other does not
            : APlus[Head] extends null
                ? Check<A,B,Rest> // iterate as we have equality at head
            : IsLessThan<
                As<Fallback<A[Head], Lookup[Head]>, `${number}`>,
                As<Fallback<B[Head], Lookup[Head]>, `${number}`>
            > extends true
                ? true
            : IsEqual<
                As<Fallback<A[Head], Lookup[Head]>, `${number}`>,
                As<Fallback<B[Head], Lookup[Head]>, `${number}`>
            > extends true
                ? Check<A,B,Rest> // iterate further based on equality
            : false
        : false
    : IsLessThan<
        As<Fallback<A[Head], Lookup[Head]>, `${number}`>,
        As<Fallback<B[Head], Lookup[Head]>, `${number}`>
    > extends true
        ? true
        : IsEqual<
            As<Fallback<A[Head], Lookup[Head]>, `${number}`>,
            As<Fallback<B[Head], Lookup[Head]>, `${number}`>
        > extends true
            ? false
    : false

: true;


/**
 * **IsAfter**`<A,B>`
 *
 * Tests whether `A` is _after_ (in time) `B`.
 */
export type IsBefore<
    A extends DateLike,
    B extends DateLike,
> = A extends object
    ? boolean
: B extends object
    ? boolean
: A extends number
    ? B extends number
        ? IsEqual<A,B> extends true
            ? false // A === B
        : IsLessThan<A,B>
    : boolean
: string extends A
    ? boolean
    : AsDateMeta<A> extends infer AMeta extends DateMeta
        ? AsDateMeta<B> extends infer BMeta extends DateMeta
            ? Check<AMeta,BMeta> extends Error
                ? boolean
                : Check<AMeta,BMeta>
            : Err<
                `invalid-date/B`,
                `The second parameter 'B' was not a valid date!`,
                { a: A; b: B }
            >
        : Err<
            `invalid-date/A`,
            `The first parameter 'A' was not a valid date!`,
            { a: A; b: B }
        >;

import type {
    AfterFirst,
    As,
    AsDateMeta,
    DateLike,
    DateMeta,
    Err,
    Extends,
    First,
    IsEqual,
    IsLessThan,
    Not,
    Or,
    Unbrand,
} from "inferred-types/types";

type Check<
    A extends readonly (`${number}` | null)[],
    B extends readonly (`${number}` | null)[]
> = [] extends A
    ? false
    : IsEqual<First<A>, First<B>> extends true
        ? Check<AfterFirst<A>, AfterFirst<B>>
        : First<A> extends `${number}`
            ? First<B> extends `${number}`
                ? IsLessThan<First<A>, First<B>>
                : true
            : First<B> extends `${number}`
                ? false
                : Check<
                    AfterFirst<A>,
                    AfterFirst<B>
                >;

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
        : string extends A
            ? boolean
            : `${number}` extends A
                ? boolean
                : string extends B
                    ? boolean
                    : `${number}` extends B
                        ? boolean
                        : Or<[
                            Not<Extends<A, DateLike>>,
                            Not<Extends<B, DateLike>>,
                        ]> extends true
                            ? Err<
                                `invalid-date/is-before`,
                                `The IsBefore<A,B> utility expects both parameters to extend the DateLike type but at least one did not!`,
                                { a: A; b: B }
                            >

                            : AsDateMeta<A> extends infer AMeta extends DateMeta
                                ? AsDateMeta<B> extends infer BMeta extends DateMeta
                                    ? Check<
                                        [
                                            As<Unbrand<AMeta["year"]>, `${number}` | null>,
                                            As<Unbrand<AMeta["month"]>, `${number}` | null>,
                                            As<Unbrand<AMeta["date"]>, `${number}` | null>,
                                            As<Unbrand<AMeta["hour"]>, `${number}` | null>,
                                            As<Unbrand<AMeta["minute"]>, `${number}` | null>,
                                            As<Unbrand<AMeta["second"]>, `${number}` | null>,
                                            As<Unbrand<AMeta["ms"]>, `${number}` | null>
                                        ],
                                        [
                                            As<Unbrand<BMeta["year"]>, `${number}` | null>,
                                            As<Unbrand<BMeta["month"]>, `${number}` | null>,
                                            As<Unbrand<BMeta["date"]>, `${number}` | null>,
                                            As<Unbrand<BMeta["hour"]>, `${number}` | null>,
                                            As<Unbrand<BMeta["minute"]>, `${number}` | null>,
                                            As<Unbrand<BMeta["second"]>, `${number}` | null>,
                                            As<Unbrand<BMeta["ms"]>, `${number}` | null>
                                        ]
                                    >
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

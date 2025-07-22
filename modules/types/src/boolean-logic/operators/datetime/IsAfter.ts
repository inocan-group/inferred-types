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
    IsGreaterThan,
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
                ? IsGreaterThan<First<A>, First<B>>
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
export type IsAfter<
    A,
    B,
> = A extends object
    ? boolean
    : `${number}` extends A
        ? boolean
        : B extends object
            ? boolean
            : string extends A
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
                                `invalid-date/is-after`,
                                `The IsAfter<A,B> utility expects both parameters to extend the DateLike type but at least one did not!`,
                                { a: A; b: B }
                            >

                            : AsDateMeta<A> extends DateMeta
                                ? AsDateMeta<B> extends DateMeta
                                    ? Check<
                                        [
                                            As<Unbrand<AsDateMeta<A>["year"]>, `${number}` | null>,
                                            As<Unbrand<AsDateMeta<A>["month"]>, `${number}` | null>,
                                            As<Unbrand<AsDateMeta<A>["date"]>, `${number}` | null>,
                                            As<Unbrand<AsDateMeta<A>["hour"]>, `${number}` | null>,
                                            As<Unbrand<AsDateMeta<A>["minute"]>, `${number}` | null>,
                                            As<Unbrand<AsDateMeta<A>["second"]>, `${number}` | null>,
                                            As<Unbrand<AsDateMeta<A>["ms"]>, `${number}` | null>
                                        ],
                                        [
                                            As<Unbrand<AsDateMeta<B>["year"]>, `${number}` | null>,
                                            As<Unbrand<AsDateMeta<B>["month"]>, `${number}` | null>,
                                            As<Unbrand<AsDateMeta<B>["date"]>, `${number}` | null>,
                                            As<Unbrand<AsDateMeta<B>["hour"]>, `${number}` | null>,
                                            As<Unbrand<AsDateMeta<B>["minute"]>, `${number}` | null>,
                                            As<Unbrand<AsDateMeta<B>["second"]>, `${number}` | null>,
                                            As<Unbrand<AsDateMeta<B>["ms"]>, `${number}` | null>
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

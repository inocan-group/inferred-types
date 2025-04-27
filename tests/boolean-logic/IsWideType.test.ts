import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import {
    IsWideContainer,
    IsWideScalar,
    IsWideType,
    Dictionary,
    Test,
    Expect
} from "inferred-types/types";
import { describe, it } from "vitest";

describe("IsWideScalar<T>", () => {

    it("happy path", () => {
        type T1 = IsWideScalar<string>;
        type T2 = IsWideScalar<boolean>;
        type T3 = IsWideScalar<number>;
        type T4 = IsWideScalar<null>;

        type F1 = IsWideScalar<"foo">;
        type F2 = IsWideScalar<true>;
        type F3 = IsWideScalar<42>;


        type cases = [
            ExpectTrue<T1>,
            ExpectTrue<T2>,
            ExpectTrue<T3>,
            ExpectTrue<T4>,

            ExpectFalse<F1>,
            ExpectFalse<F2>,
            ExpectFalse<F3>,
        ];
        const cases: cases = [
            true, true, true, true,
            false, false, false
        ];
    });
});

describe("IsWideContainer<T>", () => {

    it("happy path", () => {
        type T1 = IsWideContainer<object>;
        type T2 = IsWideContainer<Dictionary>;
        type T3 = IsWideContainer<Record<string, string>>;
        type T4 = IsWideContainer<string[]>;
        type T5 = IsWideContainer<readonly string[]>;
        type T6 = IsWideContainer<readonly unknown[]>;

        type F1 = IsWideContainer<{ foo: 1 }>;
        type F2 = IsWideContainer<[1, 2]>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
            Expect<Test<T5, "equals", true>>,
            Expect<Test<T6, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
        ];

    });

});

describe("IsWideType<T>", () => {

    it("Scalars", () => {
        type T1 = IsWideType<string>;
        type T2 = IsWideType<boolean>;
        type T3 = IsWideType<object>;
        type T4 = IsWideType<string[]>;
        type T5 = IsWideType<unknown[]>;
        type T6 = IsWideType<readonly string[]>;
        // union with only wide values
        type T7 = IsWideType<string | number>;

        type F1 = IsWideType<"foo">;
        // union with literal values
        type F2 = IsWideType<string | 42>;
        type F3 = IsWideType<{ foo: 1; bar: 2 }>;

        // never with and without modification of TNever
        type E1 = IsWideType<never>;
        type E2 = IsWideType<never, false>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
            Expect<Test<T5, "equals", true>>,
            Expect<Test<T6, "equals", true>>,
            Expect<Test<T7, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,

            Expect<Test<E1, "equals", never>>,
            Expect<Test<E2, "equals", false>>,
        ];
    });

});


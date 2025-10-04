import { describe, it } from "vitest";
import {
    AssertEqual,
    AssertFalse,
    AssertNotEqual,
    AssertTrue,
    Dictionary,
    OnlyIndexKeys,
    Empty,
    EmptyObject,
    Expect,
    IsEqual
} from "inferred-types/types";

describe("IsEqual<A,B>", () => {

    it("scalars -> positive tests", () => {
        type T1 = IsEqual<5,5>;
        type T2 = IsEqual<"foo","foo">;
        type T3 = IsEqual<string, string>;
        type T4 = IsEqual<number, number>;
        type T5 = IsEqual<null, null>;

        type cases = [
            Expect<AssertTrue<T1>>,
            Expect<AssertTrue<T2>>,
            Expect<AssertTrue<T3>>,
            Expect<AssertTrue<T4>>,
            Expect<AssertTrue<T5>>,
        ];
    });


    it("scalars -> negative tests", () => {
        type F1 = IsEqual<5,4>;
        type F2 = IsEqual<5,number>;
        type F3 = IsEqual<number,5>;
        type F4 = IsEqual<null,undefined>;

        type cases = [
            Expect<AssertFalse<F1>>,
            Expect<AssertFalse<F2>>,
            Expect<AssertFalse<F3>>,
            Expect<AssertFalse<F4>>,
        ];
    });


    it("dictionary -> positive tests", () => {
        type T1 = IsEqual<{foo:1}, {foo:1}>;
        type T2 = IsEqual<EmptyObject, EmptyObject>;
        type T3 = IsEqual<Dictionary, Dictionary>;
        type T4 = IsEqual<{foo:1, bar: 2}, {foo:1, bar: 2}>;
        type T5 = IsEqual<{[x: symbol]: number }, {[x: symbol]: number }>;
        type T6 = IsEqual<
            {[x: symbol]: number, [y: string]: string },
            {[x: symbol]: number, [y: string]: string }
        >;

        type cases = [
            Expect<AssertTrue<T1>>,
            Expect<AssertTrue<T2>>,
            Expect<AssertTrue<T3>>,
            Expect<AssertTrue<T4>>,
            Expect<AssertTrue<T5>>,
            Expect<AssertTrue<T6>>,
        ];
    });

    it("dictionary -> negative tests", () => {
        type F1 = IsEqual<{foo:1}, {foo:2}>;
        type F2 = IsEqual<EmptyObject, {foo:1}>;
        type F3 = IsEqual<Dictionary, EmptyObject>;
        type F4 = IsEqual<{foo:1, bar: 2}, {foo:1, bar: 4}>;
        type F5 = IsEqual<{[x: symbol]: number }, {[x: symbol]: string }>;
        type F6 = IsEqual<
            {[x: symbol]: number, [y: string]: string },
            {[x: symbol]: number, [y: string]: number }
        >;


        type cases = [
            Expect<AssertFalse<F1>>,
            Expect<AssertFalse<F2>>,
            Expect<AssertFalse<F3>>,
            Expect<AssertFalse<F4>>,
            Expect<AssertFalse<F5>>,
            Expect<AssertFalse<F6>>,
        ];
    });


    it("dictionary -> edge case -> multiple index keys", () => {
        type A = { [x: symbol]: number };
        type B = { [x: `_${string}`]: string; [y: symbol]: number };

        type TestOnEquality = IsEqual<A,B>;

        type cases = [
            Expect<AssertFalse<TestOnEquality>>
        ];
    });





});

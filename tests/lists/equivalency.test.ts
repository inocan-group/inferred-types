import { describe, it } from "vitest";
import type { Expect, IfEqual, IsEqual, IsNotEqual, Test } from "inferred-types/types";



describe("IsEqual", () => {

    it("happy path", () => {
        type T1 = IsEqual<1, 1>;
        type T2 = IsEqual<1, 2>;
        type T3 = IsEqual<1, number>;
        type T4 = IsEqual<number, 1>;
        type T5 = IsEqual<number, number>;

        type cases = [
            //
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  false>>,
            Expect<Test<T3, "equals",  false>>,
            Expect<Test<T4, "equals",  false>>,
            Expect<Test<T5, "equals",  true>>,
        ];
    });
});
describe("IsNotEqual", () => {

    it("happy path", () => {
        type T1 = IsNotEqual<1, 1>;
        type T2 = IsNotEqual<1, 2>;
        type T3 = IsNotEqual<1, number>;
        type T4 = IsNotEqual<number, 1>;
        type T5 = IsNotEqual<number, number>;

        type cases = [
            //
            Expect<Test<T1, "equals",  false>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<T3, "equals",  true>>,
            Expect<Test<T4, "equals",  true>>,
            Expect<Test<T5, "equals",  false>>,
        ];
    });

});

describe("IfEqual", () => {

    it("happy path", () => {
        type Eq = IfEqual<1, 1, "equal", "not">;
        type NotEq = IfEqual<1, 0, "equal", "not">;

        type cases = [
            //
            Expect<Test<Eq, "equals",  "equal">>,
            Expect<Test<NotEq, "equals",  "not">>,
        ];
    });

});

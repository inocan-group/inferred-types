import { describe, it } from "vitest";
import type { EmptyObject, Expect, IsTruthy, Test } from "inferred-types/types";

describe("IsTruthy<T>", () => {

    it("positive tests", () => {
        type T1 = IsTruthy<true>;
        type T2 = IsTruthy<1>;
        type T3 = IsTruthy<"hello">;
        type T4 = IsTruthy<{}>;
        type T4b = IsTruthy<EmptyObject>;
        type T5 = IsTruthy<[]>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
            Expect<Test<T4b, "equals", true>>,
            Expect<Test<T5, "equals", true>>,
        ];
    });

    it("negative tests", () => {
        type F1 = IsTruthy<false>;
        type F2 = IsTruthy<null>;
        type F3 = IsTruthy<undefined>;
        type F4 = IsTruthy<0>;
        type F5 = IsTruthy<"">;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
            Expect<Test<F4, "equals", false>>,
            Expect<Test<F5, "equals", false>>,
        ];
    });

});

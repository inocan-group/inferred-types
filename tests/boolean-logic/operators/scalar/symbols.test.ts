import { describe, it } from "vitest";
import {
    Expect,
    IsEqual,
    IsUniqueSymbol,
    IsWideSymbol,
    Test,
} from "inferred-types/types";



describe("IsUniqueSymbol<T>", () => {
    const u1 = Symbol("u1");
    const u2 = Symbol("u2");
    type U1 = typeof u1;
    type U2 = typeof u2;

    it("positive tests", () => {
        type T1 = IsUniqueSymbol<U1>;
        type T2 = IsUniqueSymbol<U2>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
        ];
    });

    it("negative tests", () => {
        type F1 = IsUniqueSymbol<symbol>;
        type F2 = IsUniqueSymbol<U1 | U2>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
        ];
    });


    it("edge cases", () => {
        type F1 = IsUniqueSymbol<never>;
        type F2 = IsUniqueSymbol<any>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
        ];
    });

});


describe("IsWideSymbol", () => {
    const u1 = Symbol("u1");
    const u2 = Symbol("u2");
    type U1 = typeof u1;
    type U2 = typeof u2;

    it("positive tests", () => {
        type T1 = IsWideSymbol<symbol>;
        // `U1 | symbol` is widened to just `symbol`
        type T2 = IsWideSymbol<U1 | symbol>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
        ];
    });


    it("negative tests", () => {
        type F1 = IsWideSymbol<U1>;
        type F2 = IsWideSymbol<U1 | U2>;


        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
        ];
    });
})

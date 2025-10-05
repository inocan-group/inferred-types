import { describe, it } from "vitest";
import type { Expect, HasOptionalElements, HasOptionalElements__Tuple, NotEqual, Test } from "inferred-types/types";

describe("HasOptionalElements", () => {

    it("positive tests", () => {
        type T1 = HasOptionalElements<[1,2,3?]>;
        type T2 = HasOptionalElements<[string,number?,string?]>;
        type T3 = HasOptionalElements<[string?]>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
        ];
    });

    it("positive tests (with variadic tail)", () => {
        type T1 = HasOptionalElements<[1,2,3?, ...string[]]>;
        type T2 = HasOptionalElements<[string,number?,string?, ...string[]]>;
        type T3 = HasOptionalElements<[string?, ...number[]]>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
        ];
    });

    it("negative tests", () => {
        type F1 = HasOptionalElements<[1,2,3]>;
        type F2 = HasOptionalElements<[string,number,string]>;
        type F3 = HasOptionalElements<[string]>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
        ];
    });

    it("negative tests (with variadic tail)", () => {
        type F1 = HasOptionalElements<[1,2,3, ...string[]]>;
        type FA1 = NotEqual<[1,2,3, ...string[]], Readonly<[1,2,3, ...string[]]>>
        type FA2 = HasOptionalElements__Tuple<[1,2,3, ...string[]]>;
        type F2 = HasOptionalElements<[string,number,string, ...string[]]>;
        type F3 = HasOptionalElements<[string, ...number[]]>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
        ];
    });

});

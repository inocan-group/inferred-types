import { describe, it } from "vitest";
import type { Expect, HasRequiredElements, Test } from "inferred-types/types";

describe("HasRequiredElements", () => {

    describe("array", () => {
        it("positive tests", () => {
            type T1 = HasRequiredElements<[1,2,3?]>;
            type T2 = HasRequiredElements<[string,number?,string?]>;
            type T3 = HasRequiredElements<[string?]>;

            type cases = [
                Expect<Test<T1, "equals", true>>,
                Expect<Test<T2, "equals", true>>,
                Expect<Test<T3, "equals", true>>,
            ];
        });

        it("positive tests (with variadic tail)", () => {
            type T1 = HasRequiredElements<[1,2,3?, ...string[]]>;
            type T2 = HasRequiredElements<[string,number?,string?, ...string[]]>;
            type T3 = HasRequiredElements<[string?, ...number[]]>;

            type cases = [
                Expect<Test<T1, "equals", true>>,
                Expect<Test<T2, "equals", true>>,
                Expect<Test<T3, "equals", true>>,
            ];
        });

        it("negative tests", () => {
            type F1 = HasRequiredElements<[1,2,3]>;
            type F2 = HasRequiredElements<[string,number,string]>;
            type F3 = HasRequiredElements<[string]>;

            type cases = [
                Expect<Test<F1, "equals", false>>,
                Expect<Test<F2, "equals", false>>,
                Expect<Test<F3, "equals", false>>,
            ];
        });

        it("negative tests (with variadic tail)", () => {
            type F1 = HasRequiredElements<[1,2,3, ...string[]]>;
            type F2 = HasRequiredElements<[string,number,string, ...string[]]>;
            type F3 = HasRequiredElements<[string, ...number[]]>;

            type cases = [
                Expect<Test<F1, "equals", false>>,
                Expect<Test<F2, "equals", false>>,
                Expect<Test<F3, "equals", false>>,
            ];
        });
    })


    describe("dictionary", () => {
        it("positive tests", () => {
            type T1 = HasRequiredElements<{foo: 1; bar?: 2}>;
            type T2 = HasRequiredElements<{foo: 1}>;
            type T3 = HasRequiredElements<{foo: 1; bar: 2}>;

            type cases = [
                Expect<Test<T1, "equals", true>>,
                Expect<Test<T2, "equals", true>>,
                Expect<Test<T3, "equals", true>>,
            ];
        });


        it("negative tests", () => {
            type F1 = HasRequiredElements<EmptyObject>;
            type F2 = HasRequiredElements<{foo?: 1}>;
            type F3 = HasRequiredElements<{foo?: number; bar?: number}>;

            type cases = [
                Expect<Test<F1, "equals", false>>,
                Expect<Test<F2, "equals", false>>,
                Expect<Test<F3, "equals", false>>,
            ];
        });
    })

});

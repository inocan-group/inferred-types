
import { describe, it } from "vitest";
import type { Expect, Or, Test } from "inferred-types/types";

describe("Or<T>", () => {

    it("global error conditions", () => {
        type E1 = Or<never, {err: "error"}>;
        type E2 = Or<any, { err: "error"}>;
        type F1 = Or<never>;
        type F2 = Or<any>;

        type cases = [
            Expect<Test<E1, "isError",  "invalid/or">>,
            Expect<Test<E2, "isError",  "invalid/or">>,
            Expect<Test<F1, "equals",  false>>,
            Expect<Test<F2, "equals",  false>>,
        ];
    });

    it("boolean literals", () => {
        type T1 = Or<[true, false, true]>; // true
        type T2 = Or<[false, false, false]>; //false
        type T3 = Or<[]>; // false
        type T4 = Or<[true, false, boolean]>; // true
        type T5 = Or<[false, false, boolean]>; // boolean
        type T6 = Or<[boolean, false, false]>; // boolean

        type cases = [
            Expect<Test<T1, "equals",  true>>, //
            Expect<Test<T2, "equals",  false>>,
            Expect<Test<T3, "equals",  false>>,
            Expect<Test<T4, "equals",  true>>,
            Expect<Test<T5, "equals",  boolean>>,
            Expect<Test<T6, "equals",  boolean>>,
        ];
    });

    it("functions no params", () => {
        type T1 = Or<[() => true, () => false, () => true]>; // true
        type T2 = Or<[() => false, () => false, () => false]>; //false
        // type T3 = Or<() => readonly boolean[] >; // never
        type T4 = Or<[() => true, () => false, () => boolean]>; // true
        type T5 = Or<[() => false, () => false, () => boolean]>; // boolean

        type cases = [
            Expect<Test<T1, "equals",  true>>, //
            Expect<Test<T2, "equals",  false>>,
            // Expect<Test<T3, "equals",  never>>,
            Expect<Test<T4, "equals",  true>>,
            Expect<Test<T5, "equals",  boolean>>,
        ];
    });

    it("any as element", () => {
        type E1 = Or<[true, false, any], { err: "error" }>;
        type E2 = Or<[any, false, any], { err: "error" }>;
        type E3 = Or<[any], { err: "error" }>;

        type cases = [
            Expect<Test<E1, "isError", "invalid/or">>,
            Expect<Test<E2, "isError", "invalid/or">>,
            Expect<Test<E3, "isError", "invalid/or">>,
        ];
    });

    it("never as element", () => {
        type E1 = Or<[true, false, never], { err: "error" }>;
        type E2 = Or<[never, false, never], { err: "error" }>;
        type E3 = Or<[never], { err: "error" }>;

        type cases = [
            Expect<Test<E1, "isError", "invalid/or">>,
            Expect<Test<E2, "isError", "invalid/or">>,
            Expect<Test<E3, "isError", "invalid/or">>,
        ];
    });

});


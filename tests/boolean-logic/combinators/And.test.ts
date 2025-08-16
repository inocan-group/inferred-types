import { Expect, And, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("And<T>", () => {

    it("positive tests", () => {
        type T1 = And<[true]>;
        type T2 = And<[true, true, true]>;

        type T3 = And<readonly [true]>;
        type T4 = And<readonly [true, true, true]>;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<T3, "equals",  true>>,
            Expect<Test<T4, "equals",  true>>,
        ];
    });

    it("negative tests", () => {
        type F1 = And<[true, true, false, true]>;
        type F2 = And<[false, false, false, false]>;
        type F3 = And<readonly [true, true, false, true]>;
        type F4 = And<readonly [false, false, false, false]>;

        type cases = [
            Expect<Test<F1, "equals",  false>>,
            Expect<Test<F2, "equals",  false>>,
            Expect<Test<F3, "equals",  false>>,
            Expect<Test<F4, "equals",  false>>,
        ];
    });

    it("boolean outcome", () => {
        type B1 = And<[boolean]>;
        type B2 = And<[true, true, boolean]>;

        type cases = [
            Expect<Test<B1, "equals", boolean>>,
            Expect<Test<B2, "equals", boolean>>,
        ];
    });

    it("logic functions", () => {
        type T1 = And<[() => true, () => true, () => false, () => true]>; // false
        type T2 = And<[() => false, () => false, false, () => false]>; // false
        type T3 = And<[() => true]>; // true
        type T4 = And<[() => true, true, () => true]>; // true
        type T5 = And<[() => true, () => boolean, () => true]>; // boolean

        type cases = [
            Expect<Test<T1, "equals",  false>>, //
            Expect<Test<T2, "equals",  false>>,
            Expect<Test<T3, "equals",  true>>,
            Expect<Test<T4, "equals",  true>>,
            Expect<Test<T5, "equals",  boolean>>,
        ];
    });


    it("invalid conditions", () => {
        // invalid conditions result in `false` by default
        type F1 = And<[true, "foo", true]>;
        // but if you turn on errors in the options hash
        // you'll get an error instead
        type E1 = And<[true, "foo", true], { err: "error" }>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<E1, "isError", "invalid/and">>,
        ];
    });


});

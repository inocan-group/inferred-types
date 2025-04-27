import { Equal, Expect } from "@type-challenges/utils";
import { And, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("And<T>", () => {

    it("boolean values", () => {
        type T1 = And<[true, true, false, true]>; // false
        type T2 = And<[false, false, false, false]>; // false
        type T3 = And<[true]>; // true
        type T4 = And<readonly [true, true, true]>; // true
        type T5 = And<[true, boolean, true]>; // boolean

        type cases = [
            Expect<Test<T1, "equals",  false>>, //
            Expect<Test<T2, "equals",  false>>,
            Expect<Test<T3, "equals",  true>>,
            Expect<Test<T4, "equals",  true>>,
            Expect<Test<T5, "equals",  boolean>>,
        ];
    });

    it("simple functions", () => {
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

});

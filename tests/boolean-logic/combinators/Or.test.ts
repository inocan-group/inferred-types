import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { ErrorCondition, Extends, Or, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("Or<T>", () => {

    it("boolean literals", () => {
        type T1 = Or<[true, false, true]>; // true
        type T2 = Or<[false, false, false]>; //false
        type T3 = Or<[]>; // false
        type T4 = Or<[true, false, boolean]>; // true
        type T5 = Or<[false, false, boolean]>; // boolean
        type T6 = Or<[boolean, false, false]>; // boolean
        type T7 = Or<never>;

        type cases = [
            Expect<Test<T1, "equals",  true>>, //
            Expect<Test<T2, "equals",  false>>,
            Expect<Test<T3, "equals",  false>>,
            Expect<Test<T4, "equals",  true>>,
            Expect<Test<T5, "equals",  boolean>>,
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


});


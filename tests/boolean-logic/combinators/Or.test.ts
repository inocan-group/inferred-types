import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { ErrorCondition, Extends, Or } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Or<T>", () => {

    it("boolean literals", () => {
        type T1 = Or<[true, false, true]>; // true
        type T2 = Or<[false, false, false]>; //false
        type T3 = Or<[]>; // false
        type T4 = Or<[true, false, boolean]>; // true
        type T5 = Or<[false, false, boolean]>; // boolean
        type T6 = Or<never>;

        type cases = [
            Expect<Equal<T1, true>>, //
            Expect<Equal<T2, false>>,
            Expect<Equal<T3, false>>,
            Expect<Equal<T4, true>>,
            Expect<Equal<T5, boolean>>,
            ExpectTrue<Extends<T6, ErrorCondition<"invalid-never">>>,
        ];
        const cases: cases = [true, true, true, true, true, true];
    });

    it("functions no params", () => {
        type T1 = Or<[() => true, () => false, () => true]>; // true
        type T2 = Or<[() => false, () => false, () => false]>; //false
        // type T3 = Or<() => readonly boolean[] >; // never
        type T4 = Or<[() => true, () => false, () => boolean]>; // true
        type T5 = Or<[() => false, () => false, () => boolean]>; // boolean


        type cases = [
            Expect<Equal<T1, true>>, //
            Expect<Equal<T2, false>>,
            // Expect<Equal<T3, never>>,
            Expect<Equal<T4, true>>,
            Expect<Equal<T5, boolean>>,
        ];
        const cases: cases = [true, true, true, true];
    });


});


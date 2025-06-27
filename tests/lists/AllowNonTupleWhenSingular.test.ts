import {  Expect, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { AllowNonTupleWhenSingular, AsArray, ErrorCondition, IsEqual, Test } from "inferred-types/types";



describe("AllowNonTupleWhenSingular<TTuple>", () => {

    it("happy path", () => {
        type Yup = AllowNonTupleWhenSingular<["foo"]>;
        type Nope = AllowNonTupleWhenSingular<["foo", "bar"]>;

        type cases = [
            Expect<Test<Yup, "equals",  "foo" | ["foo"]>>,
            Expect<Test<Nope, "equals", ["foo", "bar"]>>
        ];
        const cases: cases = [true, true];
    });


    it("exception when the singular value is an ErrorCondition", () => {
        type Err = AllowNonTupleWhenSingular<[ErrorCondition<"oops">]>;

        type cases = [
            ExpectTrue<IsEqual<Err, ErrorCondition<"oops">>>
        ];
        const cases: cases = [true];
    });


    it("handling a multidimensional tuple", () => {
        type T = AllowNonTupleWhenSingular<[readonly unknown[]]>;
        type T2 = AsArray<T>;

        type cases = [
            Expect<Test<T, "equals",  readonly unknown[] | [readonly unknown[]]>>,
            Expect<Test<T2, "equals",  unknown[] | [unknown[]]>>
        ];
        const cases: cases = [true, true];

    });



});

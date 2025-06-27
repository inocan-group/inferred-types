import { Expect, ReplaceType, Test, Unset } from "inferred-types/types";
import { describe, it } from "vitest";

describe("ReplaceType<TContent,TFind,TReplace>", () => {

    it("number to string", () => {
        type T1 = ReplaceType<number, number, string>;

        type cases = [
            Expect<Test<T1, "equals", string>>,
        ];
    });
    it("numeric literal to string literal", () => {
        type T1 = ReplaceType<42, 42, "foo">;

        type cases = [
            Expect<Test<T1, "equals", "foo">>,
        ];
    });


    it("null to string", () => {
        type T1 = ReplaceType<null, null, string>;

        type cases = [
            Expect<Test<T1, "equals", string>>,
        ];
    });

    it("string to null", () => {
        type T1 = ReplaceType<string, string, null>;

        type cases = [
            Expect<Test<T1, "equals", null>>,
        ];
    });

    it("number to null", () => {
        type T1 = ReplaceType<number, number, null>;

        type cases = [
            Expect<Test<T1, "equals", null>>,
        ];
    });

    it("null to number", () => {
        type T1 = ReplaceType<null, null, number>;

        type cases = [
            Expect<Test<T1, "equals", number>>,
        ];
    });

    it("number literal to null", () => {
        type T1 = ReplaceType<42, 42, null>;

        type cases = [
            Expect<Test<T1, "equals", null>>,
        ];
    });

    it("undefined to number literal", () => {
        type T1 = ReplaceType<undefined, undefined, 42>;

        type cases = [
            Expect<Test<T1, "equals", 42>>,
        ];
    });

    it("Unset to undefined", () => {
        type T1 = ReplaceType<Unset, Unset, undefined>;

        type cases = [
            Expect<Test<T1, "equals", undefined>>,
        ];
    });

    it("boolean to number", () => {
        type T1 = ReplaceType<boolean, boolean, number>;

        type cases = [
            Expect<Test<T1, "equals", number>>,
        ];
    });

    it("true to number", () => {
        type T1 = ReplaceType<true, true, number>;

        type cases = [
            Expect<Test<T1, "equals", number>>,
        ];
    });

    it("false to number", () => {
        type T1 = ReplaceType<false, false, number>;

        type cases = [
            Expect<Test<T1, "equals", number>>,
        ];
    });

    it("false to numeric literal", () => {
        type T1 = ReplaceType<false, false, 42>;

        type cases = [
            Expect<Test<T1, "equals", 42>>,
        ];
    });

    it("tuple type replacement of true", () => {
        type T1 = ReplaceType<[1, 2, 3, true], true, 4>;

        type cases = [
            Expect<Test<T1, "equals", [1, 2, 3, 4]>>,
        ];
    });


    it("tuple type replacement of numeric literal", () => {
        type T1 = ReplaceType<[42, 99, 99], 99, "foo">;

        type cases = [
            Expect<Test<T1, "equals", [42, "foo", "foo"]>>
        ];
    });


    it("union type replacement of numeric literal", () => {
        type T1 = ReplaceType<1 | 2 | 3, 3, 4>;

        type cases = [
            Expect<Test<T1, "equals", 1 | 2 | 4>>,
        ];
    });


    it("union type replace of true to numeric literal", () => {
        type T1 = ReplaceType<1 | 2 | 3 | true, true, 4>;

        type cases = [
            Expect<Test<T1, "equals", 1 | 2 | 3 | 4>>,
        ];
    });


});

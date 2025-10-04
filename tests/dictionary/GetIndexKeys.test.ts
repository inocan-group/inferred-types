import { describe, it } from "vitest";
import type {
    AssertEqual,
    DictionaryWithIndexKeys,
    Expect,
    GetIndexKeys,
    IsEqual,
    Test,
    UpperAlphaChar
} from "inferred-types/types";

describe("DictionaryWithIndexKeys", () => {

    it("wide string index", () => {
        // wide index key
        type T1 = DictionaryWithIndexKeys<{ foo: 1; bar: 2; [x: string]: unknown }>;


        type cases = [
            Expect<Test<T1, "equals", { [x: string]: unknown }>>,
        ];
    });


    it("string literal index", () => {
        // string literal index key
        type T1 = DictionaryWithIndexKeys<{ foo: 1; bar: 2; [x: `_${string}`]: string }>;
        // intersection with Record based index key
        type T2 = DictionaryWithIndexKeys<{ foo: 1; bar: 2} & Record<`_${string}`, string>>;

        type cases = [
            Expect<Test<T1, "equals", { [x: `_${string}`]: string }>>,
            Expect<Test<T2, "equals", { [x: `_${string}`]: string }>>,
        ];
    });


    it("multiple string literal indexes", () => {
        type T1 = DictionaryWithIndexKeys<{
            foo: 1; bar: 2; [x: `_${string}`]: string; [y: `.${string}`]: number
        }>;

        type cases = [
            Expect<Test<T1, "equals", {
                [x: `_${string}`]: string;
                [x: `.${string}`]: number;
            }>>
        ];
    });


    it("string and symbol indexes", () => {
        type T1 = DictionaryWithIndexKeys<
            {foo: 1; bar: 2; [x: string]: unknown; [y: symbol]: number}
        >

        type cases = [
            Expect<Test<T1, "equals", { [x:string]: unknown; [y: symbol]: number }>>
        ];
    });


    it("string literal and symbol indexes", () => {
        type T1 = DictionaryWithIndexKeys<
            {foo: 1; bar: 2; [x: `_${string}`]: string; [y: symbol]: number}
        >


        type X2 = IsEqual<
            T1,
            {foo: 1; bar: 2; [x: `_${string}`]: string; [y: symbol]: number}
        >

        type cases = [
            // TODO: this is NOT equal so should be reporting an error!
            Expect<AssertEqual<T1, { [x: `_${string}`]: string, [y: symbol]: number }>>,
            // TODO: this test is just for debugging above; it shows that the `IsEqual`
            // operator correctly states the T1 and the expected type are NOT EQUAL
            // even though the test above we have it reporting that they are equal!
            Expect<AssertEqual<X2, false>>,

        ];
    });



    it("multiple indexes", () => {
        type T1 = DictionaryWithIndexKeys<{ foo: 1; [x: `_${string}`]: string; [y: `${UpperAlphaChar}${string}`]: number }>;


        type cases = [
            Expect<Test<T1, "equals", { [x: `_${string}`]: string; [x: `${UpperAlphaChar}${string}`]: number }>>
        ];
    });

});

describe("GetIndexKeys", () => {

    it("wide string index", () => {
        type T1 = GetIndexKeys<{ foo: 1; bar: 2; [x: string]: unknown }>;

        type cases = [
            // Regular index signatures work
            Expect<Test<T1, "equals", string>>,
            // So do template literal signatures

        ];
    });


    it("string literal index", () => {
        type T1 = GetIndexKeys<{ foo: 1; bar: 2; [x: `_${string}`]: string }>;
        type T2 = GetIndexKeys<{ foo: 1; bar: 2} & Record<`_${string}`, string>>;

        type cases = [
            Expect<Test<T1, "equals", `_${string}`>>,
            Expect<Test<T2, "equals", `_${string}`>>,
        ];
    });

})

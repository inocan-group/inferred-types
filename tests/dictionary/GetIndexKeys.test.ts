import { describe, it } from "vitest";
import type {
    AssertEqual,
    OnlyIndexKeys,
    Expect,
    GetIndexKeys,
    Test,
    UpperAlphaChar
} from "inferred-types/types";


describe("GetIndexKeys", () => {

    it("wide string index", () => {
        type T1 = GetIndexKeys<{ foo: 1; bar: 2; [x: string]: unknown }>;

        type cases = [
            Expect<Test<T1, "equals", string>>,
        ];
    });


    it("symbol index", () => {
        type T1 = GetIndexKeys<{ foo: 1; bar: 2; [x: symbol]: unknown }>;

        type cases = [
            Expect<AssertEqual<T1, symbol>>
        ];
    });


    it("wide string and symbol indexes", () => {
        type T1 = GetIndexKeys<
            { foo: 1; bar: 2; [x: symbol]: unknown; [y: string]: number }
        >;

        type cases = [
            Expect<AssertEqual<T1, string | symbol>>
        ];
    });


    it("template literal index", () => {
        type T1 = GetIndexKeys<{ foo: 1; bar: 2; [x: `_${string}`]: string }>;
        type T2 = GetIndexKeys<{ foo: 1; bar: 2} & Record<`_${string}`, string>>;

        type cases = [
            Expect<Test<T1, "equals", `_${string}`>>,
            Expect<Test<T2, "equals", `_${string}`>>,
        ];
    });


    it("multiple template literal indexes", () => {
        type T1 = GetIndexKeys<
            { foo: 1; bar: 2; [x: `_${string}`]: string; [y: `.${string}`]: number }
        >;

        type cases = [
            Expect<AssertEqual<T1, `_${string}` | `.${string}`>>
        ];
    });


    it("template literal and symbol index", () => {
        type T1 = GetIndexKeys<
            { foo: 1; bar: 2; [x: `_${string}`]: string; [y: symbol]: number }
        >;

        type cases = [
            Expect<AssertEqual<T1, `_${string}` | symbol>>
        ];
    });



})


describe("OnlyIndexKeys", () => {

    it("wide string index", () => {
        // wide index key
        type T1 = OnlyIndexKeys<{ foo: 1; bar: 2; [x: string]: unknown }>;


        type cases = [
            Expect<Test<T1, "equals", { [x: string]: unknown }>>,
        ];
    });


    it("string literal index", () => {
        // string literal index key
        type T1 = OnlyIndexKeys<{ foo: 1; bar: 2; [x: `_${string}`]: string }>;
        // intersection with Record based index key
        type T2 = OnlyIndexKeys<{ foo: 1; bar: 2} & Record<`_${string}`, string>>;

        type cases = [
            Expect<Test<T1, "equals", { [x: `_${string}`]: string }>>,
            Expect<Test<T2, "equals", { [x: `_${string}`]: string }>>,
        ];
    });


    it("multiple string literal indexes", () => {
        type T1 = OnlyIndexKeys<{
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
        type T1 = OnlyIndexKeys<
            {foo: 1; bar: 2; [x: string]: unknown; [y: symbol]: number}
        >

        type cases = [
            Expect<Test<T1, "equals", { [x:string]: unknown; [y: symbol]: number }>>
        ];
    });


    it("string literal and symbol indexes", () => {
        type T1 = OnlyIndexKeys<
            {foo: 1; bar: 2; [x: `_${string}`]: string; [y: symbol]: number}
        >

        type cases = [
            // TODO: this is NOT equal so should be reporting an error!
            Expect<AssertEqual<T1, { [x: `_${string}`]: string, [y: symbol]: number }>>,

        ];
    });


    it("wide string and symbol indexes", () => {
        type T1 = OnlyIndexKeys<
            {foo: 1; bar: 2; [x: string]: number; [y: symbol]: number}
        >

        type cases = [
            Expect<AssertEqual<
                T1,
                {
                    [x: string]: number;
                    [x: symbol]: number;
                }
            >>
        ];
    });




    it("multiple indexes", () => {
        type T1 = OnlyIndexKeys<{ foo: 1; [x: `_${string}`]: string; [y: `${UpperAlphaChar}${string}`]: number }>;


        type cases = [
            Expect<Test<T1, "equals", { [x: `_${string}`]: string; [x: `${UpperAlphaChar}${string}`]: number }>>
        ];
    });

});

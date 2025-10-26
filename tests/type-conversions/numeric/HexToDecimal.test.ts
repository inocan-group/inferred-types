import { describe, it } from "vitest";
import {
    AssertEqual,
    Err,
    Expect,
    Test,
} from "inferred-types/types";
import { HexToDecimal } from "types/type-conversion/numeric";

describe("HexToDecimal", () => {

    it("one byte", () => {
        type T1 = HexToDecimal<"0">;
        type T2 = HexToDecimal<"FF">;
        type T3 = HexToDecimal<"7F">;

        type cases = [
            Expect<AssertEqual<T1, [0]>>,
            Expect<AssertEqual<T2, [255]>>,
            Expect<AssertEqual<T3, [127]>>,
        ];
    });


    it("two bytes", () => {
        type T1 = HexToDecimal<"FFFF">;

        type cases = [
            Expect<AssertEqual<T1, [255,255]>>,
        ];
    });

    it("three bytes", () => {
        type T1 = HexToDecimal<"FFFFFF">;

        type cases = [
            Expect<AssertEqual<T1, [255,255,255]>>,
        ];
    });


    it("with 0x prefix", () => {
        type T1 = HexToDecimal<"0x0">;
        type T2 = HexToDecimal<"0xFF">;

        type cases = [
            Expect<AssertEqual<T1, [0]>>,
            Expect<AssertEqual<T2, [255]>>,
        ];
    });


    it("wide string", () => {
        type T1 = HexToDecimal<string>;

        type cases = [
            Expect<AssertEqual<T1, number[] | Err<"invalid-type/hexadecimal">>>
        ];
    });


    it("wide number", () => {
        type T1 = HexToDecimal<number>;

        type cases = [
            Expect<AssertEqual<T1, number[]>>
        ];
    });


    it("one byte number", () => {
        type T1 = HexToDecimal<0xFF>;
        type T2 = HexToDecimal<0xEE>;

        type cases = [
           Expect<AssertEqual<T1, [255]>>,
           Expect<AssertEqual<T2, [238]>>,
        ];
    });


    it("two bye number", () => {
        type T3 = HexToDecimal<0xFFEE>;

        type cases = [
            /** type tests */
        ];
    });

});

import { describe, expect, it } from "vitest";
import {
    AssertEqual,
    Expect,
    RgbDecimalString,
    Test,
} from "inferred-types/types";
import { isRgbDecimal } from "runtime/domain/color/isRgbDecimal";

describe("isRgbDecimal(val)", () => {

    it("runtime: positive tests", () => {
        const t1 = isRgbDecimal("0");
        const t2 = isRgbDecimal("255");
        const t3 = isRgbDecimal("128");
        const t4 = isRgbDecimal(0);
        const t5 = isRgbDecimal(255);
        const t6 = isRgbDecimal(128);

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);
        expect(t4).toBe(true);
        expect(t5).toBe(true);
        expect(t6).toBe(true);
    });

    it("runtime: negative tests", () => {
        const t1 = isRgbDecimal("-1");
        const t2 = isRgbDecimal("256");
        const t3 = isRgbDecimal(-1);
        const t4 = isRgbDecimal(256);

        expect(t1).toBe(false);
        expect(t2).toBe(false);
        expect(t3).toBe(false);
        expect(t4).toBe(false);
    });


    it("type narrowing when matched", () => {
        const val = "0" as string;

        if(isRgbDecimal(val)) {
            type Val = typeof val;

            type cases = [
                Expect<AssertEqual<Val, RgbDecimalString>>
            ];
        }

    });


});

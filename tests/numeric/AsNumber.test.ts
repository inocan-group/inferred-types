import { asNumber } from "inferred-types/runtime";
import { Expect, AsNumber, IsNever, Test } from "inferred-types/types";
import { describe, expect, it } from "vitest";



describe("AsNumber<T>", () => {

    it("Happy Path", () => {
        type Int = AsNumber<"3">;
        type Float = AsNumber<"3.4">;
        type NegInt = AsNumber<"-3">;
        type NegFloat = AsNumber<"-3.4">;

        type cases = [
            Expect<Test<Int, "equals", 3>>,
            Expect<Test<Float, "equals", 3.4>>,
            Expect<Test<NegInt, "equals", -3>>,
            Expect<Test<NegFloat, "equals", -3.4>>,

            IsNever<AsNumber<"foobar">>
        ];
    });


    it("leading zero", () => {
        type One = AsNumber<"01">;
        type Zero = AsNumber<"00">;

        type cases = [
            Expect<Test<One, "equals", 1>>,
            Expect<Test<Zero, "equals", 0>>,
        ];
    });



    it("can handle leading zeros", () => {
        type Five = AsNumber<"005">;
        type NegFive = AsNumber<"-005">;

        type cases = [
            Expect<Test<Five, "equals", 5>>,
            Expect<Test<NegFive, "equals", -5>>,
        ];
    });


});


describe("asNumber(val)", () => {

    it("number", () => {
        const five = asNumber(5);
        const negFive = asNumber(-5);
        const zero = asNumber(0);

        expect(five).toBe(5);
        expect(negFive).toBe(-5);
        expect(zero).toBe(0);

        type cases = [
            Expect<Test<typeof five, "equals", 5>>,
            Expect<Test<typeof negFive, "equals", -5>>,
            Expect<Test<typeof zero, "equals", 0>>,
        ];
    });

    it("string", () => {
        const five = asNumber("5");
        const negFive = asNumber("-5");
        const zero = asNumber("0");

        expect(five).toBe(5);
        expect(negFive).toBe(-5);
        expect(zero).toBe(0);

        type cases = [
            Expect<Test<typeof five, "equals", 5>>,
            Expect<Test<typeof negFive, "equals", -5>>,
            Expect<Test<typeof zero, "equals", 0>>,
        ];
    });

    it("string, leading zeros", () => {
        const five = asNumber("05");
        const negFive = asNumber("-05");
        const zero = asNumber("00");

        expect(five).toBe(5);
        expect(negFive).toBe(-5);
        expect(zero).toBe(0);

        type cases = [
            Expect<Test<typeof five, "equals", 5>>,
            Expect<Test<typeof negFive, "equals", -5>>,
        ];
    });

})

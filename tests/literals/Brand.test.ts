import { describe, it } from "vitest";
import {
    Brand,
    BrandSymbol,
    Expect,
    FourDigitYear,
    IsTwoDigitDate,
    IsTwoDigitMonth,
    TakeDate,
    TakeMonth,
    TakeYear,
    Test,
    TwoDigitDate,
    TwoDigitMonth,
    Unbrand,
} from "inferred-types/types";

describe("Brand & Unbrand", () => {

    it("Direct Branding", () => {
        type Direct1 = Brand<"2024", "FourDigitYear">;
        type Direct2 = FourDigitYear<"2024">;

        type Revert1 = Unbrand<Direct1>;
        type Revert2 = Unbrand<Direct2>;

        type cases = [
            Expect<Test<
                Direct1, "equals",
                "2024" & { [BrandSymbol]: "FourDigitYear"}
            >>,
            Expect<Test<
                Direct1, "equals",
                Direct2
            >>,
            Expect<Test<Revert1, "equals", "2024">>,
            Expect<Test<Revert2, "equals", "2024">>,
        ];
    });




});


describe("Branded Types", () => {


    it("FourDigitYear", () => {
        type T1 = FourDigitYear<"2024">;
        type F1 = FourDigitYear<"224">;
        type U1 = Unbrand<T1>;

        type cases = [
            Expect<Test<T1, "extends", FourDigitYear<"branded">>>,
            Expect<Test<F1, "isError", "invalid-type">>,
            Expect<Test<U1, "equals", "2024">>
        ];
    });


    it("TakeYear -> FourDigitYear", () => {
        type T1 = TakeYear<"2024">["take"];
        type U1 = Unbrand<T1>;

        type cases = [
            Expect<Test<U1, "equals", "2024">>
        ];
    });

    it("TwoDigitMonth", () => {
        type T1 = TwoDigitMonth<"12">;
        // false
        type I1 = IsTwoDigitMonth<"1">;
        // ERROR: sets as a branded type!!
        type F1 = TwoDigitMonth<"1">;
        // ERROR: can't unbrand
        type U1 = Unbrand<T1>;

        type cases = [
            Expect<Test<T1, "extends", TwoDigitMonth<"branded">>>,
            Expect<Test<F1, "isError", "invalid-type">>,
            Expect<Test<U1, "equals", "12">>
        ];
    });


    it("TakeMonth -> TwoDigitMonth", () => {
        type T1 = TakeMonth<"12">["take"];
        type U1 = Unbrand<T1>;

        type cases = [
            Expect<Test<U1, "equals", "12">>
        ];
    });



    it("TwoDigitDate", () => {
        type T1 = TwoDigitDate<"12">;
        type F1 = TwoDigitDate<"1">;
        type I1 = IsTwoDigitDate<"1">;
        type U1 = Unbrand<T1>;

        type cases = [
            Expect<Test<T1, "extends", TwoDigitDate<"branded">>>,
            Expect<Test<F1, "isError", "invalid-type">>,
            Expect<Test<U1, "equals", "12">>
        ];
    });


    it("TakeDate -> TwoDigitDate", () => {
        type T1 = TakeDate<"20", undefined, "2024">["take"];
        type U1 = Unbrand<T1>;

        type cases = [
            Expect<Test<U1, "equals", "20">>
        ];
    });

})

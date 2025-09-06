import { describe, it } from "vitest";
import {
    Brand,
    BrandSymbol,
    Expect,
    FourDigitYear,
    IsBranded,
    IsTwoDigitMonth,
    TakeDate,
    TakeMonth,
    TakeYear,
    Test,
    TwoDigitDate,
    TwoDigitMonth,
    Unbrand,
    GetBrand,
    ParseDate,
    AsDateMeta,
    ParsedDate
} from "inferred-types/types";
import { UnbrandValues } from "types/literals/branding/UnbrandValues";


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


    it("IsBranded<T>", () => {
        type NotBranded = "02";
        type Branded = TwoDigitMonth<NotBranded>;
        type Stripped = Unbrand<Branded>;

        type T1 = IsBranded<Branded>;
        type F1 = IsBranded<NotBranded>;
        type F2 = IsBranded<Stripped>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
        ];
    });


    it("GetBrand<T>", () => {
        type NotBranded = "02";
        type Branded = TwoDigitMonth<NotBranded>;
        type DirectBrand = Brand<"02", "TwoDigitMonth">;
        type Stripped = Unbrand<Branded>;

        type B = GetBrand<Branded>;
        type DB = GetBrand<DirectBrand>;
        type NB1 = GetBrand<NotBranded>;
        type NB2 = GetBrand<Stripped>;

        type cases = [
            Expect<Test<B, "equals", "TwoDigitMonth">>,
            Expect<Test<DB, "equals", "TwoDigitMonth">>,
            Expect<Test<NB1, "equals", undefined>>,
            Expect<Test<NB2, "equals", undefined>>,
        ];
    });


    it("Unbrand<T>", () => {
        type Nada = Unbrand<"nada">;
        type Year = Unbrand<FourDigitYear<"1999">>;
        type YearUnion = Unbrand<FourDigitYear<"1999"> | null>

        type cases = [
            Expect<Test<Nada, "equals", "nada">>,
            Expect<Test<Year, "equals", "1999">>,
            Expect<Test<YearUnion, "equals", "1999" | null>>,
        ];
    });



    it("UnbrandValues<T>", () => {
        type Iso = "2024-09-23";
        type Parsed = ParseDate<Iso>;
        type Parsed_Unbranded = UnbrandValues<Parsed>;
        type Meta = AsDateMeta<Parsed>;
        type Meta_Unbranded = UnbrandValues<Meta>;
        type Wide = UnbrandValues<ParsedDate>;
        type WYear = Wide[0];

        type cases = [
            Expect<Test<Parsed_Unbranded, "equals", [ "2024", "09", "23", null ]>>,
            Expect<Test<Meta_Unbranded, "equals", {
                date: "23";
                year: "2024";
                dateType: "date";
                hasTime: false;
                month: "09";
                hour: null;
                minute: null;
                second: null;
                ms: null;
                timezone: null;
            }>>,
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
        type U1 = Unbrand<T1>;

        type cases = [
            Expect<Test<T1, "extends", TwoDigitDate<"branded">>>,
            Expect<Test<F1, "isError", "invalid-type">>,
            Expect<Test<U1, "equals", "12">>
        ];
    });


    it("TakeDate -> TwoDigitDate", () => {
        type T1 = TakeDate<"20">["take"];
        type U1 = Unbrand<T1>;

        type cases = [
            Expect<Test<U1, "equals", "20">>
        ];
    });

})

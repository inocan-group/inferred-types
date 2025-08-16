import { describe, it } from "vitest";
import { Expect, Test } from "inferred-types/types";
import { IsTwoDigitMonth } from "inferred-types/types";

describe("IsTwoDigitMonth<T>", () => {

    it("valid two-digit months (01-12)", () => {
        type M01 = IsTwoDigitMonth<"01">;
        type M02 = IsTwoDigitMonth<"02">;
        type M03 = IsTwoDigitMonth<"03">;
        type M04 = IsTwoDigitMonth<"04">;
        type M05 = IsTwoDigitMonth<"05">;
        type M06 = IsTwoDigitMonth<"06">;
        type M07 = IsTwoDigitMonth<"07">;
        type M08 = IsTwoDigitMonth<"08">;
        type M09 = IsTwoDigitMonth<"09">;
        type M10 = IsTwoDigitMonth<"10">;
        type M11 = IsTwoDigitMonth<"11">;
        type M12 = IsTwoDigitMonth<"12">;

        type cases = [
            Expect<Test<M01, "equals", true>>,
            Expect<Test<M02, "equals", true>>,
            Expect<Test<M03, "equals", true>>,
            Expect<Test<M04, "equals", true>>,
            Expect<Test<M05, "equals", true>>,
            Expect<Test<M06, "equals", true>>,
            Expect<Test<M07, "equals", true>>,
            Expect<Test<M08, "equals", true>>,
            Expect<Test<M09, "equals", true>>,
            Expect<Test<M10, "equals", true>>,
            Expect<Test<M11, "equals", true>>,
            Expect<Test<M12, "equals", true>>,
        ];
    });

    it("invalid two-digit month values", () => {
        type M00 = IsTwoDigitMonth<"00">;
        type M13 = IsTwoDigitMonth<"13">;
        type M14 = IsTwoDigitMonth<"14">;
        type M20 = IsTwoDigitMonth<"20">;
        type M99 = IsTwoDigitMonth<"99">;

        type cases = [
            Expect<Test<M00, "equals", false>>,
            Expect<Test<M13, "equals", false>>,
            Expect<Test<M14, "equals", false>>,
            Expect<Test<M20, "equals", false>>,
            Expect<Test<M99, "equals", false>>,
        ];
    });

    it("single digit months without leading zero", () => {
        type M1 = IsTwoDigitMonth<"1">;
        type M2 = IsTwoDigitMonth<"2">;
        type M9 = IsTwoDigitMonth<"9">;

        type cases = [
            Expect<Test<M1, "equals", false>>,
            Expect<Test<M2, "equals", false>>,
            Expect<Test<M9, "equals", false>>,
        ];
    });

    it("strings with extra characters", () => {
        type Prefix = IsTwoDigitMonth<"X01">;
        type Suffix = IsTwoDigitMonth<"01X">;
        type Extra = IsTwoDigitMonth<"012">;
        type Spaces = IsTwoDigitMonth<" 01">;
        type SpacesSuffix = IsTwoDigitMonth<"01 ">;

        type cases = [
            Expect<Test<Prefix, "equals", false>>,
            Expect<Test<Suffix, "equals", false>>,
            Expect<Test<Extra, "equals", false>>,
            Expect<Test<Spaces, "equals", false>>,
            Expect<Test<SpacesSuffix, "equals", false>>,
        ];
    });

    it("non-numeric strings", () => {
        type Letters = IsTwoDigitMonth<"ab">;
        type Mixed = IsTwoDigitMonth<"a1">;
        type Mixed2 = IsTwoDigitMonth<"1a">;
        type Empty = IsTwoDigitMonth<"">;

        type cases = [
            Expect<Test<Letters, "equals", false>>,
            Expect<Test<Mixed, "equals", false>>,
            Expect<Test<Mixed2, "equals", false>>,
            Expect<Test<Empty, "equals", false>>,
        ];
    });

    it("generic string type returns boolean", () => {
        type GenericString = IsTwoDigitMonth<string>;
        type StringUnion = IsTwoDigitMonth<"01" | "13">;
        type StringUnion2 = IsTwoDigitMonth<"01" | "02">;
        type StringUnion3 = IsTwoDigitMonth<"01" | string>;

        type cases = [
            Expect<Test<GenericString, "equals", boolean>>,
            // Union types distribute over conditional types
            // "01" | "13" => true | false => boolean
            Expect<Test<StringUnion, "equals", boolean>>,
            // "01" | "02" => true | true => true
            Expect<Test<StringUnion2, "equals", true>>,
            // When union contains generic string, it should be boolean
            Expect<Test<StringUnion3, "equals", boolean>>,
        ];
    });

    it("edge cases with non-string types", () => {
        type NumberType = IsTwoDigitMonth<12>;
        type BooleanType = IsTwoDigitMonth<true>;
        type NullType = IsTwoDigitMonth<null>;
        type UndefinedType = IsTwoDigitMonth<undefined>;

        type cases = [
            Expect<Test<NumberType, "equals", false>>,
            Expect<Test<BooleanType, "equals", false>>,
            Expect<Test<NullType, "equals", false>>,
            Expect<Test<UndefinedType, "equals", false>>,
        ];
    });

    it("template literal types", () => {
        type Month = "01";
        type ValidMonth = IsTwoDigitMonth<`${Month}`>;
        type InvalidMonth = IsTwoDigitMonth<`month-${Month}`>;

        type cases = [
            Expect<Test<ValidMonth, "equals", true>>,
            Expect<Test<InvalidMonth, "equals", false>>,
        ];
    });

});

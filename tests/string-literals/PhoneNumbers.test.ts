import { describe, expect, it } from "vitest";
import {
    Expect,
    Extends,
    PhoneNumber,
    HasPhoneCountryCode,
    Test,
} from "inferred-types/types";
import { isPhoneNumber } from "inferred-types/runtime";



describe("isPhoneNumber(val)", () => {

    it("happy path", () => {
        const t1 = isPhoneNumber("555 1212");
        const t2 = isPhoneNumber("456 555 1212");
        const t3 = isPhoneNumber("+1 456 555 1212");
        const t4 = isPhoneNumber("+1 456.555.1212");
        const t5 = isPhoneNumber("+1 456-555-1212");
        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);
        expect(t4).toBe(true);
        expect(t5).toBe(true);
        const f1 = isPhoneNumber("45 5678")
        const f2 = isPhoneNumber("445 b5678")
        const f3 = isPhoneNumber("+1 456-555-1212a");
        expect(f1).toBe(false);
        expect(f2).toBe(false);
        expect(f3).toBe(false);
    });

});

describe("PhoneNumber<[T]>", () => {
    it("without generic", () => {
        type T1 = Extends<"555 1212", PhoneNumber>;
        type T2 = Extends<"555-1212", PhoneNumber>;
        type T3 = Extends<"555.1212", PhoneNumber>;

        type T4 = Extends<"203 555-1212", PhoneNumber>;
        type T5 = Extends<"203 555.1212", PhoneNumber>;
        type T6 = Extends<"203-555-1212", PhoneNumber>;
        type T7 = Extends<"(203) 555.1212", PhoneNumber>;
        type T8 = Extends<"203.555.1212", PhoneNumber>;

        type T9 = Extends<"+1 203.555.1212", PhoneNumber>;
        type T10 = Extends<"0044 203.555.1212", PhoneNumber>;

        // not enough number blocks when
        type F1 = Extends<"   ", PhoneNumber>;
        type F2 = Extends<"(555) 1212", PhoneNumber>;
        type F3 = Extends<"203.555.HI56", PhoneNumber>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
            Expect<Test<T5, "equals", true>>,
            Expect<Test<T6, "equals", true>>,
            Expect<Test<T7, "equals", true>>,
            Expect<Test<T8, "equals", true>>,
            Expect<Test<T9, "equals", true>>,
            Expect<Test<T10, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
        ];

    });

    it("with generic test", () => {
        type ValidUsNumber = PhoneNumber<"+1 555 456-1212">;
        type ValidUsNumber2 = PhoneNumber<"001 555 456-1212">;
        type InvalidUsNumber1 = PhoneNumber<"+1 555 456-121">;
        type InvalidUsNumber2 = PhoneNumber<"+1 555 456-A212">;

        type ValidUkNumber = PhoneNumber<"+44 0555 456-1212">;
        type ValidUkNumber2 = PhoneNumber<"0044 555 456-1212">;
        type InvalidUkNumber1 = PhoneNumber<"+44 555 456-121">;

        type InvalidCountryCode = PhoneNumber<"+666 555 456-1212">;

        type cases = [
            Expect<Test<ValidUsNumber, "equals", "+1 555 456-1212">>,
            Expect<Test<ValidUsNumber2, "equals", "001 555 456-1212">>,
            IsErrorCondition<InvalidUsNumber1, "invalid-phone-number">,
            IsErrorCondition<InvalidUsNumber2, "invalid-phone-number">,

            Expect<Test<ValidUkNumber, "equals", "+44 0555 456-1212">>,
            Expect<Test<ValidUkNumber2, "equals", "0044 555 456-1212">>,
            IsErrorCondition<InvalidUkNumber1, "invalid-phone-number">,

            IsErrorCondition<InvalidCountryCode, "invalid-phone-number">,
        ];
    });

});

describe("HasCountryCode<TPhone,TExplicit>", () => {

    it("first test", () => {
        type UK = HasPhoneCountryCode<"+44 798-947-9178">;
        type US = HasPhoneCountryCode<"+1 798-947-9178">;
        type Fake = HasPhoneCountryCode<"+666 798-947-9178">;
        type FakeNotExplicit = HasPhoneCountryCode<"+666 798-947-9178", false>;

        type cases = [
            Expect<Test<UK, "equals", true>>,
            Expect<Test<US, "equals", true>>,

            Expect<Test<Fake, "equals", false>>,
            Expect<Test<FakeNotExplicit, "equals", true>>,
        ];
    });

});



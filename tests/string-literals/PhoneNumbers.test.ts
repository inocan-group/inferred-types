import { Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import {
  Extends,
  PhoneNumber,
  IsErrorCondition,
  HasPhoneCountryCode,
} from "@inferred-types/types";
import { isPhoneNumber } from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

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
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,

      ExpectTrue<T4>,
      ExpectTrue<T5>,
      ExpectTrue<T6>,
      ExpectTrue<T7>,
      ExpectTrue<T8>,

      ExpectTrue<T9>,
      ExpectTrue<T10>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,

    ];
    const cases: cases = [
      true, true, true,
      true, true, true, true, true,
      true, true,
      false, false, false
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
      Expect<Equal<ValidUsNumber, "+1 555 456-1212">>,
      Expect<Equal<ValidUsNumber2, "001 555 456-1212">>,
      IsErrorCondition<InvalidUsNumber1, "invalid-phone-number">,
      IsErrorCondition<InvalidUsNumber2, "invalid-phone-number">,

      Expect<Equal<ValidUkNumber, "+44 0555 456-1212">>,
      Expect<Equal<ValidUkNumber2, "0044 555 456-1212">>,
      IsErrorCondition<InvalidUkNumber1, "invalid-phone-number">,

      IsErrorCondition<InvalidCountryCode, "invalid-phone-number">,

    ];
    const cases: cases = [
      true, true, true, true,
      true, true, true,
      true
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
      ExpectTrue<UK>,
      ExpectTrue<US>,

      ExpectFalse<Fake>,
      ExpectTrue<FakeNotExplicit>,
    ];
    const cases: cases = [
      true, true,
      false, true
    ];

  });

});



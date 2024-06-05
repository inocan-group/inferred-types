import { Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { removePhoneCountryCode } from "src/runtime/index"
import { Extends,  RemovePhoneCountryCode,  GetPhoneCountryCode,  PhoneNumber, InternationalPhoneNumber, IsErrorCondition } from "src/types/index";
import { getPhoneCountryCode, isPhoneNumber } from "src/runtime/index";

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

describe("PhoneNumber<[T>", () => {
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
    type InValidUsNumber1 = PhoneNumber<"+1 555 456-121">;

    type cases = [
      Expect<Equal<ValidUsNumber, "+1 555 456-1212">>,
      ExpectTrue<IsErrorCondition<InValidUsNumber1, "invalid-phone-number">>,

    ];
    const cases: cases = [
      true, true,
    ];

  });

});

describe("HasCountryCode<TPhone,TExplicit>", () => {

  it("first test", () => {


  });

});


describe("asPhoneNumber() and supporting utils", () => {

  it("GetPhoneCountryCode<T>", () => {
    type None = GetPhoneCountryCode<"555-1212">;
    type UK = GetPhoneCountryCode<"+44 798-947-9178">;
    type UK2 = GetPhoneCountryCode<"0044 798-947-9178">;
    type US = GetPhoneCountryCode<"001 798-947-9178">;
    type US2 = GetPhoneCountryCode<"+1 798-947-9178">;

    type cases = [
      Expect<Equal<None, "">>,
      Expect<Equal<UK, "44">>,
      Expect<Equal<UK2, "44">>,
      Expect<Equal<US, "1">>,
      Expect<Equal<US2, "1">>,
    ];
    const cases: cases = [
      true, true, true, true, true
    ];
  });


  it("RemovePhoneCountryCode<T>", () => {
    type Global = RemovePhoneCountryCode<"+44 07989479178">;
    type Country = RemovePhoneCountryCode<"07989479178">;
    type Local = RemovePhoneCountryCode<"555-1212">;

    type cases = [
      Expect<Equal<Global, "07989479178">>,
      Expect<Equal<Country, "07989479178">>,
      Expect<Equal<Local, "555-1212">>,
    ];
    const cases: cases = [
      true, true, true
    ];

  });

  it("getPhoneCountryCode()", () => {
    const none = getPhoneCountryCode("555-1212");
    const uk = getPhoneCountryCode("+44 798-947-9178");
    const uk2 = getPhoneCountryCode("0044 07989479178");
    const us = getPhoneCountryCode("+1 798-947-9178");


    expect(none).toBe("");
    expect(uk).toBe("44");
    expect(uk2).toBe("44");
    expect(us).toBe("1");

    type cases = [
      Expect<Equal<typeof none, "">>,
      Expect<Equal<typeof uk, "44">>,
      Expect<Equal<typeof uk2, "44">>,
      Expect<Equal<typeof us, "1">>,
    ];
    const cases: cases = [ true, true, true, true ];

  });


  it("getCountryPhoneNumber()", () => {
    const no_change = removePhoneCountryCode("442-555-1212");
    const uk = removePhoneCountryCode("+44 442-555-1212");

    expect(no_change).toBe("442-555-1212");
    expect(uk).toBe("442-555-1212");

    type cases = [
      /** type tests */
    ];
    const cases: cases = [];

  });


});

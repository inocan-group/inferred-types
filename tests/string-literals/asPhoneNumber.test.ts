import {
    getPhoneCountryCode,
    removePhoneCountryCode
} from "inferred-types/runtime";
import {
    Expect,
    GetPhoneCountryCode,
    GetPhoneNumberType,
    RemovePhoneCountryCode,
    Test
} from "inferred-types/types";
import { describe, expect, it } from "vitest";

describe("asPhoneNumber() and supporting utils", () => {

  it("GetPhoneCountryCode<T>", () => {
    type None = GetPhoneCountryCode<"555-1212">;
    type UK = GetPhoneCountryCode<"+44 798-947-9178">;
    type UK2 = GetPhoneCountryCode<"0044 798-947-9178">;
    type US = GetPhoneCountryCode<"001 798-947-9178">;
    type US2 = GetPhoneCountryCode<"+1 798-947-9178">;

    type cases = [
      Expect<Test<None, "equals",  "">>,
      Expect<Test<UK, "equals",  "44">>,
      Expect<Test<UK2, "equals",  "44">>,
      Expect<Test<US, "equals",  "1">>,
      Expect<Test<US2, "equals",  "1">>,
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
      Expect<Test<Global, "equals",  "07989479178">>,
      Expect<Test<Country, "equals",  "07989479178">>,
      Expect<Test<Local, "equals",  "555-1212">>,
    ];
    const cases: cases = [
      true, true, true
    ];

  });


  it("GetPhoneNumberType<T>", () => {
    type Intl = GetPhoneNumberType<"+44 7989449188">;
    type Intl2 = GetPhoneNumberType<"+1 7989449188">;
    type Country = GetPhoneNumberType<"07989449188">;
    type Country2 = GetPhoneNumberType<"0798-9449-188">;
    type Country3 = GetPhoneNumberType<"555-456-1212">;
    type Country4 = GetPhoneNumberType<"(203) 486-4455">;
    type Regional = GetPhoneNumberType<"486-4455">;
    type Regional2 = GetPhoneNumberType<"486.4455">;
    type Regional3 = GetPhoneNumberType<"486 4455">;
    type Regional4 = GetPhoneNumberType<"  4864455 ">;

    type cases = [
      Expect<Test<Intl, "equals",  "international">>,
      Expect<Test<Intl2, "equals",  "international">>,

      Expect<Test<Country, "equals",  "country">>,
      Expect<Test<Country2, "equals",  "country">>,
      Expect<Test<Country3, "equals",  "country">>,
      Expect<Test<Country4, "equals",  "country">>,

      Expect<Test<Regional, "equals",  "regional">>,
      Expect<Test<Regional2, "equals",  "regional">>,
      Expect<Test<Regional3, "equals",  "regional">>,
      Expect<Test<Regional4, "equals",  "regional">>,

    ];
    const cases: cases = [
      true, true,
      true, true, true, true,
      true, true, true, true,
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
      Expect<Test<typeof none, "equals",  "">>,
      Expect<Test<typeof uk, "equals",  "44">>,
      Expect<Test<typeof uk2, "equals",  "44">>,
      Expect<Test<typeof us, "equals",  "1">>,
    ];
    const cases: cases = [true, true, true, true];

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

  // it("asPhoneNumber()", () => {
  //   const usaParaDashed = asPhoneNumber("  +1 424-339-0625", "ParaDashed (e.g., (456) 555-1212)");
  //   const usaDotted = asPhoneNumber("+1 424-339-0625 ", "Dotted (e.g., 456.555.1212)");
  //   const usaDashed = asPhoneNumber("+1 424-339-0625 ", "Dashed (e.g., 456-555-1212)");

  //   expect(usaParaDashed).toBe("+1 (424) 339-0625");
  //   expect(usaDotted).toBe("+1 424.339.0625");
  //   expect(usaDashed).toBe("+1 424-339-0625");

  //   type cases = [
  //     /** type tests */
  //   ];
  //   const cases: cases = [];

  // });



});

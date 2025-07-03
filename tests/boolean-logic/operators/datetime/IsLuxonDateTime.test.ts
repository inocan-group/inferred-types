import { IsLuxonDateTime } from "inferred-types/types";
import { Expect, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("IsLuxonDateTime<T>", () => {
  
  it("Valid Luxon DateTime Objects", () => {
    type MockLuxonDateTime = {
      isValid: boolean;
      toISODate: () => string;
      toFormat: (format: string) => string;
      toMillis: () => number;
      year: number;
      month: number;
      day: number;
    };

    type cases = [
      // Complete Luxon DateTime-like object should return true
      Expect<Test<IsLuxonDateTime<MockLuxonDateTime>, "equals", true>>,
    ];
  });

  it("Invalid Luxon DateTime Objects", () => {
    type IncompleteLuxon = {
      isValid: boolean;
      toFormat: (format: string) => string;
      // Missing required properties
    };

    type cases = [
      // Incomplete objects should return false
      Expect<Test<IsLuxonDateTime<IncompleteLuxon>, "equals", false>>,
    ];
  });

  it("Non-Object Types", () => {
    type cases = [
      // Primitive types should return false
      Expect<Test<IsLuxonDateTime<string>, "equals", false>>,
      Expect<Test<IsLuxonDateTime<number>, "equals", false>>,
      Expect<Test<IsLuxonDateTime<boolean>, "equals", false>>,
      Expect<Test<IsLuxonDateTime<null>, "equals", false>>,
      Expect<Test<IsLuxonDateTime<undefined>, "equals", false>>,
      // Other datetime objects
      Expect<Test<IsLuxonDateTime<Date>, "equals", false>>,
    ];
  });

  it("Objects with Incorrect Property Types", () => {
    type WrongTypes = {
      isValid: string; // Should be boolean
      toISODate: string; // Should be function
      toFormat: (format: string) => string;
      toMillis: () => number;
      year: string; // Should be number
      month: number;
      day: number;
    };

    type cases = [
      Expect<Test<IsLuxonDateTime<WrongTypes>, "equals", false>>,
    ];
  });

  it("Empty and Minimal Objects", () => {
    type cases = [
      // Empty object should return false
      Expect<Test<IsLuxonDateTime<{}>, "equals", false>>,
      // Partial objects should return false
      Expect<Test<IsLuxonDateTime<{ isValid: boolean }>, "equals", false>>,
    ];
  });

});
import { AsDateMeta, IsIsoDateTime } from "inferred-types/types";
import { Expect, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("IsIsoDateTime<T>", () => {

  it("Full ISO DateTime Strings", () => {
    type cases = [
      // Standard full ISO datetime formats
      Expect<Test<IsIsoDateTime<"2023-01-01T00:00:00Z">, "equals", true>>,
      Expect<Test<IsIsoDateTime<"2023-12-31T23:59:59Z">, "equals", true>>,
      Expect<Test<IsIsoDateTime<"2024-02-29T12:30:45Z">, "equals", true>>,
      Expect<Test<IsIsoDateTime<"2023-06-15T18:45:30.123Z">, "equals", true>>,
      // With timezone offsets
      Expect<Test<IsIsoDateTime<"2023-01-01T12:00:00+05:00">, "equals", true>>,
      Expect<Test<IsIsoDateTime<"2023-01-01T12:00:00-08:00">, "equals", true>>,
    ];
  });

  it("Invalid DateTime Formats", () => {
    type cases = [
      // Non-ISO formats
      Expect<Test<IsIsoDateTime<"2023/01/01 12:00:00">, "equals", false>>,
      Expect<Test<IsIsoDateTime<"01/01/2023 12:00:00">, "equals", false>>,
      Expect<Test<IsIsoDateTime<"2023-01-01 12:00:00">, "equals", false>>, // Missing T
      Expect<Test<IsIsoDateTime<"2023-13-01T12:00:00Z">, "equals", false>>, // Invalid month
      Expect<Test<IsIsoDateTime<"2023-01-32T12:00:00Z">, "equals", false>>, // Invalid day
      Expect<Test<IsIsoDateTime<"2023-01-01T25:00:00Z">, "equals", false>>, // Invalid hour
      Expect<Test<IsIsoDateTime<"2023-01-01T12:60:00Z">, "equals", false>>, // Invalid minute
      Expect<Test<IsIsoDateTime<"2023-01-01T12:00:60Z">, "equals", false>>, // Invalid second
    ];
  });

  it("Date-Only Strings", () => {
    type cases = [
      // Date strings without time should return false
      Expect<Test<IsIsoDateTime<"2023-01-01">, "equals", false>>,
      Expect<Test<IsIsoDateTime<"2023-12-31">, "equals", false>>,
      Expect<Test<IsIsoDateTime<"2023">, "equals", false>>, // Year only
      Expect<Test<IsIsoDateTime<"2023-06">, "equals", false>>, // Year-month only
    ];
  });

  it("Time-Only Strings", () => {
    type cases = [
      // Time strings without date should return false
      Expect<Test<IsIsoDateTime<"12:00:00Z">, "equals", false>>,
      Expect<Test<IsIsoDateTime<"23:59:59Z">, "equals", false>>,
      Expect<Test<IsIsoDateTime<"06:30:15.123Z">, "equals", false>>,
    ];
  });

  it("Non-String Types", () => {
    type Null = IsIsoDateTime<null>;
    type Undef = IsIsoDateTime<undefined>;

    type cases = [
      // Non-string types should return false
      Expect<Test<IsIsoDateTime<number>, "equals", false>>,
      Expect<Test<IsIsoDateTime<Date>, "equals", false>>,
      Expect<Test<IsIsoDateTime<boolean>, "equals", false>>,
      Expect<Test<Null, "equals", false>>,
      Expect<Test<Undef, "equals", false>>,
      Expect<Test<IsIsoDateTime<{}>, "equals", false>>,
      Expect<Test<IsIsoDateTime<[]>, "equals", false>>,
    ];
  });

  it("Wide String Types", () => {
    type cases = [
      // Wide string type should return boolean
      Expect<Test<IsIsoDateTime<string>, "equals", boolean>>,
    ];
  });

  it("Union Types", () => {
    type T1 = IsIsoDateTime<"2023-01-01T00:00Z">;
    type P1 = AsDateMeta<"2023-01-01T00:00:00Z">;
    type U1 = IsIsoDateTime<"2023-01-01T00:00:00Z" | "2023-12-31T23:59:59Z">;
    type U2 = IsIsoDateTime<"2023-01-01T00:00:00Z" | "hello">;
    type U3 = IsIsoDateTime<"2023-01-01T00:00:00Z" | number>;

    type cases = [
      // Pure ISO datetime unions
      Expect<Test<U1, "equals", true>>,
      // Mixed unions
      Expect<Test<U2, "equals", boolean>>,
      Expect<Test<U3, "equals", boolean>>,
    ];
  });

  it("Edge Cases and Boundaries", () => {
    type cases = [
      // Leap year datetime
      Expect<Test<IsIsoDateTime<"2024-02-29T12:00:00Z">, "equals", true>>,
      // Year boundaries
      Expect<Test<IsIsoDateTime<"2023-12-31T23:59:59Z">, "equals", true>>,
      Expect<Test<IsIsoDateTime<"2024-01-01T00:00:00Z">, "equals", true>>,
      // Month boundaries
      Expect<Test<IsIsoDateTime<"2023-01-31T23:59:59Z">, "equals", true>>,
      Expect<Test<IsIsoDateTime<"2023-02-01T00:00:00Z">, "equals", true>>,
      // Different timezone formats
      Expect<Test<IsIsoDateTime<"2023-01-01T12:00:00+01:00">, "equals", true>>,
      Expect<Test<IsIsoDateTime<"2023-01-01T12:00:00-12:00">, "equals", true>>,
    ];
  });

});

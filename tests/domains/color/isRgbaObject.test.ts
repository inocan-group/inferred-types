import { isRgbaObject, narrow } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";
import type { Expect, AssertEqual, AssertTrue, AssertFalse, RGBA, IsRgbaObject } from "inferred-types/types";

describe("isRgbaObject(val)", () => {

  it("valid RGBA objects return true", () => {
    const rgba1 = { r: 0, g: 0, b: 0, a: 0 };
    const rgba2 = { r: 255, g: 255, b: 255, a: 1 };
    const rgba3 = { r: 127, g: 128, b: 129, a: 0.5 };
    const rgba4 = { r: 1.5, g: 2.7, b: 3.9, a: 0.25 };

    expect(isRgbaObject(rgba1)).toBe(true);
    expect(isRgbaObject(rgba2)).toBe(true);
    expect(isRgbaObject(rgba3)).toBe(true);
    expect(isRgbaObject(rgba4)).toBe(true);
  });

  it("RGBA objects with extra properties return true", () => {
    const withExtra = { r: 100, g: 150, b: 200, a: 0.8, extra: "value" };

    expect(isRgbaObject(withExtra)).toBe(true);
  });

  it("objects missing required properties return false", () => {
    // Missing 'a'
    expect(isRgbaObject({ r: 0, g: 0, b: 0 })).toBe(false);

    // Missing 'b'
    expect(isRgbaObject({ r: 0, g: 0, a: 1 })).toBe(false);

    // Missing 'g'
    expect(isRgbaObject({ r: 0, b: 0, a: 1 })).toBe(false);

    // Missing 'r'
    expect(isRgbaObject({ g: 0, b: 0, a: 1 })).toBe(false);

    // Empty object
    expect(isRgbaObject({})).toBe(false);
  });

  it("objects with non-numeric RGBA properties return false", () => {
    expect(isRgbaObject({ r: "0", g: 0, b: 0, a: 1 })).toBe(false);
    expect(isRgbaObject({ r: 0, g: "0", b: 0, a: 1 })).toBe(false);
    expect(isRgbaObject({ r: 0, g: 0, b: "0", a: 1 })).toBe(false);
    expect(isRgbaObject({ r: 0, g: 0, b: 0, a: "1" })).toBe(false);
    expect(isRgbaObject({ r: null, g: 0, b: 0, a: 1 })).toBe(false);
    expect(isRgbaObject({ r: undefined, g: 0, b: 0, a: 1 })).toBe(false);
    expect(isRgbaObject({ r: true, g: 0, b: 0, a: 1 })).toBe(false);
  });

  it("RGB objects (without alpha) return false", () => {
    const rgb = { r: 100, g: 150, b: 200 };

    // Should return false because it's missing the 'a' property
    expect(isRgbaObject(rgb)).toBe(false);
  });

  it("non-object values return false", () => {
    expect(isRgbaObject(null)).toBe(false);
    expect(isRgbaObject(undefined)).toBe(false);
    expect(isRgbaObject(123)).toBe(false);
    expect(isRgbaObject("rgba(0,0,0,1)")).toBe(false);
    expect(isRgbaObject([])).toBe(false);
    expect(isRgbaObject(true)).toBe(false);
    expect(isRgbaObject(() => {})).toBe(false);
  });

  it("properly narrows types", () => {
    const maybeRgba: unknown = { r: 127, g: 0, b: 255, a: 0.5 };

    if (isRgbaObject(maybeRgba)) {
      type T = typeof maybeRgba;

      type cases = [
        Expect<AssertEqual<T, RGBA>>
      ];

      // Should have access to r, g, b, a properties
      expect(maybeRgba.r).toBe(127);
      expect(maybeRgba.g).toBe(0);
      expect(maybeRgba.b).toBe(255);
      expect(maybeRgba.a).toBe(0.5);
    }
  });

  it("handles edge case numeric values", () => {
    // Negative numbers are invalid for color - should return false
    expect(isRgbaObject({ r: -1, g: 0, b: 0, a: 0 })).toBe(false);
    expect(isRgbaObject({ r: 0, g: -1, b: 0, a: 0 })).toBe(false);
    expect(isRgbaObject({ r: 0, g: 0, b: -1, a: 0 })).toBe(false);
    expect(isRgbaObject({ r: 100, g: 100, b: 100, a: -0.5 })).toBe(false);

    // Values over 255 for RGB are invalid - should return false
    expect(isRgbaObject({ r: 256, g: 0, b: 0, a: 1 })).toBe(false);
    expect(isRgbaObject({ r: 0, g: 256, b: 0, a: 1 })).toBe(false);
    expect(isRgbaObject({ r: 0, g: 0, b: 256, a: 1 })).toBe(false);
    expect(isRgbaObject({ r: 300, g: 400, b: 500, a: 1 })).toBe(false);

    // Alpha values outside 0-1 range are invalid - should return false
    expect(isRgbaObject({ r: 100, g: 100, b: 100, a: 1.1 })).toBe(false);
    expect(isRgbaObject({ r: 100, g: 100, b: 100, a: 2.0 })).toBe(false);

    // Zero values are valid (black with full transparency)
    expect(isRgbaObject({ r: 0, g: 0, b: 0, a: 0 })).toBe(true);

    // Decimal values within range are valid
    expect(isRgbaObject({ r: 0.5, g: 0.5, b: 0.5, a: 0.5 })).toBe(true);
    expect(isRgbaObject({ r: 127.5, g: 128.3, b: 200.7, a: 0.75 })).toBe(true);

    // Boundary values should be valid
    expect(isRgbaObject({ r: 0, g: 0, b: 0, a: 0 })).toBe(true);
    expect(isRgbaObject({ r: 255, g: 255, b: 255, a: 1 })).toBe(true);

    // NaN values should return false
    expect(isRgbaObject({ r: NaN, g: 0, b: 0, a: 1 })).toBe(false);
    expect(isRgbaObject({ r: 0, g: NaN, b: 0, a: 1 })).toBe(false);
    expect(isRgbaObject({ r: 0, g: 0, b: NaN, a: 1 })).toBe(false);
    expect(isRgbaObject({ r: 0, g: 0, b: 0, a: NaN })).toBe(false);

    // Infinity values should return false
    expect(isRgbaObject({ r: Infinity, g: 0, b: 0, a: 1 })).toBe(false);
    expect(isRgbaObject({ r: 0, g: Infinity, b: 0, a: 1 })).toBe(false);
    expect(isRgbaObject({ r: 0, g: 0, b: Infinity, a: 1 })).toBe(false);
    expect(isRgbaObject({ r: 0, g: 0, b: 0, a: Infinity })).toBe(false);
    expect(isRgbaObject({ r: -Infinity, g: 0, b: 0, a: 1 })).toBe(false);
  });

});

describe("IsRgbaObject<T> type utility", () => {

  it("accepts valid RGBA objects with numeric alpha (0-1)", () => {
    type ValidNumeric1 = IsRgbaObject<{ r: 0; g: 0; b: 0; a: 0 }>;
    type ValidNumeric2 = IsRgbaObject<{ r: 255; g: 255; b: 255; a: 1 }>;
    type ValidNumeric3 = IsRgbaObject<{ r: 127; g: 128; b: 129; a: 0.5 }>;
    type ValidNumeric4 = IsRgbaObject<{ r: 100; g: 150; b: 200; a: 0.75 }>;

    type cases = [
      Expect<AssertTrue<ValidNumeric1>>,
      Expect<AssertTrue<ValidNumeric2>>,
      Expect<AssertTrue<ValidNumeric3>>,
      Expect<AssertTrue<ValidNumeric4>>
    ];
  });

  it("accepts valid RGBA objects with percentage alpha (0%-100%)", () => {
    type ValidPercent1 = IsRgbaObject<{ r: 0; g: 0; b: 0; a: "0%" }>;
    type ValidPercent2 = IsRgbaObject<{ r: 255; g: 255; b: 255; a: "100%" }>;
    type ValidPercent3 = IsRgbaObject<{ r: 127; g: 128; b: 129; a: "50%" }>;
    type ValidPercent4 = IsRgbaObject<{ r: 100; g: 150; b: 200; a: "75%" }>;
    type ValidPercent5 = IsRgbaObject<{ r: 200; g: 100; b: 50; a: "25%" }>;

    type cases = [
      Expect<AssertTrue<ValidPercent1>>,
      Expect<AssertTrue<ValidPercent2>>,
      Expect<AssertTrue<ValidPercent3>>,
      Expect<AssertTrue<ValidPercent4>>,
      Expect<AssertTrue<ValidPercent5>>
    ];
  });

  it("rejects invalid color values (out of range 0-255)", () => {
    type NegativeR = IsRgbaObject<{ r: -1; g: 0; b: 0; a: 0 }>;
    type NegativeG = IsRgbaObject<{ r: 0; g: -1; b: 0; a: 0 }>;
    type NegativeB = IsRgbaObject<{ r: 0; g: 0; b: -1; a: 0 }>;
    type OverR = IsRgbaObject<{ r: 256; g: 0; b: 0; a: 0 }>;
    type OverG = IsRgbaObject<{ r: 0; g: 256; b: 0; a: 0 }>;
    type OverB = IsRgbaObject<{ r: 0; g: 0; b: 256; a: 0 }>;

    type cases = [
      Expect<AssertFalse<NegativeR>>,
      Expect<AssertFalse<NegativeG>>,
      Expect<AssertFalse<NegativeB>>,
      Expect<AssertFalse<OverR>>,
      Expect<AssertFalse<OverG>>,
      Expect<AssertFalse<OverB>>
    ];
  });

  it("rejects non-integer color values", () => {
    type DecimalR = IsRgbaObject<{ r: 127.5; g: 0; b: 0; a: 0 }>;
    type DecimalG = IsRgbaObject<{ r: 0; g: 128.3; b: 0; a: 0 }>;
    type DecimalB = IsRgbaObject<{ r: 0; g: 0; b: 200.7; a: 0 }>;

    type cases = [
      Expect<AssertFalse<DecimalR>>,
      Expect<AssertFalse<DecimalG>>,
      Expect<AssertFalse<DecimalB>>
    ];
  });

  it("rejects invalid percentage alpha values (out of range 0%-100%)", () => {
    type NegativePercent = IsRgbaObject<{ r: 100; g: 100; b: 100; a: "-10%" }>;
    type OverPercent = IsRgbaObject<{ r: 100; g: 100; b: 100; a: "101%" }>;
    type OverPercent2 = IsRgbaObject<{ r: 100; g: 100; b: 100; a: "150%" }>;

    type cases = [
      Expect<AssertFalse<NegativePercent>>,
      Expect<AssertFalse<OverPercent>>,
      Expect<AssertFalse<OverPercent2>>
    ];
  });

  it("rejects objects with extra properties", () => {
    type WithExtra = IsRgbaObject<{ r: 100; g: 150; b: 200; a: 0.8; extra: string }>;

    type cases = [
      Expect<AssertFalse<WithExtra>>
    ];
  });

  it("rejects objects missing required properties", () => {
    type MissingA = IsRgbaObject<{ r: 0; g: 0; b: 0 }>;
    type MissingB = IsRgbaObject<{ r: 0; g: 0; a: 0 }>;
    type MissingG = IsRgbaObject<{ r: 0; b: 0; a: 0 }>;
    type MissingR = IsRgbaObject<{ g: 0; b: 0; a: 0 }>;
    type Empty = IsRgbaObject<{}>;

    type cases = [
      Expect<AssertFalse<MissingA>>,
      Expect<AssertFalse<MissingB>>,
      Expect<AssertFalse<MissingG>>,
      Expect<AssertFalse<MissingR>>,
      Expect<AssertFalse<Empty>>
    ];
  });

  it("rejects objects with non-numeric r/g/b properties", () => {
    type StringR = IsRgbaObject<{ r: "0"; g: 0; b: 0; a: 0 }>;
    type StringG = IsRgbaObject<{ r: 0; g: "0"; b: 0; a: 0 }>;
    type StringB = IsRgbaObject<{ r: 0; g: 0; b: "0"; a: 0 }>;

    type cases = [
      Expect<AssertFalse<StringR>>,
      Expect<AssertFalse<StringG>>,
      Expect<AssertFalse<StringB>>
    ];
  });

  it("rejects non-object types", () => {
    type Null = IsRgbaObject<null>;
    type Undefined = IsRgbaObject<undefined>;
    type Number = IsRgbaObject<123>;
    type String = IsRgbaObject<"rgba(0,0,0,1)">;
    type Array = IsRgbaObject<[]>;
    type Boolean = IsRgbaObject<true>;

    type cases = [
      Expect<AssertFalse<Null>>,
      Expect<AssertFalse<Undefined>>,
      Expect<AssertFalse<Number>>,
      Expect<AssertFalse<String>>,
      Expect<AssertFalse<Array>>,
      Expect<AssertFalse<Boolean>>
    ];
  });

  it("handles wide types for alpha value", () => {
    // Wide number should be rejected (could be out of 0-1 range)
    type WideNumber = IsRgbaObject<{ r: 100; g: 100; b: 100; a: number }>;

    // Wide string should be rejected (could be invalid percentage)
    type WideString = IsRgbaObject<{ r: 100; g: 100; b: 100; a: string }>;

    // Union of valid values should still work
    type UnionValid = IsRgbaObject<{ r: 100; g: 100; b: 100; a: 0.5 | "50%" }>;

    type cases = [
      Expect<AssertFalse<WideNumber>>,
      Expect<AssertFalse<WideString>>,
      Expect<AssertTrue<UnionValid>>
    ];
  });

  it("handles wide types for color values", () => {
    // Wide number for r/g/b should be rejected
    type WideR = IsRgbaObject<{ r: number; g: 100; b: 100; a: 0.5 }>;
    type WideG = IsRgbaObject<{ r: 100; g: number; b: 100; a: 0.5 }>;
    type WideB = IsRgbaObject<{ r: 100; g: 100; b: number; a: 0.5 }>;

    type cases = [
      Expect<AssertFalse<WideR>>,
      Expect<AssertFalse<WideG>>,
      Expect<AssertFalse<WideB>>
    ];
  });

  it("boundary value testing", () => {
    // Exact boundaries should pass
    type MinValues = IsRgbaObject<{ r: 0; g: 0; b: 0; a: 0 }>;
    type MaxValues = IsRgbaObject<{ r: 255; g: 255; b: 255; a: 1 }>;
    type MinPercent = IsRgbaObject<{ r: 0; g: 0; b: 0; a: "0%" }>;
    type MaxPercent = IsRgbaObject<{ r: 255; g: 255; b: 255; a: "100%" }>;

    type cases = [
      Expect<AssertTrue<MinValues>>,
      Expect<AssertTrue<MaxValues>>,
      Expect<AssertTrue<MinPercent>>,
      Expect<AssertTrue<MaxPercent>>
    ];
  });

  it("mixed valid alpha formats in same structure", () => {
    // Testing that both numeric and percentage formats are valid
    type NumericAlpha = IsRgbaObject<{ r: 100; g: 100; b: 100; a: 0.5 }>;
    type PercentAlpha = IsRgbaObject<{ r: 100; g: 100; b: 100; a: "50%" }>;

    type cases = [
      Expect<AssertTrue<NumericAlpha>>,
      Expect<AssertTrue<PercentAlpha>>
    ];
  });

});

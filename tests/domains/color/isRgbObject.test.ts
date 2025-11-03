import { isRgbObject } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";
import type { Expect, AssertEqual, AssertTrue, AssertFalse, RGB, IsRgbObject } from "inferred-types/types";

describe("isRgbObject(val)", () => {

  it("valid RGB objects return true", () => {
    const rgb1 = { r: 0, g: 0, b: 0 };
    const rgb2 = { r: 255, g: 255, b: 255 };
    const rgb3 = { r: 127, g: 128, b: 129 };
    const rgb4 = { r: 1.5, g: 2.7, b: 3.9 };

    expect(isRgbObject(rgb1)).toBe(true);
    expect(isRgbObject(rgb2)).toBe(true);
    expect(isRgbObject(rgb3)).toBe(true);
    expect(isRgbObject(rgb4)).toBe(true);

    type cases = [
      Expect<AssertEqual<typeof rgb1, { r: number; g: number; b: number }>>,
      Expect<AssertEqual<typeof rgb2, { r: number; g: number; b: number }>>,
      Expect<AssertEqual<typeof rgb3, { r: number; g: number; b: number }>>,
      Expect<AssertEqual<typeof rgb4, { r: number; g: number; b: number }>>
    ];
  });

  it("RGB objects with extra properties return true", () => {
    const withExtra = { r: 100, g: 150, b: 200, extra: "value" };

    expect(isRgbObject(withExtra)).toBe(true);
  });

  it("objects missing required properties return false", () => {
    // Missing 'b'
    expect(isRgbObject({ r: 0, g: 0 })).toBe(false);

    // Missing 'g'
    expect(isRgbObject({ r: 0, b: 0 })).toBe(false);

    // Missing 'r'
    expect(isRgbObject({ g: 0, b: 0 })).toBe(false);

    // Empty object
    expect(isRgbObject({})).toBe(false);
  });

  it("objects with non-numeric RGB properties return false", () => {
    expect(isRgbObject({ r: "0", g: 0, b: 0 })).toBe(false);
    expect(isRgbObject({ r: 0, g: "0", b: 0 })).toBe(false);
    expect(isRgbObject({ r: 0, g: 0, b: "0" })).toBe(false);
    expect(isRgbObject({ r: null, g: 0, b: 0 })).toBe(false);
    expect(isRgbObject({ r: undefined, g: 0, b: 0 })).toBe(false);
    expect(isRgbObject({ r: true, g: 0, b: 0 })).toBe(false);
  });

  it("RGBA objects (with alpha) return false", () => {
    const rgba = { r: 100, g: 150, b: 200, a: 0.5 };

    // Should return false because it has an 'a' property
    expect(isRgbObject(rgba)).toBe(false);
  });

  it("non-object values return false", () => {
    expect(isRgbObject(null)).toBe(false);
    expect(isRgbObject(undefined)).toBe(false);
    expect(isRgbObject(123)).toBe(false);
    expect(isRgbObject("rgb(0,0,0)")).toBe(false);
    expect(isRgbObject([])).toBe(false);
    expect(isRgbObject(true)).toBe(false);
    expect(isRgbObject(() => {})).toBe(false);
  });

  it("properly narrows types", () => {
    const maybeRgb: unknown = { r: 127, g: 0, b: 255 };

    if (isRgbObject(maybeRgb)) {
      type T = typeof maybeRgb;

      type cases = [
        Expect<AssertEqual<T, RGB>>
      ];

      // Should have access to r, g, b properties
      expect(maybeRgb.r).toBe(127);
      expect(maybeRgb.g).toBe(0);
      expect(maybeRgb.b).toBe(255);
    }
  });

  it("handles edge case numeric values", () => {
    // Negative numbers (technically invalid for color but type guard should allow)
    expect(isRgbObject({ r: -1, g: 0, b: 0 })).toBe(true);

    // Values over 255 (technically invalid for color but type guard should allow)
    expect(isRgbObject({ r: 300, g: 400, b: 500 })).toBe(true);

    // Zero values
    expect(isRgbObject({ r: 0, g: 0, b: 0 })).toBe(true);

    // Decimal values
    expect(isRgbObject({ r: 0.5, g: 0.5, b: 0.5 })).toBe(true);

    // NaN values should return false
    expect(isRgbObject({ r: NaN, g: 0, b: 0 })).toBe(false);

    // Infinity values should return false
    expect(isRgbObject({ r: Infinity, g: 0, b: 0 })).toBe(false);
  });

});

describe("IsRgbObject<T>", () => {

  it("returns true for valid RGB objects with literal values 0-255", () => {
    type ValidMin = IsRgbObject<{ r: 0; g: 0; b: 0 }>;
    type ValidMax = IsRgbObject<{ r: 255; g: 255; b: 255 }>;
    type ValidMid = IsRgbObject<{ r: 127; g: 128; b: 129 }>;
    type ValidBoundary = IsRgbObject<{ r: 1; g: 254; b: 100 }>;

    type cases = [
      Expect<AssertTrue<ValidMin>>,
      Expect<AssertTrue<ValidMax>>,
      Expect<AssertTrue<ValidMid>>,
      Expect<AssertTrue<ValidBoundary>>
    ];
  });

  it("returns false for objects with values outside 0-255 range", () => {
    type NegativeR = IsRgbObject<{ r: -1; g: 0; b: 0 }>;
    type NegativeG = IsRgbObject<{ r: 0; g: -100; b: 0 }>;
    type NegativeB = IsRgbObject<{ r: 0; g: 0; b: -255 }>;
    type OverMaxR = IsRgbObject<{ r: 256; g: 0; b: 0 }>;
    type OverMaxG = IsRgbObject<{ r: 0; g: 300; b: 0 }>;
    type OverMaxB = IsRgbObject<{ r: 0; g: 0; b: 1000 }>;

    type cases = [
      Expect<AssertFalse<NegativeR>>,
      Expect<AssertFalse<NegativeG>>,
      Expect<AssertFalse<NegativeB>>,
      Expect<AssertFalse<OverMaxR>>,
      Expect<AssertFalse<OverMaxG>>,
      Expect<AssertFalse<OverMaxB>>
    ];
  });

  it("returns false for objects with decimal/float values", () => {
    type DecimalR = IsRgbObject<{ r: 1.5; g: 0; b: 0 }>;
    type DecimalG = IsRgbObject<{ r: 0; g: 127.5; b: 0 }>;
    type DecimalB = IsRgbObject<{ r: 0; g: 0; b: 255.1 }>;
    type AllDecimal = IsRgbObject<{ r: 100.5; g: 150.7; b: 200.9 }>;

    type cases = [
      Expect<AssertFalse<DecimalR>>,
      Expect<AssertFalse<DecimalG>>,
      Expect<AssertFalse<DecimalB>>,
      Expect<AssertFalse<AllDecimal>>
    ];
  });

  it("returns false for objects missing required properties", () => {
    type MissingR = IsRgbObject<{ g: 100; b: 150 }>;
    type MissingG = IsRgbObject<{ r: 100; b: 150 }>;
    type MissingB = IsRgbObject<{ r: 100; g: 150 }>;
    type EmptyObject = IsRgbObject<{}>;
    type OnlyR = IsRgbObject<{ r: 100 }>;

    type cases = [
      Expect<AssertFalse<MissingR>>,
      Expect<AssertFalse<MissingG>>,
      Expect<AssertFalse<MissingB>>,
      Expect<AssertFalse<EmptyObject>>,
      Expect<AssertFalse<OnlyR>>
    ];
  });

  it("returns false for objects with wrong property types", () => {
    type StringR = IsRgbObject<{ r: "100"; g: 100; b: 100 }>;
    type StringG = IsRgbObject<{ r: 100; g: "100"; b: 100 }>;
    type StringB = IsRgbObject<{ r: 100; g: 100; b: "100" }>;
    type BooleanR = IsRgbObject<{ r: true; g: 100; b: 100 }>;
    type NullR = IsRgbObject<{ r: null; g: 100; b: 100 }>;
    type UndefinedR = IsRgbObject<{ r: undefined; g: 100; b: 100 }>;

    type cases = [
      Expect<AssertFalse<StringR>>,
      Expect<AssertFalse<StringG>>,
      Expect<AssertFalse<StringB>>,
      Expect<AssertFalse<BooleanR>>,
      Expect<AssertFalse<NullR>>,
      Expect<AssertFalse<UndefinedR>>
    ];
  });

  it("returns false for RGB objects with extra properties", () => {
    type WithExtra = IsRgbObject<{ r: 100; g: 150; b: 200; extra: string }>;
    type WithMultipleExtra = IsRgbObject<{ r: 0; g: 0; b: 0; foo: number; bar: boolean }>;

    type cases = [
      Expect<AssertFalse<WithExtra>>,
      Expect<AssertFalse<WithMultipleExtra>>
    ];
  });

  it("returns false for RGBA objects (with alpha channel)", () => {
    type WithAlpha = IsRgbObject<{ r: 100; g: 150; b: 200; a: 0.5 }>;
    type WithAlphaInteger = IsRgbObject<{ r: 100; g: 150; b: 200; a: 1 }>;

    // RGB objects must have ONLY r, g, b properties. Objects with alpha are RGBA, not RGB.
    type cases = [
      Expect<AssertFalse<WithAlpha>>,
      Expect<AssertFalse<WithAlphaInteger>>
    ];
  });

  it("returns false for non-object types", () => {
    type Null = IsRgbObject<null>;
    type Undefined = IsRgbObject<undefined>;
    type String = IsRgbObject<string>;
    type Number = IsRgbObject<number>;
    type Boolean = IsRgbObject<boolean>;
    type Array = IsRgbObject<[]>;
    type Function = IsRgbObject<() => void>;

    type cases = [
      Expect<AssertFalse<Null>>,
      Expect<AssertFalse<Undefined>>,
      Expect<AssertFalse<String>>,
      Expect<AssertFalse<Number>>,
      Expect<AssertFalse<Boolean>>,
      Expect<AssertFalse<Array>>,
      Expect<AssertFalse<Function>>
    ];
  });

  it("returns false for wide number types", () => {
    type WideR = IsRgbObject<{ r: number; g: 100; b: 100 }>;
    type WideG = IsRgbObject<{ r: 100; g: number; b: 100 }>;
    type WideB = IsRgbObject<{ r: 100; g: 100; b: number }>;
    type AllWide = IsRgbObject<{ r: number; g: number; b: number }>;

    type cases = [
      Expect<AssertFalse<WideR>>,
      Expect<AssertFalse<WideG>>,
      Expect<AssertFalse<WideB>>,
      Expect<AssertFalse<AllWide>>
    ];
  });

  it("handles union types with distributive conditional types", () => {
    // Conditional types distribute over unions: IsRgbObject<A | B> = IsRgbObject<A> | IsRgbObject<B>
    type UnionBothValid = IsRgbObject<{ r: 100; g: 150; b: 200 } | { r: 0; g: 0; b: 0 }>;
    type UnionOneInvalid = IsRgbObject<{ r: 100; g: 150; b: 200 } | string>;
    type UnionMixed = IsRgbObject<{ r: 100; g: 150; b: 200 } | { r: -1; g: 0; b: 0 }>;

    type cases = [
      // Both valid → true | true = true
      Expect<AssertEqual<UnionBothValid, true>>,
      // One valid, one invalid → true | false = boolean
      Expect<AssertEqual<UnionOneInvalid, boolean>>,
      Expect<AssertEqual<UnionMixed, boolean>>
    ];
  });

});

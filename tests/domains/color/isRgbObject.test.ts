import { isRgbObject } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";
import type { Expect, AssertEqual, RGB } from "inferred-types/types";

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

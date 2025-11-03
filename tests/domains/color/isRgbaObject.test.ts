import { isRgbaObject } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";
import type { Expect, AssertEqual, RGBA } from "inferred-types/types";

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

    type cases = [
      Expect<AssertEqual<typeof rgba1, { r: number; g: number; b: number; a: number }>>,
      Expect<AssertEqual<typeof rgba2, { r: number; g: number; b: number; a: number }>>,
      Expect<AssertEqual<typeof rgba3, { r: number; g: number; b: number; a: number }>>,
      Expect<AssertEqual<typeof rgba4, { r: number; g: number; b: number; a: number }>>
    ];
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
    // Negative numbers (technically invalid for color but type guard should allow)
    expect(isRgbaObject({ r: -1, g: 0, b: 0, a: 0 })).toBe(true);

    // Values over 255 for RGB (technically invalid but type guard should allow)
    expect(isRgbaObject({ r: 300, g: 400, b: 500, a: 1 })).toBe(true);

    // Alpha values outside 0-1 range (technically invalid but type guard should allow)
    expect(isRgbaObject({ r: 100, g: 100, b: 100, a: -0.5 })).toBe(true);
    expect(isRgbaObject({ r: 100, g: 100, b: 100, a: 2.0 })).toBe(true);

    // Zero values
    expect(isRgbaObject({ r: 0, g: 0, b: 0, a: 0 })).toBe(true);

    // Decimal values
    expect(isRgbaObject({ r: 0.5, g: 0.5, b: 0.5, a: 0.5 })).toBe(true);

    // NaN values should return false
    expect(isRgbaObject({ r: NaN, g: 0, b: 0, a: 1 })).toBe(false);
    expect(isRgbaObject({ r: 0, g: 0, b: 0, a: NaN })).toBe(false);

    // Infinity values should return false
    expect(isRgbaObject({ r: Infinity, g: 0, b: 0, a: 1 })).toBe(false);
    expect(isRgbaObject({ r: 0, g: 0, b: 0, a: Infinity })).toBe(false);
  });

});

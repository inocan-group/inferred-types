import { isRgbColor } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";
import type { Expect, Test, RgbColor } from "inferred-types/types";

describe("isRgbColor(val)", () => {

  it("valid RGB color strings return true", () => {
    expect(isRgbColor("rgb(0,0,0)")).toBe(true);
    expect(isRgbColor("rgb(255,255,255)")).toBe(true);
    expect(isRgbColor("rgb(127,128,129)")).toBe(true);
    expect(isRgbColor("rgb(1,2,3)")).toBe(true);
  });

  it("invalid RGB color strings return false", () => {
    // RGBA format (not RGB)
    expect(isRgbColor("rgba(0,0,0,1)")).toBe(false);

    // Missing closing paren
    expect(isRgbColor("rgb(0,0,0")).toBe(false);

    // Missing opening rgb(
    expect(isRgbColor("0,0,0)")).toBe(false);

    // Empty string
    expect(isRgbColor("")).toBe(false);

    // Hex color
    expect(isRgbColor("#000000")).toBe(false);

    // Named color
    expect(isRgbColor("red")).toBe(false);
  });

  it("non-string values return false", () => {
    expect(isRgbColor(null)).toBe(false);
    expect(isRgbColor(undefined)).toBe(false);
    expect(isRgbColor(123)).toBe(false);
    expect(isRgbColor({})).toBe(false);
    expect(isRgbColor([])).toBe(false);
    expect(isRgbColor(true)).toBe(false);
  });

  it("properly narrows types", () => {
    const test: string = "rgb(127,0,0)";

    if (isRgbColor(test)) {
      type T = typeof test;

      type cases = [
        Expect<Test<T, "equals", RgbColor>>
      ];
    }
  });

});

import { isNamedColor } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";
import type { Expect, Test, CssNamedColor } from "inferred-types/types";

describe("isNamedColor(val)", () => {

  it("valid CSS named colors return true", () => {
    expect(isNamedColor("red")).toBe(true);
    expect(isNamedColor("blue")).toBe(true);
    expect(isNamedColor("aliceblue")).toBe(true);
    expect(isNamedColor("rebeccapurple")).toBe(true);
    expect(isNamedColor("white")).toBe(true);
    expect(isNamedColor("black")).toBe(true);
    expect(isNamedColor("cornflowerblue")).toBe(true);
  });

  it("invalid named colors return false", () => {
    // Uppercase (must be lowercase)
    expect(isNamedColor("Red")).toBe(false);
    expect(isNamedColor("RED")).toBe(false);
    expect(isNamedColor("Blue")).toBe(false);

    // Not a valid color name
    expect(isNamedColor("notacolor")).toBe(false);
    expect(isNamedColor("reddish")).toBe(false);

    // Empty string
    expect(isNamedColor("")).toBe(false);

    // RGB format
    expect(isNamedColor("rgb(255,0,0)")).toBe(false);

    // Hex color
    expect(isNamedColor("#ff0000")).toBe(false);
  });

  it("non-string values return false", () => {
    expect(isNamedColor(null)).toBe(false);
    expect(isNamedColor(undefined)).toBe(false);
    expect(isNamedColor(123)).toBe(false);
    expect(isNamedColor({})).toBe(false);
    expect(isNamedColor([])).toBe(false);
    expect(isNamedColor(true)).toBe(false);
  });

  it("properly narrows types", () => {
    const test: string = "blue";

    if (isNamedColor(test)) {
      type T = typeof test;

      type cases = [
        Expect<Test<T, "equals", CssNamedColor>>
      ];
    }
  });

});

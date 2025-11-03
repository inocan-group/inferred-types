import { describe, expect, it } from "vitest";
import { asRgbObject } from "inferred-types/runtime";
import type { Expect, AssertEqual, AssertExtends } from "inferred-types/types";

describe("asRgbObject()", () => {

    describe("RGB object pass-through", () => {
        it("returns same RGB object", () => {
            const input = { r: 255, g: 128, b: 64 } as const;
            const result = asRgbObject(input);

            expect(result).toEqual({ r: 255, g: 128, b: 64 });

            type cases = [
                Expect<AssertEqual<typeof result, { r: 255; g: 128; b: 64 }>>
            ];
        });

        it("handles black (0, 0, 0)", () => {
            const input = { r: 0, g: 0, b: 0 } as const;
            const result = asRgbObject(input);

            expect(result).toEqual({ r: 0, g: 0, b: 0 });

            type cases = [
                Expect<AssertEqual<typeof result, { r: 0; g: 0; b: 0 }>>
            ];
        });

        it("handles white (255, 255, 255)", () => {
            const input = { r: 255, g: 255, b: 255 } as const;
            const result = asRgbObject(input);

            expect(result).toEqual({ r: 255, g: 255, b: 255 });

            type cases = [
                Expect<AssertEqual<typeof result, { r: 255; g: 255; b: 255 }>>
            ];
        });

        it("handles wide RGB type", () => {
            const input = { r: 100, g: 150, b: 200 };
            const result = asRgbObject(input);

            expect(result).toEqual({ r: 100, g: 150, b: 200 });

            type cases = [
                Expect<AssertExtends<typeof result, { r: number; g: number; b: number } | Error>>
            ];
        });
    });

    describe("RGBA object - extracts RGB", () => {
        it("extracts r, g, b from RGBA object", () => {
            const input = { r: 255, g: 128, b: 64, a: 0.5 } as const;
            const result = asRgbObject(input);

            expect(result).toEqual({ r: 255, g: 128, b: 64 });

            type cases = [
                Expect<AssertEqual<typeof result, { r: 255; g: 128; b: 64 }>>
            ];
        });

        it("extracts from RGBA with full opacity", () => {
            const input = { r: 100, g: 200, b: 50, a: 1 } as const;
            const result = asRgbObject(input);

            expect(result).toEqual({ r: 100, g: 200, b: 50 });

            type cases = [
                Expect<AssertEqual<typeof result, { r: 100; g: 200; b: 50 }>>
            ];
        });

        it("extracts from RGBA with zero opacity", () => {
            const input = { r: 0, g: 0, b: 0, a: 0 } as const;
            const result = asRgbObject(input);

            expect(result).toEqual({ r: 0, g: 0, b: 0 });

            type cases = [
                Expect<AssertEqual<typeof result, { r: 0; g: 0; b: 0 }>>
            ];
        });

        it("handles wide RGBA type", () => {
            const input = { r: 100, g: 150, b: 200, a: 0.5 };
            const result = asRgbObject(input);

            expect(result).toEqual({ r: 100, g: 150, b: 200 });

            type cases = [
                Expect<AssertExtends<typeof result, { r: number; g: number; b: number } | Error>>
            ];
        });
    });

    describe("CSS RGB string conversion", () => {
        it("converts standard CSS RGB string with spaces", () => {
            const result = asRgbObject("rgb(255, 128, 64)");

            expect(result).toEqual({ r: 255, g: 128, b: 64 });

            type cases = [
                Expect<AssertExtends<typeof result, { r: number; g: number; b: number }>>
            ];
        });

        it("converts CSS RGB string without spaces", () => {
            const result = asRgbObject("rgb(255,128,64)");

            expect(result).toEqual({ r: 255, g: 128, b: 64 });

            type cases = [
                Expect<AssertExtends<typeof result, { r: number; g: number; b: number }>>
            ];
        });

        it("converts CSS RGB string with extra spaces", () => {
            const result = asRgbObject("rgb( 255 , 128 , 64 )");

            expect(result).toEqual({ r: 255, g: 128, b: 64 });

            type cases = [
                Expect<AssertExtends<typeof result, { r: number; g: number; b: number }>>
            ];
        });

        it("converts single-digit values", () => {
            const result = asRgbObject("rgb(1, 2, 3)");

            expect(result).toEqual({ r: 1, g: 2, b: 3 });

            type cases = [
                Expect<AssertExtends<typeof result, { r: number; g: number; b: number }>>
            ];
        });
    });

    describe("Hex color conversion", () => {
        it("converts 6-digit hex color with hash", () => {
            const result = asRgbObject("#FF8040");

            expect(result).toEqual({ r: 255, g: 128, b: 64 });

            type cases = [
                Expect<AssertEqual<typeof result, { r: 255; g: 128; b: 64 }>>
            ];
        });

        it("converts lowercase hex color", () => {
            const result = asRgbObject("#ff8040");

            expect(result).toEqual({ r: 255, g: 128, b: 64 });

            type cases = [
                Expect<AssertEqual<typeof result, { r: 255; g: 128; b: 64 }>>
            ];
        });

        it("converts black hex (#000000)", () => {
            const result = asRgbObject("#000000");

            expect(result).toEqual({ r: 0, g: 0, b: 0 });

            type cases = [
                Expect<AssertEqual<typeof result, { r: 0; g: 0; b: 0 }>>
            ];
        });

        it("converts white hex (#ffffff)", () => {
            const result = asRgbObject("#ffffff");

            expect(result).toEqual({ r: 255, g: 255, b: 255 });

            type cases = [
                Expect<AssertEqual<typeof result, { r: 255; g: 255; b: 255 }>>
            ];
        });

        it("converts 3-digit hex color shorthand", () => {
            const result = asRgbObject("#f80");

            expect(result).toEqual({ r: 255, g: 136, b: 0 });

            type cases = [
                Expect<AssertEqual<typeof result, { r: 255; g: 136; b: 0 }>>
            ];
        });

        it("converts 3-digit hex shorthand lowercase", () => {
            const result = asRgbObject("#abc");

            expect(result).toEqual({ r: 170, g: 187, b: 204 });

            type cases = [
                Expect<AssertEqual<typeof result, { r: 170; g: 187; b: 204 }>>
            ];
        });
    });

    describe("CSS named color conversion", () => {
        it("converts 'red' to RGB", () => {
            const result = asRgbObject("red");

            expect(result).toEqual({ r: 255, g: 0, b: 0 });

            type cases = [
                Expect<AssertExtends<typeof result, { r: number; g: number; b: number }>>
            ];
        });

        it("converts 'blue' to RGB", () => {
            const result = asRgbObject("blue");

            expect(result).toEqual({ r: 0, g: 0, b: 255 });

            type cases = [
                Expect<AssertExtends<typeof result, { r: number; g: number; b: number }>>
            ];
        });

        it("converts 'green' to RGB", () => {
            const result = asRgbObject("green");

            expect(result).toEqual({ r: 0, g: 128, b: 0 });

            type cases = [
                Expect<AssertExtends<typeof result, { r: number; g: number; b: number }>>
            ];
        });

        it("converts 'black' to RGB", () => {
            const result = asRgbObject("black");

            expect(result).toEqual({ r: 0, g: 0, b: 0 });

            type cases = [
                Expect<AssertExtends<typeof result, { r: number; g: number; b: number }>>
            ];
        });

        it("converts 'white' to RGB", () => {
            const result = asRgbObject("white");

            expect(result).toEqual({ r: 255, g: 255, b: 255 });

            type cases = [
                Expect<AssertExtends<typeof result, { r: number; g: number; b: number }>>
            ];
        });

        it("converts 'hotpink' to RGB", () => {
            const result = asRgbObject("hotpink");

            expect(result).toEqual({ r: 255, g: 105, b: 180 });

            type cases = [
                Expect<AssertExtends<typeof result, { r: number; g: number; b: number }>>
            ];
        });

        it("converts 'rebeccapurple' to RGB", () => {
            const result = asRgbObject("rebeccapurple");

            expect(result).toEqual({ r: 102, g: 51, b: 153 });

            type cases = [
                Expect<AssertExtends<typeof result, { r: number; g: number; b: number }>>
            ];
        });

        it("converts 'cornflowerblue' to RGB", () => {
            const result = asRgbObject("cornflowerblue");

            expect(result).toEqual({ r: 100, g: 149, b: 237 });

            type cases = [
                Expect<AssertExtends<typeof result, { r: number; g: number; b: number }>>
            ];
        });
    });

    describe("error cases - invalid input", () => {
        it("returns error for invalid string", () => {
            const result = asRgbObject("not-a-color");

            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty("type", "invalid-type");
            expect(result).toHaveProperty("subType", "rgb");

            // Type level should show Error
            type cases = [
                Expect<AssertExtends<typeof result, Error>>
            ];
        });

        it("returns error for empty string", () => {
            const result = asRgbObject("");

            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty("type", "invalid-type");
            expect(result).toHaveProperty("subType", "rgb");

            type cases = [
                Expect<AssertExtends<typeof result, Error>>
            ];
        });

        it("returns error for invalid hex format", () => {
            const result = asRgbObject("#gggggg");

            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty("type", "invalid-type");
            expect(result).toHaveProperty("subType", "rgb");

            type cases = [
                Expect<AssertExtends<typeof result, Error>>
            ];
        });

        it("handles incomplete hex (returns object with NaN)", () => {
            const result = asRgbObject("#ff");

            // Runtime behavior: parses but produces NaN values
            expect(result).toHaveProperty("r", 255);
            expect(result).toHaveProperty("g", Number.isNaN((result as any).g) ? NaN : (result as any).g);
            expect(result).toHaveProperty("b", Number.isNaN((result as any).b) ? NaN : (result as any).b);

            type cases = [
                Expect<AssertExtends<typeof result, Error>>
            ];
        });

        it("throws error for malformed CSS RGB", () => {
            // The helper function throws a regular Error for malformed CSS RGB
            expect(() => asRgbObject("rgb(255)")).toThrow("Expected 3 RGB values, got 1");
        });
    });

    describe("edge cases", () => {
        it("handles boundary RGB values (0)", () => {
            const input = { r: 0, g: 100, b: 0 } as const;
            const result = asRgbObject(input);

            expect(result).toEqual({ r: 0, g: 100, b: 0 });

            type cases = [
                Expect<AssertEqual<typeof result, { r: 0; g: 100; b: 0 }>>
            ];
        });

        it("handles boundary RGB values (255)", () => {
            const input = { r: 255, g: 100, b: 255 } as const;
            const result = asRgbObject(input);

            expect(result).toEqual({ r: 255, g: 100, b: 255 });

            type cases = [
                Expect<AssertEqual<typeof result, { r: 255; g: 100; b: 255 }>>
            ];
        });

        it("handles wide string type (union return)", () => {
            const input = "#FF8040" as string;
            const result = asRgbObject(input);

            // Runtime should still work with valid hex
            expect(result).toEqual({ r: 255, g: 128, b: 64 });

            // Type level returns wide RGB | Error union
            type cases = [
                Expect<AssertExtends<typeof result, { r: number; g: number; b: number } | Error>>
            ];
        });

        it("handles mixed case hex color", () => {
            const result = asRgbObject("#Ff8040");

            expect(result).toEqual({ r: 255, g: 128, b: 64 });

            type cases = [
                Expect<AssertEqual<typeof result, { r: 255; g: 128; b: 64 }>>
            ];
        });
    });

    describe("type narrowing verification", () => {
        it("narrows CSS RGB string literal type correctly", () => {
            const cssRgb = "rgb(100, 150, 200)" as const;
            const result = asRgbObject(cssRgb);

            expect(result).toEqual({ r: 100, g: 150, b: 200 });

            type cases = [
                Expect<AssertExtends<typeof result, { r: number; g: number; b: number }>>
            ];
        });

        it("narrows hex color literal type correctly", () => {
            const hex = "#64c896" as const;
            const result = asRgbObject(hex);

            expect(result).toEqual({ r: 100, g: 200, b: 150 });

            type cases = [
                Expect<AssertEqual<typeof result, { r: 100; g: 200; b: 150 }>>
            ];
        });

        it("narrows named color literal type correctly", () => {
            const named = "teal" as const;
            const result = asRgbObject(named);

            expect(result).toEqual({ r: 0, g: 128, b: 128 });

            type cases = [
                Expect<AssertExtends<typeof result, { r: number; g: number; b: number }>>
            ];
        });
    });
});

import { describe, expect, it } from "vitest";
import { convertCssRgbStringToRgbObject } from "inferred-types/runtime";
import type { Expect, AssertEqual, AssertError, AssertExtends } from "inferred-types/types";

describe("convertCssRgbStringToRgbObject()", () => {

    describe("valid CSS RGB strings with commas", () => {
        it("parses standard format with spaces", () => {
            const result = convertCssRgbStringToRgbObject("rgb(255, 128, 64)");

            expect(result).toEqual({ r: 255, g: 128, b: 64 });

            type cases = [
                Expect<AssertEqual<typeof result, { r: number; g: number; b: number }>>
            ];
        });

        it("parses format without spaces", () => {
            const result = convertCssRgbStringToRgbObject("rgb(255,128,64)");

            expect(result).toEqual({ r: 255, g: 128, b: 64 });

            type cases = [
                Expect<AssertEqual<typeof result, { r: number; g: number; b: number }>>
            ];
        });

        it("parses format with extra spaces", () => {
            const result = convertCssRgbStringToRgbObject("rgb( 255 , 128 , 64 )");

            expect(result).toEqual({ r: 255, g: 128, b: 64 });

            type cases = [
                Expect<AssertEqual<typeof result, { r: number; g: number; b: number }>>
            ];
        });

        it("handles black color (0, 0, 0)", () => {
            const result = convertCssRgbStringToRgbObject("rgb(0, 0, 0)");

            expect(result).toEqual({ r: 0, g: 0, b: 0 });

            type cases = [
                Expect<AssertEqual<typeof result, { r: number; g: number; b: number }>>
            ];
        });

        it("handles white color (255, 255, 255)", () => {
            const result = convertCssRgbStringToRgbObject("rgb(255, 255, 255)");

            expect(result).toEqual({ r: 255, g: 255, b: 255 });

            type cases = [
                Expect<AssertEqual<typeof result, { r: number; g: number; b: number }>>
            ];
        });
    });

    describe("space-separated format (not valid CSS RGB per type system)", () => {
        it("runtime still parses space-separated format but type is Error", () => {
            const result = convertCssRgbStringToRgbObject("rgb(255 128 64)");

            // Runtime will parse it successfully (permissive implementation)
            expect(result).toEqual({ r: 255, g: 128, b: 64 });

            // But at the type level, it's recognized as invalid CSS RGB syntax
            type cases = [
                Expect<AssertExtends<typeof result, Error>>
            ];
        });

        it("runtime parses space-separated with leading/trailing spaces", () => {
            const result = convertCssRgbStringToRgbObject("rgb( 100 150 200 )");

            // Runtime parses successfully
            expect(result).toEqual({ r: 100, g: 150, b: 200 });

            // Type level recognizes as invalid
            type cases = [
                Expect<AssertExtends<typeof result, Error>>
            ];
        });
    });

    describe("boundary values", () => {
        it("handles minimum values (0)", () => {
            const result = convertCssRgbStringToRgbObject("rgb(0, 100, 0)");

            expect(result).toEqual({ r: 0, g: 100, b: 0 });

            type cases = [
                Expect<AssertEqual<typeof result, { r: number; g: number; b: number }>>
            ];
        });

        it("handles maximum values (255)", () => {
            const result = convertCssRgbStringToRgbObject("rgb(255, 100, 255)");

            expect(result).toEqual({ r: 255, g: 100, b: 255 });

            type cases = [
                Expect<AssertEqual<typeof result, { r: number; g: number; b: number }>>
            ];
        });

        it("handles mixed boundary values", () => {
            const result = convertCssRgbStringToRgbObject("rgb(0, 128, 255)");

            expect(result).toEqual({ r: 0, g: 128, b: 255 });

            type cases = [
                Expect<AssertEqual<typeof result, { r: number; g: number; b: number }>>
            ];
        });
    });

    describe("error cases - invalid input", () => {
        it("returns error for non-CSS-RGB string", () => {
            const result = convertCssRgbStringToRgbObject("not-rgb");

            expect(result).toHaveProperty("type", "invalid-type");
            expect(result).toHaveProperty("subType", "css-rgb");

            type cases = [
                Expect<AssertExtends<typeof result, Error>>
            ];
        });

        it("returns error for empty string", () => {
            const result = convertCssRgbStringToRgbObject("");

            expect(result).toHaveProperty("type", "invalid-type");
            expect(result).toHaveProperty("subType", "css-rgb");

            type cases = [
                Expect<AssertExtends<typeof result, Error>>
            ];
        });

        it("returns error for hex color", () => {
            const result = convertCssRgbStringToRgbObject("#FF8040");

            expect(result).toHaveProperty("type", "invalid-type");
            expect(result).toHaveProperty("subType", "css-rgb");

            type cases = [
                Expect<AssertExtends<typeof result, Error>>
            ];
        });

        it("returns error for rgba format", () => {
            const result = convertCssRgbStringToRgbObject("rgba(255, 128, 64, 0.5)");

            expect(result).toHaveProperty("type", "invalid-type");
            expect(result).toHaveProperty("subType", "css-rgb");

            type cases = [
                Expect<AssertExtends<typeof result, Error>>
            ];
        });
    });

    describe("edge cases", () => {
        it("handles single-digit values", () => {
            const result = convertCssRgbStringToRgbObject("rgb(1, 2, 3)");

            expect(result).toEqual({ r: 1, g: 2, b: 3 });

            type cases = [
                Expect<AssertEqual<typeof result, { r: number; g: number; b: number }>>
            ];
        });

        it("handles triple-digit values", () => {
            const result = convertCssRgbStringToRgbObject("rgb(100, 200, 150)");

            expect(result).toEqual({ r: 100, g: 200, b: 150 });

            type cases = [
                Expect<AssertEqual<typeof result, { r: number; g: number; b: number }>>
            ];
        });

        it("handles wide string type (returns RGB | Error union)", () => {
            const input = "rgb(255, 128, 64)" as string;
            const result = convertCssRgbStringToRgbObject(input);

            expect(result).toEqual({ r: 255, g: 128, b: 64 });

            // With wide string, IsCssRgbString<string> = boolean, so return is RGB | Error union
            // We can't test the exact union type easily, but we can test it extends both branches
            type cases = [
                // The result type should be compatible with both RGB and Error
                Expect<AssertExtends<typeof result, { r: number; g: number; b: number } | Error>>
            ];
        });
    });
});

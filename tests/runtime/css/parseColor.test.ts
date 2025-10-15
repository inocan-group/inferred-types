import { parseColor, parseRgbColor, parseNamedColor } from "inferred-types/runtime";
import { AssertError, Expect } from "inferred-types/types";
import { AssertEqual } from "transpiled";
import { describe, expect, it } from "vitest";

describe("parseRgbColor(color)", () => {

    it("parses valid RGB color strings correctly", () => {
        const black = parseRgbColor("rgb(0,0,0)");
        expect(black).toEqual({ r: 0, g: 0, b: 0 });

        const white = parseRgbColor("rgb(255,255,255)");
        expect(white).toEqual({ r: 255, g: 255, b: 255 });

        const custom = parseRgbColor("rgb(127,128,129)");
        expect(custom).toEqual({ r: 127, g: 128, b: 129 });

        const red = parseRgbColor("rgb(255,0,0)");
        expect(red).toEqual({ r: 255, g: 0, b: 0 });

        type cases = [
            Expect<AssertEqual<typeof black, { r: 0; g: 0; b: 0 }>>,
            Expect<AssertEqual<typeof white, { r: 255; g: 255; b: 255 }>>,
            Expect<AssertEqual<typeof custom, { r: 127; g: 128; b: 129 }>>,
            Expect<AssertEqual<typeof red, { r: 255; g: 0; b: 0 }>>,
        ]
    });

    it("handles RGB strings with spaces", () => {
        const withSpaces = parseRgbColor("rgb( 127 , 128 , 129 )");
        expect(withSpaces).toEqual({ r: 127, g: 128, b: 129 });

        const moreSpaces = parseRgbColor("rgb(  10  ,  20  ,  30  )");
        expect(moreSpaces).toEqual({ r: 10, g: 20, b: 30 });

        type cases = [
            Expect<AssertEqual<typeof withSpaces, { r: 127; g: 128; b: 129 }>>,
            Expect<AssertEqual<typeof moreSpaces, { r: 10; g: 20; b: 30 }>>,
        ]
    });

    it("returns error for invalid RGB format", () => {
        const notRgb = parseRgbColor("not-an-rgb-color");
        expect(notRgb).toBeInstanceOf(Error);
        if (notRgb instanceof Error) {
            expect(notRgb.type).toBe("invalid-color");
            expect((notRgb as any).subType).toBe("rgb");
        }
    });

    it("returns error for RGB with non-numeric values", () => {
        const invalid = parseRgbColor("rgb(abc,def,ghi)");
        expect(invalid).toBeInstanceOf(Error);
        if (invalid instanceof Error) {
            expect(invalid.type).toBe("invalid-color");
            expect((invalid as any).subType).toBe("rgb");
            expect(invalid.message).toContain("unable to be parsed");
        }
    });

    it("returns error for RGB with incomplete values", () => {
        const incomplete = parseRgbColor("rgb(127,128)");
        expect(incomplete).toBeInstanceOf(Error);
    });

    it("returns correct types at runtime", () => {
        const successResult = parseRgbColor("rgb(127,0,0)");
        const errorResult = parseRgbColor("invalid");

        // Success case should return RGB object with exact values
        if (!(errorResult instanceof Error)) {
            throw new Error("Expected error for invalid input");
        }

        // Error case should return Error
        if (errorResult instanceof Error) {
            expect(successResult.r).toBe(127);
            expect(successResult.g).toBe(0);
            expect(successResult.b).toBe(0);
        }
    });

});

describe("parseNamedColor(color)", () => {

    it("parses valid named colors correctly", () => {
        const red = parseNamedColor("red");
        expect(red).toEqual({ r: 255, g: 0, b: 0 });

        const blue = parseNamedColor("blue");
        expect(blue).toEqual({ r: 0, g: 0, b: 255 });

        const white = parseNamedColor("white");
        expect(white).toEqual({ r: 255, g: 255, b: 255 });

        const black = parseNamedColor("black");
        expect(black).toEqual({ r: 0, g: 0, b: 0 });


        type cases = [
            Expect<AssertEqual<typeof red, { r: 255; g: 0; b: 0 }>>,
            Expect<AssertEqual<typeof blue, { r: 0; g: 0; b: 255 }>>,
            Expect<AssertEqual<typeof white, { r: 255; g: 255; b: 255 }>>,
            Expect<AssertEqual<typeof black, { r: 0; g: 0; b: 0 }>>,
        ]

    });

    it("parses complex named colors correctly", () => {
        const aliceblue = parseNamedColor("aliceblue");
        expect(aliceblue).toEqual({ r: 240, g: 248, b: 255 });

        const cornflowerblue = parseNamedColor("cornflowerblue");
        expect(cornflowerblue).toEqual({ r: 100, g: 149, b: 237 });

        const rebeccapurple = parseNamedColor("rebeccapurple");
        expect(rebeccapurple).toEqual({ r: 102, g: 51, b: 153 });

        type cases = [
            Expect<AssertEqual<typeof aliceblue, { r: 240; g: 248; b: 255 }>>,
            Expect<AssertEqual<typeof cornflowerblue, { r: 100; g: 149; b: 237 }>>,
            Expect<AssertEqual<typeof rebeccapurple, { r: 102; g: 51; b: 153 }>>,
        ]
    });

    it("returns error for invalid named colors", () => {
        const invalid = parseNamedColor("notacolor");
        expect(invalid).toBeInstanceOf(Error);

        if (invalid instanceof Error) {
            expect(invalid.type).toBe("invalid-color");
            expect((invalid as any).subType).toBe("named");
            expect(invalid.message).toContain("not a valid \"named color\"");
        }

        type cases = [
            Expect<AssertError<typeof invalid, "invalid-color">>
        ]
    });

    it("returns error for uppercase named colors", () => {
        const uppercase = parseNamedColor("Red");
        expect(uppercase).toBeInstanceOf(Error);
        if (uppercase instanceof Error) {
            expect(uppercase.type).toBe("invalid-color");
            expect((uppercase as any).subType).toBe("named");
        }

        type cases = [
            Expect<AssertError<typeof uppercase, "invalid-color">>
        ]
    });

    it("returns correct types at runtime", () => {
        const successResult = parseNamedColor("red");
        const errorResult = parseNamedColor("invalid");

        // Success case should return RGB object with exact values
        expect(successResult.r).toBe(255);
        expect(successResult.g).toBe(0);
        expect(successResult.b).toBe(0);

        // Error case should return Error
        expect(errorResult).toBeInstanceOf(Error);
    });

});

describe("parseColor(color)", () => {

    it("parses RGB color strings", () => {
        const red = parseColor("rgb(255,0,0)");
        expect(red).toEqual({ r: 255, g: 0, b: 0 });

        const blue = parseColor("rgb(0,0,255)");
        expect(blue).toEqual({ r: 0, g: 0, b: 255 });

        type cases = [
            Expect<AssertEqual<typeof red, { r: 255; g: 0; b: 0 }>>,
            Expect<AssertEqual<typeof blue, { r: 0; g: 0; b: 255 }>>,
        ]
    });

    it("parses named color strings", () => {
        const red = parseColor("red");
        expect(red).toEqual({ r: 255, g: 0, b: 0 });

        const blue = parseColor("blue");
        expect(blue).toEqual({ r: 0, g: 0, b: 255 });

        const aliceblue = parseColor("aliceblue");
        expect(aliceblue).toEqual({ r: 240, g: 248, b: 255 });

        type cases = [
            Expect<AssertEqual<typeof red, { r: 255; g: 0; b: 0 }>>,
            Expect<AssertEqual<typeof blue, { r: 0; g: 0; b: 255 }>>,
            Expect<AssertEqual<typeof aliceblue, { r: 240; g: 248; b: 255 }>>,
        ]
    });

    it("returns error for invalid color formats", () => {
        const hex = parseColor("#ff0000");
        expect(hex).toBeInstanceOf(Error);
        if (hex instanceof Error) {
            expect(hex.type).toBe("invalid-color");
            expect(hex.message).toContain("could not be parsed");
        }

        const invalid = parseColor("notacolor");
        expect(invalid).toBeInstanceOf(Error);
        if (invalid instanceof Error) {
            expect(invalid.type).toBe("invalid-color");
        }
    });

    it("handles edge cases", () => {
        const empty = parseColor("");
        expect(empty).toBeInstanceOf(Error);

        const rgba = parseColor("rgba(255,0,0,1)");
        expect(rgba).toBeInstanceOf(Error);
    });

    it("returns correct types at runtime", () => {
        const rgbResult = parseColor("rgb(127,0,0)");
        const namedResult = parseColor("red");
        const errorResult = parseColor("invalid");

        // RGB success case should return RGB object with exact values
        expect(rgbResult.r).toBe(127);
        expect(rgbResult.g).toBe(0);
        expect(rgbResult.b).toBe(0);

        // Named color success case should return RGB object with exact values
        expect(namedResult.r).toBe(255);
        expect(namedResult.g).toBe(0);
        expect(namedResult.b).toBe(0);

        // Error case should return Error
        expect(errorResult).toBeInstanceOf(Error);
    });

});

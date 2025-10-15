import { parseColor, parseRgbColor, parseNamedColor } from "inferred-types/runtime";
import { Expect } from "inferred-types/types";
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
    });

    it("handles RGB strings with spaces", () => {
        const withSpaces = parseRgbColor("rgb( 127 , 128 , 129 )");
        expect(withSpaces).toEqual({ r: 127, g: 128, b: 129 });

        const moreSpaces = parseRgbColor("rgb(  10  ,  20  ,  30  )");
        expect(moreSpaces).toEqual({ r: 10, g: 20, b: 30 });
    });

    it("returns error for invalid RGB format", () => {
        const notRgb = parseRgbColor("not-an-rgb-color" as any);
        expect(notRgb).toBeInstanceOf(Error);
        if (notRgb instanceof Error) {
            expect((notRgb as any).type).toBe("invalid-color");
            expect((notRgb as any).subType).toBe("rgb");
        }
    });

    it("returns error for RGB with non-numeric values", () => {
        const invalid = parseRgbColor("rgb(abc,def,ghi)" as any);
        expect(invalid).toBeInstanceOf(Error);
        if (invalid instanceof Error) {
            expect((invalid as any).type).toBe("invalid-color");
            expect((invalid as any).subType).toBe("rgb");
            expect(invalid.message).toContain("unable to be parsed");
        }
    });

    it("returns error for RGB with incomplete values", () => {
        const incomplete = parseRgbColor("rgb(127,128)" as any);
        expect(incomplete).toBeInstanceOf(Error);
    });

    it("returns correct types at runtime", () => {
        const successResult = parseRgbColor("rgb(127,0,0)");
        const errorResult = parseRgbColor("invalid" as any);

        // Success case should return RGB object
        if (!(errorResult instanceof Error)) {
            throw new Error("Expected error for invalid input");
        }

        // Error case should return Error
        if (errorResult instanceof Error) {
            expect((successResult as any).r).toBeDefined();
            expect((successResult as any).g).toBeDefined();
            expect((successResult as any).b).toBeDefined();
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
    });

    it("returns error for invalid named colors", () => {
        const invalid = parseNamedColor("notacolor" as any);
        expect(invalid).toBeInstanceOf(Error);
        if (invalid instanceof Error) {
            expect((invalid as any).type).toBe("invalid-color");
            expect((invalid as any).subType).toBe("named");
            expect(invalid.message).toContain("not a valid \"named color\"");
        }
    });

    it("returns error for uppercase named colors", () => {
        const uppercase = parseNamedColor("Red" as any);
        expect(uppercase).toBeInstanceOf(Error);
        if (uppercase instanceof Error) {
            expect((uppercase as any).type).toBe("invalid-color");
            expect((uppercase as any).subType).toBe("named");
        }
    });

    it("returns correct types at runtime", () => {
        const successResult = parseNamedColor("red");
        const errorResult = parseNamedColor("invalid" as any);

        // Success case should return RGB object
        expect((successResult as any).r).toBeDefined();
        expect((successResult as any).g).toBeDefined();
        expect((successResult as any).b).toBeDefined();

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
    });

    it("parses named color strings", () => {
        const red = parseColor("red");
        expect(red).toEqual({ r: 255, g: 0, b: 0 });

        const blue = parseColor("blue");
        expect(blue).toEqual({ r: 0, g: 0, b: 255 });

        const aliceblue = parseColor("aliceblue");
        expect(aliceblue).toEqual({ r: 240, g: 248, b: 255 });
    });

    it("returns error for invalid color formats", () => {
        const hex = parseColor("#ff0000" as any);
        expect(hex).toBeInstanceOf(Error);
        if (hex instanceof Error) {
            expect((hex as any).type).toBe("invalid-color");
            expect(hex.message).toContain("could not be parsed");
        }

        const invalid = parseColor("notacolor" as any);
        expect(invalid).toBeInstanceOf(Error);
        if (invalid instanceof Error) {
            expect((invalid as any).type).toBe("invalid-color");
        }
    });

    it("handles edge cases", () => {
        const empty = parseColor("" as any);
        expect(empty).toBeInstanceOf(Error);

        const rgba = parseColor("rgba(255,0,0,1)" as any);
        expect(rgba).toBeInstanceOf(Error);
    });

    it("returns correct types at runtime", () => {
        const rgbResult = parseColor("rgb(127,0,0)");
        const namedResult = parseColor("red");
        const errorResult = parseColor("invalid" as any);

        // RGB success case should return RGB object
        expect((rgbResult as any).r).toBeDefined();
        expect((rgbResult as any).g).toBeDefined();
        expect((rgbResult as any).b).toBeDefined();

        // Named color success case should return RGB object
        expect((namedResult as any).r).toBeDefined();
        expect((namedResult as any).g).toBeDefined();
        expect((namedResult as any).b).toBeDefined();

        // Error case should return Error
        expect(errorResult).toBeInstanceOf(Error);
    });

});

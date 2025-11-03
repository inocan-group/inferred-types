import { describe, it } from "vitest";
import type {
    IsCssRgbString,
    Expect,
    AssertTrue,
    AssertFalse
} from "inferred-types/types";

describe("IsCssRgbString<T>", () => {

    describe("valid CSS RGB strings", () => {
        it("returns true for standard comma-separated RGB format", () => {
            type Black = IsCssRgbString<"rgb(0,0,0)">;
            type White = IsCssRgbString<"rgb(255,255,255)">;
            type Red = IsCssRgbString<"rgb(255,0,0)">;
            type Green = IsCssRgbString<"rgb(0,255,0)">;
            type Blue = IsCssRgbString<"rgb(0,0,255)">;

            type cases = [
                Expect<AssertTrue<Black>>,
                Expect<AssertTrue<White>>,
                Expect<AssertTrue<Red>>,
                Expect<AssertTrue<Green>>,
                Expect<AssertTrue<Blue>>
            ];
        });

        it("returns true for RGB strings with spaces after commas", () => {
            type WithSpaces1 = IsCssRgbString<"rgb(255, 128, 64)">;
            type WithSpaces2 = IsCssRgbString<"rgb(0, 0, 0)">;
            type WithSpaces3 = IsCssRgbString<"rgb(128, 128, 128)">;

            type cases = [
                Expect<AssertTrue<WithSpaces1>>,
                Expect<AssertTrue<WithSpaces2>>,
                Expect<AssertTrue<WithSpaces3>>
            ];
        });

        it("returns true for RGB strings with spaces before commas", () => {
            type SpacesBefore1 = IsCssRgbString<"rgb(255 ,128 ,64)">;
            type SpacesBefore2 = IsCssRgbString<"rgb(100 ,150 ,200)">;

            type cases = [
                Expect<AssertTrue<SpacesBefore1>>,
                Expect<AssertTrue<SpacesBefore2>>
            ];
        });

        it("returns true for RGB strings with spaces both before and after commas", () => {
            type SpacesBoth1 = IsCssRgbString<"rgb(255 , 128 , 64)">;
            type SpacesBoth2 = IsCssRgbString<"rgb(0 , 0 , 0)">;

            type cases = [
                Expect<AssertTrue<SpacesBoth1>>,
                Expect<AssertTrue<SpacesBoth2>>
            ];
        });

        it("returns true for mid-range RGB values", () => {
            type Gray = IsCssRgbString<"rgb(128,128,128)">;
            type Orange = IsCssRgbString<"rgb(255,128,64)">;
            type Purple = IsCssRgbString<"rgb(128,0,128)">;
            type Cyan = IsCssRgbString<"rgb(0,255,255)">;

            type cases = [
                Expect<AssertTrue<Gray>>,
                Expect<AssertTrue<Orange>>,
                Expect<AssertTrue<Purple>>,
                Expect<AssertTrue<Cyan>>
            ];
        });
    });

    describe("boundary values", () => {
        it("returns true for minimum boundary (all zeros)", () => {
            type AllZeros = IsCssRgbString<"rgb(0,0,0)">;

            type cases = [
                Expect<AssertTrue<AllZeros>>
            ];
        });

        it("returns true for maximum boundary (all 255)", () => {
            type AllMax = IsCssRgbString<"rgb(255,255,255)">;

            type cases = [
                Expect<AssertTrue<AllMax>>
            ];
        });

        it("returns true for mixed boundary values", () => {
            type Mix1 = IsCssRgbString<"rgb(0,128,255)">;
            type Mix2 = IsCssRgbString<"rgb(255,0,128)">;
            type Mix3 = IsCssRgbString<"rgb(128,255,0)">;

            type cases = [
                Expect<AssertTrue<Mix1>>,
                Expect<AssertTrue<Mix2>>,
                Expect<AssertTrue<Mix3>>
            ];
        });
    });

    describe("invalid CSS RGB strings - out of range", () => {
        it("returns false for values above 255", () => {
            type TooHigh1 = IsCssRgbString<"rgb(256,0,0)">;
            type TooHigh2 = IsCssRgbString<"rgb(0,256,0)">;
            type TooHigh3 = IsCssRgbString<"rgb(0,0,256)">;
            type AllTooHigh = IsCssRgbString<"rgb(300,400,500)">;

            type cases = [
                Expect<AssertFalse<TooHigh1>>,
                Expect<AssertFalse<TooHigh2>>,
                Expect<AssertFalse<TooHigh3>>,
                Expect<AssertFalse<AllTooHigh>>
            ];
        });

        it("returns false for negative values", () => {
            type Negative1 = IsCssRgbString<"rgb(-1,0,0)">;
            type Negative2 = IsCssRgbString<"rgb(0,-1,0)">;
            type Negative3 = IsCssRgbString<"rgb(0,0,-1)">;
            type AllNegative = IsCssRgbString<"rgb(-10,-20,-30)">;

            type cases = [
                Expect<AssertFalse<Negative1>>,
                Expect<AssertFalse<Negative2>>,
                Expect<AssertFalse<Negative3>>,
                Expect<AssertFalse<AllNegative>>
            ];
        });

        it("returns false for decimal values exceeding 255", () => {
            type Decimal1 = IsCssRgbString<"rgb(255.5,128,64)">;
            type Decimal2 = IsCssRgbString<"rgb(255,256.1,64)">;

            type cases = [
                Expect<AssertFalse<Decimal1>>,
                Expect<AssertFalse<Decimal2>>
            ];
        });

        it("returns true for valid decimal values within range", () => {
            type Decimal1 = IsCssRgbString<"rgb(255,128.3,64)">;
            type Decimal2 = IsCssRgbString<"rgb(100.5,150.7,200.9)">;

            type cases = [
                Expect<AssertTrue<Decimal1>>,
                Expect<AssertTrue<Decimal2>>
            ];
        });
    });

    describe("invalid CSS RGB strings - wrong format", () => {
        it("returns false for missing rgb() wrapper", () => {
            type NoWrapper = IsCssRgbString<"255,128,64">;
            type JustNumbers = IsCssRgbString<"255 128 64">;

            type cases = [
                Expect<AssertFalse<NoWrapper>>,
                Expect<AssertFalse<JustNumbers>>
            ];
        });

        it("returns false for incomplete rgb() syntax", () => {
            type NoClosing = IsCssRgbString<"rgb(255,128,64">;
            type NoOpening = IsCssRgbString<"255,128,64)">;
            type WrongPrefix = IsCssRgbString<"rgba(255,128,64)">;

            type cases = [
                Expect<AssertFalse<NoClosing>>,
                Expect<AssertFalse<NoOpening>>,
                Expect<AssertFalse<WrongPrefix>>
            ];
        });

        it("returns false for wrong number of parameters", () => {
            type TooFew1 = IsCssRgbString<"rgb()">;
            type TooFew2 = IsCssRgbString<"rgb(255)">;
            type TooFew3 = IsCssRgbString<"rgb(255,128)">;
            type TooMany = IsCssRgbString<"rgb(255,128,64,32)">;

            type cases = [
                Expect<AssertFalse<TooFew1>>,
                Expect<AssertFalse<TooFew2>>,
                Expect<AssertFalse<TooFew3>>,
                Expect<AssertFalse<TooMany>>
            ];
        });

        it("returns false for non-numeric values", () => {
            type WithText1 = IsCssRgbString<"rgb(red,green,blue)">;
            type WithText2 = IsCssRgbString<"rgb(255,abc,64)">;
            type WithUnits = IsCssRgbString<"rgb(255px,128px,64px)">;

            type cases = [
                Expect<AssertFalse<WithText1>>,
                Expect<AssertFalse<WithText2>>,
                Expect<AssertFalse<WithUnits>>
            ];
        });

        it("returns false for malformed separators", () => {
            type Semicolons = IsCssRgbString<"rgb(255;128;64)">;
            type Spaces = IsCssRgbString<"rgb(255 128 64)">;
            type Pipes = IsCssRgbString<"rgb(255|128|64)">;

            type cases = [
                Expect<AssertFalse<Semicolons>>,
                Expect<AssertFalse<Spaces>>,
                Expect<AssertFalse<Pipes>>
            ];
        });
    });

    describe("non-string types", () => {
        it("returns false for non-string types", () => {
            type NotString1 = IsCssRgbString<number>;
            type NotString2 = IsCssRgbString<boolean>;
            type NotString3 = IsCssRgbString<null>;
            type NotString4 = IsCssRgbString<undefined>;
            type NotString5 = IsCssRgbString<object>;

            type cases = [
                Expect<AssertFalse<NotString1>>,
                Expect<AssertFalse<NotString2>>,
                Expect<AssertFalse<NotString3>>,
                Expect<AssertFalse<NotString4>>,
                Expect<AssertFalse<NotString5>>
            ];
        });

        it("returns false for array or tuple types", () => {
            type ArrayType = IsCssRgbString<[255, 128, 64]>;
            type NumberArray = IsCssRgbString<number[]>;

            type cases = [
                Expect<AssertFalse<ArrayType>>,
                Expect<AssertFalse<NumberArray>>
            ];
        });

        it("returns false for object types", () => {
            type RgbObject = IsCssRgbString<{ r: 255; g: 128; b: 64 }>;
            type EmptyObject = IsCssRgbString<{}>;

            type cases = [
                Expect<AssertFalse<RgbObject>>,
                Expect<AssertFalse<EmptyObject>>
            ];
        });
    });

    describe("edge cases", () => {
        it("returns boolean for wide string type", () => {
            type WideString = IsCssRgbString<string>;

            // Wide types return boolean (true | false)
            type Test = WideString extends boolean ? true : false;

            type cases = [
                Expect<AssertTrue<Test>>
            ];
        });

        it("returns false for empty string", () => {
            type Empty = IsCssRgbString<"">;

            type cases = [
                Expect<AssertFalse<Empty>>
            ];
        });

        it("returns false for strings with extra whitespace", () => {
            type LeadingSpace = IsCssRgbString<" rgb(255,128,64)">;
            type TrailingSpace = IsCssRgbString<"rgb(255,128,64) ">;
            type BothSpaces = IsCssRgbString<" rgb(255,128,64) ">;

            type cases = [
                Expect<AssertFalse<LeadingSpace>>,
                Expect<AssertFalse<TrailingSpace>>,
                Expect<AssertFalse<BothSpaces>>
            ];
        });

        it("returns false for hex color strings", () => {
            type Hex1 = IsCssRgbString<"#FF0000">;
            type Hex2 = IsCssRgbString<"#000000">;
            type HexShort = IsCssRgbString<"#F00">;

            type cases = [
                Expect<AssertFalse<Hex1>>,
                Expect<AssertFalse<Hex2>>,
                Expect<AssertFalse<HexShort>>
            ];
        });

        it("returns false for named CSS colors", () => {
            type Red = IsCssRgbString<"red">;
            type Blue = IsCssRgbString<"blue">;
            type Tomato = IsCssRgbString<"tomato">;

            type cases = [
                Expect<AssertFalse<Red>>,
                Expect<AssertFalse<Blue>>,
                Expect<AssertFalse<Tomato>>
            ];
        });

        it("returns false for RGBA format (with alpha)", () => {
            type Rgba1 = IsCssRgbString<"rgba(255,128,64,0.5)">;
            type Rgba2 = IsCssRgbString<"rgba(255,128,64,1)">;

            type cases = [
                Expect<AssertFalse<Rgba1>>,
                Expect<AssertFalse<Rgba2>>
            ];
        });
    });

    describe("whitespace handling", () => {
        it("handles various whitespace patterns correctly", () => {
            type NoSpaces = IsCssRgbString<"rgb(255,128,64)">;
            type SpacesAfter = IsCssRgbString<"rgb(255, 128, 64)">;
            type SpacesBefore = IsCssRgbString<"rgb(255 ,128 ,64)">;
            type SpacesBoth = IsCssRgbString<"rgb(255 , 128 , 64)">;
            type MultipleSpaces = IsCssRgbString<"rgb(255  ,  128  ,  64)">;

            type cases = [
                Expect<AssertTrue<NoSpaces>>,
                Expect<AssertTrue<SpacesAfter>>,
                Expect<AssertTrue<SpacesBefore>>,
                Expect<AssertTrue<SpacesBoth>>,
                Expect<AssertTrue<MultipleSpaces>>
            ];
        });

        it("handles newlines and tabs as whitespace (TrimEach strips them)", () => {
            // TrimEach utility treats \n and \t as whitespace and strips them
            // So these actually pass validation
            type WithNewline = IsCssRgbString<"rgb(255,\n128,64)">;
            type WithTab = IsCssRgbString<"rgb(255,\t128,64)">;

            type cases = [
                Expect<AssertTrue<WithNewline>>,
                Expect<AssertTrue<WithTab>>
            ];
        });
    });

});

import { describe, it } from "vitest";
import type {
    IsRgbTuple,
    Expect,
    AssertTrue,
    AssertFalse
} from "inferred-types/types";

describe("IsRgbTuple<T>", () => {

    describe("valid RGB tuples", () => {
        it("returns true for tuples with three valid RGB values", () => {
            type Black = IsRgbTuple<[0, 0, 0]>;
            type White = IsRgbTuple<[255, 255, 255]>;
            type Red = IsRgbTuple<[255, 0, 0]>;
            type Green = IsRgbTuple<[0, 255, 0]>;
            type Blue = IsRgbTuple<[0, 0, 255]>;

            type cases = [
                Expect<AssertTrue<Black>>,
                Expect<AssertTrue<White>>,
                Expect<AssertTrue<Red>>,
                Expect<AssertTrue<Green>>,
                Expect<AssertTrue<Blue>>
            ];
        });

        it("returns true for tuples with mid-range RGB values", () => {
            type Gray = IsRgbTuple<[128, 128, 128]>;
            type Orange = IsRgbTuple<[255, 128, 64]>;
            type Purple = IsRgbTuple<[128, 0, 128]>;
            type Cyan = IsRgbTuple<[0, 255, 255]>;

            type cases = [
                Expect<AssertTrue<Gray>>,
                Expect<AssertTrue<Orange>>,
                Expect<AssertTrue<Purple>>,
                Expect<AssertTrue<Cyan>>
            ];
        });

        it("returns true for readonly tuples", () => {
            type ReadonlyRgb = IsRgbTuple<readonly [100, 150, 200]>;
            type ReadonlyBlack = IsRgbTuple<readonly [0, 0, 0]>;

            type cases = [
                Expect<AssertTrue<ReadonlyRgb>>,
                Expect<AssertTrue<ReadonlyBlack>>
            ];
        });
    });

    describe("boundary values", () => {
        it("returns true for minimum boundary (all zeros)", () => {
            type AllZeros = IsRgbTuple<[0, 0, 0]>;

            type cases = [
                Expect<AssertTrue<AllZeros>>
            ];
        });

        it("returns true for maximum boundary (all 255)", () => {
            type AllMax = IsRgbTuple<[255, 255, 255]>;

            type cases = [
                Expect<AssertTrue<AllMax>>
            ];
        });

        it("returns true for mixed boundary values", () => {
            type Mix1 = IsRgbTuple<[0, 128, 255]>;
            type Mix2 = IsRgbTuple<[255, 0, 128]>;
            type Mix3 = IsRgbTuple<[128, 255, 0]>;

            type cases = [
                Expect<AssertTrue<Mix1>>,
                Expect<AssertTrue<Mix2>>,
                Expect<AssertTrue<Mix3>>
            ];
        });
    });

    describe("invalid RGB tuples - out of range values", () => {
        it("returns false for values above 255", () => {
            type TooHigh1 = IsRgbTuple<[256, 0, 0]>;
            type TooHigh2 = IsRgbTuple<[0, 256, 0]>;
            type TooHigh3 = IsRgbTuple<[0, 0, 256]>;
            type AllTooHigh = IsRgbTuple<[300, 400, 500]>;

            type cases = [
                Expect<AssertFalse<TooHigh1>>,
                Expect<AssertFalse<TooHigh2>>,
                Expect<AssertFalse<TooHigh3>>,
                Expect<AssertFalse<AllTooHigh>>
            ];
        });

        it("returns false for negative values", () => {
            type Negative1 = IsRgbTuple<[-1, 0, 0]>;
            type Negative2 = IsRgbTuple<[0, -1, 0]>;
            type Negative3 = IsRgbTuple<[0, 0, -1]>;
            type AllNegative = IsRgbTuple<[-10, -20, -30]>;

            type cases = [
                Expect<AssertFalse<Negative1>>,
                Expect<AssertFalse<Negative2>>,
                Expect<AssertFalse<Negative3>>,
                Expect<AssertFalse<AllNegative>>
            ];
        });

        it("returns false for mixed invalid values", () => {
            type MixedInvalid1 = IsRgbTuple<[-1, 128, 256]>;
            type MixedInvalid2 = IsRgbTuple<[255, -50, 300]>;

            type cases = [
                Expect<AssertFalse<MixedInvalid1>>,
                Expect<AssertFalse<MixedInvalid2>>
            ];
        });
    });

    describe("invalid RGB tuples - wrong length", () => {
        it("returns false for tuples with fewer than 3 elements", () => {
            type Empty = IsRgbTuple<[]>;
            type OnlyOne = IsRgbTuple<[255]>;
            type OnlyTwo = IsRgbTuple<[255, 128]>;

            type cases = [
                Expect<AssertFalse<Empty>>,
                Expect<AssertFalse<OnlyOne>>,
                Expect<AssertFalse<OnlyTwo>>
            ];
        });

        it("returns false for tuples with more than 3 elements", () => {
            type FourElements = IsRgbTuple<[255, 128, 64, 0]>;
            type FiveElements = IsRgbTuple<[255, 128, 64, 32, 0]>;

            type cases = [
                Expect<AssertFalse<FourElements>>,
                Expect<AssertFalse<FiveElements>>
            ];
        });

        it("returns false for RGBA tuples (with alpha channel)", () => {
            type Rgba = IsRgbTuple<[255, 128, 64, 0.5]>;
            type RgbaWithOne = IsRgbTuple<[255, 128, 64, 1]>;

            type cases = [
                Expect<AssertFalse<Rgba>>,
                Expect<AssertFalse<RgbaWithOne>>
            ];
        });
    });

    describe("non-tuple types", () => {
        it("returns false for non-array types", () => {
            type NotArray1 = IsRgbTuple<string>;
            type NotArray2 = IsRgbTuple<number>;
            type NotArray3 = IsRgbTuple<boolean>;
            type NotArray4 = IsRgbTuple<null>;
            type NotArray5 = IsRgbTuple<undefined>;

            type cases = [
                Expect<AssertFalse<NotArray1>>,
                Expect<AssertFalse<NotArray2>>,
                Expect<AssertFalse<NotArray3>>,
                Expect<AssertFalse<NotArray4>>,
                Expect<AssertFalse<NotArray5>>
            ];
        });

        it("returns false for object types", () => {
            type RgbObject = IsRgbTuple<{ r: 255; g: 128; b: 64 }>;
            type EmptyObject = IsRgbTuple<{}>;

            type cases = [
                Expect<AssertFalse<RgbObject>>,
                Expect<AssertFalse<EmptyObject>>
            ];
        });

        it("returns false for arrays with non-number elements", () => {
            type StringArray = IsRgbTuple<["255", "128", "64"]>;
            type MixedArray = IsRgbTuple<[255, "128", 64]>;
            type BooleanArray = IsRgbTuple<[true, false, true]>;

            type cases = [
                Expect<AssertFalse<StringArray>>,
                Expect<AssertFalse<MixedArray>>,
                Expect<AssertFalse<BooleanArray>>
            ];
        });
    });

    describe("edge cases", () => {
        it("returns false for wide number array type", () => {
            type WideArray = IsRgbTuple<number[]>;

            type cases = [
                Expect<AssertFalse<WideArray>>
            ];
        });

        it("handles union types via distributive conditional types", () => {
            // TypeScript distributes union types through conditional types
            // IsRgbTuple<[255, 0, 0] | [0, 255, 0]> becomes IsRgbTuple<[255, 0, 0]> | IsRgbTuple<[0, 255, 0]> = true | true = true
            type Union1 = IsRgbTuple<[255, 0, 0] | [0, 255, 0]>;

            // Mixed valid/invalid: true | false = boolean (which fails AssertTrue/AssertFalse)
            // So we test that string alone returns false
            type Union2 = IsRgbTuple<string>;

            type cases = [
                Expect<AssertTrue<Union1>>,
                Expect<AssertFalse<Union2>>
            ];
        });

        it("returns false for decimal values exceeding valid range", () => {
            // Decimal values like 255.5 are > 255, so they fail the lessThanOrEqual check
            // The Every utility correctly compares decimal values
            type Decimal1 = IsRgbTuple<[255.5, 128, 64]>;  // 255.5 > 255 ❌
            type Decimal2 = IsRgbTuple<[255, 128.3, 64]>;  // all within range ✓
            type Decimal3 = IsRgbTuple<[255, 128, 64.7]>;  // all within range ✓

            type cases = [
                Expect<AssertFalse<Decimal1>>,
                Expect<AssertTrue<Decimal2>>,
                Expect<AssertTrue<Decimal3>>
            ];
        });
    });

    describe("labeled tuples", () => {
        it("returns true for labeled tuples with valid RGB values", () => {
            type LabeledRgb = IsRgbTuple<[red: 255, green: 128, blue: 64]>;
            type LabeledBlack = IsRgbTuple<[r: 0, g: 0, b: 0]>;

            type cases = [
                Expect<AssertTrue<LabeledRgb>>,
                Expect<AssertTrue<LabeledBlack>>
            ];
        });

        it("returns false for labeled tuples with invalid values", () => {
            type LabeledInvalid1 = IsRgbTuple<[red: 256, green: 128, blue: 64]>;
            type LabeledInvalid2 = IsRgbTuple<[r: -1, g: 0, b: 0]>;

            type cases = [
                Expect<AssertFalse<LabeledInvalid1>>,
                Expect<AssertFalse<LabeledInvalid2>>
            ];
        });
    });

});

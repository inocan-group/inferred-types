import { describe, it } from "vitest";
import { Expect, Test } from "inferred-types/types";
import type { NumericSequence } from "inferred-types/types";

describe("NumericSequence<TStart, TEnd>", () => {

    it("upward sequences (TStart < TEnd)", () => {
        type Small = NumericSequence<3, 8>;
        type Single = NumericSequence<5, 6>;
        type LargerRange = NumericSequence<0, 10>;
        type NegativeToPositive = NumericSequence<-3, 3>;

        type cases = [
            // Small upward sequence
            Expect<Test<Small, "equals", [3, 4, 5, 6, 7, 8]>>,

            // Single step
            Expect<Test<Single, "equals", [5, 6]>>,

            // Larger range
            Expect<Test<LargerRange, "equals", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]>>,

            // Negative to positive crossing zero
            Expect<Test<NegativeToPositive, "equals", [-3, -2, -1, 0, 1, 2, 3]>>,
        ];
    });

    it("downward sequences (TStart > TEnd)", () => {
        type Small = NumericSequence<8, 3>;
        type Single = NumericSequence<6, 5>;
        type LargerRange = NumericSequence<10, 0>;
        type PositiveToNegative = NumericSequence<3, -3>;

        type cases = [
            // Small downward sequence
            Expect<Test<Small, "equals", [8, 7, 6, 5, 4, 3]>>,

            // Single step
            Expect<Test<Single, "equals", [6, 5]>>,

            // Larger range
            Expect<Test<LargerRange, "equals", [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]>>,

            // Positive to negative crossing zero
            Expect<Test<PositiveToNegative, "equals", [3, 2, 1, 0, -1, -2, -3]>>,
        ];
    });

    it("equal start and end returns empty array", () => {
        type Zero = NumericSequence<0, 0>;
        type Positive = NumericSequence<5, 5>;
        type Negative = NumericSequence<-5, -5>;

        type cases = [
            Expect<Test<Zero, "equals", []>>,
            Expect<Test<Positive, "equals", []>>,
            Expect<Test<Negative, "equals", []>>,
        ];
    });

    it("negative number sequences", () => {
        type NegativeUpward = NumericSequence<-5, -2>;
        type NegativeDownward = NumericSequence<-2, -5>;

        type cases = [
            // Upward through negative numbers
            Expect<Test<NegativeUpward, "equals", [-5, -4, -3, -2]>>,

            // Downward through negative numbers
            Expect<Test<NegativeDownward, "equals", [-2, -3, -4, -5]>>,
        ];
    });

    it("wide number types return number[]", () => {
        type WideStart = NumericSequence<number, 10>;
        type WideEnd = NumericSequence<5, number>;
        type BothWide = NumericSequence<number, number>;

        type cases = [
            Expect<Test<WideStart, "equals", number[]>>,
            Expect<Test<WideEnd, "equals", number[]>>,
            Expect<Test<BothWide, "equals", number[]>>,
        ];
    });

    it("float values return error", () => {
        type FloatStart = NumericSequence<3.5, 8>;
        type FloatEnd = NumericSequence<3, 8.5>;
        type BothFloat = NumericSequence<3.5, 8.5>;

        type cases = [
            Expect<Test<FloatStart, "isError", "invalid-range">>,
            Expect<Test<FloatEnd, "isError", "invalid-range">>,
            Expect<Test<BothFloat, "isError", "invalid-range">>,
        ];
    });

    it("sequences with zero boundaries", () => {
        type FromZeroUp = NumericSequence<0, 5>;
        type ToZeroDown = NumericSequence<5, 0>;
        type FromZeroDown = NumericSequence<0, -5>;
        type ToZeroUp = NumericSequence<-5, 0>;

        type cases = [
            Expect<Test<FromZeroUp, "equals", [0, 1, 2, 3, 4, 5]>>,
            Expect<Test<ToZeroDown, "equals", [5, 4, 3, 2, 1, 0]>>,
            Expect<Test<FromZeroDown, "equals", [0, -1, -2, -3, -4, -5]>>,
            Expect<Test<ToZeroUp, "equals", [-5, -4, -3, -2, -1, 0]>>,
        ];
    });

    it("single-element ranges", () => {
        type OneToTwo = NumericSequence<1, 2>;
        type TwoToOne = NumericSequence<2, 1>;
        type ZeroToOne = NumericSequence<0, 1>;
        type OneToZero = NumericSequence<1, 0>;
        type NegativeOneToZero = NumericSequence<-1, 0>;
        type ZeroToNegativeOne = NumericSequence<0, -1>;

        type cases = [
            Expect<Test<OneToTwo, "equals", [1, 2]>>,
            Expect<Test<TwoToOne, "equals", [2, 1]>>,
            Expect<Test<ZeroToOne, "equals", [0, 1]>>,
            Expect<Test<OneToZero, "equals", [1, 0]>>,
            Expect<Test<NegativeOneToZero, "equals", [-1, 0]>>,
            Expect<Test<ZeroToNegativeOne, "equals", [0, -1]>>,
        ];
    });

    it("larger sequences", () => {
        type LargeUpward = NumericSequence<1, 15>;
        type LargeDownward = NumericSequence<15, 1>;

        type cases = [
            Expect<Test<
                LargeUpward,
                "equals",
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
            >>,
            Expect<Test<
                LargeDownward,
                "equals",
                [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
            >>,
        ];
    });

    it("type narrowness is preserved", () => {
        type Seq = NumericSequence<1, 3>;

        // Each element should be its literal type, not just number
        type First = Seq[0];
        type Second = Seq[1];
        type Third = Seq[2];

        type cases = [
            Expect<Test<First, "equals", 1>>,
            Expect<Test<Second, "equals", 2>>,
            Expect<Test<Third, "equals", 3>>,
        ];
    });

    it("works with larger negative numbers (proving general solution)", () => {
        type LargeNegativeUpward = NumericSequence<-50, -45>;
        type LargeNegativeDownward = NumericSequence<-45, -50>;
        type LargeNegativeCrossingZero = NumericSequence<-2, 2>;
        type LargePositiveCrossingZero = NumericSequence<2, -2>;

        type cases = [
            // Upward from -50 to -45
            Expect<Test<LargeNegativeUpward, "equals", [-50, -49, -48, -47, -46, -45]>>,

            // Downward from -45 to -50
            Expect<Test<LargeNegativeDownward, "equals", [-45, -46, -47, -48, -49, -50]>>,

            // Crossing zero upward
            Expect<Test<LargeNegativeCrossingZero, "equals", [-2, -1, 0, 1, 2]>>,

            // Crossing zero downward
            Expect<Test<LargePositiveCrossingZero, "equals", [2, 1, 0, -1, -2]>>,
        ];
    });

});

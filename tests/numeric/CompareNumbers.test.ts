import { describe, it } from "vitest";
import type { CompareNumbers, Expect, Test } from "inferred-types/types";

describe("CompareNumbers<A,B>", () => {

    it("integer equality", () => {
        type Equal1 = CompareNumbers<5, 5>;
        type Equal2 = CompareNumbers<0, 0>;
        type Equal3 = CompareNumbers<-5, -5>;
        type Equal4 = CompareNumbers<100, 100>;

        type cases = [
            Expect<Test<Equal1, "equals", "equal">>,
            Expect<Test<Equal2, "equals", "equal">>,
            Expect<Test<Equal3, "equals", "equal">>,
            Expect<Test<Equal4, "equals", "equal">>,
        ];
    });

    it("integer greater than", () => {
        type Greater1 = CompareNumbers<10, 5>;
        type Greater2 = CompareNumbers<1, 0>;
        type Greater3 = CompareNumbers<0, -1>;
        type Greater4 = CompareNumbers<-1, -5>;
        type Greater5 = CompareNumbers<100, 99>;

        type cases = [
            Expect<Test<Greater1, "equals", "greater">>,
            Expect<Test<Greater2, "equals", "greater">>,
            Expect<Test<Greater3, "equals", "greater">>,
            Expect<Test<Greater4, "equals", "greater">>,
            Expect<Test<Greater5, "equals", "greater">>,
        ];
    });

    it("integer less than", () => {
        type Less1 = CompareNumbers<5, 10>;
        type Less2 = CompareNumbers<0, 1>;
        type Less3 = CompareNumbers<-1, 0>;
        type Less4 = CompareNumbers<-5, -1>;
        type Less5 = CompareNumbers<99, 100>;

        type cases = [
            Expect<Test<Less1, "equals", "less">>,
            Expect<Test<Less2, "equals", "less">>,
            Expect<Test<Less3, "equals", "less">>,
            Expect<Test<Less4, "equals", "less">>,
            Expect<Test<Less5, "equals", "less">>,
        ];
    });

    it("decimal equality", () => {
        type Equal1 = CompareNumbers<1.5, 1.5>;
        type Equal2 = CompareNumbers<0.1, 0.1>;
        type Equal3 = CompareNumbers<-2.5, -2.5>;
        type Equal4 = CompareNumbers<3.14, 3.14>;

        type cases = [
            Expect<Test<Equal1, "equals", "equal">>,
            Expect<Test<Equal2, "equals", "equal">>,
            Expect<Test<Equal3, "equals", "equal">>,
            Expect<Test<Equal4, "equals", "equal">>,
        ];
    });

    it("decimal greater than", () => {
        type Greater1 = CompareNumbers<2.5, 1.5>;
        type Greater2 = CompareNumbers<1.1, 1.0>;
        type Greater3 = CompareNumbers<0.1, 0.01>;
        type Greater4 = CompareNumbers<-1.5, -2.5>;
        type Greater5 = CompareNumbers<3.14, 3.13>;

        type cases = [
            Expect<Test<Greater1, "equals", "greater">>,
            Expect<Test<Greater2, "equals", "greater">>,
            Expect<Test<Greater3, "equals", "greater">>,
            Expect<Test<Greater4, "equals", "greater">>,
            Expect<Test<Greater5, "equals", "greater">>,
        ];
    });

    it("decimal less than", () => {
        type Less1 = CompareNumbers<1.5, 2.5>;
        type Less2 = CompareNumbers<1.0, 1.1>;
        type Less3 = CompareNumbers<0.01, 0.1>;
        type Less4 = CompareNumbers<-2.5, -1.5>;
        type Less5 = CompareNumbers<3.13, 3.14>;

        type cases = [
            Expect<Test<Less1, "equals", "less">>,
            Expect<Test<Less2, "equals", "less">>,
            Expect<Test<Less3, "equals", "less">>,
            Expect<Test<Less4, "equals", "less">>,
            Expect<Test<Less5, "equals", "less">>,
        ];
    });

    it("mixed integer and decimal", () => {
        // Integer vs Decimal
        type Mixed1 = CompareNumbers<2, 1.5>;  // greater
        type Mixed2 = CompareNumbers<1, 1.5>;  // less
        type Mixed3 = CompareNumbers<1, 1.0>;  // equal

        // Decimal vs Integer
        type Mixed4 = CompareNumbers<1.5, 2>;  // less
        type Mixed5 = CompareNumbers<2.5, 2>;  // greater
        type Mixed6 = CompareNumbers<1.0, 1>;  // equal

        type cases = [
            Expect<Test<Mixed1, "equals", "greater">>,
            Expect<Test<Mixed2, "equals", "less">>,
            Expect<Test<Mixed3, "equals", "equal">>,
            Expect<Test<Mixed4, "equals", "less">>,
            Expect<Test<Mixed5, "equals", "greater">>,
            Expect<Test<Mixed6, "equals", "equal">>,
        ];
    });

    it("zero comparisons", () => {
        type ZeroVsPos = CompareNumbers<0, 1>;
        type ZeroVsNeg = CompareNumbers<0, -1>;
        type PosVsZero = CompareNumbers<1, 0>;
        type NegVsZero = CompareNumbers<-1, 0>;
        type ZeroVsZero = CompareNumbers<0, 0>;

        // Zero vs decimal
        type ZeroVsPosDec = CompareNumbers<0, 0.1>;
        type ZeroVsNegDec = CompareNumbers<0, -0.1>;

        type cases = [
            Expect<Test<ZeroVsPos, "equals", "less">>,
            Expect<Test<ZeroVsNeg, "equals", "greater">>,
            Expect<Test<PosVsZero, "equals", "greater">>,
            Expect<Test<NegVsZero, "equals", "less">>,
            Expect<Test<ZeroVsZero, "equals", "equal">>,
            Expect<Test<ZeroVsPosDec, "equals", "less">>,
            Expect<Test<ZeroVsNegDec, "equals", "greater">>,
        ];
    });

    it("negative number comparisons", () => {
        type NegInt1 = CompareNumbers<-5, -3>;  // less
        type NegInt2 = CompareNumbers<-3, -5>;  // greater
        type NegInt3 = CompareNumbers<-5, -5>;  // equal

        type NegDec1 = CompareNumbers<-2.5, -1.5>;  // less
        type NegDec2 = CompareNumbers<-1.5, -2.5>;  // greater
        type NegDec3 = CompareNumbers<-2.5, -2.5>;  // equal

        type cases = [
            Expect<Test<NegInt1, "equals", "less">>,
            Expect<Test<NegInt2, "equals", "greater">>,
            Expect<Test<NegInt3, "equals", "equal">>,
            Expect<Test<NegDec1, "equals", "less">>,
            Expect<Test<NegDec2, "equals", "greater">>,
            Expect<Test<NegDec3, "equals", "equal">>,
        ];
    });

    it("different decimal precision", () => {
        // Single vs double precision
        type P1 = CompareNumbers<1.5, 1.25>;  // greater
        type P2 = CompareNumbers<1.25, 1.5>;  // less
        type P3 = CompareNumbers<1.5, 1.50>;  // equal

        // Triple Precision
        type P4 = CompareNumbers<1.123, 1.124>;  // less
        type P5 = CompareNumbers<1.124, 1.123>;  // greater
        type P6 = CompareNumbers<1.123, 1.123>;  // equal

        type cases = [
            Expect<Test<P1, "equals", "greater">>,
            Expect<Test<P2, "equals", "less">>,
            Expect<Test<P3, "equals", "equal">>,
            Expect<Test<P4, "equals", "less">>,
            Expect<Test<P5, "equals", "greater">>,
            Expect<Test<P6, "equals", "equal">>,
        ];
    });

    it("small decimal differences", () => {
        type SmallDiff1 = CompareNumbers<0.1, 0.01>;    // greater
        type SmallDiff2 = CompareNumbers<0.01, 0.1>;    // less
        type SmallDiff3 = CompareNumbers<0.001, 0.002>; // less
        type SmallDiff4 = CompareNumbers<0.002, 0.001>; // greater

        type cases = [
            Expect<Test<SmallDiff1, "equals", "greater">>,
            Expect<Test<SmallDiff2, "equals", "less">>,
            Expect<Test<SmallDiff3, "equals", "less">>,
            Expect<Test<SmallDiff4, "equals", "greater">>,
        ];
    });

    it("large number comparisons", () => {
        type Large1 = CompareNumbers<1000, 999>;     // greater
        type Large2 = CompareNumbers<999, 1000>;     // less
        type Large3 = CompareNumbers<1000, 1000>;    // equal
        type Large4 = CompareNumbers<9999, 10000>;   // less
        type Large5 = CompareNumbers<10000, 9999>;   // greater

        type cases = [
            Expect<Test<Large1, "equals", "greater">>,
            Expect<Test<Large2, "equals", "less">>,
            Expect<Test<Large3, "equals", "equal">>,
            Expect<Test<Large4, "equals", "less">>,
            Expect<Test<Large5, "equals", "greater">>,
        ];
    });

    it("edge cases with precision", () => {
        // Testing numbers that might cause precision issues
        type Edge1 = CompareNumbers<1.0, 1>;        // equal
        type Edge2 = CompareNumbers<2.0, 2>;        // equal
        type Edge3 = CompareNumbers<0.0, 0>;        // equal
        type Edge4 = CompareNumbers<1.00, 1.0>;     // equal
        type Edge5 = CompareNumbers<2.50, 2.5>;     // equal

        type cases = [
            Expect<Test<Edge1, "equals", "equal">>,
            Expect<Test<Edge2, "equals", "equal">>,
            Expect<Test<Edge3, "equals", "equal">>,
            Expect<Test<Edge4, "equals", "equal">>,
            Expect<Test<Edge5, "equals", "equal">>,
        ];
    });

    it("boundary values", () => {
        // Testing at common boundaries
        type Boundary1 = CompareNumbers<0.9, 1.0>;   // less
        type Boundary2 = CompareNumbers<1.0, 1.1>;   // less
        type Boundary3 = CompareNumbers<-0.1, 0.0>;  // less
        type Boundary4 = CompareNumbers<0.0, 0.1>;   // less
        type Boundary5 = CompareNumbers<9.9, 10.0>;  // less
        type Boundary6 = CompareNumbers<10.0, 10.1>; // less

        type cases = [
            Expect<Test<Boundary1, "equals", "less">>,
            Expect<Test<Boundary2, "equals", "less">>,
            Expect<Test<Boundary3, "equals", "less">>,
            Expect<Test<Boundary4, "equals", "less">>,
            Expect<Test<Boundary5, "equals", "less">>,
            Expect<Test<Boundary6, "equals", "less">>,
        ];
    });

    it("documentation example", () => {
        // From the JSDoc: Compare<5,4> should return "greater"
        type DocExample = CompareNumbers<5, 4>;

        type cases = [
            Expect<Test<DocExample, "equals", "greater">>,
        ];
    });

    it("wide number types", () => {
        // Testing with wide number type should return appropriate type
        type Wide1 = CompareNumbers<number, 5>;
        type Wide2 = CompareNumbers<5, number>;
        type Wide3 = CompareNumbers<number, number>;

        type cases = [
            // These should return some form of comparison result or error
            // The exact behavior depends on the implementation
            Expect<Test<Wide1, "extends", "equal" | "greater" | "less" | never>>,
            Expect<Test<Wide2, "extends", "equal" | "greater" | "less" | never>>,
            Expect<Test<Wide3, "extends", "equal" | "greater" | "less" | never>>,
        ];
    });

    it("complex decimal scenarios", () => {
        // Real-world decimal scenarios
        type Currency1 = CompareNumbers<19.99, 20.00>;  // less
        type Currency2 = CompareNumbers<99.95, 99.99>;  // less
        type Percentage1 = CompareNumbers<50.5, 50.0>;  // greater
        type Percentage2 = CompareNumbers<33.33, 33.34>; // less

        type cases = [
            Expect<Test<Currency1, "equals", "less">>,
            Expect<Test<Currency2, "equals", "less">>,
            Expect<Test<Percentage1, "equals", "greater">>,
            Expect<Test<Percentage2, "equals", "less">>,
        ];
    });

    it("symmetry property", () => {
        // If A > B, then B < A
        type A_gt_B = CompareNumbers<10, 5>;  // greater
        type B_lt_A = CompareNumbers<5, 10>;  // less

        // If A = B, then B = A
        type A_eq_B = CompareNumbers<7, 7>;   // equal
        type B_eq_A = CompareNumbers<7, 7>;   // equal

        type cases = [
            Expect<Test<A_gt_B, "equals", "greater">>,
            Expect<Test<B_lt_A, "equals", "less">>,
            Expect<Test<A_eq_B, "equals", "equal">>,
            Expect<Test<B_eq_A, "equals", "equal">>,
        ];
    });

    it("transitivity property", () => {
        // If A > B and B > C, then A > C
        type A = 10;
        type B = 5;
        type C = 2;

        type A_gt_B = CompareNumbers<A, B>;  // greater
        type B_gt_C = CompareNumbers<B, C>;  // greater
        type A_gt_C = CompareNumbers<A, C>;  // greater

        type cases = [
            Expect<Test<A_gt_B, "equals", "greater">>,
            Expect<Test<B_gt_C, "equals", "greater">>,
            Expect<Test<A_gt_C, "equals", "greater">>,
        ];
    });

});

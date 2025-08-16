import { describe, it } from "vitest";
import { Expect, Test, Multiply } from "inferred-types/types";

describe("Multiply<A,B>", () => {
    it("basic multiplication", () => {
        type M2x3 = Multiply<2, 3>;
        type M5x4 = Multiply<5, 4>;
        type M7x6 = Multiply<7, 6>;
        type M10x10 = Multiply<10, 10>;

        type cases = [
            Expect<Test<M2x3, "equals", 6>>,
            Expect<Test<M5x4, "equals", 20>>,
            Expect<Test<M7x6, "equals", 42>>,
            Expect<Test<M10x10, "equals", 100>>,
        ];
    });

    it("multiplication by zero", () => {
        type M0x5 = Multiply<0, 5>;
        type M10x0 = Multiply<10, 0>;
        type M0x0 = Multiply<0, 0>;

        type cases = [
            Expect<Test<M0x5, "equals", 0>>,
            Expect<Test<M10x0, "equals", 0>>,
            Expect<Test<M0x0, "equals", 0>>,
        ];
    });

    it("multiplication by one", () => {
        type M1x5 = Multiply<1, 5>;
        type M10x1 = Multiply<10, 1>;
        type M1x1 = Multiply<1, 1>;

        type cases = [
            Expect<Test<M1x5, "equals", 5>>,
            Expect<Test<M10x1, "equals", 10>>,
            Expect<Test<M1x1, "equals", 1>>,
        ];
    });

    it("larger numbers", () => {
        type M12x5 = Multiply<12, 5>;
        type M15x3 = Multiply<15, 3>;
        type M20x4 = Multiply<20, 4>;
        type M25x2 = Multiply<25, 2>;

        type cases = [
            Expect<Test<M12x5, "equals", 60>>,
            Expect<Test<M15x3, "equals", 45>>,
            Expect<Test<M20x4, "equals", 80>>,
            Expect<Test<M25x2, "equals", 50>>,
        ];
    });

    it("commutative property", () => {
        type M3x7 = Multiply<3, 7>;
        type M7x3 = Multiply<7, 3>;
        type M4x9 = Multiply<4, 9>;
        type M9x4 = Multiply<9, 4>;

        type cases = [
            Expect<Test<M3x7, "equals", M7x3>>,
            Expect<Test<M4x9, "equals", M9x4>>,
            Expect<Test<M3x7, "equals", 21>>,
            Expect<Test<M4x9, "equals", 36>>,
        ];
    });

    it("with NumberLike types", () => {
        type MStringNumeric = Multiply<"5", "6">;
        type MNumericLiteral = Multiply<8, 7>;
        type MMixed = Multiply<"9", 5>;

        type cases = [
            Expect<Test<MStringNumeric, "equals", 30>>,
            Expect<Test<MNumericLiteral, "equals", 56>>,
            Expect<Test<MMixed, "equals", 45>>,
        ];
    });

    it("edge cases with small numbers", () => {
        type M2x2 = Multiply<2, 2>;
        type M3x3 = Multiply<3, 3>;
        type M4x4 = Multiply<4, 4>;

        type cases = [
            Expect<Test<M2x2, "equals", 4>>,
            Expect<Test<M3x3, "equals", 9>>,
            Expect<Test<M4x4, "equals", 16>>,
        ];
    });

    it("sequential multiplications", () => {
        // Testing multiple multiplications in sequence
        type M2x5 = Multiply<2, 5>;
        type M10x3 = Multiply<M2x5, 3>;
        type M30x2 = Multiply<M10x3, 2>;

        type cases = [
            Expect<Test<M2x5, "equals", 10>>,
            Expect<Test<M10x3, "equals", 30>>,
            Expect<Test<M30x2, "equals", 60>>,
        ];
    });

    it("associative property", () => {
        // (a × b) × c = a × (b × c)
        type M2x3x4_Left = Multiply<Multiply<2, 3>, 4>;
        type M2x3x4_Right = Multiply<2, Multiply<3, 4>>;

        type cases = [
            Expect<Test<M2x3x4_Left, "equals", 24>>,
            Expect<Test<M2x3x4_Right, "equals", 24>>,
            Expect<Test<M2x3x4_Left, "equals", M2x3x4_Right>>,
        ];
    });

    it("distributive property", () => {
        // a × (b + c) = (a × b) + (a × c)
        // Testing 5 × (3 + 4) = (5 × 3) + (5 × 4)
        type M5x3 = Multiply<5, 3>;
        type M5x4 = Multiply<5, 4>;
        type M5x7 = Multiply<5, 7>;
        type Sum = 15 | 20; // This would be Add<M5x3, M5x4> if Add is available

        type cases = [
            Expect<Test<M5x3, "equals", 15>>,
            Expect<Test<M5x4, "equals", 20>>,
            Expect<Test<M5x7, "equals", 35>>,
        ];
    });
});

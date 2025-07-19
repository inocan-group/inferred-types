import { describe, it } from "vitest";
import { Expect, Test } from "inferred-types/types";
import { Sum } from "types/numeric-literals/Sum";

describe("Sum<T>", () => {
    it("empty array returns 0", () => {
        type Empty = Sum<[]>;

        type cases = [
            Expect<Test<Empty, "equals", 0>>
        ];
    });

    it("single element array", () => {
        type Single = Sum<[5]>;
        type SingleZero = Sum<[0]>;

        type cases = [
            Expect<Test<Single, "equals", 5>>,
            Expect<Test<SingleZero, "equals", 0>>
        ];
    });

    it("two element arrays", () => {
        type TwoPositive = Sum<[1, 2]>;
        type WithZero = Sum<[0, 10]>;

        type cases = [
            Expect<Test<TwoPositive, "equals", 3>>,
            Expect<Test<WithZero, "equals", 10>>
        ];
    });

    it("multiple element arrays", () => {
        type Three = Sum<[1, 2, 3]>;
        type Four = Sum<[10, 20, 30, 40]>;
        type AllZeros = Sum<[0, 0, 0, 0]>;

        type cases = [
            Expect<Test<Three, "equals", 6>>,
            Expect<Test<Four, "equals", 100>>,
            Expect<Test<AllZeros, "equals", 0>>
        ];
    });

    it("larger arrays", () => {
        type Six = Sum<[1, 2, 3, 4, 5, 6]>;
        type Seven = Sum<[10, 10, 10, 10, 10, 10, 10]>;

        type cases = [
            Expect<Test<Six, "equals", 21>>,
            Expect<Test<Seven, "equals", 70>>
        ];
    });

    it("handles readonly arrays", () => {
        type ReadonlySum = Sum<readonly [1, 2, 3]>;

        type cases = [
            Expect<Test<ReadonlySum, "equals", 6>>
        ];
    });

    it("rejects negative numbers", () => {
        type NegativeSingle = Sum<[-1]>;
        type NegativeDouble = Sum<[-1, -2]>;
        type MixedNumbers = Sum<[1, -2, 3]>;

        type cases = [
            Expect<Test<NegativeSingle, "equals", never>>,
            Expect<Test<NegativeDouble, "equals", never>>,
            Expect<Test<MixedNumbers, "equals", never>>
        ];
    });

    it("handles different numeric literal formats", () => {
        type LargeNumbers = Sum<[1000, 2000, 3000]>;

        type cases = [
            Expect<Test<LargeNumbers, "equals", 6000>>
        ];
    });

    it("edge cases with string number literals", () => {
        type N1 = 5;
        type N2 = 10;
        type TemplateSum = Sum<[N1, N2]>;

        type cases = [
            Expect<Test<TemplateSum, "equals", 15>>
        ];
    });
});

import { describe, it, expect } from "vitest";
import { Expect, IsGreaterThan, IsGreaterThanOrEqual, Test } from "inferred-types/types";
import { isGreaterThan, isGreaterThanOrEqual } from "inferred-types/runtime";

describe("IsGreaterThan<A,B> Type Utility", () => {

    it("basic integer comparisons", () => {
        type T1 = IsGreaterThan<1, 0>;
        type T2 = IsGreaterThan<1000, 0>;
        type T3 = IsGreaterThan<42, 30>;
        type T4 = IsGreaterThan<100, 99>;
        type T5 = IsGreaterThan<10, 5>;

        type F1 = IsGreaterThan<0, 1>;
        type F2 = IsGreaterThan<0, 1000>;
        type F3 = IsGreaterThan<30, 42>;
        type F4 = IsGreaterThan<99, 100>;
        type F5 = IsGreaterThan<5, 10>;

        type Eq1 = IsGreaterThan<5, 5>;
        type Eq2 = IsGreaterThan<0, 0>;
        type Eq3 = IsGreaterThan<100, 100>;

        type cases = [
            // True cases
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
            Expect<Test<T5, "equals", true>>,

            // False cases
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
            Expect<Test<F4, "equals", false>>,
            Expect<Test<F5, "equals", false>>,

            // Equal cases (should be false)
            Expect<Test<Eq1, "equals", false>>,
            Expect<Test<Eq2, "equals", false>>,
            Expect<Test<Eq3, "equals", false>>,
        ];
    });

    it("decimal number comparisons", () => {
        type T1 = IsGreaterThan<1.5, 1.0>;
        type T2 = IsGreaterThan<2.5, 1.5>;
        type T3 = IsGreaterThan<3.14, 3.13>;
        type T4 = IsGreaterThan<0.1, 0.01>;
        type T5 = IsGreaterThan<1.001, 1.0>;

        type F1 = IsGreaterThan<1.0, 1.5>;
        type F2 = IsGreaterThan<1.5, 2.5>;
        type F3 = IsGreaterThan<3.13, 3.14>;
        type F4 = IsGreaterThan<0.01, 0.1>;
        type F5 = IsGreaterThan<1.0, 1.001>;

        type Eq1 = IsGreaterThan<1.5, 1.5>;
        type Eq2 = IsGreaterThan<3.14, 3.14>;

        type cases = [
            // True cases
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
            Expect<Test<T5, "equals", true>>,

            // False cases
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
            Expect<Test<F4, "equals", false>>,
            Expect<Test<F5, "equals", false>>,

            // Equal cases (should be false)
            Expect<Test<Eq1, "equals", false>>,
            Expect<Test<Eq2, "equals", false>>,
        ];
    });

    it("mixed integer and decimal comparisons", () => {
        type T1 = IsGreaterThan<2, 1.5>;
        type T2 = IsGreaterThan<1.5, 1>;
        type T3 = IsGreaterThan<3, 2.9>;
        type T4 = IsGreaterThan<0.1, 0>;

        type F1 = IsGreaterThan<1, 1.5>;
        type F2 = IsGreaterThan<1.5, 2>;
        type F3 = IsGreaterThan<2.9, 3>;
        type F4 = IsGreaterThan<0, 0.1>;

        type Eq1 = IsGreaterThan<1, 1.0>;
        type Eq2 = IsGreaterThan<2.0, 2>;

        type cases = [
            // True cases
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,

            // False cases
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
            Expect<Test<F4, "equals", false>>,

            // Equal cases (should be false)
            Expect<Test<Eq1, "equals", false>>,
            Expect<Test<Eq2, "equals", false>>,
        ];
    });

    it("negative number comparisons", () => {
        type T1 = IsGreaterThan<-1, -2>;
        type T2 = IsGreaterThan<-5, -10>;
        type T3 = IsGreaterThan<0, -1>;
        type T4 = IsGreaterThan<1, -1>;
        type T5 = IsGreaterThan<-1.5, -2.5>;

        type F1 = IsGreaterThan<-2, -1>;
        type F2 = IsGreaterThan<-10, -5>;
        type F3 = IsGreaterThan<-1, 0>;
        type F4 = IsGreaterThan<-1, 1>;
        type F5 = IsGreaterThan<-2.5, -1.5>;

        type Eq1 = IsGreaterThan<-5, -5>;
        type Eq2 = IsGreaterThan<-1.5, -1.5>;

        type cases = [
            // True cases
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
            Expect<Test<T5, "equals", true>>,

            // False cases
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
            Expect<Test<F4, "equals", false>>,
            Expect<Test<F5, "equals", false>>,

            // Equal cases (should be false)
            Expect<Test<Eq1, "equals", false>>,
            Expect<Test<Eq2, "equals", false>>,
        ];
    });

    it("large number comparisons", () => {
        type T1 = IsGreaterThan<1000, 999>;
        type T2 = IsGreaterThan<10000, 9999>;
        type T3 = IsGreaterThan<100000, 99999>;

        type F1 = IsGreaterThan<999, 1000>;
        type F2 = IsGreaterThan<9999, 10000>;
        type F3 = IsGreaterThan<99999, 100000>;

        type cases = [
            // True cases
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,

            // False cases
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
        ];
    });

    it("zero comparisons", () => {
        type T1 = IsGreaterThan<1, 0>;
        type T2 = IsGreaterThan<0.1, 0>;
        type T3 = IsGreaterThan<0, -1>;
        type T4 = IsGreaterThan<0, -0.1>;

        type F1 = IsGreaterThan<0, 1>;
        type F2 = IsGreaterThan<0, 0.1>;
        type F3 = IsGreaterThan<-1, 0>;
        type F4 = IsGreaterThan<-0.1, 0>;

        type Eq1 = IsGreaterThan<0, 0>;

        type cases = [
            // True cases
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,

            // False cases
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
            Expect<Test<F4, "equals", false>>,

            // Equal case (should be false)
            Expect<Test<Eq1, "equals", false>>,
        ];
    });

    it("wide type handling", () => {
        type W1 = IsGreaterThan<number, 42>;
        type W2 = IsGreaterThan<42, number>;
        type W3 = IsGreaterThan<number, number>;

        type cases = [
            Expect<Test<W1, "equals", boolean>>,
            Expect<Test<W2, "equals", boolean>>,
            Expect<Test<W3, "equals", boolean>>,
        ];
    });

    it("string numeric literals", () => {
        type T1 = IsGreaterThan<"5", "3">;
        type T2 = IsGreaterThan<"10", "9">;
        type T3 = IsGreaterThan<"1.5", "1.0">;

        type F1 = IsGreaterThan<"3", "5">;
        type F2 = IsGreaterThan<"9", "10">;
        type F3 = IsGreaterThan<"1.0", "1.5">;

        type Eq1 = IsGreaterThan<"5", "5">;

        type cases = [
            // True cases
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,

            // False cases
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,

            // Equal case (should be false)
            Expect<Test<Eq1, "equals", false>>,
        ];
    });

});

describe("IsGreaterThanOrEqual<A,B> Type Utility", () => {

    it("basic integer comparisons", () => {
        type T1 = IsGreaterThanOrEqual<1, 0>;
        type T2 = IsGreaterThanOrEqual<1000, 0>;
        type T3 = IsGreaterThanOrEqual<42, 30>;
        type T4 = IsGreaterThanOrEqual<5, 5>; // Equal case
        type T5 = IsGreaterThanOrEqual<100, 100>; // Equal case

        type F1 = IsGreaterThanOrEqual<0, 1>;
        type F2 = IsGreaterThanOrEqual<0, 1000>;
        type F3 = IsGreaterThanOrEqual<30, 42>;

        type cases = [
            // True cases (including equal)
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
            Expect<Test<T5, "equals", true>>,

            // False cases
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
        ];
    });

    it("decimal number comparisons", () => {
        type T1 = IsGreaterThanOrEqual<1.5, 1.0>;
        type T2 = IsGreaterThanOrEqual<2.5, 1.5>;
        type T3 = IsGreaterThanOrEqual<3.14, 3.14>; // Equal case
        type T4 = IsGreaterThanOrEqual<1.5, 1.5>; // Equal case

        type F1 = IsGreaterThanOrEqual<1.0, 1.5>;
        type F2 = IsGreaterThanOrEqual<1.5, 2.5>;
        type F3 = IsGreaterThanOrEqual<3.13, 3.14>;

        type cases = [
            // True cases (including equal)
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,

            // False cases
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
        ];
    });

    it("negative number comparisons", () => {
        type T1 = IsGreaterThanOrEqual<-1, -2>;
        type T2 = IsGreaterThanOrEqual<0, -1>;
        type T3 = IsGreaterThanOrEqual<-5, -5>; // Equal case

        type F1 = IsGreaterThanOrEqual<-2, -1>;
        type F2 = IsGreaterThanOrEqual<-1, 0>;

        type cases = [
            // True cases (including equal)
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,

            // False cases
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
        ];
    });

    it("wide type handling", () => {
        type W1 = IsGreaterThanOrEqual<number, 42>;
        type W2 = IsGreaterThanOrEqual<42, number>;
        type W3 = IsGreaterThanOrEqual<number, number>;

        type cases = [
            Expect<Test<W1, "equals", boolean>>,
            Expect<Test<W2, "equals", boolean>>,
            Expect<Test<W3, "equals", boolean>>,
        ];
    });

});

describe("isGreaterThan() Runtime Function", () => {

    it("basic integer comparisons", () => {
        const gt5 = isGreaterThan(5); // partial application

        const ten = gt5(10);
        const six = gt5(6);
        const five = gt5(5);
        const four = gt5(4);
        const zero = gt5(0);

        expect(ten).toBe(true);
        expect(six).toBe(true);
        expect(five).toBe(false); // Equal should be false
        expect(four).toBe(false);
        expect(zero).toBe(false);

        // Type testing
        type cases = [
            Expect<Test<typeof ten, "equals", true>>,
            Expect<Test<typeof six, "equals", true>>,
            Expect<Test<typeof five, "equals", false>>,
            Expect<Test<typeof four, "equals", false>>,
        ];
    });

    it("decimal number comparisons", () => {
        const gt1_5 = isGreaterThan(1.5);

        const two = gt1_5(2.0);
        const one_six = gt1_5(1.6);
        const one_five = gt1_5(1.5);
        const one_four = gt1_5(1.4);
        const half = gt1_5(0.5);

        expect(two).toBe(true);
        expect(one_six).toBe(true);
        expect(one_five).toBe(false); // Equal should be false
        expect(one_four).toBe(false);
        expect(half).toBe(false);

        // Type testing
        type cases = [
            Expect<Test<typeof two, "equals", true>>,
            Expect<Test<typeof one_six, "equals", true>>,
            Expect<Test<typeof one_five, "equals", false>>,
            Expect<Test<typeof one_four, "equals", false>>,
        ];
    });

    it("negative number comparisons", () => {
        const gtNeg2 = isGreaterThan(-2);

        const neg_one = gtNeg2(-1);
        const zero = gtNeg2(0);
        const one = gtNeg2(1);
        const neg_two = gtNeg2(-2);
        const neg_three = gtNeg2(-3);

        expect(neg_one).toBe(true);
        expect(zero).toBe(true);
        expect(one).toBe(true);
        expect(neg_two).toBe(false); // Equal should be false
        expect(neg_three).toBe(false);

        // Type testing
        type cases = [
            Expect<Test<typeof neg_one, "equals", true>>,
            Expect<Test<typeof zero, "equals", true>>,
            Expect<Test<typeof neg_two, "equals", false>>,
            Expect<Test<typeof neg_three, "equals", false>>,
        ];
    });

    it("zero comparisons", () => {
        const gt0 = isGreaterThan(0);

        const one = gt0(1);
        const point_one = gt0(0.1);
        const zero = gt0(0);
        const neg_point_one = gt0(-0.1);
        const neg_one = gt0(-1);

        expect(one).toBe(true);
        expect(point_one).toBe(true);
        expect(zero).toBe(false); // Equal should be false
        expect(neg_point_one).toBe(false);
        expect(neg_one).toBe(false);

        // Type testing
        type cases = [
            Expect<Test<typeof one, "equals", true>>,
            Expect<Test<typeof point_one, "equals", true>>,
            Expect<Test<typeof zero, "equals", false>>,
            Expect<Test<typeof neg_point_one, "equals", false>>,
        ];
    });

    it("large number comparisons", () => {
        const gt1000 = isGreaterThan(1000);

        const thousand_one = gt1000(1001);
        const ten_thousand = gt1000(10000);
        const thousand = gt1000(1000);
        const nine_ninety_nine = gt1000(999);

        expect(thousand_one).toBe(true);
        expect(ten_thousand).toBe(true);
        expect(thousand).toBe(false); // Equal should be false
        expect(nine_ninety_nine).toBe(false);

        // Type testing
        type cases = [
            Expect<Test<typeof thousand_one, "equals", true>>,
            Expect<Test<typeof ten_thousand, "equals", true>>,
            Expect<Test<typeof thousand, "equals", false>>,
            Expect<Test<typeof nine_ninety_nine, "equals", false>>,
        ];
    });

});

describe("isGreaterThanOrEqual() Runtime Function", () => {

    it("basic integer comparisons", () => {
        const gte5 = isGreaterThanOrEqual(5);

        const ten = gte5(10);
        const six = gte5(6);
        const five = gte5(5);
        const four = gte5(4);
        const zero = gte5(0);

        expect(ten).toBe(true);
        expect(six).toBe(true);
        expect(five).toBe(true); // Equal should be true
        expect(four).toBe(false);
        expect(zero).toBe(false);

        // Type testing
        type cases = [
            Expect<Test<typeof ten, "equals", true>>,
            Expect<Test<typeof six, "equals", true>>,
            Expect<Test<typeof five, "equals", true>>,
            Expect<Test<typeof four, "equals", false>>,
        ];
    });

    it("decimal number comparisons", () => {
        const gte1_5 = isGreaterThanOrEqual(1.5);

        const two = gte1_5(2.0);
        const one_six = gte1_5(1.6);
        const one_five = gte1_5(1.5);
        const one_four = gte1_5(1.4);
        const half = gte1_5(0.5);

        expect(two).toBe(true);
        expect(one_six).toBe(true);
        expect(one_five).toBe(true); // Equal should be true
        expect(one_four).toBe(false);
        expect(half).toBe(false);

        // Type testing
        type cases = [
            Expect<Test<typeof two, "equals", true>>,
            Expect<Test<typeof one_six, "equals", true>>,
            Expect<Test<typeof one_five, "equals", true>>,
            Expect<Test<typeof one_four, "equals", false>>,
        ];
    });

    it("negative number comparisons", () => {
        const gteNeg2 = isGreaterThanOrEqual(-2);

        const neg_one = gteNeg2(-1);
        const zero = gteNeg2(0);
        const one = gteNeg2(1);
        const neg_two = gteNeg2(-2);
        const neg_three = gteNeg2(-3);

        expect(neg_one).toBe(true);
        expect(zero).toBe(true);
        expect(one).toBe(true);
        expect(neg_two).toBe(true); // Equal should be true
        expect(neg_three).toBe(false);

        // Type testing
        type cases = [
            Expect<Test<typeof neg_one, "equals", true>>,
            Expect<Test<typeof zero, "equals", true>>,
            Expect<Test<typeof neg_two, "equals", true>>,
            Expect<Test<typeof neg_three, "equals", false>>,
        ];
    });

    it("zero comparisons", () => {
        const gte0 = isGreaterThanOrEqual(0);

        const one = gte0(1);
        const point_one = gte0(0.1);
        const zero = gte0(0);
        const neg_point_one = gte0(-0.1);
        const neg_one = gte0(-1);

        expect(one).toBe(true);
        expect(point_one).toBe(true);
        expect(zero).toBe(true); // Equal should be true
        expect(neg_point_one).toBe(false);
        expect(neg_one).toBe(false);

        // Type testing
        type cases = [
            Expect<Test<typeof one, "equals", true>>,
            Expect<Test<typeof point_one, "equals", true>>,
            Expect<Test<typeof zero, "equals", true>>,
            Expect<Test<typeof neg_point_one, "equals", false>>,
        ];
    });

    it("large number comparisons", () => {
        const gte1000 = isGreaterThanOrEqual(1000);

        const thousand_one = gte1000(1001);
        const ten_thousand = gte1000(10000);
        const thousand = gte1000(1000);
        const nine_ninety_nine = gte1000(999);

        expect(thousand_one).toBe(true);
        expect(ten_thousand).toBe(true);
        expect(thousand).toBe(true); // Equal should be true
        expect(nine_ninety_nine).toBe(false);

        // Type testing
        type cases = [
            Expect<Test<typeof thousand_one, "equals", true>>,
            Expect<Test<typeof ten_thousand, "equals", true>>,
            Expect<Test<typeof thousand, "equals", true>>,
            Expect<Test<typeof nine_ninety_nine, "equals", false>>,
        ];
    });

});

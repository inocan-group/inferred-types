import { describe, it, expect } from "vitest";
import type { Expect, LessThan, LessThanOrEqual, Test } from "inferred-types/types";

import { lessThan, lessThanOrEqual } from "inferred-types/runtime";

describe("LessThan<A,B> Type Utility", () => {

    it("basic integer comparisons", () => {
        type T1 = LessThan<0, 1>;
        type T2 = LessThan<0, 1000>;
        type T3 = LessThan<30, 42>;
        type T4 = LessThan<99, 100>;
        type T5 = LessThan<5, 10>;

        type F1 = LessThan<1, 0>;
        type F2 = LessThan<1000, 0>;
        type F3 = LessThan<42, 30>;
        type F4 = LessThan<100, 99>;
        type F5 = LessThan<10, 5>;

        type Eq1 = LessThan<5, 5>;
        type Eq2 = LessThan<0, 0>;
        type Eq3 = LessThan<100, 100>;

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
        type T1 = LessThan<1.0, 1.5>;
        type T2 = LessThan<1.5, 2.5>;
        type T3 = LessThan<3.13, 3.14>;
        type T4 = LessThan<0.01, 0.1>;
        type T5 = LessThan<1.0, 1.001>;

        type F1 = LessThan<1.5, 1.0>;
        type F2 = LessThan<2.5, 1.5>;
        type F3 = LessThan<3.14, 3.13>;
        type F4 = LessThan<0.1, 0.01>;
        type F5 = LessThan<1.001, 1.0>;

        type Eq1 = LessThan<1.5, 1.5>;
        type Eq2 = LessThan<3.14, 3.14>;

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
        type T1 = LessThan<1.5, 2>;
        type T2 = LessThan<1, 1.5>;
        type T3 = LessThan<2.9, 3>;
        type T4 = LessThan<0, 0.1>;

        type F1 = LessThan<1.5, 1>;
        type F2 = LessThan<2, 1.5>;
        type F3 = LessThan<3, 2.9>;
        type F4 = LessThan<0.1, 0>;

        type Eq1 = LessThan<1.0, 1>;
        type Eq2 = LessThan<2, 2.0>;

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
        type T1 = LessThan<-2, -1>;
        type T2 = LessThan<-10, -5>;
        type T3 = LessThan<-1, 0>;
        type T4 = LessThan<-1, 1>;
        type T5 = LessThan<-2.5, -1.5>;

        type F1 = LessThan<-1, -2>;
        type F2 = LessThan<-5, -10>;
        type F3 = LessThan<0, -1>;
        type F4 = LessThan<1, -1>;
        type F5 = LessThan<-1.5, -2.5>;

        type Eq1 = LessThan<-5, -5>;
        type Eq2 = LessThan<-1.5, -1.5>;

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
        type T1 = LessThan<999, 1000>;
        type T2 = LessThan<9999, 10000>;
        type T3 = LessThan<99999, 100000>;

        type F1 = LessThan<1000, 999>;
        type F2 = LessThan<10000, 9999>;
        type F3 = LessThan<100000, 99999>;

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
        type T1 = LessThan<0, 1>;
        type T2 = LessThan<0, 0.1>;
        type T3 = LessThan<-1, 0>;
        type T4 = LessThan<-0.1, 0>;

        type F1 = LessThan<1, 0>;
        type F2 = LessThan<0.1, 0>;
        type F3 = LessThan<0, -1>;
        type F4 = LessThan<0, -0.1>;

        type Eq1 = LessThan<0, 0>;

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
        type W1 = LessThan<number, 42>;
        type W2 = LessThan<42, number>;
        type W3 = LessThan<number, number>;

        type cases = [
            Expect<Test<W1, "equals", false>>,
            Expect<Test<W2, "equals", false>>,
            Expect<Test<W3, "equals", false>>,
        ];
    });

});

describe("LessThanOrEqual<A,B> Type Utility", () => {

    it("basic integer comparisons", () => {
        type T1 = LessThanOrEqual<0, 1>;
        type T2 = LessThanOrEqual<0, 1000>;
        type T3 = LessThanOrEqual<30, 42>;
        type T4 = LessThanOrEqual<5, 5>; // Equal case
        type T5 = LessThanOrEqual<100, 100>; // Equal case

        type F1 = LessThanOrEqual<1, 0>;
        type F2 = LessThanOrEqual<1000, 0>;
        type F3 = LessThanOrEqual<42, 30>;

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
        type T1 = LessThanOrEqual<1.0, 1.5>;
        type T2 = LessThanOrEqual<1.5, 2.5>;
        type T3 = LessThanOrEqual<3.14, 3.14>; // Equal case
        type T4 = LessThanOrEqual<1.5, 1.5>; // Equal case

        type F1 = LessThanOrEqual<1.5, 1.0>;
        type F2 = LessThanOrEqual<2.5, 1.5>;
        type F3 = LessThanOrEqual<3.14, 3.13>;

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
        type T1 = LessThanOrEqual<-2, -1>;
        type T2 = LessThanOrEqual<-1, 0>;
        type T3 = LessThanOrEqual<-5, -5>; // Equal case

        type F1 = LessThanOrEqual<-1, -2>;
        type F2 = LessThanOrEqual<0, -1>;

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
        type W1 = LessThanOrEqual<number, 42>;
        type W2 = LessThanOrEqual<42, number>;
        type W3 = LessThanOrEqual<number, number>;

        type cases = [
            Expect<Test<W1, "equals", false>>,
            Expect<Test<W2, "equals", false>>,
            Expect<Test<W3, "equals", false>>,
        ];
    });

});

describe("lessThan() Runtime Function", () => {

    it("basic integer comparisons", () => {
        const lt5 = lessThan(5); // partial application

        const four = lt5(4);
        const three = lt5(3);
        const five = lt5(5);
        const six = lt5(6);
        const ten = lt5(10);

        expect(four).toBe(true);
        expect(three).toBe(true);
        expect(five).toBe(false); // Equal should be false
        expect(six).toBe(false);
        expect(ten).toBe(false);

    });

    it("decimal number comparisons", () => {
        const lt1_5 = lessThan(1.5);

        const half = lt1_5(0.5);
        const one_four = lt1_5(1.4);
        const one_five = lt1_5(1.5);
        const one_six = lt1_5(1.6);
        const two = lt1_5(2.0);

        expect(half).toBe(true);
        expect(one_four).toBe(true);
        expect(one_five).toBe(false); // Equal should be false
        expect(one_six).toBe(false);
        expect(two).toBe(false);

    });

    it("negative number comparisons", () => {
        const ltNeg2 = lessThan(-2);

        const neg_three = ltNeg2(-3);
        const neg_two = ltNeg2(-2);
        const neg_one = ltNeg2(-1);
        const zero = ltNeg2(0);
        const one = ltNeg2(1);

        expect(neg_three).toBe(true);
        expect(neg_two).toBe(false); // Equal should be false
        expect(neg_one).toBe(false);
        expect(zero).toBe(false);
        expect(one).toBe(false);

    });

    it("zero comparisons", () => {
        const lt0 = lessThan(0);

        const neg_one = lt0(-1);
        const neg_point_one = lt0(-0.1);
        const zero = lt0(0);
        const point_one = lt0(0.1);
        const one = lt0(1);

        expect(neg_one).toBe(true);
        expect(neg_point_one).toBe(true);
        expect(zero).toBe(false); // Equal should be false
        expect(point_one).toBe(false);
        expect(one).toBe(false);

    });

    it("large number comparisons", () => {
        const lt1000 = lessThan(1000);

        const nine_ninety_nine = lt1000(999);
        const thousand = lt1000(1000);
        const thousand_one = lt1000(1001);
        const ten_thousand = lt1000(10000);

        expect(nine_ninety_nine).toBe(true);
        expect(thousand).toBe(false); // Equal should be false
        expect(thousand_one).toBe(false);
        expect(ten_thousand).toBe(false);

    });

});

describe("lessThanOrEqual() Runtime Function", () => {

    it("basic integer comparisons", () => {
        const lte5 = lessThanOrEqual(5);

        const four = lte5(4);
        const three = lte5(3);
        const five = lte5(5);
        const six = lte5(6);
        const ten = lte5(10);

        expect(four).toBe(true);
        expect(three).toBe(true);
        expect(five).toBe(true); // Equal should be true
        expect(six).toBe(false);
        expect(ten).toBe(false);

    });

    it("decimal number comparisons", () => {
        const lte1_5 = lessThanOrEqual(1.5);

        const half = lte1_5(0.5);
        const one_four = lte1_5(1.4);
        const one_five = lte1_5(1.5);
        const one_six = lte1_5(1.6);
        const two = lte1_5(2.0);

        expect(half).toBe(true);
        expect(one_four).toBe(true);
        expect(one_five).toBe(true); // Equal should be true
        expect(one_six).toBe(false);
        expect(two).toBe(false);

    });

    it("negative number comparisons", () => {
        const lteNeg2 = lessThanOrEqual(-2);

        const neg_three = lteNeg2(-3);
        const neg_two = lteNeg2(-2);
        const neg_one = lteNeg2(-1);
        const zero = lteNeg2(0);
        const one = lteNeg2(1);

        expect(neg_three).toBe(true);
        expect(neg_two).toBe(true); // Equal should be true
        expect(neg_one).toBe(false);
        expect(zero).toBe(false);
        expect(one).toBe(false);

    });

    it("zero comparisons", () => {
        const lte0 = lessThanOrEqual(0);

        const neg_one = lte0(-1);
        const neg_point_one = lte0(-0.1);
        const zero = lte0(0);
        const point_one = lte0(0.1);
        const one = lte0(1);

        expect(neg_one).toBe(true);
        expect(neg_point_one).toBe(true);
        expect(zero).toBe(true); // Equal should be true
        expect(point_one).toBe(false);
        expect(one).toBe(false);

    });

    it("large number comparisons", () => {
        const lte1000 = lessThanOrEqual(1000);

        const nine_ninety_nine = lte1000(999);
        const thousand = lte1000(1000);
        const thousand_one = lte1000(1001);
        const ten_thousand = lte1000(10000);

        expect(nine_ninety_nine).toBe(true);
        expect(thousand).toBe(true); // Equal should be true
        expect(thousand_one).toBe(false);
        expect(ten_thousand).toBe(false);

    });

});

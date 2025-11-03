import { describe, it, expect } from "vitest";
import type { Expect, IsLessThan, LessThanOrEqual, Test } from "inferred-types/types";


describe("IsLessThan<A,B> Type Utility", () => {

    it("basic integer comparisons", () => {
        type T1 = IsLessThan<0, 1>;
        type T2 = IsLessThan<0, 1000>;
        type T3 = IsLessThan<30, 42>;
        type T4 = IsLessThan<99, 100>;
        type T5 = IsLessThan<5, 10>;

        type F1 = IsLessThan<1, 0>;
        type F2 = IsLessThan<1000, 0>;
        type F3 = IsLessThan<42, 30>;
        type F4 = IsLessThan<100, 99>;
        type F5 = IsLessThan<10, 5>;

        type Eq1 = IsLessThan<5, 5>;
        type Eq2 = IsLessThan<0, 0>;
        type Eq3 = IsLessThan<100, 100>;

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
        type T1 = IsLessThan<1.0, 1.5>;
        type T2 = IsLessThan<1.5, 2.5>;
        type T3 = IsLessThan<3.13, 3.14>;
        type T4 = IsLessThan<0.01, 0.1>;
        type T5 = IsLessThan<1.0, 1.001>;

        type F1 = IsLessThan<1.5, 1.0>;
        type F2 = IsLessThan<2.5, 1.5>;
        type F3 = IsLessThan<3.14, 3.13>;
        type F4 = IsLessThan<0.1, 0.01>;
        type F5 = IsLessThan<1.001, 1.0>;

        type Eq1 = IsLessThan<1.5, 1.5>;
        type Eq2 = IsLessThan<3.14, 3.14>;

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
        type T1 = IsLessThan<1.5, 2>;
        type T2 = IsLessThan<1, 1.5>;
        type T3 = IsLessThan<2.9, 3>;
        type T4 = IsLessThan<0, 0.1>;

        type F1 = IsLessThan<1.5, 1>;
        type F2 = IsLessThan<2, 1.5>;
        type F3 = IsLessThan<3, 2.9>;
        type F4 = IsLessThan<0.1, 0>;

        type Eq1 = IsLessThan<1.0, 1>;
        type Eq2 = IsLessThan<2, 2.0>;

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
        type T1 = IsLessThan<-2, -1>;
        type T2 = IsLessThan<-10, -5>;
        type T3 = IsLessThan<-1, 0>;
        type T4 = IsLessThan<-1, 1>;
        type T5 = IsLessThan<-2.5, -1.5>;

        type F1 = IsLessThan<-1, -2>;
        type F2 = IsLessThan<-5, -10>;
        type F3 = IsLessThan<0, -1>;
        type F4 = IsLessThan<1, -1>;
        type F5 = IsLessThan<-1.5, -2.5>;

        type Eq1 = IsLessThan<-5, -5>;
        type Eq2 = IsLessThan<-1.5, -1.5>;

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
        type T1 = IsLessThan<999, 1000>;
        type T2 = IsLessThan<9999, 10000>;
        type T3 = IsLessThan<99999, 100000>;

        type F1 = IsLessThan<1000, 999>;
        type F2 = IsLessThan<10000, 9999>;
        type F3 = IsLessThan<100000, 99999>;

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
        type T1 = IsLessThan<0, 1>;
        type T2 = IsLessThan<0, 0.1>;
        type T3 = IsLessThan<-1, 0>;
        type T4 = IsLessThan<-0.1, 0>;

        type F1 = IsLessThan<1, 0>;
        type F2 = IsLessThan<0.1, 0>;
        type F3 = IsLessThan<0, -1>;
        type F4 = IsLessThan<0, -0.1>;

        type Eq1 = IsLessThan<0, 0>;

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
        type W1 = IsLessThan<number, 42>;
        type W2 = IsLessThan<42, number>;
        type W3 = IsLessThan<number, number>;

        type cases = [
            Expect<Test<W1, "equals", boolean>>,
            Expect<Test<W2, "equals", boolean>>,
            Expect<Test<W3, "equals", boolean>>,
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
            Expect<Test<W1, "equals", boolean>>,
            Expect<Test<W2, "equals", boolean>>,
            Expect<Test<W3, "equals", boolean>>,
        ];
    });

});

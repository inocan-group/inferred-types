import { describe, it } from "vitest";
import type {
    Expect,
    GreaterThan,
    GreaterThanOrEqual,
    Test
} from "inferred-types/types";


describe("GreaterThan<A,B> Type Utility", () => {

    it("basic integer comparisons", () => {
        type T1 = GreaterThan<1, 0>;
        type T2 = GreaterThan<1000, 0>;
        type T3 = GreaterThan<42, 30>;
        type T4 = GreaterThan<100, 99>;
        type T5 = GreaterThan<10, 5>;

        type F1 = GreaterThan<0, 1>;
        type F2 = GreaterThan<0, 1000>;
        type F3 = GreaterThan<30, 42>;
        type F4 = GreaterThan<99, 100>;
        type F5 = GreaterThan<5, 10>;

        type Eq1 = GreaterThan<5, 5>;
        type Eq2 = GreaterThan<0, 0>;
        type Eq3 = GreaterThan<100, 100>;

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
        type T1 = GreaterThan<1.5, 1.0>;
        type T2 = GreaterThan<2.5, 1.5>;
        type T3 = GreaterThan<3.14, 3.13>;
        type T4 = GreaterThan<0.1, 0.01>;
        type T5 = GreaterThan<1.001, 1.0>;

        type F1 = GreaterThan<1.0, 1.5>;
        type F2 = GreaterThan<1.5, 2.5>;
        type F3 = GreaterThan<3.13, 3.14>;
        type F4 = GreaterThan<0.01, 0.1>;
        type F5 = GreaterThan<1.0, 1.001>;

        type Eq1 = GreaterThan<1.5, 1.5>;
        type Eq2 = GreaterThan<3.14, 3.14>;

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
        type T1 = GreaterThan<2, 1.5>;
        type T2 = GreaterThan<1.5, 1>;
        type T3 = GreaterThan<3, 2.9>;
        type T4 = GreaterThan<0.1, 0>;

        type F1 = GreaterThan<1, 1.5>;
        type F2 = GreaterThan<1.5, 2>;
        type F3 = GreaterThan<2.9, 3>;
        type F4 = GreaterThan<0, 0.1>;

        type Eq1 = GreaterThan<1, 1.0>;
        type Eq2 = GreaterThan<2.0, 2>;

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
        type T1 = GreaterThan<-1, -2>;
        type T2 = GreaterThan<-5, -10>;
        type T3 = GreaterThan<0, -1>;
        type T4 = GreaterThan<1, -1>;
        type T5 = GreaterThan<-1.5, -2.5>;

        type F1 = GreaterThan<-2, -1>;
        type F2 = GreaterThan<-10, -5>;
        type F3 = GreaterThan<-1, 0>;
        type F4 = GreaterThan<-1, 1>;
        type F5 = GreaterThan<-2.5, -1.5>;

        type Eq1 = GreaterThan<-5, -5>;
        type Eq2 = GreaterThan<-1.5, -1.5>;

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
        type T1 = GreaterThan<1000, 999>;
        type T2 = GreaterThan<10000, 9999>;
        type T3 = GreaterThan<100000, 99999>;

        type F1 = GreaterThan<999, 1000>;
        type F2 = GreaterThan<9999, 10000>;
        type F3 = GreaterThan<99999, 100000>;

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
        type T1 = GreaterThan<1, 0>;
        type T2 = GreaterThan<0.1, 0>;
        type T3 = GreaterThan<0, -1>;
        type T4 = GreaterThan<0, -0.1>;

        type F1 = GreaterThan<0, 1>;
        type F2 = GreaterThan<0, 0.1>;
        type F3 = GreaterThan<-1, 0>;
        type F4 = GreaterThan<-0.1, 0>;

        type Eq1 = GreaterThan<0, 0>;

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
        type W1 = GreaterThan<number, 42>;
        type W2 = GreaterThan<42, number>;
        type W3 = GreaterThan<number, number>;

        type cases = [
            Expect<Test<W1, "equals", boolean>>,
            Expect<Test<W2, "equals", boolean>>,
            Expect<Test<W3, "equals", boolean>>,
        ];
    });

});

describe("IsGreaterThanOrEqual<A,B> Type Utility", () => {

    it("basic integer comparisons", () => {
        type T1 = GreaterThanOrEqual<1, 0>;
        type T2 = GreaterThanOrEqual<1000, 0>;
        type T3 = GreaterThanOrEqual<42, 30>;
        type T4 = GreaterThanOrEqual<5, 5>; // Equal case
        type T5 = GreaterThanOrEqual<100, 100>; // Equal case

        type F1 = GreaterThanOrEqual<0, 1>;
        type F2 = GreaterThanOrEqual<0, 1000>;
        type F3 = GreaterThanOrEqual<30, 42>;

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
        type T1 = GreaterThanOrEqual<1.5, 1.0>;
        type T2 = GreaterThanOrEqual<2.5, 1.5>;
        type T3 = GreaterThanOrEqual<3.14, 3.14>; // Equal case
        type T4 = GreaterThanOrEqual<1.5, 1.5>; // Equal case

        type F1 = GreaterThanOrEqual<1.0, 1.5>;
        type F2 = GreaterThanOrEqual<1.5, 2.5>;
        type F3 = GreaterThanOrEqual<3.13, 3.14>;

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
        type T1 = GreaterThanOrEqual<-1, -2>;
        type T2 = GreaterThanOrEqual<0, -1>;
        type T3 = GreaterThanOrEqual<-5, -5>; // Equal case

        type F1 = GreaterThanOrEqual<-2, -1>;
        type F2 = GreaterThanOrEqual<-1, 0>;

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
        type W1 = GreaterThanOrEqual<number, 42>;
        type W2 = GreaterThanOrEqual<42, number>;
        type W3 = GreaterThanOrEqual<number, number>;

        type cases = [
            Expect<Test<W1, "equals", boolean>>,
            Expect<Test<W2, "equals", boolean>>,
            Expect<Test<W3, "equals", boolean>>,
        ];
    });

});

import {
    Test,
    Compare,
    Expect,
    UpperAlphaChar,
    Contains,
} from "inferred-types/types";
import { describe, it } from "vitest";

describe("Compare<TVal,TOp,TComparator", () => {


    it("equals", () => {
        type T1 = Compare<42, "equals", 42>;
        type T2 = Compare<42, "equals", [42]>;
        type T3 = Compare<"foo", "equals", ["foo"]>;

        type B1 = Compare<string, "equals", ["foo"]>;
        type B2 = Compare<string, "equals", [string]>;
        type B3 = Compare<"foo", "equals", [string]>;

        type F1 = Compare<"foo", "equals", ["bar"]>;
        type F2 = Compare<"foo", "equals", [42]>;

        type E1 = Compare<"foo", "equals">;
        type E2 = Compare<"foo", "equals", ["foo", "bar"]>;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<T3, "equals",  true>>,

            Expect<Test<B1, "equals",  boolean>>,
            Expect<Test<B2, "equals",  boolean>>,
            Expect<Test<B3, "equals",  boolean>>,

            Expect<Test<F1, "equals",  false>>,
            Expect<Test<F2, "equals",  false>>,

            Expect<Test<E1, "isError", "invalid-parameters">>,
            Expect<Test<E2, "isError", "invalid-parameters">>,
        ];
    });


    it("extends", () => {
        type T1 = Compare<42, "extends", number>;
        type T1a = Compare<42, "extends", [number]>;
        type T1x = Compare<42, "extends">;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T1a, "equals",  true>>,
            Expect<Test<T1x, "extends",  Error>>,
        ];
    });


    it("equalsSome", () => {
        type T1 = Compare<42, "equalsSome", [42, 99]>;
        type T2 = Compare<99, "equalsSome", [42, 99]>;

        // @ts-ignore
        type E1 = Compare<42, "equalsSome", 42>; // Error
        // @ts-ignore
        type E2 = Compare<42, "equalsSome", [42]>; // Error

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<E1, "isError", "invalid-parameters">>,
            Expect<Test<E2, "isError", "invalid-parameters">>,
        ];
    });



    it("startsWith", () => {
        type T1 = Compare<420, "startsWith", 42>;
        type T2 = Compare<"foobar", "startsWith", "foo">;
        type T3 = Compare<"Foo", "startsWith", [UpperAlphaChar]>;
        type T4 = Compare<"Foo", "startsWith", UpperAlphaChar>;

        type F1 = Compare<"foo", "startsWith", UpperAlphaChar>;
        type F2 = Compare<"foo", "startsWith", [UpperAlphaChar]>;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<T3, "equals",  true>>,
            Expect<Test<T4, "equals",  true>>,

            Expect<Test<F1, "equals",  false>>,
            Expect<Test<F2, "equals",  false>>,
        ];
    });

    it("greaterThan", () => {
        type T1 = Compare<42, "greaterThan", 30>;
        type T2 = Compare<"42", "greaterThan", 30>;
        type F1 = Compare<"42", "greaterThan", 42>;
        type B1 = Compare<number, "greaterThan", 42>;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<F1, "equals",  false>>,
            Expect<Test<B1, "equals",  boolean>>,
        ];
    });

    it("using ops with no params", () => {
        type T1 = Compare<false, "false">;
        type T2 = Compare<true, "true">;
        type T3 = Compare<"true", "truthy">;
        type T4 = Compare<"false", "falsy">;

        type F1 = Compare<"true", "true">;
        type F2 = Compare<"false", "false">;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<T3, "equals",  true>>,
            Expect<Test<T4, "equals",  true>>,

            Expect<Test<F1, "equals",  false>>,
            Expect<Test<F2, "equals",  false>>,
        ];
    });


    it("contains with string input", () => {
        type T1 = Compare<"foobar", "contains", "foo">;

        type B1 = Compare<string, "contains", "foo">;
        type B2 = Compare<"foo", "contains", string>;

        type F1 = Compare<"foobar", "contains", "bax">;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<B1, "equals",  boolean>>,
            Expect<Test<B2, "equals",  boolean>>,
            Expect<Test<F1, "equals",  false>>,
        ];
    });

    it("contains with tuple input", () => {
        type Tup = ["foo","bar",42];
        type T1 = Compare<Tup, "contains", "foo">;
        type T2 = Compare<Tup, "contains", string>;
        type T3 = Compare<Tup, "contains", number>;
        type T3a = Contains<Tup, number>;
        type T4 = Compare<Tup, "contains", 42>;
        type T4a = Contains<Tup, 42>;

        type F1 = Compare<Tup, "contains", "bax">;
        type F2 = Compare<Tup, "contains", 99>;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<T3, "equals",  true>>,
            Expect<Test<T3a, "equals",  true>>,
            Expect<Test<T4, "equals",  true>>,
            Expect<Test<T4a, "equals",  true>>,

            Expect<Test<F1, "equals",  false>>,
            Expect<Test<F2, "equals",  false>>,
        ];
    });

    it("containsSome with string input", () => {
        type T1 = Compare<"foobar", "containsSome", ["foo", "bar"]>;
        type T2 = Compare<"foo", "containsSome", [string, number]>;

        type B1 = Compare<string, "contains", "foo">;

        type F1 = Compare<"foobar", "contains", "bax">;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<B1, "equals",  boolean>>,
            Expect<Test<F1, "equals",  false>>,
        ];
    });


    it("numeric operators", () => {
        type T1 = Compare<4, "greaterThan", 2>;
        type T2 = Compare<2, "lessThan", 4>;

        type T3 = Compare<4, "greaterThanOrEqual", 2>;
        type T4 = Compare<4, "greaterThanOrEqual", 4>;

        type T5 = Compare<2, "lessThanOrEqual", 4>;
        type T6 = Compare<4, "lessThanOrEqual", 4>;

        type T7 = Compare<5, "betweenInclusively", [1,10]>;
        type T8 = Compare<5, "betweenExclusively", [1,10]>;

        type T9 = Compare<5, "betweenInclusively", [5,10]>;
        type F9 = Compare<5, "betweenExclusively", [5,10]>;


        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<T3, "equals",  true>>,
            Expect<Test<T4, "equals",  true>>,
            Expect<Test<T5, "equals",  true>>,
            Expect<Test<T6, "equals",  true>>,

            Expect<Test<T7, "equals",  true>>,
            Expect<Test<T8, "equals",  true>>,
            Expect<Test<T9, "equals",  true>>,
            Expect<Test<F9, "equals",  false>>,

        ];
    });

    it("objectKeyEquals operator", () => {
        type Obj = { foo: 2, bar: "bye" };

        type T1 = Compare<Obj, "objectKeyEquals", ["foo", 2]>;
        type F1 = Compare<Obj, "objectKeyEquals", ["foo", 5]>;
        type F2 = Compare<Obj, "objectKeyEquals", ["bar", 2]>;
        type F3 = Compare<Obj, "objectKeyEquals", ["bar", number]>;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<F1, "equals",  false>>,
            Expect<Test<F2, "equals",  false>>,
            Expect<Test<F3, "equals",  false>>,
        ];
    });


    it("objectKeyExtends operator", () => {
        type Obj = { foo: 2, bar: "bye" };

        type T1 = Compare<Obj, "objectKeyExtends", ["foo", 2]>;
        type T2 = Compare<Obj, "objectKeyExtends", ["foo", number]>;

        type F1 = Compare<Obj, "objectKeyExtends", ["foo", 5]>;
        type F2 = Compare<Obj, "objectKeyExtends", ["bar", 2]>;


        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<F1, "equals",  false>>,
            Expect<Test<F2, "equals",  false>>,
        ];
    });


    it("objectKey numeric ops", () => {
        type Obj = { foo: 2, bar: "bye" };

        type T1 = Compare<Obj, "objectKeyGreaterThan", ["foo", 1]>;

        type T2 = Compare<Obj, "objectKeyGreaterThanOrEqual", ["foo", 1]>;
        type T3 = Compare<Obj, "objectKeyGreaterThanOrEqual", ["foo", 2]>;

        type T4 = Compare<Obj, "objectKeyLessThanOrEqual", ["foo", 3]>;
        type T5 = Compare<Obj, "objectKeyLessThanOrEqual", ["foo", 2]>;

        type T6 = Compare<Obj, "objectKeyLessThan", ["foo",3]>;

        type F1 = Compare<Obj, "objectKeyGreaterThan", ["foo", 3]>;
        type F2 = Compare<Obj, "objectKeyGreaterThanOrEqual", ["foo", 3]>;

        type F3 = Compare<Obj, "objectKeyLessThan", ["foo", 1]>;
        type F4 = Compare<Obj, "objectKeyLessThanOrEqual", ["foo", 1]>;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<T3, "equals",  true>>,
            Expect<Test<T4, "equals",  true>>,
            Expect<Test<T5, "equals",  true>>,
            Expect<Test<T6, "equals",  true>>,

            Expect<Test<F1, "equals",  false>>,
            Expect<Test<F2, "equals",  false>>,
            Expect<Test<F3, "equals",  false>>,
            Expect<Test<F4, "equals",  false>>,
        ];
    });

});


import { describe, it } from "vitest";
import {
    EmptyObject,
    Expect,
    HasTrue,
    Test,
    Values,
    Dictionary
} from "inferred-types/types";

describe("HasTrue<T>", () => {

    describe("array", () => {
        it("positive tests", () => {
            type T1 = HasTrue<[true]>;
            type T2 = HasTrue<[1, 2, 3, true]>;
            type T3 = HasTrue<[true, 1, 2, 3]>;

            type cases = [
                Expect<Test<T1, "equals", true>>,
                Expect<Test<T2, "equals", true>>,
                Expect<Test<T3, "equals", true>>,
            ];
        });

        it("negative tests", () => {
            type F1 = HasTrue<[]>;
            type F2 = HasTrue<[1, 2, 3]>;
            type F3 = HasTrue<[1, 2, 3]>;

            type cases = [
                Expect<Test<F1, "equals", false>>,
                Expect<Test<F2, "equals", false>>,
                Expect<Test<F3, "equals", false>>,
            ];
        });


        it("wide input", () => {
            type W1 = HasTrue<string[]>;
            type W2 = HasTrue<unknown[]>;

            type cases = [
                Expect<Test<W1, "equals", boolean>>,
                Expect<Test<W2, "equals", boolean>>,
            ];
        });


        it("any,never -> error", () => {
            type E1 = HasTrue<any>;
            type E2 = HasTrue<never>;

            type cases = [
                Expect<Test<E1, "isError", "invalid/has-true">>,
                Expect<Test<E2, "isError", "invalid/has-true">>,
            ];
        });


        it("forced invalid type -> false", () => {
            // @ts-expect-error
            type E1 = HasTrue<42>;

            type cases = [
                Expect<Test<E1, "isError", "invalid">>,
            ];
        });
    })

    describe("object", () => {
        it("positive tests", () => {
            type T1 = HasTrue<{ foo: true }>;
            type T2 = HasTrue<{ foo: 1, bar: 2, baz: true }>;
            type V = Values<{ foo: 1, bar: 2, baz: true }>;

            type cases = [
                Expect<Test<T1, "equals", true>>,
                Expect<Test<T2, "equals", true>>,
            ];
        });

        it("negative tests", () => {
            type F1 = HasTrue<EmptyObject>;
            type F2 = HasTrue<{ foo: 1, bar: 2, baz: 3 }>;

            type cases = [
                Expect<Test<F1, "equals", false>>,
                Expect<Test<F2, "equals", false>>,
            ];
        });


        it("wide input", () => {
            type V = Values<object>;
            type W1 = HasTrue<object>;
            type W2 = HasTrue<Dictionary>;

            type cases = [
                Expect<Test<W1, "equals", boolean>>,
                Expect<Test<W2, "equals", boolean>>,
            ];
        });


        it("any,never -> error", () => {
            type E1 = HasTrue<any>;
            type E2 = HasTrue<never>;

            type cases = [
                Expect<Test<E1, "isError", "invalid/has-true">>,
                Expect<Test<E2, "isError", "invalid/has-true">>,
            ];
        });


        it("forced invalid type -> false", () => {
            // @ts-expect-error
            type E1 = HasTrue<42>;

            type cases = [
                Expect<Test<E1, "isError", "invalid">>,
            ];
        });
    })

});

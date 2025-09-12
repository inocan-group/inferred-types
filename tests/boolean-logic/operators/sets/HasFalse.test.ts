import { describe, it } from "vitest";
import type { Dictionary, EmptyObject, Expect, HasFalse, Test, Values } from "inferred-types/types";

describe("HasFalse<T>", () => {

    describe("array", () => {
        it("positive tests", () => {
            type T1 = HasFalse<[false]>;
            type T2 = HasFalse<[1, 2, 3, false]>;
            type T3 = HasFalse<[false, 1, 2, 3]>;

            type cases = [
                Expect<Test<T1, "equals", true>>,
                Expect<Test<T2, "equals", true>>,
                Expect<Test<T3, "equals", true>>,
            ];
        });

        it("negative tests", () => {
            type F1 = HasFalse<[]>;
            type F2 = HasFalse<[1, 2, 3]>;
            type F3 = HasFalse<[1, 2, 3]>;

            type cases = [
                Expect<Test<F1, "equals", false>>,
                Expect<Test<F2, "equals", false>>,
                Expect<Test<F3, "equals", false>>,
            ];
        });

        it("readonly arrays", () => {
            type T1 = HasFalse<readonly [false]>;
            type T2 = HasFalse<readonly [1, false, 2]>;
            type F1 = HasFalse<readonly []>;
            type F2 = HasFalse<readonly [1, 2, 3]>;

            type cases = [
                Expect<Test<T1, "equals", true>>,
                Expect<Test<T2, "equals", true>>,
                Expect<Test<F1, "equals", false>>,
                Expect<Test<F2, "equals", false>>,
            ];
        });

        it("wide input", () => {
            type W1 = HasFalse<string[]>;
            type W2 = HasFalse<unknown[]>;

            type cases = [
                Expect<Test<W1, "equals", boolean>>,
                Expect<Test<W2, "equals", boolean>>,
            ];
        });

        it("any,never -> error", () => {
            type E1 = HasFalse<any>;
            type E2 = HasFalse<never>;

            type cases = [
                Expect<Test<E1, "isError", "invalid/has-false">>,
                Expect<Test<E2, "isError", "invalid/has-false">>,
            ];
        });

        it("forced invalid type -> false", () => {
            // @ts-expect-error
            type E1 = HasFalse<42>;

            type cases = [
                Expect<Test<E1, "isError", "invalid">>,
            ];
        });
    })

    describe("object", () => {
        it("positive tests", () => {
            type T1 = HasFalse<{ foo: false }>;
            type T2 = HasFalse<{ foo: 1, bar: 2, baz: false }>;

            type cases = [
                Expect<Test<T1, "equals", true>>,
                Expect<Test<T2, "equals", true>>,
            ];
        });

        it("negative tests", () => {
            type F1 = HasFalse<EmptyObject>;
            type F2 = HasFalse<{ foo: 1, bar: 2, baz: 3 }>;

            type cases = [
                Expect<Test<F1, "equals", false>>,
                Expect<Test<F2, "equals", false>>,
            ];
        });

        it("wide input", () => {
            type W1 = HasFalse<readonly unknown[]>;
            type W2 = HasFalse<Dictionary>;

            type cases = [
                Expect<Test<W1, "equals", boolean>>,
                Expect<Test<W2, "equals", boolean>>,
            ];
        });

        it("any,never -> error", () => {
            type E1 = HasFalse<any>;
            type E2 = HasFalse<never>;

            type cases = [
                Expect<Test<E1, "isError", "invalid/has-false">>,
                Expect<Test<E2, "isError", "invalid/has-false">>,
            ];
        });

        it("forced invalid type -> false", () => {
            // @ts-expect-error
            type E1 = HasFalse<42>;

            type cases = [
                Expect<Test<E1, "isError", "invalid">>,
            ];
        });
    })

});

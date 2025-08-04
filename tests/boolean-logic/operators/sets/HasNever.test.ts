import { describe, it } from "vitest";
import {
    EmptyObject,
    Expect,
    HasNever,
    Test,
} from "inferred-types/types";
import { Dictionary } from "inferred-types";

describe("HasNever<T>", () => {

    describe("array", () => {
        it("positive tests", () => {
            type T1 = HasNever<[never]>;
            type T2 = HasNever<[1, 2, 3, never]>;
            type T3 = HasNever<[never, 1, 2, 3]>;

            type cases = [
                Expect<Test<T1, "equals", true>>,
                Expect<Test<T2, "equals", true>>,
                Expect<Test<T3, "equals", true>>,
            ];
        });

        it("negative tests", () => {
            type F1 = HasNever<[]>;
            type F2 = HasNever<[1, 2, 3]>;
            type F3 = HasNever<[1, 2, 3]>;

            type cases = [
                Expect<Test<F1, "equals", false>>,
                Expect<Test<F2, "equals", false>>,
                Expect<Test<F3, "equals", false>>,
            ];
        });


        it("wide input", () => {
            type W1 = HasNever<string[]>;
            type W2 = HasNever<unknown[]>;

            type cases = [
                Expect<Test<W1, "equals", boolean>>,
                Expect<Test<W2, "equals", boolean>>,
            ];
        });


        it("any,never -> error", () => {
            type E1 = HasNever<any>;
            type E2 = HasNever<never>;

            type cases = [
                Expect<Test<E1, "isError", "invalid/has-never">>,
                Expect<Test<E2, "isError", "invalid/has-never">>,
            ];
        });


        it("forced invalid type -> false", () => {
            // @ts-expect-error
            type E1 = HasNever<42>;

            type cases = [
                Expect<Test<E1, "equals", false>>,
            ];
        });
    })

    describe("object", () => {
        it("positive tests", () => {
            type T1 = HasNever<{ foo: never }>;
            type T2 = HasNever<{ foo: 1, bar: 2, baz: never }>;

            type cases = [
                Expect<Test<T1, "equals", true>>,
                Expect<Test<T2, "equals", true>>,
            ];
        });

        it("negative tests", () => {
            type F1 = HasNever<EmptyObject>;
            type F2 = HasNever<{ foo: 1, bar: 2, baz: 3 }>;

            type cases = [
                Expect<Test<F1, "equals", false>>,
                Expect<Test<F2, "equals", false>>,
            ];
        });


        it("wide input", () => {
            type W1 = HasNever<object>;
            type W2 = HasNever<Dictionary>;

            type cases = [
                Expect<Test<W1, "equals", boolean>>,
                Expect<Test<W2, "equals", boolean>>,
            ];
        });


        it("any,never -> error", () => {
            type E1 = HasNever<any>;
            type E2 = HasNever<never>;

            type cases = [
                Expect<Test<E1, "isError", "invalid/has-never">>,
                Expect<Test<E2, "isError", "invalid/has-never">>,
            ];
        });


        it("forced invalid type -> false", () => {
            // @ts-expect-error
            type E1 = HasNever<42>;

            type cases = [
                Expect<Test<E1, "equals", false>>,
            ];
        });
    })




});

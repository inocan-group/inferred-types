import { describe, it } from "vitest";
import {
    EmptyObject,
    Expect,
    HasAny,
    Test,
} from "inferred-types/types";
import { Dictionary } from "inferred-types";

describe("HasAny<T>", () => {

    describe("array", () => {
        it("positive tests", () => {
            type T1 = HasAny<[any]>;
            type T2 = HasAny<[1,2,3, any]>;
            type T3 = HasAny<[any, 1,2,3]>;

            type cases = [
                Expect<Test<T1, "equals", true>>,
                Expect<Test<T2, "equals", true>>,
                Expect<Test<T3, "equals", true>>,
            ];
        });

        it("negative tests", () => {
            type F1 = HasAny<[]>;
            type F2 = HasAny<[1,2,3]>;
            type F3 = HasAny<[1,2,3]>;

            type cases = [
                Expect<Test<F1, "equals", false>>,
                Expect<Test<F2, "equals", false>>,
                Expect<Test<F3, "equals", false>>,
            ];
        });


        it("wide input", () => {
            type W1 = HasAny<string[]>;
            type W2 = HasAny<unknown[]>;

            type cases = [
                Expect<Test<W1, "equals", boolean>>,
                Expect<Test<W2, "equals", boolean>>,
            ];
        });


        it("any,never -> error", () => {
            type E1 = HasAny<any>;
            type E2 = HasAny<never>;

            type cases = [
                Expect<Test<E1, "isError", "invalid/has-any">>,
                Expect<Test<E2, "isError", "invalid/has-any">>,
            ];
        });


        it("forced invalid type -> false", () => {
            // @ts-expect-error
            type E1 = HasAny<42>;

            type cases = [
                Expect<Test<E1, "equals", false>>,
            ];
        });
    })

        describe("object", () => {
        it("positive tests", () => {
            type T1 = HasAny<{foo: any}>;
            type T2 = HasAny<{foo: 1, bar: 2, baz: any}>;
            type T3 = HasAny<[any, 1,2,3]>;

            type cases = [
                Expect<Test<T1, "equals", true>>,
                Expect<Test<T2, "equals", true>>,
                Expect<Test<T3, "equals", true>>,
            ];
        });

        it("negative tests", () => {
            type F1 = HasAny<EmptyObject>;
            type F2 = HasAny<{foo:1, bar: 2, baz:3}>;

            type cases = [
                Expect<Test<F1, "equals", false>>,
                Expect<Test<F2, "equals", false>>,
            ];
        });


        it("wide input", () => {
            type W1 = HasAny<object>;
            type W2 = HasAny<Dictionary>;

            type cases = [
                Expect<Test<W1, "equals", boolean>>,
                Expect<Test<W2, "equals", boolean>>,
            ];
        });


        it("any,never -> error", () => {
            type E1 = HasAny<any>;
            type E2 = HasAny<never>;

            type cases = [
                Expect<Test<E1, "isError", "invalid/has-any">>,
                Expect<Test<E2, "isError", "invalid/has-any">>,
            ];
        });


        it("forced invalid type -> false", () => {
            // @ts-expect-error
            type E1 = HasAny<42>;

            type cases = [
                Expect<Test<E1, "equals", false>>,
            ];
        });
    })




});

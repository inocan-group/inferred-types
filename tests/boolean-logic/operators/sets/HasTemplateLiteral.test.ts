import { describe, it } from "vitest";
import {
    EmptyObject,
    Expect,
    HasTemplateLiteral,
    Test,
    Values,
    Dictionary
} from "inferred-types/types";

describe("HasTemplateLiteral<T>", () => {

    describe("array", () => {
        it("positive tests", () => {
            type T1 = HasTemplateLiteral<[`Hi ${string}`]>;
            type T2 = HasTemplateLiteral<[1, 2, 3, `${number}`]>;
            type T3 = HasTemplateLiteral<[`Name: ${string}; Age: ${number}`, 1, 2, 3]>;

            type cases = [
                Expect<Test<T1, "equals", true>>,
                Expect<Test<T2, "equals", true>>,
                Expect<Test<T3, "equals", true>>,
            ];
        });

        it("negative tests", () => {
            type F1 = HasTemplateLiteral<[]>;
            type F2 = HasTemplateLiteral<["foo", "bar", "baz"]>;
            type F3 = HasTemplateLiteral<[1, 2, 3]>;

            type cases = [
                Expect<Test<F1, "equals", false>>,
                Expect<Test<F2, "equals", false>>,
                Expect<Test<F3, "equals", false>>,
            ];
        });


        it("with optional values", () => {
            type T1 = HasTemplateLiteral<[`Hi ${string}`?]>;
            type T2 = HasTemplateLiteral<[1, 2, 3, `${number}`?]>;
            type T3 = HasTemplateLiteral<[`Name: ${string}; Age: ${number}`?, 1?, 2?, 3?]>;

            type cases = [
                Expect<Test<T1, "equals", true>>,
                Expect<Test<T2, "equals", true>>,
                Expect<Test<T3, "equals", true>>,
            ];
        });



        it("wide input", () => {
            type W1 = HasTemplateLiteral<string[]>;
            type W2 = HasTemplateLiteral<unknown[]>;

            type cases = [
                Expect<Test<W1, "equals", boolean>>,
                Expect<Test<W2, "equals", boolean>>,
            ];
        });


        it("any,never -> error", () => {
            type E1 = HasTemplateLiteral<any>;
            type E2 = HasTemplateLiteral<never>;

            type cases = [
                Expect<Test<E1, "isError", "invalid/has-template-literal">>,
                Expect<Test<E2, "isError", "invalid/has-template-literal">>,
            ];
        });


        it("forced invalid type -> false", () => {
            // @ts-expect-error
            type E1 = HasTemplateLiteral<42>;

            type cases = [
                Expect<Test<E1, "isError", "invalid">>,
            ];
        });
    })

    describe("object", () => {
        it("positive tests", () => {
            type T1 = HasTemplateLiteral<{ foo: `Hi ${string}` }>;
            type T2 = HasTemplateLiteral<{ foo: 1, bar: 2, baz: `Age: ${number}` }>;

            type cases = [
                Expect<Test<T1, "equals", true>>,
                Expect<Test<T2, "equals", true>>,
            ];
        });

        it("negative tests", () => {
            type F1 = HasTemplateLiteral<EmptyObject>;
            type F2 = HasTemplateLiteral<{ foo: 1, bar: 2, baz: 3 }>;

            type cases = [
                Expect<Test<F1, "equals", false>>,
                Expect<Test<F2, "equals", false>>,
            ];
        });


        it("wide input", () => {
            type V = Values<object>;
            type W1 = HasTemplateLiteral<object>;
            type W2 = HasTemplateLiteral<Dictionary>;

            type cases = [
                Expect<Test<W1, "equals", boolean>>,
                Expect<Test<W2, "equals", boolean>>,
            ];
        });


        it("any,never -> error", () => {
            type E1 = HasTemplateLiteral<any>;
            type E2 = HasTemplateLiteral<never>;

            type cases = [
                Expect<Test<E1, "isError", "invalid/has-template-literal">>,
                Expect<Test<E2, "isError", "invalid/has-template-literal">>,
            ];
        });


        it("forced invalid type -> false", () => {
            // @ts-expect-error
            type E1 = HasTemplateLiteral<42>;

            type cases = [
                Expect<Test<E1, "isError", "invalid">>,
            ];
        });
    })




});

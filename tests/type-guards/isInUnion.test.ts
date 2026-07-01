
import { describe, expect, it } from "vitest";
import { isInUnion } from "inferred-types/runtime";
import type { Expect, Test } from "inferred-types/types";

describe("isInUnion(elements) => TypeGuard", () => {

    it("create type guard", () => {
        const tg = isInUnion(1, 2, 3);

        expect(typeof tg).toBe("function");

        type cases = [
            Expect<Test<typeof tg, "equals", (val: unknown) => val is 1 | 2 | 3>>,
        ];
    });

    it("happy path", () => {
        const fooBarBaz = isInUnion("foo", "bar", "baz")
        const foo = fooBarBaz("foo");
        const bax = fooBarBaz("bax")
        expect(foo).toBe(true);
        expect(bax).toBe(false);

        const num1 = isInUnion(1, 2, 3)(2);
        const notIn = isInUnion(1, 2, 3)(4);
        expect(num1).toBe(true);
        expect(notIn).toBe(false);

    });

    it("supports wide tokens without falling through to neighboring token checks", () => {
        expect(isInUnion("Array")(["foo", 1, false])).toBe(true);
        expect(isInUnion("Array")({})).toBe(false);

        expect(isInUnion("Array<Dict>")([{ foo: 1 }, { bar: 2 }])).toBe(true);
        expect(isInUnion("Array<Dict>")([{ foo: 1 }, ["bar"]])).toBe(false);

        expect(isInUnion("Array<boolean>")([true, false])).toBe(true);
        expect(isInUnion("Array<boolean>")([true, "false"])).toBe(false);

        expect(isInUnion("Array<number>")([1, 2, 3])).toBe(true);
        expect(isInUnion("Array<number>")([1, "2"])).toBe(false);

        expect(isInUnion("Array<string>")(["foo", "bar"])).toBe(true);
        expect(isInUnion("Array<string>")([1])).toBe(false);

        expect(isInUnion("Dict")({ foo: "bar" })).toBe(true);
        expect(isInUnion("Dict")([])).toBe(false);

        expect(isInUnion("Dict<string, unknown>")({ foo: "bar" })).toBe(true);
        expect(isInUnion("Dict<string, unknown>")([])).toBe(false);

        expect(isInUnion("boolean")(true)).toBe(true);
        expect(isInUnion("boolean")("true")).toBe(false);

        expect(isInUnion("null")(null)).toBe(true);
        expect(isInUnion("null")(undefined)).toBe(false);

        expect(isInUnion("number")(42)).toBe(true);
        expect(isInUnion("number")("42")).toBe(false);

        expect(isInUnion("string")("foo")).toBe(true);
        expect(isInUnion("string")(42)).toBe(false);

        expect(isInUnion("undefined")(undefined)).toBe(true);
        expect(isInUnion("undefined")(null)).toBe(false);
    });

});

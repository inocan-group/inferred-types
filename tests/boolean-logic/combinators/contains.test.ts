import { describe, it, expect } from "vitest";
import { contains } from "inferred-types/runtime";
import { Contains, Expect, Test } from "inferred-types/types";

describe("Runtime contains()", () => {
    describe("Content is a tuple/array", () => {
        it("should find matching types", () => {
            // "foo" extends string so true
            expect(contains([42, 32, 64, "foo"], String)).toBe(true);

            // false and true are booleans
            expect(contains(["foo", false, true], Boolean)).toBe(true);

            // 42, 64, 128 are all numbers
            expect(contains([42, 64, 128], Number)).toBe(true);

            // "foo" and "bar" are strings
            expect(contains(["foo", "bar"], String)).toBe(true);

            // null exists in array
            expect(contains(["foo", "bar", null, undefined], null)).toBe(true);

            // Number type matches numeric values
            expect(contains([42, 32, 64, "foo"], Number)).toBe(true);
        });

        it("should find exact matches", () => {
            // Direct value match
            expect(contains([42, 32, 64, "foo"], "foo")).toBe(true);
            expect(contains([42, 32, 64, "foo"], 42)).toBe(true);

            // "bar" does NOT exist in array
            expect(contains([42, 32, 64, "foo"], "bar")).toBe(false);
        });
    });

    describe("Using numeric literals", () => {
        it("should find substrings in numbers", () => {
            // 2000 contains "2"
            expect(contains(2000, 2)).toBe(true);
            expect(contains(2000, "2")).toBe(true);
            expect(contains("2000", 2)).toBe(true);

            // 2000 does not contain "1"
            expect(contains(2000, 1)).toBe(false);
            expect(contains(2000, "1")).toBe(false);
            expect(contains("2000", 1)).toBe(false);
        });
    });

    describe("Content is a string", () => {
        it("should find substrings", () => {
            // "FooBar" contains "Bar"
            expect(contains("FooBar", "Bar")).toBe(true);

            // "FooBaz" does not contain "Bar"
            expect(contains("FooBaz", "Bar")).toBe(false);
        });
    });

    describe("Comparator is a union (array)", () => {
        it("should check if any comparator matches", () => {
            // ["foo", "bar"] contains "foo" (from ["foo", 42])
            expect(contains(["foo", "bar"], ["foo", 42])).toBe(true);

            // ["foo", "bar"] does not contain boolean or 42
            expect(contains(["foo", "bar"], [Boolean, 42])).toBe(false);
        });

        it("should work with substring matching for strings", () => {
            // "FooBar" contains "Foo" or "Baz"
            expect(contains("FooBar", ["Foo", "Baz"])).toBe(true);

            // "FooBar" contains neither "Baz" nor "Qux"
            expect(contains("FooBar", ["Baz", "Qux"])).toBe(false);
        });
    });

    describe("Edge cases", () => {
        it("should handle empty arrays", () => {
            expect(contains([], "anything")).toBe(false);
            expect(contains(["something"], [])).toBe(false);
        });

        it("should handle null and undefined", () => {
            expect(contains([null, "foo"], null)).toBe(true);
            expect(contains([undefined, "foo"], undefined)).toBe(true);
            expect(contains([null, "foo"], undefined)).toBe(false);
        });

        it("should handle boolean values", () => {
            expect(contains([true, false], true)).toBe(true);
            expect(contains([true, false], false)).toBe(true);
            expect(contains([true, "false"], false)).toBe(false);
        });
    });

    describe("Type tests", () => {

        it("happy path", () => {
            const t1 = contains("foobar", "foo");
            const t2 = contains(["foo","bar",42], "foo");
            type T2 = Contains<["foo","bar",42], "foo">;
            const t3 = contains(["foo","bar",42], 42);
            type T3 = Contains<["foo","bar",42], 42>;

            type cases = [
                Expect<Test<typeof t1, "equals", true>>,
                Expect<Test<typeof t2, "equals", true>>,
                Expect<Test<T2, "equals", true>>,
                Expect<Test<typeof t3, "equals", true>>,
                Expect<Test<T3, "equals", true>>,
            ];
        });

    })
});

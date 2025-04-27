import { describe, it } from "vitest";
import type { Expect, AfterFirst, First, Test } from "inferred-types/types";

describe("First<T>, AfterFirst<T>", () => {
    it("First<T> with literals", () => {
        const arr = ["one", "two", 42] as const;
        type F = First<typeof arr>;
        type cases = [
            Expect<Test<F, "equals",  "one">>
        ];
    });
    it("First<T> with wide types but literal array", () => {
        const arr = ["one" as string, "two", 42] as const;
        type F = First<typeof arr>;
        type cases = [
            Expect<Test<F, "equals",  string>>
        ];
    });
    it("First<T> with a non const array", () => {
        const arr = ["one", "two", 42];
        type F = First<typeof arr>;
        type cases = [
            Expect<Test<F, "equals",  string | number>>
        ];
    });

    it("AfterFirst<T> with literals", () => {
        const arr = ["one", "two", 42] as const;
        type AF = AfterFirst<typeof arr>;
        type cases = [
            Expect<Test<AF, "equals",  readonly ["two", 42]>>
        ];
    });
    it("AfterFirst<T> with wide types but literal array", () => {
        const arr = ["one", "two" as string, 42] as const;
        type AF = AfterFirst<typeof arr>;
        type cases = [
            Expect<Test<AF, "equals", readonly [string, 42]>>
        ];
    });
    it("AfterFirst<T> with a non const array", () => {
        const arr = ["one", "two", 42];
        type AF = AfterFirst<typeof arr>;
        type cases = [
            Expect<Test<AF, "equals",  []>>
        ];
    });
});

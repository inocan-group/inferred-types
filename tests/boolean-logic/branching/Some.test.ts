
import { describe, it } from "vitest";
import type { Dictionary, Expect, Some, Test } from "inferred-types/types";

describe("Some<TContainer,TOp,TComparator>", () => {

    it("testing tuples", () => {
        type T2 = Some<[string, string, number, boolean], "equals", [number]>;
        type T3 = Some<[1, 2, 3, 42, 105], "greaterThan", [100]>;
        type T4 = Some<[string, number, "foo", false], "equals", ["foo"]>;
        type T5 = Some<[string, number, "foo", false], "startsWith", ["f"]>;

        type F1 = Some<[string, string, object, boolean], "extends", [number]>;
        type F2 = Some<[string, string, 42, boolean], "equals", [number]>;
        type F3 = Some<[1, 2, 3, 42, 99], "greaterThan", [100]>;
        type F4 = Some<[string, number, "foot", false], "equals", ["foo"]>;
        type F5 = Some<["baz", "bar", false], "startsWith", ["c"]>;

        type cases = [
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
            Expect<Test<T5, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
            Expect<Test<F4, "equals", false>>,
            Expect<Test<F5, "equals", false>>,
        ];
    });

    it("testing KV Object", () => {
        type T1 = Some<{foo: "hi", bar: 42}, "extends", [number]>;
        type T2 = Some<{foo: "hi", bar: 42}, "equals", [42]>;

        type F1 = Some<{foo: "hi", bar: "bye"}, "extends", [number]>;
        type F2 = Some<{foo: "hi", bar: 42}, "equals", [number]>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
        ];
    });

    it("Wide Containers result in boolean", () => {
        type B1 = Some<string[], "extends", ["42"]>;
        type B2 = Some<Dictionary, "extends", ["42"]>;

        type cases = [
            Expect<Test<B1, "equals", boolean>>,
            Expect<Test<B2, "equals", boolean>>,
        ];
    });

});


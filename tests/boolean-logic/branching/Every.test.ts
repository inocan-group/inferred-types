import { Dictionary, Expect, Every, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("Every<TContainer,TOp,TComparator>", () => {

    it("testing tuples", () => {
        type T1 = Every<[1,2,3,4], "extends", [number]>;
        type T2 = Every<[number, number, number], "equals", [number]>;
        type T3 = Every<[101, 105], "greaterThan", [100]>;
        type T4 = Every<["friday", "foo"], "startsWith", ["f"]>;

        type F1 = Every<[1,2,3,4, boolean], "extends", [number]>;
        type F2 = Every<[number, 42, number], "equals", [number]>;
        type F3 = Every<[1, 99], "greaterThan", [100]>;
        type F4 = Every<[string, number, "foot", false], "equals", ["foo"]>;
        type F5 = Every<["baz", "bar", false], "startsWith", ["c"]>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
            Expect<Test<F4, "equals", false>>,
            Expect<Test<F5, "equals", false>>,
        ];
    });

    it("testing tuples (with abbreviated params)", () => {
        type T1 = Every<[42,99,number], "extends", number>;
        type T2 = Every<[number, number], "equals", number>;
        type T3 = Every<[101, 105], "greaterThan", 100>;
        type T4 = Every<["foo", "foo"], "equals", "foo">;
        type T5 = Every<["foo","friday"], "startsWith", "f">;

        type F1 = Every<[string, string, object, boolean], "extends", number>;
        type F2 = Every<[string, string, 42, boolean], "equals", number>;
        type F3 = Every<[1, 2, 3, 42, 99], "greaterThan", 100>;
        type F4 = Every<[string, number, "foot", false], "equals", "foo">;
        type F5 = Every<["baz", "bar", false], "startsWith", "c">;

        type cases = [
            Expect<Test<T1, "equals", true>>,
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
        type T1 = Every<{foo: 1, bar: 42}, "extends", [number]>;
        type T2 = Every<{foo: 42, bar: 42}, "equals", [42]>;

        type F1 = Every<{foo: 1, bar: 99}, "equals", [number]>;
        type F2 = Every<{foo: 12, bar: 42}, "equals", [42]>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
        ];
    });



    it("Wide Containers result in boolean", () => {
        type B1 = Every<string[], "extends", "42">;
        type B2 = Every<Dictionary, "extends", "42">;

        type cases = [
            Expect<Test<B1, "equals", boolean>>,
            Expect<Test<B2, "equals", boolean>>,
        ];
    });



});

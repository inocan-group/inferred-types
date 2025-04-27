import { Expect, ExtendsSome, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("ExtendsSome<V,T>", () => {

    it("happy path", () => {
        type F1 = ExtendsSome<"hi", [1, 42, 99, boolean]>;
        type F2 = ExtendsSome<42, ["foo", true, "bar"]>;

        type T0 = ExtendsSome<42, [number, string, boolean]>;
        type T1 = ExtendsSome<"foo", ["foo", "bar", "baz"]>;
        type T2 = ExtendsSome<[1, 2, 3], [[number, number, number]]>;
        type T3 = ExtendsSome<"foo" | "bar", ["foo", "bar"]>;

        type cases = [
            Expect<Test<F1, "equals",  false>>,//
            Expect<Test<F2, "equals",  false>>,
            Expect<Test<T0, "equals",  true>>,
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<T3, "equals",  true>>,
        ];
    });
});




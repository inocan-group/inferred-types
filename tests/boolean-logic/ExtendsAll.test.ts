
import { describe, it } from "vitest";
import type { Expect, ExtendsAll, Test } from "inferred-types/types";

describe("ExtendsEvery<V,T>", () => {

    it("happy path", () => {
        type F1 = ExtendsAll<string, ["foo", 42, "bar"]>;
        type F2 = ExtendsAll<number, ["foo", 42, "bar"]>;
        type F3 = ExtendsAll<42, [1, 42, 99]>;

        type T1 = ExtendsAll<string, ["foo", "bar", "baz"]>;
        type T2 = ExtendsAll<number, [1, 2, 3]>;
        type T3 = ExtendsAll<"foo" | "bar", ["foo", "bar"]>;

        type cases = [
            Expect<Test<F1, "equals",  false>>,//
            Expect<Test<F2, "equals",  false>>,
            Expect<Test<F3, "equals",  false>>,
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<T3, "equals",  true>>,
        ];
    });

});

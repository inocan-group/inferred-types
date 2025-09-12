
import { describe, it } from "vitest";
import type { Dictionary, Expect, SomeExtend, Test } from "inferred-types/types";

describe("SomeExtend<TList,TExtend> and IfSomeExtend<TList,TExtend>", () => {

    it("happy path", () => {
        type LiteralList = [1, 2, "foo", "bar"];
        type WideList = [string, boolean];
        type WideUnion = string | boolean;

        type T1 = SomeExtend<LiteralList, "foo">;
        type T2 = SomeExtend<WideList, boolean>;
        type T3 = SomeExtend<LiteralList, WideUnion>;

        type F1 = SomeExtend<LiteralList, false>;
        type F2 = SomeExtend<LiteralList, Dictionary>;
        type F3 = SomeExtend<LiteralList, unknown[]>;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<T3, "equals",  true>>,
            Expect<Test<F1, "equals",  false>>,
            Expect<Test<F2, "equals",  false>>,
            Expect<Test<F3, "equals",  false>>,
        ];
    });

});

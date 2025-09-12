import { describe, it } from "vitest";
import type { AsStringUnion, Expect, Test } from "inferred-types/types";

describe("AsStringUnion<T>", () => {

    it("happy path", () => {
        type LitNum = AsStringUnion<42 | 56>;
        type MixedLit = AsStringUnion<42 | "foo" | false>;
        type WideNum = AsStringUnion<"foo" | number>;
        type NoChange = AsStringUnion<"foo" | "bar">;
        type Ignored = AsStringUnion<"foo" | "bar" | [1, 2, 3]>;
        type Allowed = AsStringUnion<"foo" | "bar" | [1, 2, 3], "proxy">;

        type Num = AsStringUnion<42>;
        type True = AsStringUnion<true>;

        type cases = [
            Expect<Test<LitNum, "equals",  "42" | "56">>,
            Expect<Test<MixedLit, "equals",  "42" | "foo" | "false">>,
            Expect<Test<WideNum, "equals",  "foo" | `${number}`>>,
            Expect<Test<NoChange, "equals",  "foo" | "bar">>,
            Expect<Test<Ignored, "equals",  "foo" | "bar">>,
            Expect<Test<Allowed, "equals", "foo" | "bar" | [1, 2,  3]>>,

            Expect<Test<Num, "equals",  "42">>,
            Expect<Test<True, "equals",  "true">>,
        ];
    });

});

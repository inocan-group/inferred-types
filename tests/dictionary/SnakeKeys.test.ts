import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import type { SnakeKeys, Test } from "inferred-types/types";

describe("SnakeKeys<T>", () => {

    it("happy path", () => {
        type In = { foo_bar: 42; BarBaz: 55; Opt?: "maybe" };
        type T = SnakeKeys<In>;

        type cases = [
            Expect<Test<
                T,
                "equals",
                { foo_bar: 42; bar_baz: 55; opt?: "maybe" | undefined }
            >>
        ];
    });

});

import { describe, it } from "vitest";
import type { Expect, PascalKeys, Test } from "inferred-types/types";

describe("PascalKeys<T>", () => {

    it("happy path", () => {
        type In = { foo_bar: 42; BarBaz: 55; opt?: "maybe" };
        type T = PascalKeys<In>;

        type cases = [
            Expect<Test<
                T,
                "equals",
                { FooBar: 42; BarBaz: 55; Opt?: "maybe" | undefined }
            >>
        ];
    });

});

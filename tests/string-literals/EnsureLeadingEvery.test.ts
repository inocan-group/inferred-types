
import { describe, it } from "vitest";
import type { EnsureLeadingEvery, Expect, Test } from "inferred-types/types";

describe("EnsureLeadingEvery<TList, TLeading>", () => {

    it("happy path", () => {
        type List = ["foo", 42, "bar"];
        type T1 = EnsureLeadingEvery<List, "a.">;

        type cases = [
            Expect<Test<T1, "equals",  ["a.foo", "a.42", "a.bar"]>>,
        ];
    });

});

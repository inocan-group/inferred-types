import { Expect, EnsureLeadingEvery, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("EnsureLeadingEvery<TList, TLeading>", () => {

    it("happy path", () => {
        type List = ["foo", 42, "bar"];
        type T1 = EnsureLeadingEvery<List, "a.">;

        type cases = [
            Expect<Test<T1, "equals",  ["a.foo", "a.42", "a.bar"]>>,
        ];
    });

});

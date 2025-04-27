import { Expect, Chars, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("Chars<T>", () => {

    it("happy path", () => {
        type FooBar = Chars<"FooBar">;

        type cases = [
            Expect<Test<FooBar, "equals",  ["F", "o", "o", "B", "a", "r"]>>,
        ];
    });

});

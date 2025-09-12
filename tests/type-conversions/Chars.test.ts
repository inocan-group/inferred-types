
import { describe, it } from "vitest";
import type { Chars, Expect, Test } from "inferred-types/types";

describe("Chars<T>", () => {

    it("happy path", () => {
        type FooBar = Chars<"FooBar">;
        type Empty = Chars<"">;
        type Wide = Chars<string>;

        type cases = [
            Expect<Test<FooBar, "equals",  ["F", "o", "o", "B", "a", "r"]>>,
            Expect<Test<Empty, "equals",  []>>,
            Expect<Test<Wide, "equals",  string[]>>,
        ];
    });

});

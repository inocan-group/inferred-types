import { describe, it } from "vitest";
import type { Expect, Test } from "inferred-types/types";

import { asChars } from "inferred-types/runtime";

describe("asChars(str)", () => {

    it("happy path", () => {
        const hello = asChars("hello");
        const empty = asChars("");
        const long = asChars("there i was, there i was, in the jungle");
        const wide = asChars("wide" as string);

        type cases = [
            Expect<Test<typeof hello, "equals", ["h","e","l","l","o"]>>,
            Expect<Test<typeof empty, "equals", []>>,
            Expect<Test<typeof long, "extends", string[]>>,
            Expect<Test<typeof wide, "equals", string[]>>
        ];
    });

});

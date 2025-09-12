import { describe, expect, it } from "vitest";
import type { Expect, StripWhile, Test, Whitespace } from "inferred-types/types";

import { stripWhile } from "inferred-types/runtime";
import { NUMERIC_CHAR } from "inferred-types/constants";

describe("StripWhile<TContent,TComparator>", () => {

    it("happy path", () => {
        type Num = StripWhile<"   \n42", Whitespace>;

        type cases = [
            Expect<Test<Num, "equals", "42">>,
        ];

    });

});

describe("stripWhile(val,...chars)", () => {

    it("happy path", () => {
        const metric = stripWhile("100mph", ...NUMERIC_CHAR);

        expect(metric).toBe("mph")

        type cases = [
            Expect<Test<typeof metric, "equals", "mph">>,
        ];
    });

});


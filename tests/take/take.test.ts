import { describe, expect, it } from "vitest";
import type { Expect, TakeState, Test } from "inferred-types/types";

import { asTakeState, startsWith, take } from "inferred-types/runtime";

describe("take(parser) -> (val) -> Take", () => {

    it("Partial: provide parser", () => {
        function parser<T extends string | TakeState>(state: T) {
            const s = asTakeState(state);

            return (
                startsWith("foo", "bar")(s.parseString)
                ? [s.parseString.slice(0,3), [...s.tokens, s.parseString.slice(0,3)] ]
                : ["", s.tokens]
            ) as StartsWith
        }

        const takeFooBar = take(parser);

        type cases = [
            /** type tests */
        ];
    });

});

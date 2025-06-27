import { describe, expect, it } from "vitest";
import {
    Expect,
    Test,
} from "inferred-types/types";
import { startsWith } from "inferred-types/runtime";

describe("startsWith(variants) -> (val) -> boolean", () => {

    it("wide type", () => {
        const isFooBar = startsWith("foo","bar");

        const fooBaz = "foobaz" as string;
        const t1 = isFooBar(fooBaz);
        expect(t1).toBe(true);

        if(isFooBar(fooBaz)) {
            type FB = typeof fooBaz;

            type cases = [
                Expect<Test<FB, "equals", `foo${string}` | `bar${string}`>>
            ];
        }

    });

    it("literal type", () => {
        const isFooBar = startsWith("foo","bar");

        const fooBaz = "foobaz";
        const t1 = isFooBar(fooBaz);
        expect(t1).toBe(true);

        if(isFooBar(fooBaz)) {
            type FB = typeof fooBaz;

            type cases = [
                Expect<Test<FB, "equals", "foobaz">>
            ];
        }

    });

});

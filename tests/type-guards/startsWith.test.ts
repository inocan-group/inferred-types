import { describe, expect, it } from "vitest";
import type { Expect, Test } from "inferred-types/types";

import { startsWith, startsWithTypeguard } from "inferred-types/runtime";

describe("startsWithTypeguard(variants) -> (val) -> boolean", () => {

    it("empty string behavior", () => {
        const isEmpty = startsWith("");
        const isFooOrEmpty = startsWith("foo", "");

        // Empty string should not match anything
        expect(isEmpty("hello")).toBe(false);
        expect(isEmpty("")).toBe(false);
        expect(isEmpty("any string")).toBe(false);

        // When mixed with valid patterns, only valid patterns should match
        expect(isFooOrEmpty("foobar")).toBe(true); // matches "foo"
        expect(isFooOrEmpty("bar")).toBe(false); // doesn't match "foo" or ""
        expect(isFooOrEmpty("")).toBe(false); // empty string doesn't match
    });

    it("wide type", () => {
        const isFooBar = startsWithTypeguard("foo","bar");

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

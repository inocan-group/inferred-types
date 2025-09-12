
import { describe, expect, it } from "vitest";
import { isStringLiteral } from "inferred-types/runtime";
import type { Expect, Test } from "inferred-types/types";

describe("isStringLiteral()()", () => {

    it("happy path", () => {
        const tg = isStringLiteral("foo", "bar", "baz");

        expect(tg("foo")).toBe(true);
        expect(tg("bar")).toBe(true);
        expect(tg("baz")).toBe(true);
        expect(tg("bax")).toBe(false);

        type cases = [
            Expect<Test<typeof tg, "equals", (val: unknown) => val is "foo" | "bar" | "baz">>,
        ];
    });

});

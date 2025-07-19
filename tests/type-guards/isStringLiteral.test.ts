import { Expect, Test } from "inferred-types/types";
import { describe, expect, it } from "vitest";
import { isStringLiteral } from "runtime/type-guards";

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

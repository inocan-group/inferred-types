
import { describe, expect, it } from "vitest";
import { isTypeSubtype, getTypeSubtype } from "inferred-types/runtime";
import type { Expect, Test, TypeSubtype } from "inferred-types/types";

describe("isTypeSubtype(val)", () => {

    it("happy path", () => {
        const t1 = isTypeSubtype("foo/bar");
        const t2 = isTypeSubtype("foo123/34");

        expect(t1).toBe(true);
        expect(t2).toBe(true);

        const foobar = "foo/bar";

        if (isTypeSubtype(foobar)) {
            type FB = typeof foobar;

            type cases = [
                Expect<Test<
                    FB, "equals",
                    "foo/bar"
                >>,
                Expect<Test<FB, "extends", TypeSubtype>>
            ];
        }

        const fooBar2: string = "foo/bar";
        if (isTypeSubtype(fooBar2)) {
            type FB = typeof fooBar2;

            // @ts-ignore
            type cases = [
                Expect<Test<
                    FB, "equals",
                    `${string}/${string}`
                >>,
                Expect<Test<FB, "extends", TypeSubtype>>
            ];
        }

    });

});

describe("getTypeSubtype(str)", () => {

    it("happy path", () => {
        const [t1, st1] = getTypeSubtype("foo/bar");

        expect(t1).toBe("foo");
        expect(st1).toBe("bar");

        expect(() => getTypeSubtype("foo/bar/baz")).toThrow();

        type cases = [
            Expect<Test<typeof t1, "equals",  "foo">>,
            Expect<Test<typeof st1, "equals",  "bar">>,
        ];
    });

});

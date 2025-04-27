import { Equal, Expect } from "@type-challenges/utils";
import { TypeSubtype } from "inferred-types/types";
import { describe, expect, it } from "vitest";
import { Extends } from "inferred-types/types";
import { isTypeSubtype, getTypeSubtype } from "inferred-types/runtime";


describe("isTypeSubtype(val)", () => {

    it("happy path", () => {
        const t1 = isTypeSubtype("foo/bar");
        const t2 = isTypeSubtype("foo123/34");

        expect(t1).toBe(true);
        expect(t2).toBe(true);

        const foobar = "foo/bar";

        if (isTypeSubtype(foobar)) {
            type FB = typeof foobar;


            // @ts-ignore
            type cases = [
                Expect<Test<FB, "equals",  "foo/bar" & { brand: "type-subtype" }>>,
                Expect<Extends<FB, TypeSubtype>>
            ];
        }

        const fooBar2: string = "foo/bar";
        if (isTypeSubtype(fooBar2)) {
            type FB = typeof fooBar2;

            // @ts-ignore
            type cases = [
                Expect<Test<FB, "equals",  `${string}/${string}` & { brand: "type-subtype" }>>,
                Expect<Extends<FB, TypeSubtype>>
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


        // @ts-ignore
        type cases = [
            Expect<Test<typeof t1, "equals",  "foo">>,
            Expect<Test<typeof st1, "equals",  "bar">>,
        ];
    });

});

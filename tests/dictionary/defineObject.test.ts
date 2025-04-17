import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { defineObject } from "inferred-types/runtime"

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("defineObject()", () => {

    it("using tokens to define", () => {
        const fooBar = defineObject({
            foo: "string | undefined",
            bar: "String(foo) | String(bar) | String(baz)"
        });

        expect(fooBar).toEqual({
            foo: "Opt<string>",
            bar: "string(foo,bar)"
        });

        type FooBar = typeof fooBar;

        type cases = [
            Expect<Equal<FooBar, {
                foo: string | undefined,
                bar: "foo" | "bar" | "baz"
            }>>
        ];
    });


    it("using optional property syntax", () => {
        const fooBar = defineObject({
            foo: "string | undefined",
            bar: "String(foo) | String(bar)"
        }, "foo", "bar");


        type cases = [
            Expect<Equal<typeof fooBar, {
                foo?: string | undefined,
                bar?: "foo" | "bar" | undefined
            }>>
        ];

    });



    it("providing a string-based InputToken to define the type", () => {
        const fooBar = defineObject({foo: `Number(1) | Number(2) | Number(3)`});


        type cases = [
            /** type tests */
        ];
    });


});

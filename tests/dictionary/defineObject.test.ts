import { describe, expect, it } from "vitest";

import { defineObject } from "inferred-types/runtime"
import { Expect, Test } from "inferred-types/types";



describe("defineObject()", () => {

    it("using tokens to define", () => {
        const fooBar = defineObject({
            foo: "string | undefined",
            bar: "String(foo) | String(bar) | String(baz)"
        });

        // dictionary converted to string equivalent
        expect(fooBar).toEqual(
            `{ foo: string | undefined, bar: String(foo) | String(bar) | String(baz) }`
        );

        type FooBar = typeof fooBar;

        type cases = [
            Expect<Test<
                FooBar,
                "equals",
                {
                    foo: string | undefined,
                    bar: "foo" | "bar" | "baz"
                }
            >>
        ];
    });


    it("using optional property syntax", () => {
        const fooBar = defineObject({
            foo: "string | undefined",
            bar: "String(foo) | String(bar)"
        }, "foo", "bar");

        expect(fooBar).toBe(
            `{ foo: string | undefined, bar: String(foo) | String(bar) }`
        );

        type cases = [
            Expect<Test<
                typeof fooBar,
                "equals",
                {
                    foo?: string | undefined,
                    bar?: "foo" | "bar" | undefined
                }
            >>
        ];

    });

    it("providing a string-based InputToken to define the type", () => {
        const fooBar = defineObject(
            {foo: `Number(1) | Number(2) | Number(3)`}
        );

        type cases = [
            Expect<Test<
                typeof fooBar, "equals",
                { foo: 1 | 2 | 3 }
            >>
        ];
    });


});

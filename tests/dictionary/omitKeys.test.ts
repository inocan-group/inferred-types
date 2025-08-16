import { describe, expect, it } from "vitest";

import { omitKeys } from "inferred-types/runtime";
import {
    Expect,
    EmptyObject,
    Test
} from "inferred-types/types";



describe("omit()", () => {

    it("happy path", () => {
        const all = omitKeys({ foo: 1, bar: 2, baz: 3 }, "");
        const noFoo = omitKeys({ foo: 1, bar: 2, baz: 3 }, "foo");
        const justBar = omitKeys({ foo: 1, bar: 2, baz: 3 }, "foo", "baz");
        const none = omitKeys({ foo: 1, bar: 2, baz: 3 }, "foo", "bar", "baz");

        expect(all).toEqual({ foo: 1, bar: 2, baz: 3 });
        expect(noFoo).toEqual({ bar: 2, baz: 3 });
        expect(none).toEqual({});
        // runtime valid value
        expect(noFoo).toEqual({ bar: 2, baz: 3 });

        type cases = [
            Expect<Test<typeof all, "equals", { foo: 1; bar: 2; baz: 3 }>>,
            Expect<Test<typeof noFoo, "equals", { bar: 2; baz: 3 }>>,
            Expect<Test<typeof justBar, "equals", { bar: 2 }>>,
            Expect<Test<typeof none, "equals", EmptyObject>>,
        ];

    });


    it("Narrowing a typed object", () => {
        const input: { foo: 1; bar: 2; baz: 3 } = { foo: 1, bar: 2, baz: 3 };
        const test = omitKeys(input, "foo");

        type cases = [
            Expect<Test<typeof test, "equals", { bar: 2; baz: 3 }>>
        ];


        expect(test).toEqual({ bar: 2, baz: 3 });
    });

    it("Narrowing a typed object with an array property", () => {
        const input: { foo: 1; bar: 2; baz: ["testing", "something"] } = {
            foo: 1,
            bar: 2,
            baz: ["testing", "something"]
        };

        const test = omitKeys(input, "foo");

        type cases = [
            Expect<Test<
                typeof test,
                "equals",
                { bar: 2; baz: ["testing", "something"] }
            >>
        ];

        expect(test).toEqual({ bar: 2, baz: ["testing", "something"] });
    });


});

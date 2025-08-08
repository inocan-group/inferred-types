import type { Expect, Test, ToKv } from "inferred-types/types";
import { describe, it } from "vitest";

describe("ToKv<T>", () => {
    it("all required", () => {
        type Foobar = ToKv<{ foo: 1; bar: "hi" }>;

        type cases = [
            Expect<Test<Foobar, "equals", [
                { key: "foo"; value: 1; required: true },
                { key: "bar"; value: "hi"; required: true }
            ]>>
        ];
    });

    it("all optional", () => {
        type Foobar = ToKv<{ foo?: 1; bar?: "hi" }>;

        type cases = [
            Expect<Test<Foobar, "equals", [
                { key: "foo"; value: 1 | undefined; required: false },
                { key: "bar"; value: "hi" | undefined; required: false }
            ]>>
        ];
    });

    it("mixed required/optional", () => {
        type Foobar = ToKv<{ foo?: 1; bar: "hi" }>;

        type cases = [
            Expect<Test<Foobar, "equals", [
                { key: "foo"; value: 1 | undefined; required: false },
                { key: "bar"; value: "hi"; required: true }
            ]>>
        ];
    });


    it("nesting", () => {
        type Shallow = ToKv<{ foo: 1, bar: { uno: 1; dos: 2}}>;
        type Deep = ToKv<{ foo: 1, bar: { uno: 1; dos: 2}}, { recurse: true }>;

        type cases = [
            Expect<Test<
                Shallow, "equals",
                [
                    { key: "foo", value: 1, required: true },
                    { key: "bar", value: { uno: 1; dos: 2 }, required: true },
                ]
            >>,

            Expect<Test<
                Deep, "equals",
                [
                    { key: "foo", value: 1, required: true },
                    { key: "bar", value: [ {key: "uno"; value: 1; required: true}, {key: "dos"; value: 2; required: true},], required: true },
                ]
            >>,

        ];
    });

});

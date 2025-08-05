import type { Expect, Test, ToKv } from "inferred-types/types";
import { describe, it } from "vitest";

describe("ToKv<T>", () => {
    it("happy path", () => {
        type Foobar = ToKv<{ foo: 1; bar: "hi" }>;

        type cases = [
            Expect<Test<Foobar, "equals", [
                { key: "foo"; value: 1; required: true },
                { key: "bar"; value: "hi"; required: true }
            ]>>
        ];
    });

    it("with optional parameter", () => {
        type Foobar = ToKv<{ foo?: 1; bar: "hi" }>;

        type cases = [
            Expect<Test<Foobar, "equals", [
                { key: "foo"; value: 1 | undefined; required: false },
                { key: "bar"; value: "hi"; required: true }
            ]>>
        ];
    });
});

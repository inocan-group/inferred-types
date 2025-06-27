import { describe, it, expect } from "vitest";
import { Expect, RequireProps, Test } from "inferred-types/types";

describe("RequireProps<T,R>", () => {
    it("works as expected", () => {
        type Start = { foo?: string; bar?: number };
        type Foo = RequireProps<Start, "foo">;
        type Bar = RequireProps<Start, "bar">;
        type Both = RequireProps<Start, "foo" | "bar">;

        type cases = [
            Expect<Test<Foo, "equals",  { foo: string; bar?: number }>>,
            Expect<Test<Bar, "equals",  { foo?: string; bar: number }>>,
            Expect<Test<Both, "equals",  { foo: string; bar: number }>>
        ];

    });
});

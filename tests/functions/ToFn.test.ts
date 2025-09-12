import { describe, it } from "vitest";
import type { Expect, Test, ToFn } from "inferred-types/types";

describe("ToFn<T> utility", () => {

    it("happy path", () => {
        type Str = ToFn<"hi">;
        type Num = ToFn<42>;
        type Proxy = ToFn<() => "hi">;
        type Never = ToFn<never>;

        type cases = [
            Expect<Test<Str, "equals",  () => "hi">>,
            Expect<Test<Num, "equals",  () => 42>>,
            Expect<Test<Proxy, "equals",  () => "hi">>,
            Expect<Test<Never, "equals",  never>>
        ];

    });

});


import { describe, it } from "vitest";
import type { Expect, IsString, Test } from "inferred-types/types";

describe("IsString<T>", () => {

    it("happy path", () => {
        type Wide = IsString<string>;
        type Literal = IsString<"foo">;
        type Num = IsString<42>;
        type Arr = IsString<[]>;

        type cases = [
            Expect<Test<Wide, "equals", true>>,
            Expect<Test<Literal, "equals", true>>,

            Expect<Test<Num, "equals", false>>,
            Expect<Test<Arr, "equals", false>>,

        ];
    });

    it("Union Types", () => {
        type StrUnion = IsString<"foo" | "bar">;
        type MixedUnion = IsString<"foo" | 42>;
        type NonStrUnion = IsString<42 | 56 | false>;

        type cases = [
            Expect<Test<StrUnion, "equals", true>>,
            Expect<Test<MixedUnion, "equals",  boolean>>,
            Expect<Test<NonStrUnion, "equals", false>>,
        ];
    });
});

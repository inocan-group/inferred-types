
import { describe, it } from "vitest";
import type { Expect, IsWideUnion, Test } from "inferred-types/types";

describe("IsWideUnion<T>", () => {

    it("Happy Path", () => {
        type NotUnion = IsWideUnion<string>;
        type Bool = IsWideUnion<boolean>;

        type Mixed = IsWideUnion<"foo" | number>;
        type Mixed2 = IsWideUnion<"foo" | boolean>;
        type AllLit = IsWideUnion<"foo" | "bar">;
        type AllWide = IsWideUnion<string | number>;

        type cases = [
            Expect<Test<NotUnion, "equals", false>>,
            Expect<Test<Bool, "equals", false>>,
            Expect<Test<Mixed, "equals", false>>,
            Expect<Test<Mixed2, "equals", false>>,
            Expect<Test<AllLit, "equals", false>>,

            Expect<Test<AllWide, "equals", true>>,
        ];

    });

});

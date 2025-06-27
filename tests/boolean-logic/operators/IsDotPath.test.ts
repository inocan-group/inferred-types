import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { IsDotPath, Test } from "inferred-types/types";



describe("IsDotPath<T>", () => {

    it("happy path", () => {
        type Root = IsDotPath<"">;
        type SingleOffset = IsDotPath<"foo">;
        type MultiOffset = IsDotPath<"foo.bar">;
        type InvalidChar = IsDotPath<"foo/bar">;
        type InvalidChar2 = IsDotPath<"foo\\bar">;

        type cases = [
            Expect<Test<Root, "equals",  true>>,
            Expect<Test<SingleOffset, "equals",  true>>,
            Expect<Test<MultiOffset, "equals",  true>>,
            Expect<Test<InvalidChar, "equals",  false>>,
            Expect<Test<InvalidChar2, "equals",  false>>,
        ];
    });

});

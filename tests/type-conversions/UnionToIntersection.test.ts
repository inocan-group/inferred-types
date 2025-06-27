import { Test, UnionToIntersection, Expect } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("UnionToIntersection<U>", () => {

    it("Intersecting KVs", () => {
        type Foobar = UnionToIntersection<{ foo: string } | { bar: string }>;

        type cases = [
            Expect<Test<Foobar, "equals", { foo: string } & { bar: string }>>
        ];
    });

});

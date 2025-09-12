import { describe, it } from "vitest";
import type { Expect, HasUnionType, Test } from "inferred-types/types";

describe("HasUnionType<T>", () => {

    it("happy path", () => {
        type T1 = HasUnionType<["foo", "bar", "baz"]>;
        type T2 = HasUnionType<["foo", "bar" | "baz"]>;

        type cases = [
            Expect<Test<T1, "equals",  false>>, //
            Expect<Test<T2, "equals",  true>>
        ];
    });

});

import {  Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import type { AsPropertyKey, Test } from "inferred-types/types";

describe("AsPropertyKey<T,[C]>", () => {

    it("without container", () => {
        type Foo = AsPropertyKey<"foo">;
        type One = AsPropertyKey<1>;
        type Err = AsPropertyKey<true>;
        type cases = [
            Expect<Test<Foo, "equals",  "foo">>,
            Expect<Test<One, "equals",  1>>,
            Expect<Test<Err, "equals",  never>>
        ];

    });

});

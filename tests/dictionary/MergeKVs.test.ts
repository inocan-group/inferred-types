import { Equal, Expect } from "@type-challenges/utils";
import type { Dictionary, MergeKVs } from "inferred-types/types";

import { describe, it } from "vitest";

describe("MergeKVs<T>", () => {

    it("Happy Path", () => {
        type Foo = Dictionary<"foo", "foo">;
        type Bar = Dictionary<"bar", "bar">;
        type Baz = Dictionary<"baz", "baz">;
        type M = MergeKVs<[Foo, Bar, Baz]>;

        type cases = [
            Expect<Equal<M, {
                foo: "foo";
                bar: "bar";
                baz: "baz";
            }>>,
        ];
        const cases: cases = [true];
    });

});

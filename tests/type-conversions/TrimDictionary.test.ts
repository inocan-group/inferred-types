import { Equal, Expect } from "@type-challenges/utils";
import { TrimDictionary } from "inferred-types/types";
import { describe, it } from "vitest";

describe("TrimDictionary<T>", () => {

    it("happy path", () => {
        type T1 = TrimDictionary<{foo: "  foo", bar: "\nbar\t" }>

        type T2 = TrimDictionary<{
            foo: "  foo",
            bar: "\nbar",
            baz: 42
        }>;

        type cases = [
            Expect<Equal<T1, { foo: "foo", bar: "bar" }>>,
            Expect<Equal<T2, {foo: "foo", bar: "bar", baz: 42}>>,
        ];
    });

});

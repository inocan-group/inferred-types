import { Expect, Test, TrimDictionary } from "inferred-types/types";
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
            Expect<Test<T1, "equals", { foo: "foo", bar: "bar" }>>,
            Expect<Test<T2, "equals", {foo: "foo", bar: "bar", baz: 42}>>,
        ];
    });

});

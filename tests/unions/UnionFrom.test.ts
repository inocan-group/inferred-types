import { describe, it } from "vitest";
import {
    Expect,
    Test,
    UnionFrom,
} from "inferred-types/types";

describe("UnionFrom<T,U>", () => {

    it("from tuple", () => {
        type U1 = UnionFrom<["foo","bar",42]>;

        type cases = [
            Expect<Test<U1, "equals", "foo" | "bar" | 42>>,
        ];
    });

    it("from object", () => {
        type U1 = UnionFrom<{foo: 1, bar: 2, baz: 3}>;

        type cases = [
            Expect<Test<U1, "equals", 1|2|3>>,
        ];
    });

    it("from tuple with offset", () => {
        type Data = [
            { id: 1, name: "Bob" },
            { id: 2, name: "Nancy" }
        ];
        type U1 = UnionFrom<Data, "id">;
        type U2 = UnionFrom<Data, "name">;

        type cases = [
            Expect<Test<U1, "equals", 1 | 2>>,
            Expect<Test<U2, "equals", "Bob" | "Nancy">>,
        ];
    });

    it("from object, offset produces error", () => {
        type U1 = UnionFrom<{id: 1, name: "Bob"}, "id">;

        type cases = [
            Expect<Test<U1, "isError", "invalid-offset">>,
        ];
    });

});

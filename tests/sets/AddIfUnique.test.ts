import { describe, it } from "vitest";
import {
    AddIfUnique,
    AssertEqual,
    Expect
} from "inferred-types/types";

describe("AddIfUnique<TItem,TList,[TOffset]>", () => {

    it("scalar values -> new item added", () => {
        type T1 = AddIfUnique<4,[1,2,3]>;
        type T2 = AddIfUnique<4,[]>;

        type cases = [
            Expect<AssertEqual<T1, [1,2,3,4]>>,
            Expect<AssertEqual<T2, [4]>>
        ];
    });

    it("scalar values -> skip duplicate", () => {
        type T1 = AddIfUnique<3,[1,2,3]>;
        type T2 = AddIfUnique<4,[4]>;

        type cases = [
            Expect<AssertEqual<T1, [1,2,3]>>,
            Expect<AssertEqual<T2, [4]>>
        ];
    });


    it("dictionary", () => {
        type T1 = AddIfUnique<{foo:1}, []>;
        type T2 = AddIfUnique<{foo:1}, [{foo:2}]>;
        type T3 = AddIfUnique<{foo:1}, [{foo:1}]>;

        type cases = [
            Expect<AssertEqual<T1, [{foo:1}]>>,
            Expect<AssertEqual<T2, [{foo:2},{foo:1}]>>,
            Expect<AssertEqual<T3, [{foo:1}]>>,
        ];
    });


    it("dictionary with offset", () => {
        type T1 = AddIfUnique<{foo:1; bar: 2}, [], "foo">;
        // not unique as `foo` is 1 in both cases
        type T2 = AddIfUnique<{foo:1; bar: 2}, [{foo:1; bar: 2}], "foo">;
        // not unique based on `foo` but different `bar` value
        type T3 = AddIfUnique<{foo:1; bar: 2}, [{foo:1; bar: 3}], "foo">;

        type cases = [
            Expect<AssertEqual<T1, [{foo:1; bar: 2}]>>,
            Expect<AssertEqual<T2, [{foo:1; bar: 2}]>>,
            Expect<AssertEqual<T3, [{foo:1; bar: 2|3}]>>,
        ];
    });



});

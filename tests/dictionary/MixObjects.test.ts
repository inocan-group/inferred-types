import { describe, it } from "vitest";
import {
    AssertEqual,
    Expect,
    MixObjects,
} from "inferred-types/types";

describe("MixObjects<A,B>", () => {

    it("Overlapping Props", () => {
        type T1 = MixObjects<{foo:1}, {foo:2}>;
        type T2 = MixObjects<{foo:1; bar: 2}, {foo:2; bar: 3}>;

        type cases = [
            Expect<AssertEqual<T1, { foo: 1|2 }>>,
            Expect<AssertEqual<T2, { foo: 1|2; bar: 2|3 }>>,
        ];
    });


    it("mixing wide with narrow", () => {
        type T1 = MixObjects<{foo:1}, {foo:number}>;

        type cases = [
            Expect<AssertEqual<T1, { foo: number }>>
        ];
    });


    it("unique props", () => {
        type T1 = MixObjects<{foo:1},{bar:2}>;

        type cases = [
            Expect<AssertEqual<T1, { foo: 1, bar: 2}>>
        ];
    });


    it("some props overlap", () => {
        type T1 = MixObjects<{foo:1; bar: 2}, {foo:2; baz: 3}>

        type cases = [
            Expect<AssertEqual<T1, { foo: 1|2; bar: 2; baz: 3 }>>
        ];
    });


});


import { describe, it } from "vitest";
import type { AsNumberWhenPossible, Expect, HasSameValues, Test, UnionToTuple } from "inferred-types/types";

describe("AsNumberWhenPossible<T>", () => {

    it("happy path", () => {
        type Mixed = AsNumberWhenPossible<[1, "2", "nope"]>;
        type StrTup = AsNumberWhenPossible<
            UnionToTuple<"foo" | "bar">
        >;
        type NumTup = AsNumberWhenPossible<
            UnionToTuple<"1" | "2">
        >;
        type MixedTup = AsNumberWhenPossible<
            UnionToTuple<"1" | "2" | "foo">
        >;

        type ObjUnion = AsNumberWhenPossible<"foo" | "bar" | "0" | 1>;
        type ArrUnion = AsNumberWhenPossible<0 | "1">;

        type cases = [
            Expect<Test<Mixed, "equals", [1, 2, "nope"]>>,
            Expect<HasSameValues<StrTup, ["foo", "bar"]>>,
            Expect<HasSameValues<NumTup, [1, 2]>>,
            Expect<HasSameValues<MixedTup, [1, 2, "foo"]>>,

            Expect<Test<ObjUnion, "equals",  "foo" | "bar" | 0 | 1>>,
            Expect<Test<ArrUnion, "equals",  0 | 1>>,

        ];
    });

});

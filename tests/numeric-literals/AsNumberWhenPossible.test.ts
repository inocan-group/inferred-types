import { Equal, Expect } from "@type-challenges/utils";
import { AsNumberWhenPossible, HasSameValues, UnionToTuple } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

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
            Expect<Equal<Mixed, [1, 2, "nope"]>>,
            Expect<HasSameValues<StrTup, ["foo", "bar"]>>,
            Expect<HasSameValues<NumTup, [1, 2]>>,
            Expect<HasSameValues<MixedTup, [1, 2, "foo"]>>,

            Expect<Equal<ObjUnion, "foo" | "bar" | 0 | 1>>,
            Expect<Equal<ArrUnion, 0 | 1>>,

        ];
        const cases: cases = [
            true, true, true, true,
            true, true,
        ];
    });

});

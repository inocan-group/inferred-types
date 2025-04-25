import { Equal, Expect } from "@type-challenges/utils";
import { Flexy, TupleMeta } from "inferred-types/types";
import { describe, it } from "vitest";

describe("Flexy<T>", () => {

    it("empty tuples have to change", () => {
        type Empty = Flexy<[]>;
        type Empty2 = Flexy<readonly []>;

        type cases = [
            Expect<Equal<Empty, []>>,
            Expect<Equal<Empty2, readonly []>>,
        ];
    });


    it("required or optional one parameter tuples are modified to allow non-array type", () => {
        type One = Flexy<[number]>;
        type Opti = Flexy<[number?]>;

        type cases = [
            Expect<Equal<One, number | [number]>>,
            Expect<Equal<Opti, number | undefined | [number?]>>,
        ];
    });


    it("two+ parameter tuples are modified when max one is required", () => {
        type OneOrTwo = Flexy<[number, string?]>;
        type ZeroToTwo = Flexy<[number?, string?]>;

        type cases = [
            Expect<Equal<OneOrTwo, number | [number, string?]>>,
            Expect<Equal<ZeroToTwo, undefined | number | [number?, string?]>>,
        ];
    });


    it("two+ parameter tuples which require at minimum of two params are unchanged", () => {
        type Two = Flexy<[number, string]>;
        type Three = Flexy<[number, string, string?]>;

        type cases = [
            Expect<Equal<Two, [number, string]>>,
            Expect<Equal<Three, [number, string, string?]>>,
        ];
    });
});

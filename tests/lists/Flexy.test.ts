import { Equal, Expect } from "@type-challenges/utils";
import { Flexy, TupleMeta } from "inferred-types/types";
import { describe, it } from "vitest";

describe("Flexy<T>", () => {

    it("empty tuples have to change", () => {
        type Empty = Flexy<[]>;
        type Empty2 = Flexy<readonly []>;

        type cases = [
            Expect<Test<Empty, "equals",  []>>,
            Expect<Test<Empty2, "equals",  readonly []>>,
        ];
    });


    it("required or optional one parameter tuples are modified to allow non-array type", () => {
        type One = Flexy<[number]>;
        type Opti = Flexy<[number?]>;

        type cases = [
            Expect<Test<One, "equals",  number | [number]>>,
            Expect<Test<Opti, "equals",  number | undefined | [number?]>>,
        ];
    });


    it("two+ parameter tuples are modified when max one is required", () => {
        type OneOrTwo = Flexy<[number, string?]>;
        type ZeroToTwo = Flexy<[number?, string?]>;

        type cases = [
            Expect<Test<OneOrTwo, number | [number, "equals",  string?]>>,
            Expect<Test<ZeroToTwo, undefined | number | [number?, "equals",  string?]>>,
        ];
    });


    it("two+ parameter tuples which require at minimum of two params are unchanged", () => {
        type Two = Flexy<[number, string]>;
        type Three = Flexy<[number, string, string?]>;

        type cases = [
            Expect<Test<Two, [number, "equals",  string]>>,
            Expect<Test<Three, [number, string, "equals",  string?]>>,
        ];
    });
});

import { Equal, Expect } from "@type-challenges/utils";
import { TupleMeta } from "inferred-types/types";
import { describe, it } from "vitest";

describe("TupleMeta<T>", () => {

    it("happy path", () => {
        type Nada = TupleMeta<[]>;
        type Single = TupleMeta<[string]>;
        type OneOrTwo = TupleMeta<[string, string?]>;
        type OneOrMore = TupleMeta<[string, ...string[]]>;
        type ZeroOrMore = TupleMeta<[...string[]]>;

        type cases = [
            Expect<Equal<Nada["range"], "empty">>,
            Expect<Equal<Single["range"], "[ 1..1 ]">>,
            Expect<Equal<OneOrTwo["range"], "[ 1..2 ]">>,
            Expect<Equal<OneOrMore["range"], "[ 1..* ]">>,
            Expect<Equal<ZeroOrMore["range"], "[ 0..* ]">>,

            Expect<Equal<Nada["isEmpty"], true>>,
            Expect<Equal<Single["isEmpty"], false>>,

            Expect<Equal<OneOrMore["isUnbounded"], true>>,
            Expect<Equal<Single["isUnbounded"], false>>,

            Expect<Equal<ZeroOrMore["isOptional"], true>>,
            Expect<Equal<Single["isOptional"], false>>,
        ];
    });

});

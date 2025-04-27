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
            Expect<Test<Nada["range"], "equals",  "empty">>,
            Expect<Test<Single["range"], "equals",  "[ 1..1 ]">>,
            Expect<Test<OneOrTwo["range"], "equals",  "[ 1..2 ]">>,
            Expect<Test<OneOrMore["range"], "equals",  "[ 1..* ]">>,
            Expect<Test<ZeroOrMore["range"], "equals",  "[ 0..* ]">>,

            Expect<Test<Nada["isEmpty"], "equals",  true>>,
            Expect<Test<Single["isEmpty"], "equals",  false>>,

            Expect<Test<OneOrMore["isUnbounded"], "equals",  true>>,
            Expect<Test<Single["isUnbounded"], "equals",  false>>,

            Expect<Test<ZeroOrMore["isOptional"], "equals",  true>>,
            Expect<Test<Single["isOptional"], "equals",  false>>,
        ];
    });

});

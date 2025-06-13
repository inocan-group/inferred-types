import { Length } from "inferred-types";
import { Expect, Test, TupleMeta } from "inferred-types/types";
import { MaxSafeInteger } from "transpiled/types";
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


    it("[T] handled correctly", () => {
        type Undef = TupleMeta<[undefined]>;
        type Unknown = TupleMeta<[unknown]>;
        type Num = TupleMeta<[number]>;
        type OptString = TupleMeta<[string|undefined]>;

        type cases = [
            Expect<Test<Undef["minLength"], "equals", 1>>,
            Expect<Test<Unknown["minLength"], "equals", 1>>,
            Expect<Test<Num["minLength"], "equals", 1>>,
            Expect<Test<OptString["minLength"], "equals", 1>>,

            Expect<Test<Undef["maxLength"], "equals", 1>>,
            Expect<Test<Unknown["maxLength"], "equals", 1>>,
            Expect<Test<Num["maxLength"], "equals", 1>>,
            Expect<Test<OptString["maxLength"], "equals", 1>>,
        ];
    });


    it("[ T, ...U[] ] handled correctly", () => {
        type Len = Length<[string|undefined, ...undefined[]]>
        type Undef = TupleMeta<[undefined, ...undefined[]]>;
        type Unknown = TupleMeta<[unknown, ...unknown[]]>;
        type Num = TupleMeta<[number, ...unknown[]]>;

        type cases = [
            Expect<Test<Undef["minLength"], "equals", 1>>,
            Expect<Test<Unknown["minLength"], "equals", 1>>,
            Expect<Test<Num["minLength"], "equals", 1>>,

            Expect<Test<Undef["maxLength"], "equals", MaxSafeInteger>>,
            Expect<Test<Unknown["maxLength"], "equals", MaxSafeInteger>>,
            Expect<Test<Num["maxLength"], "equals", MaxSafeInteger>>,
        ];
    });



});

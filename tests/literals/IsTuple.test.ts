import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";
import type { Expect, IsTuple, Test } from "inferred-types/types";

describe("IsTuple<T>", () => {

    it("positive tests", () => {
        type Empty = IsTuple<[]>;
        type RoEmpty = IsTuple<readonly []>;
        type Foobar = IsTuple<["foo", "bar"]>;
        type RoFoobar = IsTuple<["foo", "bar"]>;

        type cases = [
           Expect<Test<Empty, "equals", true>>,
           Expect<Test<RoEmpty, "equals", true>>,
           Expect<Test<Foobar, "equals", true>>,
           Expect<Test<RoFoobar, "equals", true>>,
        ];
    });

    it("negative tests", () => {
        type Never = IsTuple<never>;
        type StrArr = IsTuple<string[]>;
        type RoStrArr = IsTuple<readonly string[]>;

        type cases = [
            Expect<Test<Never, "equals", false>>,
            Expect<Test<StrArr, "equals", false>>,
            Expect<Test<RoStrArr, "equals", false>>,
        ];
    });

    it("variadic array with known keys returns false", () => {
        type V1 = IsTuple<[1,2,3, ...string[]]>;
        type V2 = IsTuple<[...string[], 1,2,3]>;
        type V3 = IsTuple<[number, ...string[], 1,2,3]>;

        type cases = [
            Expect<Test<V1, "equals", false>>,
            Expect<Test<V2, "equals", false>>,
            Expect<Test<V3, "equals", false>>,
        ];
    });

});

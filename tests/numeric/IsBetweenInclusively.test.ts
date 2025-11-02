import { describe, it } from "vitest";
import {
    Expect,
    AssertTrue,
    IsBetweenInclusively,
    IsLessThanOrEqual,
    LessThanOrEqual
} from "inferred-types/types";


describe("IsBetweenInclusively<T,A,B>", () => {

    it("positive tests", () => {
        type T1 = IsBetweenInclusively<5, 1, 6>;
        type T2 = IsBetweenInclusively<5, 1, 5>;
        type T2b = IsLessThanOrEqual<5,5>;
        type T2c = LessThanOrEqual<5,5>;
        type T3 = IsBetweenInclusively<1, 1, 5>;


        type cases = [
            Expect<AssertTrue<T1>>,
            Expect<AssertTrue<T2>>,
            Expect<AssertTrue<T2b>>,
            Expect<AssertTrue<T2c>>,
            Expect<AssertTrue<T3>>,
        ];
    });

});

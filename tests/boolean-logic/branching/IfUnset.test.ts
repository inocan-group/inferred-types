import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { Dictionary, IfUnset, IfUnsetOrUndefined, Unset } from "inferred-types/types";



describe("IfUnset<TTest,TElse>", () => {

    it("first test", () => {
        type U = Dictionary | Unset;

        type T1 = IfUnset<U, "oops">;

        type cases = [
            Expect<Test<T1, "equals",  Dictionary | "oops">>,
        ];
        const cases: cases = [true];
    });

});

describe("IfUnsetOrUndefined<TTest,TElse>", () => {

    it("first test", () => {
        type U = Dictionary | Unset | undefined;

        type T1 = IfUnsetOrUndefined<U, "oops">;

        type cases = [
            Expect<Test<T1, "equals",  Dictionary | "oops">>,
        ];
        const cases: cases = [true];
    });

});

import { describe, it } from "vitest";
import {
    Expect,
    FilterByNestingLevel,
    Test,
} from "inferred-types/types";

describe("FilterByNestingLevel<TContent,TOpt>", () => {

    it("happy path", () => {
        type T1 = FilterByNestingLevel<"Bob(the father) was angry at Mary(the daughter).">;

        type cases = [
            Expect<Test<T1, "equals", "Bob was angry at Mary.">>
        ];
    });


    it("using the quotes strategy", () => {
        type T1 = FilterByNestingLevel<"[  'foo', 'bar?', 'baz'? ]", { strategy: "quotes"} >;

        type cases = [
            Expect<Test<T1, "equals", "[  , , ? ]">>
        ];
    });


});

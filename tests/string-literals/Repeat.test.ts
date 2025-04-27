import { Expect, Repeat, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("Repeat<TStr,TCount>", () => {

    it("happy path", () => {
        type T1 = Repeat<"a", 5>;
        type T2 = Repeat<"foo", 3>;

        type cases = [
            Expect<Test<T1, "equals",  "aaaaa">>,
            Expect<Test<T2, "equals",  "foofoofoo">>,
        ];
    });

});

import { Expect, ReplaceLast, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("ReplaceLast<TList, TVal>", () => {

    it("happy path", () => {
        type T1 = ReplaceLast<[1, 2, 3], "foo">;

        type cases = [
            Expect<Test<T1, "equals", [1, 2, "foo"]>>
        ];
    });

});

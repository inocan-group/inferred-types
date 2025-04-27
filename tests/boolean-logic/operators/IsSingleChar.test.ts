import { describe, it } from "vitest";
import { Expect, IsSingleChar, Test } from "inferred-types/types";



describe("IsSingleChar<T>", () => {

    it("happy path", () => {
        type C = IsSingleChar<"C">;
        type NC = IsSingleChar<"No">;
        type Str = IsSingleChar<string>;
        type NotStr = IsSingleChar<42>;

        type cases = [
            Expect<Test<C, "equals",  true>>,
            Expect<Test<NC, "equals",  false>>,
            Expect<Test<Str, "equals",  boolean>>,
            Expect<Test<NotStr, "equals",  false>>,
        ];
    });

});

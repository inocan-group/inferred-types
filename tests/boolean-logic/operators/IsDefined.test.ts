import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { Expect, IsDefined, Test } from "inferred-types/types";



describe("IsDefined", () => {

    it("Happy Path", () => {
        type T1 = IsDefined<"foo">;

        type F1 = IsDefined<undefined>;
        type F2 = IsDefined<null>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
        ];

    });

});

import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { IsDefined } from "inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("IsDefined", () => {

    it("Happy Path", () => {
        type T1 = IsDefined<"foo">;
        type T2 = IsDefined<null>;

        type F1 = IsDefined<undefined>;

        type cases = [
            ExpectTrue<T1>,
            ExpectTrue<T2>,
            ExpectFalse<F1>
        ];
        const cases: cases = [true, true, false];
    });

});

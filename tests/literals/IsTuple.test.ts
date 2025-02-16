import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { IsTuple } from "inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("IsTuple<T>", () => {

    it("happy path", () => {
        type Never = IsTuple<never>;
        type StrArr = IsTuple<string[]>;
        type RoStrArr = IsTuple<readonly string[]>;

        type Empty = IsTuple<[]>;
        type RoEmpty = IsTuple<readonly []>;
        type Foobar = IsTuple<["foo", "bar"]>;
        type RoFoobar = IsTuple<["foo", "bar"]>;

        type cases = [
            ExpectFalse<Never>,
            ExpectFalse<StrArr>,
            ExpectFalse<RoStrArr>,

            ExpectTrue<Empty>,
            ExpectTrue<RoEmpty>,
            ExpectTrue<Foobar>,
            ExpectTrue<RoFoobar>,
        ];
        const cases: cases = [
            false, false, false,
            true, true, true, true
        ];
    });

});

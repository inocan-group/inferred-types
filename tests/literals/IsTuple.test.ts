import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { IsTuple } from "inferred-types/types";



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

import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { IsWideUnion } from "inferred-types/types";
import { describe, it } from "vitest";


// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("IsWideUnion<T>", () => {

    it("Happy Path", () => {
        type NotUnion = IsWideUnion<string>;
        type Bool = IsWideUnion<boolean>;

        type Mixed = IsWideUnion<"foo" | number>;
        type Mixed2 = IsWideUnion<"foo" | boolean>;
        type AllLit = IsWideUnion<"foo" | "bar">;
        type AllWide = IsWideUnion<string | number>;

        type cases = [
            ExpectFalse<NotUnion>,
            ExpectFalse<Bool>,

            ExpectFalse<Mixed>,
            ExpectFalse<Mixed2>,
            ExpectFalse<AllLit>,
            ExpectTrue<AllWide>
        ];
        const cases: cases = [
            false, false,
            false, false, false, true
        ];
    });

});

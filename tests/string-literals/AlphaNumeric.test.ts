import { Equal, Expect, } from "@type-challenges/utils";
import { Alphanumeric } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("AlphaNumeric<T>", () => {
    const builder = <S extends string>(input: S & Alphanumeric<S>) => input as Alphanumeric<S>;

    it("happy path", () => {
        const a1 = "foobar" as const;
        const t1 = builder(a1);
        type T1a = Alphanumeric<typeof a1>;
        type T1t = Alphanumeric<typeof t1>;

        type Valid = Alphanumeric<"foobar">;
        type Invalid = Alphanumeric<"foo_bar">;

        type cases = [
            Expect<Equal<T1a, T1t>>,//
            Expect<Equal<Valid, "foobar">>,
            Expect<Equal<Invalid, never>>,
        ];
        const cases: cases = [true, true, true];
    });

});

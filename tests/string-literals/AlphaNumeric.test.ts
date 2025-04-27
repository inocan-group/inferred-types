import { Expect, AlphaNumeric, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("AlphaNumeric<T>", () => {
    const builder = <S extends string>(input: S & AlphaNumeric<S>) => input as AlphaNumeric<S>;

    it("happy path", () => {
        const a1 = "foobar" as const;
        const t1 = builder(a1);
        type T1a = AlphaNumeric<typeof a1>;
        type T1t = AlphaNumeric<typeof t1>;

        type Valid = AlphaNumeric<"foobar">;
        type Invalid = AlphaNumeric<"foo_bar">;

        type cases = [
            Expect<Test<T1a, "equals",  T1t>>,//
            Expect<Test<Valid, "equals",  "foobar">>,
            Expect<Test<Invalid, "equals",  never>>,
        ];
    });

});

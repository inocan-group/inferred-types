import { describe, it } from "vitest";
import {
    AssertFalse,
    Expect,
    IsPercentage,
} from "inferred-types/types";
import { AssertError, AssertTrue } from "transpiled";

describe("IsPercentage<T>", () => {

    it("using string literals", () => {
        type T1 = IsPercentage<"0%">;
        type T2 = IsPercentage<"50%">;
        type T3 = IsPercentage<"100%">;

        type F1 = IsPercentage<"101%">;
        type F2 = IsPercentage<"-1%">;

        type E1 = IsPercentage<"nope">;


        type cases = [
            Expect<AssertTrue<T1>>,
            Expect<AssertTrue<T2>>,
            Expect<AssertTrue<T3>>,

            Expect<AssertFalse<F1>>,
            Expect<AssertFalse<F2>>,

            Expect<AssertError<E1>>,
            Expect<AssertError<E2, "invalid-type/percentage">>,
        ];
    });

});

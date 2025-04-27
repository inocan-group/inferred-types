import { describe, it } from "vitest";
import {
    Expect,
    AlphaNumericChar,
    NumericChar,
    StripChars,
    Test
} from "inferred-types/types";


describe("StripChars<TContent,TStrip>", () => {

    it("Happy Path", () => {
        type NoChange = StripChars<"Hello World", NumericChar>;
        type StripNum = StripChars<"Hello6 World123", NumericChar>;
        type NothingLeft = StripChars<"Hello World5", AlphaNumericChar | " ">;

        type cases = [
            Expect<Test<NoChange, "equals",  "Hello World">>,
            Expect<Test<StripNum, "equals",  "Hello World">>,
            Expect<Test<NothingLeft, "equals", "">>,
        ];

    });

});


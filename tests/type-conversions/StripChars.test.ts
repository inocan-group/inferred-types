import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { AlphaNumericChar, NumericChar, StripChars } from "inferred-types/types";


describe("StripChars<TContent,TStrip>", () => {

    it("Happy Path", () => {
        type NoChange = StripChars<"Hello World", NumericChar>;
        type StripNum = StripChars<"Hello6 World123", NumericChar>;
        type NothingLeft = StripChars<"Hello World5", AlphaNumericChar | " ">;

        type cases = [
            Expect<Equal<NoChange, "Hello World">>,
            Expect<Equal<StripNum, "Hello World">>,
            Expect<Equal<NothingLeft, "">>,
        ];
        const cases: cases = [
            true, true, true
        ];
    });

});

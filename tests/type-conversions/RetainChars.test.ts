import { describe, it } from "vitest";
import {
    Expect,
    AlphaChar,
    NumericChar,
    RetainChars,
    Test,
    AlphanumericChar
} from "inferred-types/types";

describe("RetainChars<TContent,TStrip>", () => {

    it("Happy Path", () => {
        type Nada = RetainChars<"Hello World", NumericChar>;
        type NoChange = RetainChars<"Hello World", AlphanumericChar | " ">;
        type RemoveNum = RetainChars<"Hello World5", AlphaChar | " ">;

        type cases = [
            Expect<Test<Nada, "equals",  "">>,
            Expect<Test<NoChange, "equals",  "Hello World">>,
            Expect<Test<RemoveNum, "equals",  "Hello World">>,
        ];

    });


    it("using wide values", () => {
        type WideContent = RetainChars<string, NumericChar>;
        type WideChar = RetainChars<"Hello World", string>;

        type cases = [
            Expect<Test<WideContent, "equals", string>>,
            Expect<Test<WideChar, "equals", string>>,
        ];
    });

});

import { describe, it } from "vitest";
import type { Expect, HasOtherCharacters, HexadecimalChar, Test } from "inferred-types/types";

describe("HasOtherCharacters<TStr,TChars>", () => {

    it("happy path", () => {
        type T1 = HasOtherCharacters<"#AC04FFk", HexadecimalChar | "#">;
        type T2 = HasOtherCharacters<"abcd", "a">;

        type F1 = HasOtherCharacters<"#AC04FF", HexadecimalChar | "#">;
        type F2 = HasOtherCharacters<"abcd", "a" | "b" | "c" | "d">;
        type F3 = HasOtherCharacters<"abcd", ["a", "b", "c", "d"]>;

        type B1 = HasOtherCharacters<string, "a">;
        type B2 = HasOtherCharacters<"a", string>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,

            Expect<Test<B1, "equals",  boolean>>,
            Expect<Test<B2, "equals",  boolean>>,
        ];

    });

});


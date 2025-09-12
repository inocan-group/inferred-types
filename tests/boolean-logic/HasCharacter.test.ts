
import { describe, it } from "vitest";
import type { Expect, HasCharacters, Test } from "inferred-types/types";

describe("HasCharacter", () => {

    it("happy path", () => {
        type Without = "test";
        type With = "[test]";

        type HasBracket1 = HasCharacters<With, "]">;
        type HasBracket2 = HasCharacters<With, "[">;
        type HasBracket2b = HasCharacters<With, "[" | "]">;
        type HasBracket3 = HasCharacters<With, ["[", "]", "*"]>;

        type NoBracket1 = HasCharacters<Without, "]">;
        type NoBracket2 = HasCharacters<Without, "[">;
        type NoBracket3 = HasCharacters<Without, ["[", "]", "*"]>;

        type cases = [
            Expect<Test<HasBracket1, "equals",  true>>,
            Expect<Test<HasBracket2, "equals",  true>>,
            Expect<Test<HasBracket2b, "equals",  true>>,
            Expect<Test<HasBracket3, "equals",  true>>,

            Expect<Test<NoBracket1, "equals",  false>>,
            Expect<Test<NoBracket2, "equals",  false>>,
            Expect<Test<NoBracket3, "equals",  false>>,
        ];
        const cases: cases = [
            true, true, true, true,
            true, true, true
        ];
    });

    it("Tuple for character patterns", () => {
        type With = HasCharacters<"hi", ["h", "i"]>;
        type Without = HasCharacters<"42", ["h", "i"]>;

        type cases = [
            Expect<Test<With, "equals", true>>,
            Expect<Test<Without, "equals", false>>
        ];

    });

    it("Union type for characters", () => {
        type With = HasCharacters<"hi", "h" | "i">;
        type Without = HasCharacters<"42", "h" | "i">;

        type cases = [
            Expect<Test<With, "equals", true>>,
            Expect<Test<Without, "equals", false>>
        ];

    });

});

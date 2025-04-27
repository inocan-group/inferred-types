import { describe, it } from "vitest";
import { Expect, AsOutputToken, Extends, Test } from "inferred-types/types"



describe("TypeToken<T>", () => {

    it("happy path", () => {
        type Str = AsOutputToken<"string">;
        type StrSet = AsOutputToken<"string-set">;

        // @ts-ignore
        type cases = [
            Expect<Test<
                Str, "equals", "<<string>>" | `<<string::${string}>>`
            >>,
            Expect<Test<
                "<<string-set::militaryTime>>", "extends", StrSet
            >>,
        ];
    });

});

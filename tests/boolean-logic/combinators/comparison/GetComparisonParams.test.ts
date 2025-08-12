import { describe, it } from "vitest";
import {
    Expect,
    Test,
    GetComparisonParams
} from "inferred-types/types";

describe("GetComparisonParams<TOp>", () => {

    it("first test", () => {
        type Extends = GetComparisonParams<"extends">;
        type StartsWith = GetComparisonParams<"startsWith">;
        type EndsWithNumber = GetComparisonParams<"endsWithNumber">;

        type cases = [
            Expect<Test<Extends, "equals", readonly [unknown, ...unknown[]]>>,
            Expect<Test<StartsWith, "equals", readonly [string|number, ...(string|number)[]]>>,
            Expect<Test<EndsWithNumber, "equals", []>>,
        ];
    });

});

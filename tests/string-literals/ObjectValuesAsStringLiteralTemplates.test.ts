import { Equal, Expect } from "@type-challenges/utils";
import { ObjectValuesAsStringLiteralTemplate, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("Name", () => {

    it("happy path", () => {
        type Obj = ObjectValuesAsStringLiteralTemplate<{
            str: "Foo{{string}}",
            num: "{{number}} x {{number}}"
        }>;


        type cases = [
            Expect<Test<
                Obj,
                "equals",
                {
                    str: `Foo${string}`,
                    num: `${number} x ${number}`
                }>>,

        ];
    });

});

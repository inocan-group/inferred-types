import { describe, it } from "vitest";
import {
    Expect,
    TemplateParams,
    Test,
} from "inferred-types/types";

describe("TemplateBlocks<T>", () => {

    it("happy path", () => {
        type T1 = TemplateParams<"Hi {{string}}, you're age is {{number}}">;
        type T2 = TemplateParams<"Age: {{number}}, Name: {{string}}, Accepted: {{boolean}}">;

        type cases = [
            Expect<Test<T1, "equals", [ string, number ]>>,
            Expect<Test<T2, "equals", [ number, string, boolean ]>>,
        ];
    });

});

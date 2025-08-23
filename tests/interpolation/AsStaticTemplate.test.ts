import {
    Expect,
    Test,
    AsStaticTemplate,
    TemplateMap__Basic,
    AsLiteralTemplate
} from "inferred-types/types";
import { describe, it } from "vitest";

describe("AsStaticTemplate<T>", () => {

    it("string, number, and boolean", () => {
        type T1 = AsStaticTemplate<`${string}fooBar: ${number}, fooBaz: {{boolean}}`>

        type cases = [
            Expect<Test<T1, "equals", `{{string}}fooBar: {{number}}, fooBaz: {{boolean}}`>>
        ];
    });


    it("using custom vocabulary", () => {
        type Vocab = TemplateMap__Basic & { email: "'{{string}}@{{string}}.{{string}}'", T: `"foo" | "bar"` }
        type T1 = AsStaticTemplate<"${T} was ${number} years old", Vocab>;
        type D1 = AsLiteralTemplate<"{{T}} was {{number}} years old">


        type cases = [
            Expect<Test<T1, "equals", "{{T}} was {{number}} years old">>
        ];
    });


});



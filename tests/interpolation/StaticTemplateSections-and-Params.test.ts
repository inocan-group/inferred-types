import { Equal, Expect } from "@type-challenges/utils";
import { StaticTemplateSections, TemplateParams, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("StaticTemplateSections", () => {

    it("happy path", () => {
        type Template = `Age: {{number}}, Weight: {{number}}, Name: {{string}}, Employed: {{boolean}}`

        type T1 = StaticTemplateSections<Template>;
        type T2 = StaticTemplateSections<Template, true>;
        type T3 = StaticTemplateSections<Template, false>;

        type cases = [
            Expect<Test<T1, ["Age: ", ", Weight: ", ", Name: ", ", "equals",  Employed: "]>>,
            Expect<Equal<
                T2,
                [
                    `Age: ${number}`,
                    `, Weight: ${number}`,
                    `, Name: ${string}`,
                    `, Employed: true` | `, Employed: false`
                ]
            >>,
            Expect<Equal<
                T3,
                [
                    `Age: {{number}}`,
                    `, Weight: {{number}}`,
                    `, Name: {{string}}`,
                    `, Employed: {{boolean}}`
                ]
            >>
        ];
    });


    it("all template blocks used", () => {
        type Actual = `Age: 42, Weight: 190, Name: Bob, Employed: true`
        type Template = `Age: {{number}}, Weight: {{number}}, Name: {{string}}, Employed: {{boolean}}`

        type Sections = StaticTemplateSections<Template, false>;

        type cases = [
            Expect<Equal<
                Sections,
                ["Age: {{number}}", ", Weight: {{number}}", ", Name: {{string}}", ", Employed: {{boolean}}"]
            >>
        ];
    });


});


describe("TemplateParams", () => {

    it("happy path", () => {
        type Template = `Age: {{number}}, Weight: {{number}}, Name: {{string}}, Employed: {{boolean}}`

        type T1 = TemplateParams<Template>;

        type cases = [
            Expect<Test<T1, [number, number, string, "equals",  boolean]>>,
        ];
    });

});

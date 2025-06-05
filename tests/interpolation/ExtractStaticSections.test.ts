import { } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { ExtractTemplateSections, Split, StaticTemplateSections, TemplateBlock } from "inferred-types/types";

describe("StaticTemplateSections", () => {
    type T1 = StaticTemplateSections<
        `Age: {{number}}, Weight: {{number}}, Name: {{string}}`
    >
})


describe("ExtractStaticSections", () => {
    type T1 = ExtractTemplateSections<
        `Age: {{number}}, Weight: {{number}}, Name: {{string}}`
    >;

  it("first test", () => {


    type cases = [
      /** type tests */
    ];
  });

});


type X = Split<
    `Age: {{number}}, Weight: {{number}}, Name: {{string}}`,
    TemplateBlock
>

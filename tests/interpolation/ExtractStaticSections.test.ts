import { } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { ExtractStaticSections, StaticTemplateSections } from "inferred-types/types";

describe("StaticTemplateSections", () => {
    type T1 = StaticTemplateSections<
        `Age: {{number}}, Weight: {{number}}, Name: {{string}}`
    >
})


describe("ExtractStaticSections", () => {
    type T1 = ExtractStaticSections<
        `Age: 15, Weight: 120, Name: Bob`,
        `Age: {{number}}, Weight: {{number}}, Name: {{string}}`
    >;

  it("first test", () => {


    type cases = [
      /** type tests */
    ];
  });

});

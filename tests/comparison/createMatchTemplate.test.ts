import { } from "@type-challenges/utils";
import { createMatchTemplate } from "inferred-types/runtime";
import { describe, it } from "vitest";

describe("createMatchTemplate()", () => {

  it("partial", () => {
    const templSolo = createMatchTemplate(`Name: {{string}}`);

    type cases = [
      /** type tests */
    ];
  });

});

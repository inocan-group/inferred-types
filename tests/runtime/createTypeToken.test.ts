import { } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { createTypeToken } from "inferred-types/runtime";

describe("createTypeToken()", () => {

  it.skip("happy path", () => {
    const unDef = createTypeToken("undefined");

    const str = createTypeToken("string");
    const lit = createTypeToken("string").literal();




    // @ts-ignore
    type cases = [
      /** type tests */
    ];
  });

});

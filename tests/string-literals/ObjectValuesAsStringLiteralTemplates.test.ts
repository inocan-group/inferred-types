import { Equal, Expect } from "@type-challenges/utils";
import { ObjectValuesAsStringLiteralTemplate } from "inferred-types/types";
import { describe, it } from "vitest";

describe("Name", () => {

  it("happy path", () => {
      type Obj = ObjectValuesAsStringLiteralTemplate<{
        str: "Foo{{string}}",
        num: "{{number}} x {{number}}"
      }>;


      type cases = [
          Expect<Equal<Obj, {
            str: `Foo${string}`,
            num: `${number} x ${number}`
          }>>,

      ];
    });

});

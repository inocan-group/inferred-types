import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { fromDefineObject } from "inferred-types/runtime"
import { Test } from "inferred-types/types";



describe("fromDefineObject", () => {

  it("type tests", () => {
    const foo = fromDefineObject({ foo: "number(1,2,3)" });

    // @ts-ignore
    type cases = [
      Expect<Test<typeof foo, "equals",  { foo: 1 | 2 | 3} >>,
    ];
  });


});

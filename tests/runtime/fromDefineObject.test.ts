
import { describe, it } from "vitest";
import { fromDefineObject } from "inferred-types/runtime"
import { Expect, Test } from "inferred-types/types";



describe("fromDefineObject", () => {

  it("type tests", () => {
    const foo = fromDefineObject({ foo: "Number(1) | Number(2) | Number(3)")" });

    // @ts-ignore
    type cases = [
      Expect<Test<typeof foo, "equals",  { foo: 1 | 2 | 3} >>,
    ];
  });


});

import { describe, it } from "vitest";
import { objectValues } from "inferred-types/runtime";
import { Expect, Test } from "inferred-types/types";



describe("objectValues", () => {

  it("happy path", () => {
    const fooBar = objectValues({foo: 1, bar: 42});

    // @ts-ignore
    type cases = [
      Expect<Test<typeof fooBar, "equals", [1, 42]>>
    ];
  });

});

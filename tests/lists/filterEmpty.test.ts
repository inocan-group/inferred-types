import { describe, expect, it } from "vitest";
import { filterEmpty, isEmpty } from "inferred-types/runtime";
import { Expect, Test } from "inferred-types/types";



describe("filterEmpty", () => {

  it("happy path", () => {
    const t1 = filterEmpty(1,2,undefined,"foo" as string, "")

    expect(isEmpty(undefined)).toBe(true);
    expect(t1).toEqual([1,2,"foo"]);

    type cases = [
      Expect<Test<typeof t1, "equals", [1,2, string]>>
    ];
  });

});

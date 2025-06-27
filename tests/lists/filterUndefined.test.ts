import { describe, expect, it } from "vitest";
import { filterUndefined, isDefined } from "inferred-types/runtime";
import type { Expect, Test } from "inferred-types/types";

describe("filterUndefined", () => {

  it("happy path", () => {
    const t1 = filterUndefined(1, 2, undefined, "foo" as string, "")

    expect(isDefined(undefined)).toBe(false);
    expect(t1).toEqual([1, 2, "foo", ""]);

    type cases = [
      Expect<Test<typeof t1, "equals",  [1, 2, string, ""]>>
    ];
  });

});

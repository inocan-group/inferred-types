import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { filterUndefined, isDefined, isEmpty } from "inferred-types/runtime";

describe("filterUndefined", () => {

  it("happy path", () => {
    const t1 = filterUndefined(1, 2, undefined, "foo" as string, "")

    expect(isDefined(undefined)).toBe(false);
    expect(t1).toEqual([1, 2, "foo", ""]);

    type cases = [
      Expect<Equal<typeof t1, [1, 2, string, ""]>>
    ];
  });

});

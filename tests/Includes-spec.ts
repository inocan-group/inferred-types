import type { Includes } from "../src/types";
import type { ExpectTrue, ExpectFalse } from "@type-challenges/utils";

describe("Includes type check", () => {
  it("Includes tests whether string is contained within the string array", () => {
    type cases = [
      ExpectTrue<Includes<["foo", "bar", "baz"], "foo">>,
      ExpectFalse<Includes<["foo", "bar", "baz"], "nada">>
    ];
    const typeTests: cases = [true, false];
    expect(typeTests).toBe(typeTests);
  });
});

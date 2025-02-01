import { Equal, Expect } from "@type-challenges/utils";
import { toJSON } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";

describe("toJSON()", () => {

  it("scalar values", () => {

    const foo = toJSON("foo");
    const num = toJSON(42);
    const numLike = toJSON("42");

    expect(foo).toBe("\"foo\"");
    expect(num).toBe("42");
    expect(numLike).toBe(`\"42\"`)

    type cases = [
      Expect<Equal<typeof foo, `"foo"`>>,
      Expect<Equal<typeof num, `42`>>,
      Expect<Equal<typeof numLike, `"42"`>>,
    ];
  });

});

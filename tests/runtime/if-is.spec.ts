import { describe, it } from "vitest";

import type { Expect, Equal } from "@type-challenges/utils";
import { ifString } from "src/utility";

describe("runtime if/is", () => {
  it("ifString(v,i,e)", () => {
    const t = ifString("foo", 42, false);
    const f = ifString(-1, "yikes", 42);

    type cases = [
      Expect<Equal<typeof t, 42>>, //
      Expect<Equal<typeof f, 42>> //
    ];
    const cases: cases = [true, true];
  });
});

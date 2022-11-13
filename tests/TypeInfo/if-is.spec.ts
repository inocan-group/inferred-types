import { describe, it } from "vitest";

import type { Expect, Equal } from "@type-challenges/utils";
import { ifBoolean, ifNumber, ifString, ifTrue, ifUndefined } from "src/runtime/type-checks";

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

  it("ifNumber(v,i,e)", () => {
    const t = ifNumber(42, 42, false);
    const f = ifNumber("foo", "yikes", 42);

    type cases = [
      Expect<Equal<typeof t, 42>>, //
      Expect<Equal<typeof f, 42>> //
    ];
    const cases: cases = [true, true];
  });

  it("ifBoolean(v,i,e)", () => {
    const t = ifBoolean(false, 42, false);
    const f = ifBoolean(undefined, "yikes", 42);

    type cases = [
      Expect<Equal<typeof t, 42>>, //
      Expect<Equal<typeof f, 42>> //
    ];
    const cases: cases = [true, true];
  });

  it("ifTrue(v,i,e)", () => {
    const t = ifTrue(true as true, 42, false);
    const f = ifTrue(false, "yikes", 42);
    const f2 = ifTrue(true as boolean, "yikes", 42);

    type cases = [
      Expect<Equal<typeof t, 42>>, //
      Expect<Equal<typeof f, 42>>, //
      Expect<Equal<typeof f2, 42>> //
    ];
    const cases: cases = [true, true, true];
  });

  it("ifUndefined(v,i,e)", () => {
    const t = ifUndefined(undefined, 42, false);
    const f = ifUndefined(false, "yikes", 42);
    const f2 = ifUndefined("", "yikes", 42);

    type cases = [
      Expect<Equal<typeof t, 42>>, //
      Expect<Equal<typeof f, 42>>, //
      Expect<Equal<typeof f2, 42>> //
    ];
    const cases: cases = [true, true, true];
  });
});

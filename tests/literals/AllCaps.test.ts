import { describe, it, expect } from "vitest";

import { Equal, Expect } from "@type-challenges/utils";
import { AllCaps } from "inferred-types";

describe("AllCaps<T> type utility", () => {
  it("finds AllCaps where it exists", () => {
    type T1 = AllCaps<"YUP">;
    type T2 = AllCaps<"YUP ">;
    type T3 = AllCaps<"YUP YUP YESSSSSSSSSSSSSS">;

    type cases = [
      Expect<Equal<T1, "YUP">>,
      Expect<Equal<T2, "YUP ">>,
      Expect<Equal<T3, "YUP YUP YESSSSSSSSSSSSSS">>
    ];
    const c: cases = [true, true, true];
    expect(c).toBe(c);
  });

  it("correctly identifies the absence of AllCaps", () => {
    type T1 = AllCaps<"Nope">;
    type T2 = AllCaps<"  noo nooo noooooooooooooo">;

    type cases = [
      Expect<Equal<T1, "NOPE">>,
      Expect<Equal<T2, "  NOO NOOO NOOOOOOOOOOOOOO">>
    ];
    const c: cases = [true, true];
    expect(c).toBe(c);
  });

  it("when passed a non literal string, returns string", () => {
    type T1 = AllCaps<string>;

    type cases = [Expect<Equal<T1, string>>];
    const c: cases = [true];
    expect(c).toBe(c);
  });
});

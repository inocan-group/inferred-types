import { describe, it } from "vitest";
import { Expect, Equal } from "@type-challenges/utils";
import { Alpha } from "src/types/alphabetic";

describe("alpha-characters", () => {
  it("Alpha", () => {
    const a: Alpha = "a" as const;
    type A = typeof a;
    const abc: `${Alpha}${Alpha}` = "Ab" as const;
    type ABC = typeof abc;
  });
});

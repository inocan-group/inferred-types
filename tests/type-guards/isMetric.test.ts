import { } from "@type-challenges/utils";
import { isMetric } from "inferred-types";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("isMetric()", () => {

  it("happy path", () => {
    const m1 = "100mph" as string;
    const m2 = "7km";
    const m3 = "7 km";

    const f1 = "100";
    const f2 = 100;
    const f3 = "100uuu"

    expect(isMetric(m1)).toBe(true);
    expect(isMetric(m2)).toBe(true);
    expect(isMetric(m3)).toBe(true);

    expect(isMetric(f1)).toBe(false);
    expect(isMetric(f2)).toBe(false);
    expect(isMetric(f3)).toBe(false);
  });

});

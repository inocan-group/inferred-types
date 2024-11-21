import { isIsoDateTime } from "inferred-types";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("isIsoDateTime() type guard", () => {

  it("happy path", () => {
    const t = "2024-12-25T01:15"
    const t1 = isIsoDateTime(t);
    const t2 = isIsoDateTime(`${t}:45`);
    const t3 = isIsoDateTime(`${t}:45Z`);
    const t4 = isIsoDateTime(`${t}:45Z+8`);
    const t5 = isIsoDateTime(`${t}:45.001Z+8`);


    expect(t1).toBe(true);
    expect(t2).toBe(true);
    expect(t3).toBe(true);
    expect(t4).toBe(true);
    expect(t5).toBe(true);

    const f1 = isIsoDateTime(`${t}:45.001Z+`);
    const f2 = isIsoDateTime(`${t}:45.001Z8`);

    expect(f1).toBe(false);
    expect(f2).toBe(false);

  });

});

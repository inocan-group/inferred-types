import { Equal, Expect } from "@type-challenges/utils";
import {  isIsoExplicitDate, isIsoImplicitDate } from "inferred-types";
import { Iso8601Date } from "inferred-types/types"
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("isIsoDate()", () => {

  it("explicit", () => {
    const d = "1984-12-12" as string;
    const t1 = isIsoExplicitDate(d);
    const t2 = isIsoExplicitDate("1984-01-28");
    const t3 = isIsoExplicitDate("0000-01-01");
    const t4 = isIsoExplicitDate("9999-12-31");

    const f1 = isIsoExplicitDate("19840128");
    const f2 = isIsoExplicitDate("1984-22-22");

    expect(t1).toBe(true);
    expect(t2).toBe(true);
    expect(t3).toBe(true);
    expect(t4).toBe(true);

    expect(f1).toBe(false);
    expect(f2).toBe(false);

    if (isIsoExplicitDate(d)) {
      type D = typeof d;

      // @ts-ignore
      type cases = [
        Expect<Equal<D, Iso8601Date<"explicit">>>
      ];
    }
  });

  it("implicit", () => {
    const d = "19841212" as string;
    const t1 = isIsoImplicitDate(d);
    const t2 = isIsoImplicitDate("19840101");
    const t3 = isIsoImplicitDate("00000101");
    const t4 = isIsoImplicitDate("99991231");

    expect(t1).toBe(true);
    expect(t2).toBe(true);
    expect(t3).toBe(true);
    expect(t4).toBe(true);

    const f1 = isIsoImplicitDate("1984-01-28");
    const f2 = isIsoImplicitDate("1984-22-22");

    expect(f1).toBe(false);
    expect(f2).toBe(false);

    if (isIsoImplicitDate(d)) {
      type D = typeof d;

      // @ts-ignore
      type cases = [
        Expect<Equal<D, Iso8601Date<"implicit">>>
      ];
    }
  });

});

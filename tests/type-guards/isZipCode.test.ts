import { describe, expect, it } from "vitest";
import { isZipCode, isZipCode5, isZipPlus4 } from "inferred-types/runtime";
import type { Expect, Test, Zip5, ZipCode, ZipPlus4 } from "inferred-types/types";

describe("isZipCode()", () => {

  it("zip5", () => {
    const zc = "06250" as string;
    const t1 = isZipCode(zc);
    const t2 = isZipCode("90291");

    expect(t1).toBe(true);
    expect(t2).toBe(true);

    if (isZipCode(zc)) {
      type T = typeof zc;

      type cases = [
        Expect<Test<T, "equals",  ZipCode>>,
      ];
    }
  });

  it("zip5plus4", () => {
    const zc = "06250-1245" as string;
    const t1 = isZipCode(zc);
    const t2 = isZipCode("90291-3106");

    expect(t1).toBe(true);
    expect(t2).toBe(true);

    if (isZipCode(zc)) {
      type T = typeof zc;

      type cases = [
        Expect<Test<T, "equals",  ZipCode>>,
      ];
    }
  });

});

describe("isZipCode5", () => {
  it("happy path", () => {
    const zc = "06250" as string;
    const t1 = isZipCode5(zc);
    const t2 = isZipCode5("90291");
    const zc2 = "06250-1245" as string;
    const f1 = isZipCode5(zc2);
    const f2 = isZipCode5("90291-3106");

    expect(t1).toBe(true);
    expect(t2).toBe(true);
    expect(f1).toBe(false);
    expect(f2).toBe(false);

    if (isZipCode5(zc)) {
      type T = typeof zc;

      type cases = [
        Expect<Test<T, "equals",  Zip5>>,
      ];
    }
  });
})

describe("isZipPlus4", () => {
  it("happy path", () => {
    const zc2 = "06250-1245" as string;
    const t1 = isZipPlus4(zc2);
    const t2 = isZipPlus4("90291-3106");
    const zc = "06250" as string;
    const f1 = isZipPlus4(zc);
    const f2 = isZipPlus4("90291");

    expect(t1).toBe(true);
    expect(t2).toBe(true);
    expect(f1).toBe(false);
    expect(f2).toBe(false);

    if (isZipPlus4(zc2)) {
      type T = typeof zc2;

      type cases = [
        Expect<Test<T, "equals",  ZipPlus4>>,
      ];
    }
  });
})

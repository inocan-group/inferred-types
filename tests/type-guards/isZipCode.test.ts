import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { isZipCode, isZipCode5, isZipPlus4 } from "src/runtime/index";
import { Zip5, ZipCode, ZipPlus4 } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("isZipCode()", () => {

  it("zip5", () => {
    const zc = "06250" as string;
    const t1 = isZipCode(zc);
    const t2 = isZipCode("90291");

    expect(t1).toBe(true);
    expect(t2).toBe(true);

    if(isZipCode(zc)) {
      type T = typeof zc;
      // @ts-ignore
      type cases = [
        Expect<Equal<T, ZipCode>>,
      ];
    }
  });


  it("zip5plus4", () => {
    const zc = "06250-1245" as string;
    const t1 = isZipCode(zc);
    const t2 = isZipCode("90291-3106");

    expect(t1).toBe(true);
    expect(t2).toBe(true);

    if(isZipCode(zc)) {
      type T = typeof zc;
      // @ts-ignore
      type cases = [
        Expect<Equal<T, ZipCode>>,
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

    if(isZipCode5(zc)) {
      type T = typeof zc;
      // @ts-ignore
      type cases = [
        Expect<Equal<T, Zip5>>,
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

    if(isZipPlus4(zc2)) {
      type T = typeof zc2;
      // @ts-ignore
      type cases = [
        Expect<Equal<T, ZipPlus4>>,
      ];
    }
  });
})

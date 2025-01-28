import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { asTemplate } from "inferred-types/runtime";
import { Csv, Integer, Iso8601DateRepresentation } from "inferred-types/types";


// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("asTemplate()", () => {

  it("Integer interpolation", () => {
    const integer = `I'm a little {{integer}}`;
    const t_integer = asTemplate(integer);
    type Int = typeof t_integer;

    expect(t_integer).toEqual(integer);

    type cases = [
      Expect<Equal<Int, `I'm a little ${Integer}`>>
    ];
  });

  it("Date interpolation", () => {
    const date = `I'm a little {{date}}`;
    const t_date = asTemplate(date);
    type D = typeof t_date;

    expect(t_date).toEqual(date);

    type cases = [
      Expect<Equal<D, `I'm a little ${Iso8601DateRepresentation}`>>
    ];
  });

  it("CSV interpolation", () => {
    const csv = `I'm a little {{csv}}`;
    const t_csv = asTemplate(csv);
    type D = typeof t_csv;

    expect(t_csv).toEqual(csv);

    type cases = [
      Expect<Equal<D, `I'm a little ${Csv}`>>
    ];
  });

});

import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { asTemplate } from "inferred-types/runtime";
import { Csv, Integer, Iso8601DateRepresentation } from "inferred-types/types";




describe("asTemplate()", () => {

  it("Integer interpolation", () => {
    const integer = `I'm a little {{integer}}`;
    const t_integer = asTemplate(integer);
    type Int = typeof t_integer;

    expect(t_integer).toEqual(integer);

    type cases = [
      Expect<Test<Int, "equals",  `I'm a little ${Integer}`>>
    ];
  });

  it("Date interpolation", () => {
    const date = `I'm a little {{date}}`;
    const t_date = asTemplate(date);
    type D = typeof t_date;

    expect(t_date).toEqual(date);

    type cases = [
      Expect<Test<D, "equals",  `I'm a little ${Iso8601DateRepresentation}`>>
    ];
  });

  it("CSV interpolation", () => {
    const csv = `I'm a little {{csv}}`;
    const t_csv = asTemplate(csv);
    type D = typeof t_csv;

    expect(t_csv).toEqual(csv);

    type cases = [
      Expect<Test<D, "equals",  `I'm a little ${Csv}`>>
    ];
  });

});

import { describe, it, expect } from "vitest";
import { asDate } from "inferred-types/runtime";

describe("asDate()", () => {

  it("iso date to JS date", () => {
    const iso1 = "2024-01-15";
    const js1 = asDate(iso1);

    expect(js1).toBeInstanceOf(Date);
    expect(js1?.toISOString().split("T")[0]).toBe("2024-01-15")

    const iso2 = "2023-01-01";
    const js2 = asDate(iso2);

    expect(js2).toBeInstanceOf(Date);
    expect(js2?.toISOString().split("T")[0]).toBe("2023-01-01")

  });

  it("comparison of ISO date and JS date", () => {
    const iso = asDate("2024-01-15");
    const js = new Date(2024, 0, 15);
    js.setHours(0, 0, 0, 0);

    expect(iso?.toISOString()).toBe(js.toISOString());
  });

});

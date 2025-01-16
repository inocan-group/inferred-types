import { Equal, Expect } from "@type-challenges/utils";
import { isMetricCategory, isSpeedMetric, isSpeedUom, isUomCategory, MetricTypeGuard, UomTypeGuard } from "inferred-types/runtime";
import { Uom, AccelerationUom, SpeedUom, Extends, Metric, Acceleration, Speed } from "inferred-types/types";
import { describe, expect, it } from "vitest";

describe("Uom<T>", () => {

  it("happy path", () => {
    type A = Uom<"Acceleration">;
    type B = Uom<"Speed" | "Acceleration">;

    type cases = [
      Expect<Equal<A, AccelerationUom>>,
      Expect<Extends<B, AccelerationUom | SpeedUom>>,
    ];
  });

});

describe("Metric<T>", () => {

  it("happy path", () => {
    type A = Metric<"Acceleration">;
    type B = Metric<"Speed" | "Acceleration">;

    type cases = [
      Expect<Equal<A, Acceleration>>,
      Expect<Extends<B, Acceleration | Speed>>,
    ];
  });

});

describe("isUomCategory(c)(v)", () => {
  it("happy path", () => {
    const isSpeed = isUomCategory("Speed");
    const isSpeedOrAccel = isUomCategory("Speed", "Acceleration");

    const t0 = isSpeedUom("mph");
    const t1 = isSpeed("mph");

    expect(isSpeed.categories).toEqual(["Speed"]);
    expect(isSpeedOrAccel.categories).toEqual(["Speed", "Acceleration"]);
    expect(t0).toBe(true);
    expect(t1).toBe(true);

    type cases = [
      Expect<Equal<typeof isSpeed, UomTypeGuard<["Speed"]>>>,
      Expect<Equal<typeof isSpeedOrAccel, UomTypeGuard<["Speed", "Acceleration"]>>>,
    ];
  });
});

describe("isMetricCategory(c)(v)", () => {
  it("happy path", () => {
    const isSpeed = isMetricCategory("Speed");
    const isSpeedOrAccel = isMetricCategory("Speed", "Acceleration");

    expect(isSpeed.categories).toEqual(["Speed"]);
    expect(isSpeedOrAccel.categories).toEqual(["Speed", "Acceleration"]);

    const t0 = isSpeedMetric("10 mph");
    const t1 = isSpeed("10 mph");
    const t2 = isSpeed("10mph");
    const f1 = isSpeed("10 lbs");
    const f2 = isSpeed("mph");

    expect(t0).toBe(true);
    expect(t1).toBe(true);
    expect(t2).toBe(true);

    expect(f1).toBe(false);
    expect(f2).toBe(false);

    type cases = [
      Expect<Equal<typeof isSpeed, MetricTypeGuard<["Speed"]>>>,
      Expect<Equal<typeof isSpeedOrAccel, MetricTypeGuard<["Speed", "Acceleration"]>>>,
    ];
  });
});

import { Equal, Expect } from "@type-challenges/utils";
import { isSpeedUom, isUomCategory } from "inferred-types/runtime";
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

    expect(t0).toBe(true);
    expect(t1).toBe(true);


  });

});

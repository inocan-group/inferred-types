import { Equal, Expect } from "@type-challenges/utils";
import { Uom, AccelerationUom, SpeedUom, Extends, Metric, Acceleration, Speed } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Uom<T>", () => {

  it("happy path", () => {
    type A = Uom<"Acceleration">;
    type B = Uom<"Speed" | "Acceleration">;

    // @ts-ignore
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

    // @ts-ignore
    type cases = [
      Expect<Equal<A, Acceleration>>,
      Expect<Extends<B, Acceleration | Speed>>,
    ];
  });

});

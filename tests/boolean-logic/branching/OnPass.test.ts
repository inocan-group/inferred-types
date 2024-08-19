import { Equal, Expect } from "@type-challenges/utils";
import { ErrorCondition, OnPass } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("OnPass<TTest,TPass", () => {

  it("Happy Path", () => {
    type P1 = OnPass<true, "pass">;
    type P2 = OnPass<[], "pass">;
    type P3 = OnPass<42, "pass">;

    type FF = OnPass<false, "pass">;
    type FN = OnPass<never, "pass">;
    type FE = OnPass<ErrorCondition<"bad-juju">, "pass">;

    type Mapper = { false: "mapped"; never: "mapped"; error: "mapped" };

    type RF = OnPass<false, "mapped", Mapper>;
    type RE = OnPass<ErrorCondition, "mapped", { error: "mapped" }>;


    type cases = [
      Expect<Equal<P1, "pass">>,
      Expect<Equal<P2, "pass">>,
      Expect<Equal<P3, "pass">>,

      Expect<Equal<FF, false>>,
      Expect<Equal<FN, never>>,
      Expect<Equal<FE, ErrorCondition<"bad-juju">>>,

      Expect<Equal<RF, "mapped">>,
      Expect<Equal<RE, "mapped">>,
    ];
    const cases: cases = [
      true, true, true,
      true, true, true,
      true, true
    ];
  });

});

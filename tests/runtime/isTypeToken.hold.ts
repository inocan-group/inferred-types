import { Expect, Test } from "inferred-types/types";
import { isTypeToken } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";



describe("isTypeToken(token, kind)", () => {

  it("happy path", () => {
    const token = "<<null>>";
    const variant: string = "<<fn::[any]::[string]>>";
    const t1 = isTypeToken(token);
    const t2 = isTypeToken(token, "null");
    const t3 = isTypeToken(variant);
    const t4 = isTypeToken(variant, "fn");

    expect(t1).toBe(true);
    expect(t2).toBe(true);
    expect(t3).toBe(true);
    expect(t4).toBe(true);

    if (isTypeToken(variant, "fn")) {
      type V = typeof variant;

      // @ts-ignore
      type cases = [
        Expect<Test<`<<fn>>`, "extends", V>>,
        Expect<Test<`<<fn::[${string}]>>`, "extends", V>>,
        Expect<Test<`<<fn::[${string}]::${string}>>`, "extends", V>>,
        Expect<Test<`<<fn::any::${string}>>`, "extends", V>>,
      ];
    }

  });

});

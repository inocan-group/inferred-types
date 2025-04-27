import { Expect } from "@type-challenges/utils";
import { DoesExtend } from "inferred-types/types";
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
        Expect<DoesExtend<`<<fn>>`, V>>,
        Expect<DoesExtend<`<<fn::[${string}]>>`, V>>,
        Expect<DoesExtend<`<<fn::[${string}]::${string}>>`, V>>,
        Expect<DoesExtend<`<<fn::any::${string}>>`, V>>,
      ];
    }

  });

});

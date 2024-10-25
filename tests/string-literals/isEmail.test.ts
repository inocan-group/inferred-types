import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { isEmail} from "src/runtime/index"
import { Email } from "src/types/index"

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("isEmail(val)", () => {

  it("happy path", () => {
    const bob = "bob@builder.com" as string;

    const t1 = isEmail(bob);
    const t2 = isEmail("bob-joe-paul@work.builder.com");

    expect(t1).toBe(true);
    expect(t2).toBe(true);

    const f1 = isEmail("bob@builder");
    const f2 = isEmail("bob@builder.b");

    expect(f1).toBe(false);
    expect(f2).toBe(false);

    if (isEmail(bob)) {
      type Bob = typeof bob;

      // @ts-ignore
      type cases = [
        Expect<Equal<Bob, Email>>
      ];
    }

  });

});

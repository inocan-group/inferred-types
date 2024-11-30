import { Equal, Expect } from "@type-challenges/utils";
import { TwModifiers } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("TwModifiers<T>", () => {

  it("happy path", () => {
    type None = TwModifiers<"bg-green-500">;
    type One = TwModifiers<"dark:bg-green-500">;
    type Two = TwModifiers<"sm:dark:bg-green-500">;
    type Three = TwModifiers<"sm:active:dark:bg-green-500">;

    // @ts-ignore
    type cases = [
      Expect<Equal<None, "">>,
      Expect<Equal<One, "dark:">>,
      Expect<Equal<Two, "sm:dark:">>,
      Expect<Equal<Three, "sm:active:dark:">>,

    ];
  });

});

import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { createCssKeyframe } from "inferred-types/runtime";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("createCssKeyframe()", () => {

  it("happy path", () => {

    const kf = createCssKeyframe(
      "scroll-show",
      f => f
        .add("from", { opacity: "0", transform: "rotate(0deg)" })
        .add("to", { opacity: "1", transform: "rotate(360deg)"})
    );

    type KF = typeof kf;

    expect(kf.name).toBe("scroll-show")

    // @ts-ignore
    type cases = [
      Expect<Equal<KF["name"], "scroll-show">>,
      Expect<Equal<KF["css"], `@keyframes scroll-show {${string}}`>>,
    ];
  });

});

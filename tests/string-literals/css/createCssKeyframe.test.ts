import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { createCssKeyframe } from "inferred-types/runtime";


describe("createCssKeyframe()", () => {

  it("happy path", () => {

    const kf = createCssKeyframe(
      "scroll-show",
      f => f
        .add("from", { opacity: "0", transform: "rotate(0deg)" })
        .add("to", { opacity: "1", transform: "rotate(360deg)" })
    );

    type KF = typeof kf;

    expect(kf.name).toBe("scroll-show");
    expect(kf.keyframes, `Fn: ${String(kf.keyframes)}`).toEqual([
      ["from", { opacity: "0", transform: "rotate(0deg)" }],
      ["to", { opacity: "1", transform: "rotate(360deg)" }]
    ]);
    expect(kf.css).toBe(`@keyframes scroll-show {
  from { opacity: 0; transform: rotate(0deg) }
  to { opacity: 1; transform: rotate(360deg) }
}`)


    // @ts-ignore
    type cases = [
      Expect<Test<KF["name"], "equals",  "scroll-show">>,
      Expect<Equal<KF["keyframes"], readonly [
        ["from", {
          opacity: "0";
          transform: "rotate(0deg)";
        }],
        ["to", {
          opacity: "1";
          transform: "rotate(360deg)";
        }]
      ]>>,
      Expect<Test<KF["css"], "equals",  `@keyframes scroll-show {\n  from { opacity: 0; transform: rotate(0deg) }\n  to { opacity: 1; transform: rotate(360deg) }\n}`>>,
    ];
  });

});



import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { Truncate } from "@inferred-types/types";
import { truncate } from "src/runtime/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Truncate<T>", () => {

  it("happy path for truncating strings", () => {
    type NoTrunc = Truncate<"Foobar", 10>;
    type Trunc = Truncate<"Foobar", 3>;
    type TruncWithEllipsis = Truncate<"Foobar", 3, true>;
    type CustomEllipsis = Truncate<"Foobar", 3, "... more">;

    type cases = [
      Expect<Equal<NoTrunc, "Foobar">>,
      Expect<Equal<Trunc, "Foo">>,
      Expect<Equal<TruncWithEllipsis, "Foo...">>,
      Expect<Equal<CustomEllipsis, "Foo... more">>,
    ];
    const cases: cases = [ true, true, true, true ];
  });

});

describe("truncate()", () => {

  it("Happy Path", () => {
    const noTrunc = truncate("Foobar", 10);
    const trunc = truncate("Foobar", 3);
    const truncWithEllipsis = truncate("Foobar", 3, true);
    const customEllipsis = truncate("Foobar", 3, "... more");

    expect(noTrunc).toEqual("Foobar");
    expect(trunc).toEqual("Foo");
    expect(truncWithEllipsis).toEqual("Foo...");
    expect(customEllipsis).toEqual("Foo... more");

  });

});

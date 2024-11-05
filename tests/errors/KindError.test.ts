import { Equal, Expect,  } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { kindError } from "inferred-types";
import {   KindError, KindErrorDefn } from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("KindError", () => {

  it("happy path", () => {
    const FooBarErr = kindError("foo-bar");
    const FooBar = FooBarErr("oh my!");

    type cases = [
      Expect<Equal<
        typeof FooBarErr,
        KindErrorDefn<"foo-bar">
      >>,
      Expect<Equal<typeof FooBar, KindError<"foo-bar", {}>>>,
      Expect<Equal<typeof FooBar["kind"], "foo-bar">>,
      Expect<Equal<typeof FooBar["name"], "FooBar">>,
    ];
    const cases: cases = [
      true, true, true, true
    ];
  });

});

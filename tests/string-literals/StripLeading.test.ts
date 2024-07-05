;import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import {StripLeading} from "src/types/index";
import { stripLeading } from "src/runtime/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("StripLeading<TStr,TRemove>", () => {

  it("Happy Path", () => {
    type World = StripLeading<"HelloWorld", "Hello">;
    type Missing = StripLeading<"World", "Hello">;

    type cases = [
      Expect<Equal<World, "World">>,
      Expect<Equal<Missing, "World">>,
    ];
    const cases: cases = [ true, true ];
  });

});


describe("stripLeading(content, remove)", () => {

  it("happy path", () => {
    const bar = stripLeading("foobar","foo");
    const foo = stripLeading("foofoo","foo");
    const no_change = stripLeading("foobar", "baz");

    expect(bar).toBe("bar");
    expect(foo).toBe("foo");
    expect(no_change).toBe("foobar");

    type cases = [
      Expect<Equal<typeof bar, "bar">>,
      Expect<Equal<typeof foo, "foo">>,
      Expect<Equal<typeof no_change, "foobar">>,

    ];
    const cases: cases = [ true, true, true ];
  });


  // I removed this capability until I can get all perf issues sorted
  it("with multiple strip sequences", () => {
    const bar = stripLeading("foobar", "foo", "baz");
    const bar2 = stripLeading("foobar", "baz", "foo");


    expect(bar).toBe("bar");
    expect(bar2).toBe("bar");

    type cases = [
      Expect<Equal<typeof bar, "bar">>,
      Expect<Equal<typeof bar2, "bar">>,
    ];
    const cases: cases = [
      true, true
    ];

  });


});

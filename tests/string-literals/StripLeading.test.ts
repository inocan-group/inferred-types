import { describe, expect, it } from "vitest";
import type { Expect, StripLeading, Test } from "inferred-types/types";

import { stripLeading } from "inferred-types/runtime";

describe("StripLeading<TStr,TRemove>", () => {

  it("Happy Path", () => {
    type World = StripLeading<"HelloWorld", "Hello">;
    type Missing = StripLeading<"World", "Hello">;

    type cases = [
      Expect<Test<World, "equals",  "World">>,
      Expect<Test<Missing, "equals",  "World">>,
    ];
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
      Expect<Test<typeof bar, "equals",  "bar">>,
      Expect<Test<typeof foo, "equals",  "foo">>,
      Expect<Test<typeof no_change, "equals",  "foobar">>,

    ];
  });

  // I removed this capability until I can get all perf issues sorted
  it("with multiple strip sequences", () => {
    const bar = stripLeading("foobar", "foo", "baz");
    const bar2 = stripLeading("foobar", "baz", "foo");

    expect(bar).toBe("bar");
    expect(bar2).toBe("bar");

    type cases = [
      Expect<Test<typeof bar, "equals",  "bar">>,
      Expect<Test<typeof bar2, "equals",  "bar">>,
    ];

  });

});

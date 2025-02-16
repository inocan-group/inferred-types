/* eslint-disable ts/ban-types */
import { Equal, Expect } from "@type-challenges/utils";
import { LeftRight, UniqueKeys } from "inferred-types/types";
import { describe, expect, it } from "vitest";
import { uniqueKeys } from "inferred-types/runtime";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("UniqueKeys<A,B>", () => {

  it("happy path", () => {
    type NoOverlap = UniqueKeys<{ foo: 1 }, { bar: 2; baz: 3 }>;
    type Override = UniqueKeys<{ foo: 1 }, { foo: 42; bar: 2; baz: 3 }>;
    type EmptyLeft = UniqueKeys<{}, { bar: 2; baz: 3 }>;
    type EmptyRight = UniqueKeys<{ foo: 1 }, {}>;

    type NumShortLong = UniqueKeys<[1, 2], [1, 2, 3, 4]>;

    type cases = [
      Expect<Equal<NoOverlap, LeftRight<["foo"], ["bar", "baz"]>>>,
      Expect<Equal<Override, LeftRight<[], ["bar", "baz"]>>>,
      Expect<Equal<EmptyLeft, LeftRight<[], ["bar", "baz"]>>>,
      Expect<Equal<EmptyRight, LeftRight<["foo"], []>>>,

      Expect<Equal<NumShortLong, LeftRight<[], [2, 3]>>>,
    ];
    const cases: cases = [
      true, true, true, true,
      true
    ];
  });

});

describe("uniqueKeys(a,b)", () => {

  it("no overlap", () => {
    const noOverlap = uniqueKeys({ foo: 1 }, { bar: 2, baz: 3 });
    expect(noOverlap[0]).toBe("LeftRight");
    expect(noOverlap[1]).toEqual(["foo"]);
    expect(noOverlap[2]).toEqual(["bar", "baz"]);
  });
  it("override", () => {
    const override = uniqueKeys({ foo: 1 }, { foo: 42, bar: 2, baz: 3 });
    expect(override[0]).toBe("LeftRight");
    expect(override[1]).toEqual([]);
    expect(override[2]).toEqual(["bar", "baz"]);
  });

  it("empty left", () => {
    const emptyLeft = uniqueKeys({}, { bar: 2, baz: 3 });
    expect(emptyLeft[0]).toBe("LeftRight");
    expect(emptyLeft[1]).toEqual([]);
    expect(emptyLeft[2]).toEqual(["bar", "baz"]);
  });

  it("empty right", () => {
    const emptyLeft = uniqueKeys({ foo: 1 }, {});
    expect(emptyLeft[0]).toBe("LeftRight");
    expect(emptyLeft[1]).toEqual(["foo"]);
    expect(emptyLeft[2]).toEqual([]);
  });


});

/* eslint-disable @typescript-eslint/ban-types */
import { Equal, Expect } from "@type-challenges/utils";
import { LeftRight, UniqueKeys } from "../../src/types/base";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("UniqueKeys<A,B>", () => {

  it("happy path", () => {
    type NoOverlap = UniqueKeys<{foo: 1}, {bar: 2; baz: 3}>;
    type Override = UniqueKeys<{foo: 1}, {foo:42; bar: 2; baz: 3}>;
    type EmptyLeft = UniqueKeys<{}, { bar: 2; baz: 3}>;
    type EmptyRight = UniqueKeys<{foo: 1}, {}>;

    type NumShortLong = UniqueKeys<[1,2],[1,2,3,4]>;
    
    type cases = [
      Expect<Equal<NoOverlap, LeftRight<["foo"], ["bar", "baz"]>>>,
      Expect<Equal<Override, LeftRight<[], ["bar", "baz"]>>>,
      Expect<Equal<EmptyLeft, LeftRight<[], ["bar", "baz"]>>>,
      Expect<Equal<EmptyRight, LeftRight<["foo"], []>>>,

      Expect<Equal<NumShortLong, LeftRight<[], [2,3]>>>,
    ];
    const cases: cases = [
      true, true, true, true,
      true
    ];
  });

});

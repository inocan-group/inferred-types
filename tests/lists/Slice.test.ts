import { Equal, Expect } from "@type-challenges/utils";
import { Slice } from "inferred-types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Slice<TList, TStart, TEnd>", () => {

  it("slicing a tuple/list", () => {
    type List = [1,2,3,4,5,6,7,8];
    type ListRO = [1,2,3,4,5,6,7,8];

    type LastTwo = Slice<List, -2>;

    type FirstTwo = Slice<List, 0, 2>;
    type FirstThree = Slice<List, 0, 3>;
    type OneToThree = Slice<List, 1, 3>;
    type ThreeOnward = Slice<List, 3>;
    type SkipLastTwo = Slice<List, 0, -2>;

    type RoFirstTwo = Slice<ListRO, 0, 2>;
    type RoFirstThree = Slice<ListRO, 0, 3>;
    type RoOneToThree = Slice<ListRO, 1, 3>;
    type RoThreeOnward = Slice<ListRO, 3>;
    type RoSkipLastTwo = Slice<ListRO, 0, -2>;


    type cases = [
      Expect<Equal<LastTwo, [7,8]>>,

      Expect<Equal<FirstTwo, [1,2]>>,
      Expect<Equal<FirstThree, [1,2,3]>>,
      Expect<Equal<OneToThree, [2,3, 4]>>,
      Expect<Equal<ThreeOnward, [4,5,6,7,8]>>,
      Expect<Equal<SkipLastTwo, [1,2,3,4,5,6]>>,

      Expect<Equal<RoFirstTwo, [1,2]>>,
      Expect<Equal<RoFirstThree, [1,2,3]>>,
      Expect<Equal<RoOneToThree, [2, 3, 4]>>,
      Expect<Equal<RoThreeOnward, [4,5,6,7,8]>>,
      Expect<Equal<RoSkipLastTwo, [1,2,3,4,5,6]>>,
    ];
    const cases: cases = [
      true,
      true, true, true, true, true,
      true, true, true, true, true,
    ];
  });


  it("slicing a string", () => {
    type Foo = Slice<"FooBar", 0, 3>;
    type Bar = Slice<"FooBar", 3, 3>;
    // TODO the length does not set to correct value when left undefined
    // type Bar2 = Slice<"FooBar", 3>;

    type cases = [
      Expect<Equal<Foo, "Foo">>,
      Expect<Equal<Bar, "Bar">>,

    ];
    const cases: cases = [
      true, true
    ];
  });

});

import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { DoesExtend, ErrorCondition, OfSameLength } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("OfEqualLength<A,B>", () => {

  it("tuple test", () => {
    type T1 = OfSameLength<[1,2,3],["foo","bar","baz"]>;
    type T2 = OfSameLength<[],[]>;
    type T3 = OfSameLength<[never],[1]>;

    type F1 = OfSameLength<[1,2,3],[1,2]>;
    
    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,
      ExpectFalse<F1>
    ];
    const cases: cases = [
      true, true, true,
      false
    ];
  });

  it("string test", () => {
    type T1 = OfSameLength<"foo","bar">;
    type F1 = OfSameLength<"foey","bar">;
    type E1 = OfSameLength<"foo", string>;
    type E2 = OfSameLength<"foo", [1,2,3]>;
    
    type cases = [
      ExpectTrue<T1>,
      ExpectFalse<F1>,

      ExpectTrue<DoesExtend<E1, ErrorCondition<"non-literal">>>,
      ExpectTrue<DoesExtend<E2, ErrorCondition<"invalid-use">>>,
    ];
    const cases: cases = [
      true, false,
      true, true
    ];
  });

});

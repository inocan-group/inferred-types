import { Equal, Expect } from "@type-challenges/utils";
import { EmptyObject, RemoveUndefined } from "@inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("RemoveUndefined<T>", () => {

  it("tuple tests", () => {
    type Identity = RemoveUndefined<[1,2,3]>;
    type OneGone = RemoveUndefined<[1,undefined, 2,3]>;
    type AllGone = RemoveUndefined<[undefined, undefined]>;
    type Leading = RemoveUndefined<[undefined, 1,2,3]>;
    type Tailing = RemoveUndefined<[1,2,3, undefined]>;

    type cases = [
      Expect<Equal<Identity, [1,2,3]>>,
      Expect<Equal<OneGone, [1,2,3]>>,
      Expect<Equal<AllGone, []>>,
      Expect<Equal<Leading, [1,2,3]>>,
      Expect<Equal<Tailing, [1,2,3]>>,
    ];
    const cases: cases = [
      true, true, true, true, true
    ];
  });

  it("object tests", () => {
    type Identity = RemoveUndefined<{foo: 1}>;
    type NoBar = RemoveUndefined<{foo: 1; bar: undefined}>;
    type NothingLeft = RemoveUndefined<{foo: undefined; bar: undefined}>;
    type NothingToBegin = RemoveUndefined<EmptyObject>;

    type cases = [
      Expect<Equal<Identity, {foo:1}>>,
      Expect<Equal<NoBar, {foo:1}>>,
      Expect<Equal<NothingLeft, EmptyObject>>,
      Expect<Equal<NothingToBegin, EmptyObject>>,
    ];
    const cases: cases = [
      true, true, true, true
    ];
  });
});

import { Equal, Expect } from "@type-challenges/utils";
import { EmptyObject, RemoveNever } from "inferred-types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("RemoveNever<T>", () => {

  it("tuple tests", () => {
    type Identity = RemoveNever<[1,2,3]>;
    type OneGone = RemoveNever<[1,never, 2,3]>;
    type AllGone = RemoveNever<[never, never]>;
    type Leading = RemoveNever<[never, 1,2,3]>;
    type Tailing = RemoveNever<[1,2,3, never]>;

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
    type Identity = RemoveNever<{foo: 1}>;
    type NoBar = RemoveNever<{foo: 1; bar: never}>;
    type NothingLeft = RemoveNever<{foo: never; bar: never}>;
    type NothingToBegin = RemoveNever<EmptyObject>;

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

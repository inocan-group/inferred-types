import { Equal, Expect } from "@type-challenges/utils";
import { IsReadonlyObject } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IsReadonlyObject<T>", () => {

  it("happy path", () => {
    type T1 = IsReadonlyObject<{readonly foo: 1}>;
    type T2 = IsReadonlyObject<{readonly foo: 1; readonly bar: 2}>;

    type Mixed = IsReadonlyObject<{readonly foo: 1; bar: 2}>;
    type None = IsReadonlyObject<{foo: 1; bar: 2}>;
    type Empty = IsReadonlyObject<object>;
    
    type cases = [
      Expect<Equal<T1, true>>,
      Expect<Equal<T2, true>>,
      Expect<Equal<Mixed, false>>,
      Expect<Equal<None, false>>,
      Expect<Equal<Empty, false>>,
    ];
    const cases: cases = [ true, true, true, true, true ];
  });

});

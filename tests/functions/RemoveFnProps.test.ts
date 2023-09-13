import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { FnProps, RemoveFnProps } from "../../src/types/base";


// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("RemoveFnProps<Fn>", () => {
  const fn = () => "hi" as const;
  const dict = { foo: "bar", baz: 42 } as const;
  type Fn = typeof fn;
  type Dict = typeof dict;

  it("isolating fn and dict with type utils", () => {
    type F1 = Fn & Dict;
    type JustFn = RemoveFnProps<F1>; 
    type JustProps = FnProps<F1>;
    
    type cases = [
      Expect<Equal<JustFn, Fn>>,
      Expect<Equal<JustProps, Dict>>,
    ];
    const cases: cases = [ true, true ];
  });



});

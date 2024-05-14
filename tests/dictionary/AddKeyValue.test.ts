import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import {  AddKeyValue,DoesExtend, ErrorCondition } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("AddKeyValue<TObj,K,V>", () => {

  it("happy path", () => {
    type Obj = { foo: 1; bar: 2};

    type Valid = AddKeyValue<Obj, "baz", 42>;
    type Invalid = AddKeyValue<Obj, "foo", 42>;

    
    type cases = [
      Expect<Equal<Valid, {foo: 1; bar: 2; baz: 42}>>,
      DoesExtend<Invalid, ErrorCondition<"duplicate-key">>
    ];
    const cases: cases = [ true, true ];
  });

});

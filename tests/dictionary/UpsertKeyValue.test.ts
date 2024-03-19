import { Equal, Expect } from "@type-challenges/utils";
import { DoesExtend, UpsertKeyValue } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("UpsertKeyValue<TObj,K,V>", () => {

  it("happy path", () => {
    type Obj = { foo: 1; bar: 2};

    type Add = UpsertKeyValue<Obj, "baz", 42>;
    type Override = UpsertKeyValue<Obj, "foo", 42>;
    
    type cases = [
      Expect<Equal<Add, {foo: 1; bar: 2; baz: 42}>>,
      DoesExtend<Override, {foo: 42; bar: 2}>
    ];
    const cases: cases = [ true, true ];
  });

});

import { Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { DoesExtend, IndexableObject, EmptyObject, DoesNotExtend, IndexedObject,  Not, IsNever } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IndexableObject and IndexedObject", () => {
  type Generic = { [key: string]: unknown };
  type FooBar = { foo: 42; bar: number };
  type FooBarExt = { foo: 42; bar: number; [key: string]: unknown };

  type IdxFooBar = IndexedObject<FooBar>;
  type IdxFooBarExt = IndexedObject<FooBarExt>;

  it("positive tests", () => {
    type cases = [
      // a generic string key definition extends a indexable object
      Expect<DoesExtend<Generic, IndexableObject>>,
      // FooBar is an example of a indexable Object
      Expect<DoesExtend<FooBar, IndexableObject>>,
      Expect<DoesExtend<FooBarExt, IndexableObject>>,
      // IndexableObject are a refinement of the generic Object interface
      Expect<DoesExtend<IndexableObject, object>>,

      // Objects which have explicit and literal key definitions are
      // considered an IndexedObject
      Expect<Not<IsNever<IdxFooBar>>>,
      Expect<Not<IsNever<IdxFooBarExt>>>,
    ];

    const cases: cases = [ true, true, true, true, true, true ];
  });
  
  it("negative tests", () => {
    type IdxEmpty = IndexedObject<EmptyObject>;
    type IdxGeneric = IndexedObject<Generic>;
  
    type cases = [
      Expect<DoesNotExtend<IndexableObject, EmptyObject>>,
      // Object's with no explicit props defined are not 
      // considered an IndexedObject
      Expect<IsNever<IdxEmpty>>,
      Expect<IsNever<IdxGeneric>>,
    ];

    const cases: cases = [
      true, true,true
    ];
  });
  

});

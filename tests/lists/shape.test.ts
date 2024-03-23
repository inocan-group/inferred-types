import { Equal, Expect } from "@type-challenges/utils";
import { isShape, shape } from "src/runtime/index";
import { describe, expect, it } from "vitest";
import { IndexableObject, ObjectKey } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("shape(s => s.[api])", () => {

  it("happy path", () => {
    const str = shape(s => s.string());
    const bool = shape(s => s.boolean());
    const lit = shape(s => s.literals(1).add(2).add(3).done());
    // not calling the done() method is handled gracefully
    const lit_undone = shape(s => s.literals(1).add(2).add(3));
    const lit_multi = shape(s => s.literals(1,2,3));
    const tup = shape(s => s.tuple(1).add(2).add(3).done());
    const optStr = shape(s => s.opt.string());
    const obj = shape(s => s.object());
    const obj_indexable = shape(s => s.object(true));
    const rec_union = shape(s => s.record.union("number","boolean"));
    const rec_union_dup = shape(s => s.record.union("number","boolean","number"));

    expect(isShape(str), `"${str}" was supposed to be a Shape string`).toEqual(true);
    expect(isShape(bool)).toEqual(true);
    expect(isShape(lit)).toEqual(true);
    expect(isShape(lit_undone)).toEqual(true);
    expect(isShape(lit_multi)).toEqual(true);
    expect(isShape(tup)).toEqual(true);
    expect(isShape(optStr)).toEqual(true);
    expect(isShape(obj)).toEqual(true);
    expect(isShape(obj_indexable)).toEqual(true);
    
    type cases = [
      Expect<Equal<typeof str, string>>,
      Expect<Equal<typeof bool, boolean>>,
      Expect<Equal<typeof lit, 1 | 2 | 3>>,
      Expect<Equal<typeof lit_undone, 1 | 2 | 3>>,

      Expect<Equal<typeof lit_multi, 1 | 2 | 3>>,
      Expect<Equal<typeof tup, [1 , 2 , 3]>>,
      Expect<Equal<typeof optStr, string | undefined>>,
      Expect<Equal<typeof obj, object>>,

      Expect<Equal<typeof obj_indexable, IndexableObject>>,
      Expect<Equal<typeof rec_union, Record<ObjectKey, number | boolean> >>,
      Expect<Equal<typeof rec_union_dup, Record<ObjectKey, number | boolean> >>
    ];
    const cases: cases = [
      true, true, true, true, 
      true, true, true, true, 
      true, true, true
    ];
  });

});

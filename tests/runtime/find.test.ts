import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { find, narrow } from "src/runtime/index";


// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("find(list,[deref])", () => {

  it("happy path", () => {
    let scalars = narrow(42,56,"foo","bar",false);
    let objects = narrow(
      {id: 1, name: "Bob"},
      {id: 2, name: "Mark"},
      {id: 3, name: "Mary"},
    );
    let findScalar = find(scalars);
    let foo = findScalar("foo");
    let num = findScalar(42);

    let findObj = find(objects, "id");
    let bob = findObj(1);
    expect(bob).toEqual({id: 1, name: "Bob"});
    let mark = findObj(2);
    expect(mark).toEqual({id: 2, name: "Mark"});
    
    type cases = [
      Expect<Equal<typeof foo, "foo">>,
      Expect<Equal<typeof num, 42>>,
      Expect<Equal<typeof bob, {id: 1, name: "Bob" }>>,
      Expect<Equal<typeof mark, {id: 2, name: "Mark" }>>,
    ];
    const cases: cases = [
      true,true, true, true
    ];
  });

});


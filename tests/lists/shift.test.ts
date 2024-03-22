import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { shift } from "src/runtime/index";
import { Shift } from "src/types/index";


// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Shift<T>", () => {

  it("shift a tuple", () => {
    type Bar = Shift<["foo", "bar"]>;


    type cases = [
      Expect<Equal<Bar, ["bar"]>>,
    ]
    const cases: cases = [true];
  });

  it("shift a string", () => {
    type Bar = Shift<"#bar">;

    type cases = [
      Expect<Equal<Bar, "bar">>,
    ]
    const cases: cases = [true];
  })

});



describe("shift()", () => {

  it("happy path", () => {
    const arr = [1,2,3] as const;
    const [val, list] = shift(arr);
    expect(list).toEqual([2,3]);
    expect(val).toBe(1);

    const empty = shift([]);
    
    type cases = [
      Expect<Equal<typeof val, 1>>,
      Expect<Equal<typeof list, [2,3]>>,
      Expect<Equal<typeof empty, undefined>>,
    ];
    const cases: cases = [ true, true, true ];
  });

});



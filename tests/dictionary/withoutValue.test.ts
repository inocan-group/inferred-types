import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { withoutValue } from "../../src/runtime";
import { KeysWithoutValue, WithoutValue } from "../../src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("WithoutValue<TVal,TObj>", () => { 
  type A = { foo:1; bar: 23; color: "blue" } ;
  // type B = { bar: 55; baz: 66; color: undefined } ;

  it("happy path", () => {
    type KeysWithoutOne = KeysWithoutValue<1,A>;
    type NoFoo = WithoutValue<1,A>;

    type cases = [
      Expect<Equal<KeysWithoutOne, "bar" | "color">>, //
      Expect<Equal<NoFoo, { bar: 23; color: "blue"}>>,
    ];
    const cases: cases = [ true, true ];
  });

});



describe("withoutValue()", () => {

  it("happy path", () => {
    const a = { foo:1, bar: 23, color: "blue" } as const;

    const fn = withoutValue(1);
    const noFoo = fn(a);

    expect("bar" in noFoo, "bar prop exists").toBe(true);
    expect("color" in noFoo, "color prop exists").toBe(true);
    expect("foo" in noFoo).toBe(false);
    expect(noFoo.bar).toBe(23);

    type cases = [
      Expect<Equal<typeof noFoo, { readonly bar: 23; readonly color: "blue"}>>
    ];
    const cases: cases = [true];
  });

});

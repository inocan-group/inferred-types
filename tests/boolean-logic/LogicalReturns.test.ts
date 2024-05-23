import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { ifString } from "src/runtime/index";
import {  Narrowable , LogicalReturns } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("LogicalReturns<TValues,TParams>", () => {

  it("happy path", () => {
    const f = <A extends readonly unknown[]>(...args: A) => args;
    const t = f(true as const, () => true);

    type T1 = LogicalReturns<[ true, () => true]>;
    type T2 = LogicalReturns<[ false, () => false]>;
    type T3 = LogicalReturns<[ true, true, false, boolean, () => true, () => false ]>;
    
    type cases = [
      Expect<Equal<T1, [true, true]>>,
      Expect<Equal<LogicalReturns<typeof t>, [true, true]>>,
      Expect<Equal<T2, [false, false]>>,
      Expect<Equal<T3, [true, true, false, boolean,true, false]>>,
    ];
    const cases: cases = [true, true, true, true ];
  });

  
  it("Functions with parameters and generics", () => {
    const f1 = (v: string | number) => ifString(v, () => true, () => false);
    const f1t = ifString("foo", () => true, () => false);
    const f1n = ifString(42, () => true, () => false);

    type T1 = LogicalReturns<[typeof f1, typeof f1t, typeof f1n]>;

    
    type cases = [
      Expect<Equal<T1[0], boolean>>,
      Expect<Equal<T1[1], true>>,
      Expect<Equal<T1[2], false>>,

    ];
    const cases: cases = [true, true, true];
    
  });
});

describe("logicalReturns(conditions, params)", () => {

  it("happy path", () => {
    const f1 = (v: string | number) => ifString(v, () => true, () => false);
    const f2 = <T extends Narrowable>(v: T & (string | number)) => ifString(v, () => true, () => false);

    const vf1 = f1(42);
    const vf2 = f2(42);
    const vt1 = f1("foo");
    const vt2 = f2("foo");

    expect(vf1).toBe(false);
    expect(vf2).toBe(false);
    expect(vt1).toBe(true);
    expect(vt2).toBe(true);
  });

});

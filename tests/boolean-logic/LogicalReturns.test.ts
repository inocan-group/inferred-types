import { Equal, Expect } from "@type-challenges/utils";
import { ifString } from "../../src/runtime";
import {  Narrowable , LogicalReturns } from "../../src/types";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("LogicalReturns<TValues,TParams>", () => {

  it("happy path", () => {
    const f = <A extends readonly unknown[]>(...args: A) => args;
    const t = f(true as const, () => true);
    type True =  [ true, () => true];
    type False = [ false, () => false];
    type Mixed = [ true, true, false, boolean, () => true, () => false ];
    type T1 =  LogicalReturns<True>;
    type T2 = LogicalReturns<False>;
    type T3 = LogicalReturns<Mixed>;
    
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
    const f2 = <T extends Narrowable>(v: T & (string | number)) => ifString(v, () => true, () => false);
    type TParams = Parameters<typeof f1>;

    type T1_None = LogicalReturns<[typeof f1]>;
    type T2_None = LogicalReturns<[typeof f2]>;
    type T1_Generic = LogicalReturns<[typeof f1], TParams>;
    type T2_Generic = LogicalReturns<[typeof f2], TParams>;
    type T1_Narrow = LogicalReturns<[typeof f1], [42]>;
    type T2_Narrow = LogicalReturns<[typeof f2], [42]>;
    type T2_Alt = LogicalReturns<[typeof f2], ["foo"]>;
    
    type cases = [
      Expect<Equal<T1_None, [boolean]>>,
      Expect<Equal<T2_None, [boolean]>>,
      Expect<Equal<T1_Generic, [boolean]>>,
      Expect<Equal<T2_Generic, [boolean]>>,
      Expect<Equal<T1_Narrow, [boolean]>>,
      // TODO: would like to find to resolve the next two narrowly
      Expect<Equal<T2_Narrow, [boolean]>>,
      Expect<Equal<T2_Alt, [boolean]>>,

    ];
    const cases: cases = [true, true, true, true, true, true, true];
    
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

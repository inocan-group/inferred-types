import { Equal, Expect } from "@type-challenges/utils";
import { createFnWithProps } from "runtime/functions";
import { ifFunction } from "runtime/boolean-logic/ifFunction";
import { isFnWithParams , isFunction } from "runtime/type-guards";
import { AnyFunction, IsFunction } from "src/types";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Boolean Logic for functions", () => {

  it("IsFunction<T> type util", () => {
    const f1 = createFnWithProps(() => "hi", { foo: 42, bar: "baz"});
    type T1 = IsFunction<() => true>;
    type T2 = IsFunction<AnyFunction>;
    type T3 = IsFunction<typeof f1>;
    type T4 = IsFunction<{foo: 42} & (() => false)>;

    type F1 = IsFunction<undefined>;
    type F2 = IsFunction<null>;
    type F3 = IsFunction<"foo">;
    type F4 = IsFunction<42>;
    
    type cases = [
      Expect<Equal<T1, true>>, //
      Expect<Equal<T2, true>>, 
      Expect<Equal<T3, true>>, 
      Expect<Equal<T4, true>>, 
      Expect<Equal<F1, false>>, //
      Expect<Equal<F2, false>>, 
      Expect<Equal<F3, false>>, 
      Expect<Equal<F4, false>>, 
    ];
    const cases: cases = [ true, true, true, true, true, true, true, true];
  });

  describe("isFunction(val) type guard", () => {
    const trueFn = () => true as const;
    const falseFn = () => false as const;
    const hybrid = createFnWithProps(trueFn, { about: "i am a function" });
    const empty = {};
  
    it("basic positive test", () => {
      if(isFunction(trueFn)) {
        expect(true).toBe(true);
      } else {
        throw new Error("trueFn not detected as function");
      }

      if(isFunction(falseFn)) {
        expect(true).toBe(true);
      } else {
        throw new Error("falseFn not detected as function");
      }
    });

    
    it("functions with params also pass", () => {
      if(isFunction(hybrid)) {
        expect(true).toBe(true);
      } else {
        throw new Error("hybrid not detected as function");
      }
    });

    
    it("non-functions not confused as fn", () => {
      if(isFunction(empty)) {
        throw new Error(`empty object detected as function!`);
      } else {
        expect(true).toBe(true);
      }

      if(isFunction(null)) {
        throw new Error(`null detected as function!`);
      } else {
        expect(true).toBe(true);
      }
    });
  });

  describe("ifFunction(fn, IF, ELSE) runtime", () => {
    const trueFn = () => true as const;
  
    it("happy-path", () => {
      const t1 = ifFunction(trueFn, () => true, () => false);
      const f1 = ifFunction({foo: 1}, () => true, () => false);

      expect(t1).toBe(true);
      expect(f1).toBe(false);

      type cases = [
        Expect<Equal<typeof t1, true>>, //
        Expect<Equal<typeof f1, false>>
      ];
      const cases: cases = [ true, true ];
    });
  
  });

  describe("isFnWithParams() type guard", () => {  
    const fn1 = createFnWithProps(() => `hi`, { foo: 42 });
    const fnUnion = fn1 as typeof fn1 | undefined;
    const fnNoParams = () => `hi`;

    it("positive test, no param matching", () => {
      if(isFnWithParams(fnUnion)) {
        expect(true).toBe(true);
        // validate narrowing
        type cases = [
          Expect<Equal<typeof fnUnion, typeof fn1>>, //
        ];
        const cases: cases = [ true ];
      }
    });
    
    it("negative test, using fn without params", () => {
      if(isFnWithParams(fnNoParams)) {
        throw new Error("fn without params identified as having params");
      } else {
        expect(true).toBe(true);
      }
    });
  
  });
  
});

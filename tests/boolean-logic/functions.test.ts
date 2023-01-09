import { Equal, Expect } from "@type-challenges/utils";
import { createFnWithProps } from "src/runtime";
import { isFnWithDict } from "src/runtime/type-checks";
import { AnyFunction, FnWithDict, IsEmptyObject } from "src/types";
import { IsFunction, IsFunctionWithDict } from "src/types/boolean-logic/functions";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Boolean Logic for functions", () => {

  it("IsFunction<T>", () => {
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

  it("IsFunctionWithDict<TFn, TDictMatch>", () => {
    const f1 = createFnWithProps(() => "hi", { foo: 42, bar: "baz"});
    const f2 = () => "hi";
    const f3 = createFnWithProps(() => "hi", {});
    const f4 = createFnWithProps(() => "hi", {} as {foo?: number; bar?: string});

    type T1 = IsFunctionWithDict<typeof f1>;
    type T2 = IsFunctionWithDict<typeof f1, {foo: number; bar: string}>;
    type T3 = IsFunctionWithDict<typeof f4>;
    type T4 = IsFunctionWithDict<typeof f1, FnWithDict<{foo: number; bar: string}>>;

    type F1 = IsFunctionWithDict<typeof f2>;
    type F2 = IsFunctionWithDict<typeof f3>;
    type F3 = IsFunctionWithDict<"foo">;
    type F4 = IsFunctionWithDict<typeof f1, {foo: 42; bar: "hi"}>;
    
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


  describe("isFnWithDict(input) runtime utility", () => {

    
    it("IsFunctionWithDict<TFn, TParamsMatch>", () => {
      type F1 = IsFunctionWithDict<() => true>;
      type F2 = IsFunctionWithDict<(() => false) & {} >;
      type F3 = IsFunctionWithDict<"foobar">;

      // eslint-disable-next-line no-use-before-define
      type EO = IsEmptyObject<T1>;
      type T1 = IsFunctionWithDict<(() => false) & { foo: 42}>;

      type cases = [
        Expect<Equal<F1, false>>, //
        Expect<Equal<F2, false>>,
        Expect<Equal<F3, false>>,

        // T1 is not seen as an empty object
        Expect<Equal<EO, false>>,
        // Because T1 is not empty 
        Expect<Equal<T1, true>>,
      ];
      const cases: cases = [true, true, true, true, true];
      
    });
    
  
    it("happy path", () => {
      const f1 = createFnWithProps(() => `hi`, { foo: 42 });
      const f2 = createFnWithProps(() => `hi`, { foo: 42 as number });
      const f3 = createFnWithProps(() => `hi`, {});

      const t1 = isFnWithDict(f1);
      const t2 = isFnWithDict(f2);
      const t3 = isFnWithDict(f3);
      expect(t1).toBe(true);
      expect(t2).toBe(true);
      expect(t3).toBe(false);
      type T1 = typeof t1;
      type T2 = typeof t2;
      type T3 = typeof t3;

      if(isFnWithDict(f1)) {
        expect(true).toBe(true);
        
        type F = typeof f1;
        type F2 = typeof f2;
        
        type cases = [
          Expect<Equal<T1, true>>, //
          Expect<Equal<T2, true>>,
          Expect<Equal<T3, false>>,
          // TODO: this should resolve to narrow types
          Expect<Equal<F, (() => string) & { foo: number}>>,
          // TODO: the function's return should be narrow
          Expect<Equal<F2, (() => string) & { foo: number}>>,
        ];
        const cases: cases = [true,true,true,true,true];
      }

    });
  
  });
  



});

import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { createFnWithProps, defineObj } from "src/runtime/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("defineObj(literals)(wide) runtime utility", () => {

  it("happy path", () => {
    const fooBarBaz = defineObj({foo: 1})({bar: 2, baz: 3});

    const narrowFn = defineObj({fn: () => "hi"})();
    const wideFn = defineObj()({fn: () => "hi"});

    const fnWithProps =createFnWithProps(() => "hi", {foo: 1, bar: 2});

    const narrowFnWithProps = defineObj({ fn: fnWithProps })();
    const wideFnWithProps = defineObj()({fn: fnWithProps });

    expect(fooBarBaz).toEqual({foo: 1, bar: 2, baz: 3});
    expect(narrowFn.fn()).toBe("hi");
    expect(narrowFnWithProps.fn.foo).toBe(1);
    expect(wideFnWithProps.fn.foo).toBe(1);
    
    type cases = [
      Expect<Equal<typeof fooBarBaz, { foo: 1; bar: number; baz: number }>>,

      Expect<Equal<typeof narrowFn, { fn: () => "hi"}>>,
      Expect<Equal<typeof wideFn, { fn: () => string}>>,

      Expect<Equal<typeof narrowFnWithProps, {
        fn: (() => "hi") & 
          {
            foo: 1;
            bar: 2;
          };
      }>>,
      Expect<Equal<typeof wideFnWithProps, {
        fn: (() => string) & 
          {
            foo: number;
            bar: number;
          };
      }>>,

    ];
    const cases: cases = [ 
      true,
      true, true,
      true, true,
      
    ];
  });

});

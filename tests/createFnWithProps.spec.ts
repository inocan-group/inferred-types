import { Equal, Expect } from "@type-challenges/utils";
import { describe, it, expect } from "vitest";

import { createFnWithProps, FnReadyForProps } from "src/runtime/functions/createFnWithProps";
import { FnMeta, FnWithDict } from "src/types";

const fn = () => "hi" as const;
const fnWithFoo = createFnWithProps(fn)({foo: 1});

describe("createFnWithProps()", () => {
  it("partial application", () => {
    const partial = createFnWithProps(fn);
    const partial2 = createFnWithProps(fnWithFoo);
    const completed = partial({foo:1, bar: 2});
    const completed2 = partial2({ baz: 3 });

    const ret = completed();
    const ret2 = completed2();

    expect(ret).toBe("hi");
    expect(ret2).toBe("hi");

    type cases = [
      Expect<Equal<
        typeof partial, 
        FnReadyForProps<FnMeta<[], "hi", "no-props">>
      >>, 
      Expect<Equal<
        typeof completed,
        FnWithDict<[], "hi", { foo: 1; bar: 2}>
      >>,

      Expect<Equal<
        typeof partial2, 
        FnReadyForProps<FnMeta<[], "hi", {foo: 1}>>
      >>, 
      Expect<Equal<
        typeof completed2,
        FnWithDict<[], "hi", { foo: 1; baz: 3}>
      >>,

      Expect<Equal<typeof ret, "hi">>,
      Expect<Equal<typeof ret2, "hi">>
    ];
    const cases: cases = [ true, true, true, true, true, true ];
  });

  it("simple fn and prop are combined, type is retained", () => {
    const props = { foo: "bar" };
    const combo = createFnWithProps(fn)(props);

    expect(combo.foo).toBe("bar");
    expect(combo()).toBe("hi");
  });
  
  it("a fn with params is additive to those from dictionary passed in", () => {
    const fn1 = createFnWithProps(() => "fn1")({ foo: 1 });
    const fn2 = createFnWithProps(fn1)({ bar: 2 });

    expect(fn1.foo).toBe(1);
    expect(fn2.foo).toBe(1);
    expect(fn2.bar).toBe(2);
    expect(fn2()).toBe("fn1");
    
    type cases = [
      /** type tests */
    ];
    const cases: cases = [];
    
  });
  
});

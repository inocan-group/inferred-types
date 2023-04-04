/* eslint-disable @typescript-eslint/no-explicit-any */
import { Equal, Expect } from "@type-challenges/utils";
import { describe, it, expect } from "vitest";

import { createFnWithProps, FnReadyForProps } from "src/runtime/functions";
import { FnMeta, FnWithDict } from "src/types";

const fn = () => "hi" as const;
const fnWithFoo = createFnWithProps(fn)({foo: 1});

const addProps = createFnWithProps(fn);
const withFoo = createFnWithProps(fnWithFoo);

describe("createFnWithProps()", () => {
  it("partial application", () => {

    type cases = [
      Expect<Equal<
        typeof addProps, 
        FnReadyForProps<FnMeta<[], "hi", "no-props">>
      >>, 
      Expect<Equal<
        typeof withFoo, 
        FnReadyForProps<FnMeta<[], "hi", {foo: 1}>>
      >>,
    ];
    const cases: cases = [ true, true ];
  });

  it("completed application", () => {
    // foo and bar assigned
    const fooBar = addProps({foo:1, bar: 2});
    expect(fooBar.foo).toBe(1);
    
    // foo overwritten, baz defined
    const fooReassigned = withFoo({ foo:42, baz: 3 });
    // foo inherited, baz defined
    const fooBaz = withFoo({baz: 3});
    
    const ret = fooBar();
    const ret2 = fooReassigned();

    expect(ret).toBe("hi");
    expect(ret2).toBe("hi");

    expect(fooBar.foo, `fooBar's foo value should have been 1 but was ${fooBar.foo}`).toBe(1);
    expect(fooReassigned.foo).toBe(42);
    
    expect(fooBaz.foo).toBe(1);

    expect(fooBar.bar).toBe(2);
    expect((fooReassigned as any).bar).toBe(undefined);

    expect(fooReassigned.baz).toBe(3);
    expect(fooBaz.baz).toBe(3);

    type cases = [
      Expect<Equal<
        typeof fooBar,
        FnWithDict<[], "hi", { foo: 1; bar: 2 }>
      >>,
      Expect<Equal<
        typeof fooReassigned,
        (() => "hi") & { foo: 42; baz: 3 }
      >>,
      Expect<Equal<
      typeof fooBaz,
      (() => "hi") & { foo: 1; baz: 3 }
    >>,

      Expect<Equal<typeof fooBar.foo, 1>>,
      Expect<Equal<typeof fooReassigned.foo, 42>>,
      Expect<Equal<typeof fooBaz.foo, 1>>,

      Expect<Equal<typeof fooBar.bar, 2>>,

      Expect<Equal<typeof fooReassigned.baz, 3>>,
      Expect<Equal<typeof fooBaz.baz, 3>>,

      Expect<Equal<typeof ret, "hi">>,
      Expect<Equal<typeof ret2, "hi">>
    ];

    const cases: cases = [ 
      true, true, true,
      true, true, true, 
      true, 
      true, true,
      true, true 
    ];
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

    expect(Object.keys(fn1)).toContain("foo");
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

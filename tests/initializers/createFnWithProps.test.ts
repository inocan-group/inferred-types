/* eslint-disable @typescript-eslint/no-explicit-any */
import { Equal, Expect } from "@type-challenges/utils";
import { describe, it, expect } from "vitest";

import { createFnWithProps, FnReadyForProps } from "src/runtime";

const fn = () => "hi" as const;

describe("createFnWithProps()", () => {
  it("partial application", () => {
    const partial = createFnWithProps(fn);
    const completed = partial({ foo: 1, bar: 2});
    type Part = typeof partial;

    type cases = [
      Expect<Equal<
        Part,
        FnReadyForProps<() => "hi">
      >>,
      Expect<Equal<typeof completed, (() => "hi") & { foo: 1; bar: 2 }>>
    ];
    const cases: cases = [ true, true ];
  });

  it("empty props added", () => {
    const justFn = createFnWithProps(fn)({});
    const rtn = justFn();

    expect(rtn).toBe("hi");
    
    type cases = [
      Expect<Equal<
        typeof justFn,
        () => "hi"
      >>,
    ];

    const cases: cases = [ true ];
  });

  it("simple fn and prop are combined, type is retained", () => {
    const props = { foo: "bar" };
    const combo = createFnWithProps(fn)(props);

    expect(combo.foo).toBe("bar");
    expect(combo()).toBe("hi");

    type cases = [
      Expect<Equal<
        typeof combo,
        (() => "hi") & { foo: string }
      >>,
    ];
    const cases: cases = [ true ];
  });
  
  it("a fn with params is additive to those from dictionary passed in", () => {
    const foo = createFnWithProps(fn)({foo: 1});
    const foobar = createFnWithProps(foo)({bar: 42});
    const rtn = foobar();

    expect(rtn).toBe("hi");
    expect(foobar.foo).toBe(1);
    expect(foobar.bar).toBe(42);

    type cases = [
      Expect<Equal<
        typeof foobar,
        (() => "hi") & { foo: 1; bar: 42 }
      >>,
    ];
    const cases: cases = [ true ];
    
  });
  
});

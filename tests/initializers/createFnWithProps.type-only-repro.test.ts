import { describe, it } from "vitest";
import { createFnWithProps } from "inferred-types/runtime";
import type { Expect, FnKeyValue, Test } from "inferred-types/types";

import type { Equal } from "@type-challenges/utils";

describe("createFnWithProps() type-only repro", () => {
  it("FnKeyValue of created fn reflects props", () => {
    const original1 = createFnWithProps(() => "hi" as const, { foo: 42 });
    type KV1 = FnKeyValue<typeof original1>;
    type case1 = [Expect<Test<KV1, "equals", { foo: 42 }>>];

    const original2 = createFnWithProps(() => "hi", { foo: 42 });
    type KV2 = FnKeyValue<typeof original2>;
    type case2 = [Expect<Test<KV2, "equals", { foo: 42 }>>];
  });

  it("merge with override retains keys and overrides values", () => {
    const original = createFnWithProps(() => "hi" as const, { foo: 42, bar: 50 });
    const next = createFnWithProps(original, { bar: 99 });
    type KV = FnKeyValue<typeof next>;
    type cases = [
      Expect<Test<KV, "equals", { foo: 42, bar: 99 }>>,
    ];
  });

  it("Equal check for composed function with readonly props", () => {
    const original = createFnWithProps(() => "hi", { foo: 42 });
    const fn = createFnWithProps(original, { bar: 99 });
    type T = typeof fn;
    type Expected = (() => "hi") & { readonly foo: 42; readonly bar: 99 };
    type R1 = ReturnType<typeof original>;
    type cases0 = [
      Expect<Test<R1, "equals", "hi">>,
    ];
    type O = typeof original;
    type R2 = ReturnType<O>;
    type cases1 = [
      Expect<Test<R2, "equals", "hi">>,
    ];
    type cases = [
      // direction checks
      Expect<Test<T, "extends", Expected>>,
      Expect<Test<Expected, "extends", T>>,
    ];
  });
});

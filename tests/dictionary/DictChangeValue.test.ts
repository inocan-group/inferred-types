import { describe, it } from "vitest";
import type { Expect, Equal } from "@type-challenges/utils";
import { DictChangeValue } from "../../src/types/dictionary/DictChangeValue";
import { SimplifyObject } from "../../src/types/SimplifyObject";

const test_obj = {
  foo: "hello world",
  bar: 42,
  baz: () => "that's all folks",
} as const;
type TestObj = typeof test_obj;

describe("DictChangeValue", () => {
  it("convert all KVs to a single value type", () => {
    type T = DictChangeValue<TestObj, number>;

    type cases = [Expect<Equal<T, { foo: number; bar: number; baz: number }>>];
    const cases: cases = [true];
  });

  it("convert functions values to boolean", () => {
    type F = DictChangeValue<TestObj, boolean, Function>;
    type S = DictChangeValue<TestObj, string, string>;
    type N = DictChangeValue<TestObj, number, number>;
    type T = SimplifyObject<F & S & N>;

    type cases = [Expect<Equal<T, { foo: string; bar: number; baz: boolean }>>];
    const cases: cases = [true];
  });
});

import { describe, it } from "vitest";
import {
  Expect,
  Test,
  FnKeyValue,
  FnWithProps,
} from "inferred-types/types";

describe("FnKeyValue< FnWithProps > shape", () => {
  it("basic", () => {
    type T = FnWithProps<() => "hi", { foo: 42 }>;
    type KV = FnKeyValue<T>;
    type R = ReturnType<T>;
    type cases = [
      Expect<Test<KV, "equals", { foo: 42 }>>,
      Expect<Test<R, "equals", "hi">>,
    ];
  });
});

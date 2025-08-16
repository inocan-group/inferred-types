import { describe,  it } from "vitest";
import { Expect, AsyncFunction, Test } from "inferred-types/types";

describe("AsyncFunction", () => {

  it("happy path", () => {
    type Default = AsyncFunction;
    type AsIs = AsyncFunction<[], Promise<{ foo: number }>>;
    type Wrap = AsyncFunction<[], { foo: number }>;

    type cases = [
      Expect<Test<
        Default, "equals",
        (...params: readonly unknown[]) => Promise<unknown>
      >>,
      Expect<Test<AsIs, "equals",  () => Promise<{ foo: number }>>>,
      Expect<Test<Wrap, "equals",  () => Promise<{ foo: number }>>>,
    ]
  })

})

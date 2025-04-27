/* eslint-disable ts/ban-ts-comment */
import { Equal, Expect } from "@type-challenges/utils";
import { describe,  it } from "vitest";
import { AsyncFunction } from "inferred-types/types";

describe("AsyncFunction", () => {

  it("happy path", () => {
    type Default = AsyncFunction;
    type AsIs = AsyncFunction<[], Promise<{ foo: number }>>;
    type Wrap = AsyncFunction<[], { foo: number }>;

    // @ts-ignore
    type _cases = [
      Expect<Equal<
        Default,
        (...params: readonly unknown[]) => Promise<unknown>
      >>,
      Expect<Test<AsIs, "equals",  () => Promise<{ foo: number }>>>,
      Expect<Test<Wrap, "equals",  () => Promise<{ foo: number }>>>,
    ]
  })

})

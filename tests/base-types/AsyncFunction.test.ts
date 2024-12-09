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
      Expect<Equal<AsIs, () => Promise<{ foo: number }>>>,
      Expect<Equal<Wrap, () => Promise<{ foo: number }>>>,
    ]
  })

})

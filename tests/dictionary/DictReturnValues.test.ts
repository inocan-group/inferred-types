import { describe, it } from "vitest";

import type { DictReturnValues } from "src/types";
import type { Expect, Equal } from "@type-challenges/utils";

describe("DictReturnValues<T, R, O>", () => {
  it("happy path", () => {
    const api = {
      foo: (name: string) => `${name}`,
      multiply: (v1: number, v2: number) => v1 * v2,
    };

    type Api = typeof api;
    // convert all functions
    type T1 = DictReturnValues<Api, null>;
    // convert functions with `number` return
    type T2 = DictReturnValues<Api, null, (...args: any[]) => number>;

    type Expected1 = {
      foo: (name: string) => null;
      multiply: (v1: number, v2: number) => null;
    };
    type Expected2 = {
      foo: (name: string) => string;
      multiply: (v1: number, v2: number) => null;
    };

    type cases = [
      //
      Expect<Equal<T1, Expected1>>, 
      Expect<Equal<T2, Expected2>>
    ];

    const cases: cases = [true, true];
  });
});

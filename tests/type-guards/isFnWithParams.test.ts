import { isFnWithParams } from "inferred-types/runtime";
import type { Expect, Test } from "inferred-types/types";

import { describe, expect, it } from "vitest";

describe("isFnWithParams(test, ...params)", () => {

  function greet(name: string) {
    return `Hello ${name}`;
  }

  const hello = <T extends string>(name: T) => `Hello ${name}`;

  it("happy path", () => {
    const t1 = isFnWithParams(greet);
    const t2 = isFnWithParams(greet, "string");
    const t3 = isFnWithParams(hello, "string");

    const f1 = isFnWithParams(greet, "string", "number");

    expect(t1).toBe(true);
    expect(t2).toBe(true);
    expect(t3).toBe(true);
    expect(f1).toBe(false);

    const mystery: unknown = () => `hi` as unknown;

    if (isFnWithParams(mystery, "string")) {
      type M = typeof mystery;

      type cases = [
        Expect<Test<M, "equals",  <T extends readonly [string]>(...args: T) => unknown>>
      ];
    }

  });

});

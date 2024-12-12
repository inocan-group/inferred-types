import { Equal, Expect } from "@type-challenges/utils";
import { isFnWithParams } from "inferred-types";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

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
    console.log(Object.keys(hello))

    expect(t1).toBe(true);
    expect(t2).toBe(true);
    expect(t3).toBe(true);
    expect(f1).toBe(false);

    const mystery: unknown = () => `hi` as unknown;

    if(isFnWithParams(mystery, "string")) {
      type M = typeof mystery;
      // @ts-ignore
      type cases = [
        Expect<Equal<M, <T extends [string]>(...args: T) => unknown >>
      ];
    }


  });

});

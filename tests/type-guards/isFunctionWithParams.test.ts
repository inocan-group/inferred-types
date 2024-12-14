import { Expect, Equal } from "@type-challenges/utils";
import { describe, it, expect} from "vitest";

import { isFnWithParams } from "inferred-types/runtime";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("isFnWithParams(val) type-guard", () => {

  it("happy path", () => {
    const t1 = isFnWithParams((name: string) => `Hi ${name}`);
    const t2 = isFnWithParams((name: string) => `Hi ${name}`, "string");

    expect(t1).toBe(true);
    expect(t2).toBe(true);

    const f1 = isFnWithParams((name: string) => `Hi ${name}`, "string", "number");
    const f2 = isFnWithParams(() => "hi");

    expect(f1).toBe(false);
    expect(f2).toBe(false);

    const fn: ((name: string) => `Hi ${string}`) | undefined = (name: string)  => `Hi ${name}`;
    const fn2: unknown = (name: string)  => `Hi ${name}`;
    const unknown: unknown = null as unknown;

    if(isFnWithParams(fn, 1)) {
      const rtn = fn("Bob");
      type Rtn = typeof rtn;

      // @ts-ignore
      type cases = [
        Expect<Equal<Rtn, `Hi ${string}`>>
      ];
    }

    if(isFnWithParams(fn2)) {
      type Fn = typeof fn;

      // @ts-ignore
      type cases = [
        Expect<Equal<Fn, (name: string) => `Hi ${string}`>>
      ];
    }
    if(isFnWithParams(unknown, 1)) {
      type Fn = typeof unknown;

      // @ts-ignore
      type cases = [
        Expect<Equal<Fn, <T extends readonly [any]>(...args: T) => unknown>>
      ];
    }
    if(isFnWithParams(unknown, 2)) {
      type Fn = typeof unknown;

      // @ts-ignore
      type cases = [
        Expect<Equal<Fn, <T extends readonly [any, any]>(...args: T) => unknown>>
      ];
    }
    if(isFnWithParams(unknown, "string", "number")) {
      type Fn = typeof unknown;

      // @ts-ignore
      type cases = [
        Expect<Equal<Fn, <T extends [string, number]>(...args: T) => unknown>>
      ];
    }

  });

});

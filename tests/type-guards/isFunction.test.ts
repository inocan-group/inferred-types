import { Expect, Equal } from "@type-challenges/utils";
import { describe, it, expect} from "vitest";

import { isFunction, createFnWithProps } from "inferred-types/runtime";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("isFunction(val) type-guard", () => {

  it("happy path", () => {
    const t1 = isFunction(() => "hi");
    const t2 = isFunction(createFnWithProps(() => "bye", { type: "function"}));

    expect(t1).toBe(true);
    expect(t2).toBe(true);

    const fn: ((name: string) => `Hi ${string}`) | undefined = (name: string)  => `Hi ${name}`;
    if(isFunction(fn)) {
      type Fn = typeof fn;

      // @ts-ignore
      type cases = [
        Expect<Equal<Fn, (name: string) => `Hi ${string}`>>
      ];
    }

  });

});

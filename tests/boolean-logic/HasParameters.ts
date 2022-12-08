import { Equal, Expect } from "@type-challenges/utils";
import { HasParameters } from "src/types";
import { describe, it } from "vitest";

// Note: type tests fail visible inspection but pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("HasParameters<T>", () => {
  it("happy path", () => {
    const fn1 = (foo: string) => `${foo}bar`;
    type X = HasParameters<typeof fn1>;
    const fn2 = (foo: string) => `${foo}bar` as const;
    const fn3 = () => `hello world`;
    const fn4 = () => `hello world` as const;
    const fn5 = (r: string, g: string, b: string) => `${r},${g},${b}` as const;

    type cases = [
      // single
      Expect<Equal<HasParameters<typeof fn1>, true>>,
      Expect<Equal<HasParameters<typeof fn2>, true>>,
      // none
      Expect<Equal<HasParameters<typeof fn3>, false>>,
      Expect<Equal<HasParameters<typeof fn4>, false>>,
      // multiple
      Expect<Equal<HasParameters<typeof fn5>, true>>
    ];
    const cases: cases = [true, true, true, true, true];
  });
});

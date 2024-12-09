import { Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import {  HasRequiredProps } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("HasRequiredProps<T>", () => {

  it("happy path", () => {
    type T1 = HasRequiredProps<{foo: 1; bar: 2}>;
    type T2 = HasRequiredProps<{foo: 1; bar?: 2}>;

    type F1 = HasRequiredProps<{foo?: 1; bar?: 2}>;
    type F2 = HasRequiredProps<{}>;

    type Wide = HasRequiredProps<Record<string, unknown>>;

    // @ts-ignore
    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectFalse<F1>,
      ExpectFalse<F2>,
      Expect<Equal<Wide, boolean>>
    ];
  });

});

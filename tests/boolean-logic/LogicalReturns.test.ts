import { Equal, Expect } from "@type-challenges/utils";
import { describe,  it } from "vitest";
import {  LogicalReturns } from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("LogicalReturns<TValues,TParams>", () => {

  it("happy path", () => {
    const f = <A extends readonly unknown[]>(...args: A) => args;
    const t = f(true as const, () => true);

    type T1 = LogicalReturns<[ true, () => true]>;
    type T2 = LogicalReturns<[ false, () => false]>;
    type T3 = LogicalReturns<[ true, true, false, boolean, () => true, () => false ]>;

    type cases = [
      Expect<Equal<T1, [true, true]>>,
      Expect<Equal<LogicalReturns<typeof t>, [true, true]>>,
      Expect<Equal<T2, [false, false]>>,
      Expect<Equal<T3, [true, true, false, boolean,true, false]>>,
    ];
    const cases: cases = [true, true, true, true ];
  });



});

import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import {defineTuple} from "src/runtime/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("createTuple(...values) runtime utility", () => {

  it("happy path", () => {
    const foobar = defineTuple("foo", "bar");
    const takeTwo = defineTuple(...foobar);

    const wideFoo = defineTuple(s => s.string(), "bar");

    expect(foobar).toEqual(["foo", "bar"]);
    expect(takeTwo).toEqual(["foo", "bar"]);
    expect(wideFoo).toEqual(["foo", "bar"]);

    type cases = [
      Expect<Equal<typeof foobar, ["foo", "bar"]>>,
      Expect<Equal<typeof takeTwo, ["foo", "bar"]>>,
      Expect<Equal<typeof wideFoo, [string, "bar"]>>,
    ];
    const cases: cases = [ true, true, true ];
  });

  
  it("passing a const array", () => {
    const arr = ["foo", "bar"] as const;
    const foobar = defineTuple(...arr);

    expect(foobar).toEqual(["foo", "bar"]);

    type cases = [
      Expect<Equal<typeof foobar, ["foo", "bar"]>>,
    ];
    const cases: cases = [ true ];
  });
  
  

});

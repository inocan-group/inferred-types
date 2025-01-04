import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { MergeObjects } from "inferred-types";
import {  mergeObjects } from "inferred-types/runtime";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("MergeObjects<A,B>", () => {


  it("happy path", () => {
    type T1 = MergeObjects<{ foo: 1; bar: 2 }, { bar: 4; baz: "howdy" }>;
    type T2 = MergeObjects<{ bar: 4; baz: "howdy" }, { foo: 1; bar: 2 }>;

    // @ts-ignore
    type cases = [
      Expect<Equal<T1, {foo: 1; bar: 4; baz: "howdy"}>>,
      Expect<Equal<T2, {foo: 1; bar: 2; baz: "howdy"}>>,
    ];

  });


  it("can override base type", () => {
    type T1 = MergeObjects<{foo: 1; bar: 2}, { foo: "foo"; bar: "bar" }>;

    // @ts-ignore
    type cases = [
      Expect<Equal<T1, {foo: "foo"; bar: "bar"}>>,
    ];

  });


});

describe("mergeObjects(a,b)", () => {

  it("happy path", () => {
    const t1 = mergeObjects({ foo: 1, bar: 2 }, { bar: 4, baz: "howdy" });
    const t2 = mergeObjects({ bar: 4, baz: "howdy" }, { foo: 1, bar: 2 });
    const t3 = mergeObjects({}, {foo: 1});
    const t4 = mergeObjects({foo: 1}, {});

    expect(t1).toEqual({ foo:1, bar: 4, baz: "howdy"});
    expect(t2).toEqual({ foo:1, bar: 2, baz: "howdy"});
    expect(t3).toEqual({ foo:1 });
    expect(t4).toEqual({ foo:1 });

    // @ts-ignore
    type cases = [
      Expect<Equal<typeof t1, {foo: 1; bar: 4; baz: "howdy"}>>,
      Expect<Equal<typeof t2, {foo: 1; bar: 2; baz: "howdy"}>>,
      Expect<Equal<typeof t3, {foo: 1; }>>,
      Expect<Equal<typeof t4, {foo: 1; }>>,
    ];

  });

});

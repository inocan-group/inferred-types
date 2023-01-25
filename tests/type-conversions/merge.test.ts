import { Equal, Expect } from "@type-challenges/utils";
import {  mergeScalars, mergeTuples } from "runtime";
import { MergeObjects, MergeScalars, MergeTuples } from "src/types";
import { describe, expect, it } from "vitest";

describe("mergeScalars", () => {

  it("type testing", () => {
    type cases = [
      Expect<Equal<MergeScalars<4,5>, 5>>, // override prevails
      Expect<Equal<MergeScalars<4,undefined>, 4>>, // no override, default prevails
      Expect<Equal<MergeScalars<number,5>, 5>>, // wide type for default is ignored
      Expect<Equal<MergeScalars<4, number>, number>>, // type widened to fit override
      Expect<Equal<MergeScalars<number, 5>, 5>>, // override being wide has no bearing
      Expect<Equal<MergeScalars<number, number>, number>>
    ];
    
    const cases: cases = [ true, true, true, true, true, true ];
  });
  
  it("runtime", () => {
    expect(mergeScalars(4,5)).toBe(5);
    expect(mergeScalars(4, undefined)).toBe(4);
  });
  
});

describe("Merge Tuples", () => {
  const partial = [undefined, "bar"] as const;
  const foobar = ["foo", "bar"] as const;
  const baz42 = ["baz", 42] as const;
  const lengthy = ["one", "two", "three", "four", "five"] as const;
  
  it("type testing", () => {
    type Partial = typeof partial;
    type Foobar = typeof foobar;
    type Baz42 = typeof baz42;
    type Lengthy = typeof lengthy;
    
    type OverrideFully = MergeTuples<Foobar, Baz42>;
    type PartialOverride = MergeTuples<Baz42,Partial>;
    type OverExtend = MergeTuples<Lengthy, Foobar>;
    
    type cases = [
      Expect<Equal<OverrideFully, Baz42>>,
      Expect<Equal<PartialOverride, readonly ["baz", "bar"]>>,
      Expect<Equal<OverExtend, readonly ["foo", "bar", "three", "four", "five"]>>
    ];
    const cases: cases = [true, true, true];
  });

  
  it("runtime tests", () => {
    // override fully
    expect(mergeTuples(foobar, baz42)).toEqual(baz42);
    // partial override
    expect(mergeTuples(baz42, partial)).toEqual(["baz", "bar"]);
    // extend
    expect(mergeTuples(lengthy, foobar)).toEqual(["foo", "bar", "three", "four", "five"]);
    // empty arrays
    expect(mergeTuples(foobar, [])).toEqual(foobar);
    expect(mergeTuples([], foobar)).toEqual(foobar);
  });
});

describe("Merge Objects", () => {

  it("type tests", () => {
    type JustExtend = MergeObjects<{foo: 1; bar: 2}, {baz: 3}>;
    type JustExtend2 = MergeObjects<{baz: 3}, {foo: 1; bar: 2}>;
    type FullyOverride = MergeObjects<{foo: 1; bar: 2}, { foo: 2; bar: 3}>;
    
    type cases = [
      Expect<Equal<JustExtend, {foo: 1; bar: 2; baz: 3}>>,
      Expect<Equal<JustExtend2, {foo: 1; bar: 2; baz: 3}>>,
      Expect<Equal<FullyOverride, {foo: 2; bar: 3}>>,
    ];
    const cases: cases = [true, true, true];
  });

  it("runtime tests", () => {
    // const justExtend = mergeObjects({foo: 1, bar: 2}, {baz: 3});

    
  });
});



// describe("merge() utility", () => {
//   it("merge to scalars/undefined", () => {
//     const m1 = merge(undefined, 6);
//     const m2 = merge(42, 6);

//     expect(m1).toBe(6);
//     expect(m2).toBe(42);

//     type cases = [
//       Expect<Equal<typeof m1, 6>>, //
//       Expect<Equal<typeof m2, 42>>
//     ];
//     const cases: cases = [true, true];
//   });

//   it("merge two objects", () => {
//     const o1 = merge(
//       { foo: "foo", baz: false, color: { fav: undefined, next: "green" } } as const,
//       { foo: "bar", bar: 42, color: { fav: "red", next: "" as string } } as const
//     );
//     type O1 = typeof o1;

//     // runtime
//     expect(o1.foo).toBe("foo");
//     expect(o1.bar).toBe(42);
//     expect(o1.color.fav).toBe("red");
//     expect(o1.color.next).toBe("green");

//     // design time
//     type cases = [
//       Expect<Equal<O1["foo"], "foo">>, //
//       Expect<Equal<O1["bar"], 42>>,
//       Expect<Equal<O1["color"], { fav: "red"; next: "green" }>>
//     ];
//     const cases: cases = [true, true, true];
//   });
// });

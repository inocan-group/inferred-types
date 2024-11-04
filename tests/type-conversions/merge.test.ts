import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import type {
  CombinedKeys,
  MergeObjects,
  MergeScalars,
  MergeTuples,
  HasSameKeys,
  Merge,
  IsErrorCondition
} from "@inferred-types/types";
import { mergeScalars, mergeTuples } from "inferred-types";

describe("MergeObjects<A,B>", () => {
  it("happy path", () => {
    type O1 = { foo: 1; bar: 2 };
    type O2 = { bar: 3; baz: 4 };

    type M1 = MergeObjects<O2,O1>;
    type M2 = MergeObjects<O1,O2>;

    type cases = [
      Expect<Equal<M1, { foo: 1; bar: 2; baz: 4}>>,
      Expect<Equal<M2, { foo: 1; bar: 3; baz: 4}>>,
    ];
    const cases: cases = [ true, true ];
  });

  it("deep object", () => {
    type O1 = { foo: 1; bar: 2; deep: { a: 1 } };
    type O2 = { bar: 3; baz: 4; deep: { a: 2; b: 3} };

    type M1 = MergeObjects<O2,O1>;

    type cases = [
      Expect<Equal<M1, { foo: 1; bar: 2; baz: 4; deep: { a:1}}>>,
    ];
    const cases: cases = [ true ];

  });

});

describe("MergeTuples<TDefault,TOverride>", () => {

  it("happy path", () => {
    type Nothing = MergeTuples<[],[]>;
    type Unchanged = MergeTuples<["foo", "bar"], []>;
    type Barbar = MergeTuples<["foo", "bar"], ["bar"]>;
    type Eclipsed = MergeTuples<["foo", "bar"], ["baz", "bar", "foo"]>;

    type cases = [
      Expect<Equal<Nothing, readonly []>>,
      Expect<Equal<Unchanged, readonly ["foo", "bar"]>>,
      Expect<Equal<Barbar, readonly ["bar", "bar"]>>,
      Expect<Equal<Eclipsed, readonly ["baz", "bar", "foo"]>>,
    ];

    const cases: cases = [ true, true, true, true ];
  });


  it.skip("using key based comparison", () => {
    // not currently implemented
    type cases = [
      /** type tests */
    ];
    const cases: cases = [];
  });

});

describe("MergeScalars", () => {

  it("happy path", () => {

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
});


describe("mergeScalars(a,b)", () => {
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


  it("CombinedKeys<A,B>", () => {
    type FooBarBaz = CombinedKeys<{foo: 1; bar: 2}, {baz: 3}>;

    type cases = [
      ExpectTrue<HasSameKeys<FooBarBaz, ["foo","bar","baz"]>>
    ];
    const cases: cases = [ true ];

  });


  it("type tests", () => {
    type JustExtend = MergeObjects<{foo: 1; bar: 2}, {baz: 3}>;
    type JustExtend2 = MergeObjects<{baz: 3}, {foo: 1; bar: 2}>;
    type FullyOverride = MergeObjects<{foo: 1; bar: 2}, { foo: 2; bar: 3}>;

    type NullDef = MergeObjects<null, {foo: 1}>;
    type NullOver = MergeObjects<{foo: 1}, null>;
    type NadaDef = MergeObjects<undefined, {foo: 1}>;
    type NadaOver = MergeObjects<{foo: 1}, undefined>;

    type cases = [
      Expect<Equal<JustExtend, {foo: 1; bar: 2; baz: 3}>>,
      Expect<Equal<JustExtend2, {foo: 1; bar: 2; baz: 3}>>,
      Expect<Equal<FullyOverride, {foo: 2; bar: 3}>>,
      Expect<Equal<NullDef, {foo: 1}>>,
      Expect<Equal<NullOver, {foo: 1}>>,
      Expect<Equal<NadaDef, {foo: 1}>>,
      Expect<Equal<NadaOver, {foo: 1}>>,
    ];
    const cases: cases = [
      true, true, true,
      true, true, true, true
    ];
  });

  it("runtime tests", () => {
    // const justExtend = mergeObjects({foo: 1, bar: 2}, {baz: 3});


  });
});


describe("Merge<A,B>", () => {

  it("happy path", () => {
    type FooBar = Merge<{foo: 1}, {bar:2}>;
    type Replaced = Merge<{foo: 0; bar: 0}, {foo: 1; bar: 2}>;
    type Both = Merge<{foo: 1; bar: 2}, {baz: 3}>;

    type ObjFromNada = Merge<undefined, {foo: 1}>;
    type ObjFromNull = Merge<null, {foo: 1}>;

    type Invalid = Merge<5, "foo">;
    type Nothing = Merge<null,undefined>;

    type cases = [
      Expect<Equal<FooBar, {foo:1; bar: 2}>>,
      Expect<Equal<Replaced, {foo:1; bar: 2}>>,
      Expect<Equal<Both, {foo:1; bar: 2; baz: 3}>>,

      Expect<Equal<ObjFromNada, {foo:1}>>,
      Expect<Equal<ObjFromNull, {foo:1}>>,

      ExpectTrue<IsErrorCondition<Invalid, "invalid-merge">>,
      ExpectTrue<IsErrorCondition<Nothing, "invalid-merge">>,
    ];
    const cases: cases = [
      true, true, true,
      true, true,
      true, true
    ];
  });

});



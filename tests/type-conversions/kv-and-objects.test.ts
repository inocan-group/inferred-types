import { Equal, Expect } from "@type-challenges/utils";
import { defineType,  narrow } from "runtime";
import { kvToObject } from "src/runtime/runtime";
import { objectToKv } from "src/runtime/runtime/objectToKv";
import { isKvPair } from "src/runtime/type-guards/isKvPair";
import { isKvPairArray } from "src/runtime/type-guards/isKvPairArray";
import { Contains, DoesExtend, GetEach, KvPair, KvToObject, Mutable } from "src/types";
import { ObjectToKv } from "src/types/type-conversion/ObjectToKv";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("KV -> Object", () => {
  it("isKvPair() type guard works", () => {
    if(isKvPair("nope")) {
      throw new Error("string mistaken for KvPair");
    } else {
      expect(true, "nope rejected as kvPair").toBe(true);
    }

    const kv = {key: "foo", value: 1 } as const;
    const kv2 = narrow({key: "foo", value: 1 } as const);
    type Explicit = KvPair<"foo", 1>;

    if(isKvPair(kv)) {
      expect(true, "real kv detected");
      type cases = [
        Expect<Equal<typeof kv["key"], "foo">>,
        Expect<Equal<typeof kv["value"], 1>>,
        Expect<Equal<Mutable<typeof kv>, Explicit>>,
      ];
      const cases: cases = [ true, true, true ];
    }
    if(isKvPair(kv2)) {
      expect(true, "real kv detected");
      type cases = [
        Expect<Equal<typeof kv["key"], "foo">>,
        Expect<Equal<typeof kv["value"], 1>>,
        Expect<Equal<typeof kv2, Explicit>>,
      ];
      const cases: cases = [ true, true, true ];
    }
  });
  
  it("isKvPairArray() type guard works", () => {
    if(isKvPairArray([{}, {}])) {
      throw new Error("should have failed!");
    } else {
      expect(true, "invalid tuple rejected").toBe(true);
    }

    const kvRo = [
      { key: "foo", value: 1 },
      { key: "bar", value: 2 },
    ] as const;

    const kvRw = narrow([
      { key: "foo", value: 1 },
      { key: "bar", value: 2 },
    ] as const);

    if(isKvPairArray(kvRo)) {
      expect(true, "valid ro KV array detected").toBe(true);
    } else {
      throw new Error("a valid kv array (with read-only props) was not identified as a KvPair array");
    }

    if(isKvPairArray(kvRw)) {
      expect(true, "valid r/w KV array detected").toBe(true);
      
      type cases = [
        /** type tests */
      ];
      const cases: cases = [];
    } else {
      throw new Error("a valid kv array (with read/write props) was not identified as a KvPair array");
    }
  });
  
  
  it("types: KvToObject<KV>", () => {
    type Works = KvToObject<[
      {key: "foo"; value: 1}, 
      {key: "bar"; value: 2}
    ]>;

    type Err = KvToObject<[
      {key: "foo"; value: 1}, 
      {key: "bar"; value: 2},
      {key: "foo"; value: 5},
    ]>;

    type DeepKv = [
      {key: "foo"; value: 1},
      {key: "bar"; value: [ 
          {key: "a"; value: "a" }, 
          {key: "b"; value: "b" },
          {key: "c"; value: "c"} 
        ]; }
    ];

    type DeepCheck = KvToObject<DeepKv>;

    type cases = [
      Expect<Equal<Works, {foo: 1; bar: 2}>>,
      Expect<Equal<Err, ["ERROR", "Key of foo already exists"]>>,
      Expect<Equal<DeepCheck, { foo: 1; bar: { a: "a"; b: "b"; c: "c" }}>>
    ];

    const cases: cases = [true, true, true];
  });


  it("runtime: kvToObject()", () => {
    const kv = [{key: "foo", value: 1}, {key: "bar", value: 2}] as const;
    const foobar = kvToObject([{key: "foo", value: 1}, {key: "bar", value: 2}] as const);
    const foobar2 = kvToObject(kv);

    expect(foobar).toEqual({ foo: 1, bar: 2 });
    expect(foobar2).toEqual({ foo: 1, bar: 2 });

    type cases = [
      Expect<Equal<typeof foobar, { foo: 1; bar: 2}>>,
      Expect<Equal<typeof foobar2, { foo: 1; bar: 2}>>,
    ];
    const cases: cases = [true,true];
  });

});

describe("Object -> KV", () => {

  it("types: ObjectToKv<KV>", () => {
    type T1 = ObjectToKv<{foo: 1; bar: 2}>;
    type IsKvPairArr = DoesExtend<
      T1, 
      readonly KvPair<string, any>[]
    >;

    type V1 = readonly [{key: "foo"; value: 1}, {key: "bar"; value: 2}];
    type V2 = readonly [{key: "bar"; value: 2}, {key: "foo"; value: 1}];

    type cases = [
      // since order is not guaranteed we must 
      // test for inclusion of keys and values
      Expect<Equal<
        Contains<GetEach<T1, "key">, "foo">, 
        true
      >>,
      Expect<Equal<
        Contains<GetEach<T1, "key">, "bar">, 
        true
      >>,
      Expect<Equal<
        Contains<GetEach<T1, "value">, 1>, 
        true
      >>,
      Expect<Equal<
        Contains<GetEach<T1, "value">, 2>, 
        true
      >>,
      // we can test for a union type with both orders
      Expect<Equal<
        DoesExtend<T1, V1 | V2>,
        true
      >>,
      // the result should extend a readonly array of KvPair's
      Expect<Equal<IsKvPairArr, true>>
    ];
    const cases: cases = [true, true, true, true, true, true];
  });

  
  it("runtime: objectToKv()", () => {
    expect(objectToKv({foo: 1, bar: 2})).toEqual( [
      {key: "foo", value: 1}, 
      {key: "bar", value: 2}
    ]);
  });
  
  it("object nesting", () => {
    const deep = defineType({
      foo: 1,
      bar: {
        a: "a",
        b: "b",
        c: "c"
      }
    })();

    const deepKv = objectToKv(deep);

    expect(deepKv, "nesting of objects converted to KV").toEqual([
      {key: "foo", value: 1},
      {key: "bar", value: [
        {key: "a", value: "a"},
        {key: "b", value: "b"},
        {key: "c", value: "c"}
      ]}
    ]);
  });
});

describe("Identity Checks between KV and Object", () => {
  const deepObj = {
    foo: 1,
    bar: {
      a: "a",
      b: "b",
      c: "c"
    }
  } as const;

  const deepKv = [
    { key: "foo", value: 1 },
    { key: "bar", value: [
      { key: "a", value: "a" },
      { key: "b", value: "b" },
      { key: "c", value: "c" },
    ]}
  ] as const;
  
  type DeepObj = typeof deepObj;
  type DeepKv = typeof deepKv;

  it("type check", () => {
    type IdentityKv = ObjectToKv<KvToObject<DeepKv>>;
    type IdentityObj = KvToObject<ObjectToKv<DeepObj>>;

    type ObjectIntermediary = KvToObject<DeepKv>;
    type KvIntermediary = ObjectToKv<DeepObj>;

    type cases = [
      //
      Expect<Equal<Mutable<IdentityKv>, Mutable<DeepKv>>>,
      Expect<Equal<IdentityKv, Readonly<Mutable<DeepKv>>>>,
      Expect<Equal<Mutable<IdentityObj>, Mutable<DeepObj>>>,
      Expect<Equal<IdentityObj, Mutable<DeepObj>>>,

      Expect<Equal<
        ObjectIntermediary, 
        {
          foo: 1;
          bar: { a: "a"; b: "b"; c: "c" };
        }
      >>,
      Expect<Equal<
        KvIntermediary,
        readonly [
          { key: "foo"; value: 1},
          { key: "bar"; value: [
            { key: "a"; value: "a" },
            { key: "b"; value: "b" },
            { key: "c"; value: "c" },
          ];}
        ]
      >>
    ];
    
    const c: cases = [ true, true, true, true, true, true ];
    expect(c).toBe(c);
  });

  
  it("runtime check", () => {
    const kv = objectToKv(kvToObject(deepKv));
    expect(kv).toEqual(deepKv);

    const obj = kvToObject(objectToKv(deepObj));
    expect(obj).toEqual(deepObj);

    type cases = [
      Expect<Equal<typeof kv, Readonly<Mutable<DeepKv>>>>,
      Expect<Equal<typeof obj, Mutable<DeepObj>>>
    ];
  });
  

});

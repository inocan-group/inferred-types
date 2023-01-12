import { Equal, Expect } from "@type-challenges/utils";
import { kvToObject } from "src/runtime/runtime";
import { objectToKv } from "src/runtime/runtime/objectToKv";
import { isKvPair } from "src/runtime/type-guards/isKvPair";
import { KvPair, KvToObject, Mutable } from "src/types";
import { ObjectToKv } from "src/types/type-conversion/ObjectToKv";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.


describe("KV to Object", () => {
  it("isKvPair() type guard works", () => {
    if(isKvPair("nope")) {
      throw new Error("string mistaken for KvPair");
    } else {
      expect(true, "nope rejected as kvPair").toBe(true);
    }

    const kv = {key: "foo", value: 1 } as const;
    if(isKvPair(kv)) {
      expect(true, "real kv detected");

      type Explicit = KvPair<"foo", 1>;

      type cases = [
        Expect<Equal<typeof kv["key"], "foo">>,
        Expect<Equal<typeof kv["value"], 1>>,
        Expect<Equal<Mutable<typeof kv>, Explicit>>,
      ]
      const cases: cases = [ true, true, true ];
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
        ] }
    ];

    type T3 = KvToObject<DeepKv>;

    
    type cases = [
      Expect<Equal<Works, {foo: 1; bar: 2}>>,
      Expect<Equal<Err, ["ERROR", "Key of foo already exists"]>>,
      Expect<Equal<T3, { foo: 1; bar: { a: "a"; b: "b"; c: "c" }}>>
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

describe("Object to KV", () => {

  it("types: ObjectToKv<KV>", () => {
    type T1 = ObjectToKv<{foo: 1; bar: 2}>;

    type cases = [
      Expect<Equal<T1, readonly [
        {key: "foo"; value: 1}, 
        {key: "bar"; value: 2}
      ]>>,
    ];
    const cases:cases = [true];
  });

  
  it("runtime: objectToKv()", () => {
    expect(objectToKv({foo: 1, bar: 2})).toEqual( [
      {key: "foo", value: 1}, 
      {key: "bar", value: 2}
    ]);
  });
  
  it("object nesting", () => {
    const deep = {
      foo: 1,
      bar: {
        a: "a",
        b: "b",
        c: "c"
      }
    } as const;

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

  it("identity property for objectToKv(kvToObject(val))", () => {
    const deep = {
      foo: 1,
      bar: {
        a: "a",
        b: "b",
        c: "c"
      }
    } as const;

    const inverted = kvToObject(objectToKv(deep));
    
    expect(
      inverted, 
      "objectToKv() and kvToObject() are inverses of each other"
    ).toEqual(deep);
  });
  
  

});

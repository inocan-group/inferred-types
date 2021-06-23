import { Expect, Equal } from "@type-challenges/utils";
import { ExpandRecursively } from "~/types/ExpandRecursively";
import { isolateKv, keys } from "~/utility";

describe("isolateKv()", () => {
  it("validation of output structure", () => {
    const obj = { foo: 10, bar: "hi", baz: { a: 123, b: 456 } };
    type Obj = typeof obj;
    const iso = isolateKv(obj);

    // should be an array of isolates
    expect(Array.isArray(iso)).toBe(true);
    expect(iso.length).toBe(keys(obj).length);

    for (const i of iso) {
      // each isolate is a Tuple of [key, kv]
      expect(Array.isArray(i)).toBe(true);
      expect(i.length).toBe(2);
      // the key and kv are structured  -- at a high 
      // level -- as they should be
      const [key, kv] = i;
      expect(keys(obj)).toContain(key);
      expect(typeof kv).toBe("object");
      // any given tuple will allow the "key" to index the "kv"
      expect(kv[key]).not.toBe(undefined);
      // this is expressed more literally with a type test
      // in the braod, we only know about the aggregate of keys
      type Indexable = [
        Expect<Equal<typeof key, "foo" | "bar" | "baz">>,
        Expect<Equal<keyof typeof kv, "foo" | "bar" | "baz">>
      ];
      const indexable: Indexable = [true, true];
      expect(indexable).toBe(indexable);

      // ISOLATION TESTS
      if (key === "foo") {
        // run-time check
        expect(typeof kv["foo"]).toBe("number");
        // typing checks
        type Key = typeof key;
        type KV = typeof kv;
        type Foo = KV["foo"];
        type IsoIndexable = [
          // once within a conditional block, the type
          // system knows the key's explicit type but
          // is still vague about the KV
          Expect<Equal<Key, "foo">>,
          Expect<Equal<keyof KV, "foo" | "bar" | "baz">>,
          // this means that by default the type of the
          // KV's value is opaque too
          Expect<Equal<Foo, number | string | { a: number; b: number }>>,
        ];
        const IsoIndexable: IsoIndexable = [true, true, true];
        expect(IsoIndexable).toBe(IsoIndexable);

        // regaining type strength of KV
        const kvStrong = kv as ExpandRecursively<Pick<Obj, Key>>;
        type KvStrong = [
          // regained stength has been achieved
          Expect<Equal<typeof kvStrong, { foo: number }>>,
        ];
        const KvStrong: KvStrong = [true];
        expect(KvStrong).toBe(KvStrong);
      }
    }

  });
});
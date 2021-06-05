import { isolateKv, Keys } from "~/utility";

describe("isolateKv()", () => {
  it("validation of output structure", () => {
    const obj = { foo: 10, bar: "hi", baz: { a: 123, b: 456 } };
    const iso = isolateKv(obj);

    // should be an array of isolates
    expect(Array.isArray(iso)).toBe(true);
    expect(iso.length).toBe(Keys(obj).length);

    for (const i of iso) {
      // each isolate is a Tuple of [key, kv]
      expect(Array.isArray(i)).toBe(true);
      expect(i.length).toBe(2);
      // the key and kv are structured  -- at a high 
      // level -- as they should be
      const [key, kv] = i;
      expect(Keys(obj)).toContain(key);
      expect(typeof kv).toBe("object");
      // TODO: add type checks here for prop visibility


      // check that runtime system sees types 
      // in KV correctly too
      if (key === "foo") {
        expect(typeof kv["foo"]).toBe("number");
      }
      if (key === "bar") {
        expect(typeof kv["bar"]).toBe("string");
      }
    }



  });
});
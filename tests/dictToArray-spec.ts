import { defineType, dictToArray, keys } from "~/utility";
import { Expect, Equal } from "@type-challenges/utils";

describe("dictToArray()", () => {

  it("runtime is correctly structured", () => {
    const obj = defineType({ id: "123" })({ color: "red", age: 12 });
    const arr = dictToArray(obj);

    expect(arr).toHaveLength(3);
    for (const tuple of arr) {
      const [key, kv] = tuple;
      console.log(key, kv);

      expect(typeof key).toBe("string");
      expect(typeof kv).toBe("object");
      expect(keys(kv)).toContain(key);
      expect((kv as any)[key]).not.toBe(undefined);

    }
  });

});
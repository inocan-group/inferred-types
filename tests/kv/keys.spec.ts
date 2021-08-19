import { Keys } from "../../src/types/Keys";
import type { Expect, Equal } from "@type-challenges/utils";
import { defineType, keys } from "~/utility";

describe("Keys<T>", () => {
  it("Keys<T> is shorthand for keyof T", () => {
    const obj = { foo: 1, bar: 3 };
    type O = keyof typeof obj;
    type keys = Keys<typeof obj>;

    type cases = [Expect<Equal<O, keys>>];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });

  it("Keys<T> can also convert an array of strings into a union type", () => {
    const arr = ["foo", "bar"] as const;
    type Arr = typeof arr;
    type MyKeys = Keys<Arr>;

    type cases = [
      Expect<Equal<MyKeys, "foo" | "bar">>
    ];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });

  it("Keys<T,W> can exclude certain keys", () => {
    const obj = { foo: 1, bar: 3 };
    const arr = ["foo", "bar"] as const;
    type OKeys = Keys<typeof obj, "foo">;
    type OArr = Keys<typeof arr, "foo">;

    type cases = [
      Expect<Equal<OKeys, "bar">>,
      Expect<Equal<OArr, "bar">>
    ];
    const cases: cases = [true, true];
    expect(cases).toBe(cases);
  });
});

describe("keys() utility", () => {

  it("with just object passed in, keys are extracted as expected", () => {
    const obj = defineType({ id: "123" })({ color: "red", isFavorite: false });
    const k = keys(obj);

    expect(k).toHaveLength(3);
    expect(k).toContain("id");
    expect(k).toContain("color");
    expect(k).toContain("isFavorite");

    type cases = [
      Expect<Equal<typeof k, ("color" | "id" | "isFavorite")[]>>
    ];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });

  it("with object and exclusion keys, type and run-time are correct", () => {
    const obj = defineType({ id: "123" })({ color: "red", isFavorite: false });
    const k = keys(obj, "color", "id");

    expect(k).toHaveLength(1);
    expect(k).toContain("isFavorite");

    type cases = [
      Expect<Equal<typeof k, ("isFavorite")[]>>
    ];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });


});
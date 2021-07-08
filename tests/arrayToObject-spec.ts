
import { Equal, Expect, ExpectExtends } from "@type-challenges/utils";
import { ArrayConverter, arrayToObject, GeneralDictionary, UniqueDictionary, defineType, keys } from "~/utility";

const foo = { name: "foo", age: 123, color: "red" } as const;
const foo2 = { name: "foo", age: 44, color: "orange" } as const;
const bar = { name: "bar", age: 456, color: "blue" } as const;
const baz = { name: "baz", age: 42, color: "green" } as const;


describe("arrayToObject => ", () => {

  it("partial application of arrayToObject()", () => {
    const t1 = arrayToObject("name", false);
    type T1 = typeof t1;
    const t2 = arrayToObject("name", true);
    type T2 = typeof t2;
    const t3 = arrayToObject("name");
    type T3 = typeof t3;

    type cases = [
      // literal statements about uniqueness are conveyed in partial application
      Expect<Equal<T1, ArrayConverter<"name", false>>>,
      Expect<Equal<T2, ArrayConverter<"name", true>>>,
      // the default case is correctly set to true
      Expect<Equal<T3, ArrayConverter<"name", true>>>,

      // The response types for each type is as expected
      Expect<ExpectExtends<GeneralDictionary<"name", any, any>, ReturnType<T1>>>,
      Expect<ExpectExtends<UniqueDictionary<"name", any, any>, ReturnType<T2>>>,
      Expect<ExpectExtends<UniqueDictionary<"name", any, any>, ReturnType<T3>>>,
    ];

    const cases: cases = [true, true, true, true, true, true];
    expect(cases).toBe(cases);
  });

  it("arrayToObject() is able to operate on unique and non-unique types", () => {
    // first test where name is unique
    const arr1 = [foo, bar, baz];
    const dict1 = arrayToObject("name")(arr1);

    expect(dict1.foo).toBe(foo);
    expect(dict1.bar).toBe(bar);
    expect(dict1.baz).toBe(baz);

    // now test where name is not unique
    const arr2 = [foo, foo2, bar, baz];
    const dict2 = arrayToObject("name")(arr2);

    expect(dict2.foo).toBe(foo2);
    expect(dict2.bar).toBe(bar);
    expect(dict2.baz).toBe(baz);

    // because we've stated that items are _not_ unique
    // we should expect results to be an array
    const dict3 = arrayToObject("name", false)(arr2);

    expect(Array.isArray(dict3.foo)).toBe(true);
    expect(Array.isArray(dict3.bar)).toBe(true);
    expect(Array.isArray(dict3.baz)).toBe(true);

    type SomeFoo = typeof foo | typeof foo2;

    type cases = [
      // both unique and non-unique have the same keys
      Expect<Equal<keyof typeof dict1, "foo" | "bar" | "baz">>,
      Expect<Equal<keyof typeof dict2, "foo" | "bar" | "baz">>,
      // with a unique type for "foo" we get a literal definition
      Expect<Equal<typeof dict1["foo"], typeof foo>>,
      // however when we passed in two "types" for "foo" we get a union
      Expect<Equal<typeof dict2["foo"], SomeFoo>>,
      // once we state that foo is not unique, the type expanded to an array
      Expect<Equal<typeof dict3["foo"], SomeFoo[]>>,
    ];
    const cases: cases = [true, true, true, true, true];
    expect(cases).toBe(cases);
  });

  it("type support of wide an narrow types", () => {
    const r1 = defineType({ id: 1, slug: "bob" })({ age: 45, color: "blue" });
    const r2 = defineType({ id: 2, slug: "chris" })({ age: 23, color: "red" });
    const arr = [r1, r2];

    const id = arrayToObject("id")(arr);
    type Id = typeof id;
    const slug = arrayToObject("slug")(arr);
    type Slug = typeof slug;

    expect(keys(id)).toContain("1");
    expect(keys(id)).toContain("2");
    expect(keys(slug)).toContain("bob");
    expect(keys(slug)).toContain("chris");

    type cases = [
      // "id" and "slug" are always expressed as literals
      Expect<Equal<Id["1"]["id"], 1>>,
      Expect<Equal<Id["1"]["slug"], "bob">>,
      Expect<Equal<Slug["bob"]["id"], 1>>,
      Expect<Equal<Slug["bob"]["slug"], "bob">>,
      // "age" and "color" are expressed as their widened types
      Expect<Equal<Id["1"]["age"], number>>,
      Expect<Equal<Id["1"]["color"], string>>,
    ];

    const cases: cases = [true, true, true, true, true, true];
    expect(cases).toBe(cases);
  });


});

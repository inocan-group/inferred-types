import { Equal, Expect, NotEqual } from "@type-challenges/utils";
import { DictFromKv } from "~/types/kv/DictFromKv";
import { keys } from "~/utility";
import { dictToKv, kvToDict } from "~/utility/dictionary/kv";

describe("dictToKv()", () => {
  it.skip("basic structure is correct when forcing to Tuple structure", () => {
    const obj = { id: 123, foo: "bar" } as const;
    const val = dictToKv(obj, true);
    // type Val = typeof val;

    expect(Array.isArray(val)).toBeTruthy();
    expect(val).toHaveLength(2);
    expect(val.every((i) => Object.keys(i).includes("key"))).toBeTruthy();
    expect(val.every((i) => Object.keys(i).includes("value"))).toBeTruthy();

    for (const kv of val) {
      if (kv.key === "id") {
        type cases = [Expect<Equal<typeof kv.key, "id">>, Expect<Equal<typeof kv.value, 123>>];
        const c: cases = [true, true];
        expect(c).toBe(c);
      }
    }

    // TODO: this actually passes some of the time in CLI test and almost always in vs-code

    // type cases = [
    //   Expect<
    //     Equal<
    //       Val,
    //       [
    //         {
    //           key: "id";
    //           value: 123;
    //         },
    //         {
    //           key: "foo";
    //           value: "bar";
    //         }
    //       ]
    //     >
    //   >
    // ];

    // const c: cases = [true];
    // expect(c).toBe(c);
  });
});

it("basic structure is correct when using array structure", () => {
  const obj = { id: 123, foo: "bar" } as const;
  const val = dictToKv(obj);

  expect(Array.isArray(val)).toBeTruthy();
  expect(val).toHaveLength(2);
  expect(val.every((i) => Object.keys(i).includes("key"))).toBeTruthy();
  expect(val.every((i) => Object.keys(i).includes("value"))).toBeTruthy();

  for (const kv of val) {
    if (kv.key === "id") {
      type cases = [Expect<Equal<typeof kv.key, "id">>, Expect<Equal<typeof kv.value, 123>>];
      const c: cases = [true, true];
      expect(c).toBe(c);
    }
  }

  // types are a bit ugly so skipping check when not Tuple type
});

describe("kvToDict()", () => {
  it("the DictFromKv<T> utility returns original object type", () => {
    const val = dictToKv({ id: 123, foo: "bar" });
    type Back = DictFromKv<typeof val>;

    type cases = [Expect<Equal<Back, { id: 123; foo: "bar" }>>];
    const c: cases = [true];
    expect(c).toBe(c);
  });

  it("originating KeyValue array converts to strongly typed dictionary", () => {
    const obj = kvToDict([
      { key: "id", value: "abcd" },
      { key: "color", value: "red" },
      { key: "favorite", value: true as boolean },
    ]);
    type Obj = typeof obj;
    type Keys = keyof Obj;

    expect(obj.id).toBe("abcd");
    expect(obj.color).toBe("red");
    expect(obj.favorite).toBe(true);
    expect(Object.keys(obj)).toHaveLength(3);

    type cases = [
      // Keys are known explicitly
      Expect<Equal<Keys, "id" | "color" | "favorite">>,
      // Values are literal values where available
      Expect<Equal<Obj["id"], "abcd">>,
      Expect<Equal<Obj["color"], "red">>,
      // if source is wide, then resolution is wide
      Expect<Equal<Obj["favorite"], boolean>>
    ];

    const c: cases = [true, true, true, true];
    expect(c).toBe(c);
  });
});

describe("kvToDict / dictToKv inverse", () => {
  it("run-time inverts correctly (starting with obj)", () => {
    const obj = { id: 123, foo: "bar" } as const;
    const inverse = kvToDict(dictToKv(obj));

    expect(keys(inverse).every((i) => inverse[i] === obj[i]));
  });
  it("run-time inverts correctly (starting with array)", () => {
    const arr = [
      { key: "id", value: 123 },
      { key: "foo", value: "bar" },
    ] as const;
    const inverse = dictToKv(kvToDict(arr));

    expect(inverse).toEqual(arr);
  });

  it("typing inverts correctly (starting with obj)", () => {
    const obj = { id: 123, foo: "bar" } as const;
    const inverse = kvToDict(dictToKv(obj));
    type Obj = typeof obj;
    type Inverse = typeof inverse;

    type cases = [
      // while not precisely equal (due to readonly)
      Expect<NotEqual<Inverse, Obj>>,
      // they are equal in each key/value pair
      Expect<Equal<Inverse["id"], Obj["id"]>>,
      Expect<Equal<Inverse["foo"], Obj["foo"]>>
    ];
    const c: cases = [true, true, true];
    expect(c).toBe(c);
  });

  it("typing inverts correctly (starting with arr)", () => {
    const arr = [
      { key: "id", value: 123 },
      { key: "foo", value: "bar" },
    ] as const;
    const inverse = dictToKv(
      kvToDict([
        { key: "id", value: 123 },
        { key: "foo", value: "bar" },
      ])
    );
    type Arr = typeof arr;
    type Inverse = typeof inverse[0];

    if (inverse[0].key === "id") {
      type cases = [
        // while not precisely equal (due to readonly)
        Expect<NotEqual<Inverse, Arr>>
        // they are equal in each key/value pair
        // Expect<ExpectExtends<Arr, Inverse>>
      ];
      const c: cases = [true];
      expect(c).toBe(c);
    }
  });
});

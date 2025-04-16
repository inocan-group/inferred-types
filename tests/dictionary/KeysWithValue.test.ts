import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";

import {
  KeysWithValue,
  Dictionary,
  AnyFunction
} from "inferred-types/types";
import { createFnWithProps } from "inferred-types/runtime";


const obj = {
  id: "foobar",
  foo2: 2,
  success: true,
  fail: false,
  narrowFn: (name: string) => `hi ${name}`,
  narrowFnWithProps: createFnWithProps(() => "hi", { foo: "there" }),
  foo: 1,
  bar: true,
  message: "hi there",
  numericArr: [1, 2, 3] as number[],
  strArr: ["foo", "bar"] as string[],
  fn: () => "hi",
  fnWithProp: createFnWithProps(() => "hi", { foo: "there" }),
  baz: { foo: 1, bar: 2 },
  emptyBaz: {}
} as const;

describe("KeysWithValue<T> utility", () => {

  it("happy path", () => {
    type Num = KeysWithValue<typeof obj, number>;
    type Str = KeysWithValue<typeof obj, string>;
    type Arr = KeysWithValue<typeof obj, unknown[]>;
    type RoArr = KeysWithValue<typeof obj, readonly unknown[]>;
    type Bool = KeysWithValue<typeof obj, boolean>;

    type Fn = KeysWithValue<typeof obj, AnyFunction>;
    type ObjOfType = KeysWithValue<typeof obj, { foo: unknown; bar: unknown }>;
    type Obj = KeysWithValue<typeof obj, Dictionary>;

    type cases = [
      ExpectTrue<Equal<Num, "foo" | "foo2">>,
      ExpectTrue<Equal<Str, "message" | "id">>,
      ExpectTrue<Equal<Arr, "numericArr" | "strArr">>,
      ExpectTrue<Equal<RoArr, "numericArr" | "strArr">>,
      ExpectTrue<Equal<Bool, "bar" | "success" | "fail">>,

      Expect<Equal<ObjOfType, "baz">>,
      ExpectTrue<Equal<Obj, "baz" | "emptyBaz">>,
      ExpectTrue<Equal<Fn, "fn" | "fnWithProp" | "narrowFn" | "narrowFnWithProps">>,
    ];

  });

  it("using literal types for match", () => {
    type Num = KeysWithValue<typeof obj, 2 | 3>;
    type True = KeysWithValue<typeof obj, true>;
    type False = KeysWithValue<typeof obj, false>;

    type cases = [
      ExpectTrue<Equal<Num, "foo2">>,
      Expect<Equal<True, "success" | "bar">>,
      Expect<Equal<False, "fail">>,
    ];
    const cases: cases = [true, true, true];
  });
});

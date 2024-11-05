import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { KeysWithValue, HasSameValues, Dictionary, AnyFunction } from "inferred-types";
import { createFnWithProps, defineObj} from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

const obj = defineObj({
  id: "foobar",
  foo2: 2,
  success: true,
  fail: false,
  narrowFn: (name: string) => `hi ${name}`,
  narrowFnWithProps: createFnWithProps(() => "hi",{ foo: "there" })
})({
  foo: 1,
  bar: true,
  message: "hi there",
  numericArr: [1, 2, 3],
  strArr: ["foo", "bar"],
  fn: () => "hi",
  fnWithProp: createFnWithProps(() => "hi",{ foo: "there" }),
  baz: { foo: 1, bar: 2 },
  emptyBaz: {}
});

describe("KeysWithValue<T> utility", () => {

  it("happy path", () => {
    type Num = KeysWithValue<typeof obj, number>;
    type Str = KeysWithValue<typeof obj, string>;
    type Arr = KeysWithValue<typeof obj, unknown[]>;
    type RoArr = KeysWithValue<typeof obj, readonly unknown[]>;
    type Bool = KeysWithValue<typeof obj, boolean>;

    type Fn = KeysWithValue<typeof obj, AnyFunction>;
    type ObjOfType = KeysWithValue<typeof obj, {foo: unknown; bar: unknown }>;
    type Obj = KeysWithValue<typeof obj, Dictionary>;

    type cases = [
      ExpectTrue<HasSameValues<Num, ["foo", "foo2"]>>,
      ExpectTrue<HasSameValues<Str, ["message", "id"]>>,
      ExpectTrue<HasSameValues<Arr, ["numericArr" ,"strArr"]>>,
      ExpectTrue<HasSameValues<RoArr, ["numericArr", "strArr"]>>,
      ExpectTrue<HasSameValues<Bool, ["bar", "success", "fail"]>>,

      Expect<Equal<ObjOfType, ["baz"]>>,
      // an object also includes a function (TODO: try and exclude this)
      ExpectTrue<HasSameValues<Obj, ["baz", "emptyBaz" ]>>,
      ExpectTrue<HasSameValues<Fn, ["fn" , "fnWithProp", "narrowFn", "narrowFnWithProps"] >>,
    ];
    const cases: cases = [
      true,true,true,true,true,
      true,true, true
    ];
  });

  it("using literal types for match", () => {
    type Num = KeysWithValue<typeof obj, 2 | 3>;
    type True = KeysWithValue<typeof obj, true>;
    type False = KeysWithValue<typeof obj, false>;

    type cases = [
      ExpectTrue<HasSameValues<Num, ["foo2"]>>,
      Expect<Equal<True, ["success"]>>,
      Expect<Equal<False, ["fail"]>>,
    ];
    const cases: cases = [ true, true, true ];

  });


});

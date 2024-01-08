import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { AnyFunction, AnyObject, KeysWithValue } from "src/types";
import { createFnWithProps, defineObj} from "src/runtime";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

const obj = defineObj({
  id: "foobar",
  foo2: 2,
  foo3: 3,
  success: true,
  fail: false
})({
  foo: 1,
  bar: true,
  message: "hi there",
  numericArr: [1, 2, 3],
  strArr: ["foo", "bar"],
  fn: () => "hi",
  fnWithProp: createFnWithProps(() => "hi")({ foo: "there" }),
  baz: { foo: 1, bar: 2 },
  emptyBaz: {}
});

describe("KeysWithValue<T> utility", () => {

  it("happy path", () => {
    type Num = KeysWithValue<typeof obj, number>;
    type Str = KeysWithValue<typeof obj, string>;
    type Arr = KeysWithValue<typeof obj, unknown[]>;
    type RoArr = KeysWithValue<typeof obj, readonly unknown[]>;
    // TODO: this is missing the wide boolean type for some reason!
    type Bool = KeysWithValue<typeof obj, boolean>;

    type Fn = KeysWithValue<typeof obj, AnyFunction>;
    type ObjOfType = KeysWithValue<typeof obj, {foo: unknown; bar: unknown }>;
    type Obj = KeysWithValue<typeof obj, AnyObject>;

    type cases = [
      Expect<Equal<Num, "foo" | "foo2" | "foo3">>,
      Expect<Equal<Str, "message" | "id">>,
      Expect<Equal<Arr, "numericArr" | "strArr">>,
      Expect<Equal<RoArr, "numericArr" | "strArr">>,
      Expect<Equal<Bool, "bar" | "success" | "fail">>,
      
      Expect<Equal<ObjOfType, "baz">>,
      // an object also includes a function (TODO: try and exclude this)
      Expect<Equal<Obj, "baz" | "emptyBaz" | "fn" | "fnWithProp">>,
      Expect<Equal<Fn, "fn" | "fnWithProp" >>,
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
      Expect<Equal<Num, "foo2" | "foo3">>,
      Expect<Equal<True, "success">>,
      Expect<Equal<False, "fail">>,
    ];
    const cases: cases = [ true, true, true ];
    
  });
  

});

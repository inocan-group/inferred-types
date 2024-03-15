import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { AnyObject, KeysWithValue, SameElements } from "src/types/index";
import { createFnWithProps, defineObj} from "src/runtime/index";

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

    type AFn = KeysWithValue<typeof obj, (args: unknown[]) => unknown>;
    type ObjOfType = KeysWithValue<typeof obj, {foo: unknown; bar: unknown }>;
    type Obj = KeysWithValue<typeof obj, AnyObject>;

    type cases = [
      ExpectTrue<SameElements<Num, ["foo", "foo2", "foo3"]>>,
      ExpectTrue<SameElements<Str, ["message", "id"]>>,
      ExpectTrue<SameElements<Arr, ["numericArr" ,"strArr"]>>,
      ExpectTrue<SameElements<RoArr, ["numericArr", "strArr"]>>,
      ExpectTrue<SameElements<Bool, ["bar", "success", "fail"]>>,
      
      Expect<Equal<ObjOfType, ["baz"]>>,
      // an object also includes a function (TODO: try and exclude this)
      ExpectTrue<SameElements<Obj, ["baz", "emptyBaz" , "fn" , "fnWithProp"]>>,
      ExpectTrue<SameElements<AFn, ["fn" , "fnWithProp"] >>,
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
      ExpectTrue<SameElements<Num, ["foo2", "foo3"]>>,
      Expect<Equal<True, ["success"]>>,
      Expect<Equal<False, ["fail"]>>,
    ];
    const cases: cases = [ true, true, true ];
    
  });
  

});

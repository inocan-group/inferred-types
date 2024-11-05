import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import {
  DoesExtend,
  IsVueRef,
  VueRef
} from "inferred-types";
import { asVueRef, isRef, keysOf } from "inferred-types";
import { Ref, ref } from "vue";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("VueRef, isRef(), and IsRef<T>", () => {

  it("IsRef<T> on real Ref<T> and fake VueRef<T>", () => {
    type Str = IsVueRef<Ref<"hi">>;
    type Str2 = IsVueRef<VueRef<"hi">>;
    type NotRef = IsVueRef<{baz: 3}>;

    type cases = [
      ExpectTrue<Str>,
      ExpectTrue<Str2>,
      ExpectFalse<NotRef>
    ];
    const cases: cases = [ true, true, false ];

  });


  it("Negative tests of IsRef<T> on non-reference types", () => {
    type Str = IsVueRef<"hi">;
    type Num = IsVueRef<42>;
    type Obj = IsVueRef<object>;

    type cases = [
      ExpectFalse<Str>,
      ExpectFalse<Num>,
      ExpectFalse<Obj>,
    ];
    const cases: cases = [ false, false, false ];

  });



  it("VueRef and IsRef<T>", () => {
    const test_ref = ref("foobar");
    /**
     * Since our `keysOf` function is VueJS aware it reduces the
     * keys to just `value`.
     */
    const keys = keysOf(test_ref);
    expect(keys).toEqual(["value"]);

    /**
     * use of the Object.keys() function reveals many properties
     * which the type system hides from the runtime
     */
    const obj_keys = Object.keys(test_ref);
    const runtime_keys = [
      "__v_isShallow",
      "dep",
      "__v_isRef",
      "_rawValue",
      "_value"
    ]
    expect(runtime_keys.every(k => obj_keys.includes(k)));

    type cases = [
      // Ref extends VueRef by not in reverse
      // due to the private symbol used in Ref
      ExpectTrue<DoesExtend<Ref, VueRef>>,
      ExpectFalse<DoesExtend<VueRef,Ref>>,
      // IsRef provides safe way to test for both
      ExpectTrue<IsVueRef<typeof test_ref>>,
      ExpectTrue<IsVueRef<VueRef>>,
    ];
    const cases: cases = [
      true,  false, true, true
    ];
  });

  it("using isRef() type guard", () => {
    const test_ref = ref("foobar");
    if (isRef(test_ref)) {
      expect(test_ref.value).toEqual("foobar");
    } else {
      throw new Error("incorrectly evaluated test_ref");
    }

    const fake_ref = asVueRef("foobar");


    if(isRef(fake_ref)) {
      expect(fake_ref.value).toEqual("foobar");
    } else {
      throw new Error("incorrectly evaluated fake_ref")
    }
  });

});

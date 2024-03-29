import {  Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import {  DoesExtend, IsRef,VueRef } from "src/types/index";
import { asVueRef, isRef, keysOf } from "src/runtime/index";
import { Ref, ref } from "vue";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("VueRef, isRef(), and IsRef<T>", () => {

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
      ExpectTrue<IsRef<typeof test_ref>>,
      ExpectTrue<IsRef<VueRef>>,
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
    
    type cases = [
      Expect<Equal<typeof fake_ref, VueRef<"foobar">>>
    ];
    const cases: cases = [
      true
    ];

    if(isRef(fake_ref)) {
      expect(fake_ref.value).toEqual("foobar");
    } else {
      throw new Error("incorrectly evaluated fake_ref")
    }
  });
  


});

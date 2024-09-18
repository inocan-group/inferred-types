import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { IsComputedRef,  VueComputedRef } from "src/types/index";
import { describe, expect, it } from "vitest";
import {ComputedRef, ReactiveEffect, computed} from "vue";


// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("VueJS's Computed Properties", () => {

  it.skip("VueComputedRef and IsComputedRef", () => {
    const test_computed = computed(() => `hi` as const);
    // effect property is a class constructor for `ReactiveEffect<T>`
    // which the runtime system sees as a function
    type CR = VueComputedRef<"hi">;
    type VR = ComputedRef<"hi">;

    type Effect = typeof test_computed["effect"];
    type Value = typeof test_computed["value"];

    // runtime properties
    const typeOf = typeof test_computed;
    const keys = Object.keys(test_computed);
    const expected_keys = [
      "fn",
      "setter",
      "dep",
      "__v_isRef",
      "__v_isReadonly",
      "effect",
    ];

    expect(typeOf).toBe("object");
    expect(test_computed.value).toBe("hi");
    // expect(expected_keys.every(i => test_computed[i as keyof typeof test_computed])).toBe(true);
    expect(keys.every(i => expected_keys.includes(i)), `keys missing ${keys.filter(i => expected_keys.includes(i)) }`).toBe(true);


    type cases = [
      // Basic Vue Type Structure
      Expect<Equal<typeof test_computed, ComputedRef<"hi">>>,
      Expect<Equal<Effect, ReactiveEffect<"hi">>>,
      Expect<Equal<Value, "hi">>,

      Expect<Equal<CR["value"], VR["value"]>>,
      ExpectTrue<IsComputedRef<VR>>,
      ExpectTrue<IsComputedRef<CR>>,
    ];
    const cases: cases = [
      true, true, true,
      true, true, true
    ];
  });

});

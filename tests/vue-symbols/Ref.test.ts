import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import {
    DoesExtend,
    Expect,
    IsVueRef,
    Test,
    VueRef
} from "inferred-types/types";
import { Ref, ref } from "vue";
import { isVueRef, asVueRef, isRef, keysOf } from "inferred-types/runtime";



describe("VueRef, isRef(), and IsRef<T>", () => {

    it("IsRef<T> on real Ref<T> and fake VueRef<T>", () => {
        type Str = IsVueRef<Ref<"hi">>;
        type Str2 = IsVueRef<VueRef<"hi">>;
        type NotRef = IsVueRef<{ baz: 3 }>;

        type cases = [
            ExpectTrue<Str>,
            ExpectTrue<Str2>,
            ExpectFalse<NotRef>
        ];
        const cases: cases = [true, true, false];
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
        const cases: cases = [false, false, false];
    });


    it("VueRef and IsRef<T>", () => {
        const test_ref = ref("foobar");

        expect(isVueRef(test_ref)).toBe(true);



        /**
         * use of the Object.keys() function reveals many properties
         * which the type system hides from the runtime
         */
        const obj_keys = Object.keys(test_ref);
        const runtime_keys = [
            "__v_isRef",
            "dep",
            "_rawValue",
            "_value"
        ]
        for (const k of runtime_keys) {
            expect(obj_keys.includes(k), `VueRef<T> should include property '${k}'`).toBe(true)
        }

        type cases = [
            ExpectFalse<DoesExtend<VueRef, Ref>>,
            // IsRef provides safe way to test for both
            ExpectTrue<IsVueRef<typeof test_ref>>,
            ExpectTrue<IsVueRef<VueRef>>,
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


        if (isRef(fake_ref)) {
            expect(fake_ref.value).toEqual("foobar");
        } else {
            throw new Error("incorrectly evaluated fake_ref")
        }
    });

});



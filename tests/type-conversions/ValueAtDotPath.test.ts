import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { Ref } from "vue";
import { IsValidDotPath, ValueAtDotPath } from "inferred-types/types";




describe("ValueAtDotPath", () => {

    it("happy path", () => {
        type myRef = Ref<{ age: number; address: string }>;
        type Obj = {
            foo: 1;
            bar: number[];
            baz: {
                a: string;
                b: string;
                c: {
                    ca: 1;
                    cb: 2;
                    cc: string[];
                };
            };
            color: [number, string, number];
            info: myRef;
        };

        type Valid = IsValidDotPath<Obj, "foo">;

        type Foo = ValueAtDotPath<Obj, "foo">;
        type Bar = ValueAtDotPath<Obj, "bar">;
        type Baz_c_ca = ValueAtDotPath<Obj, "baz.c.ca">;
        type ExplicitInfo = ValueAtDotPath<Obj, "info.value.age">;
        type ImplicitInfo = ValueAtDotPath<Obj, "info.age">;

        type cases = [
            ExpectTrue<Valid>,
            Expect<Test<Foo, "equals",  1>>,
            Expect<Test<Bar, "equals",  number[]>>,
            Expect<Test<Baz_c_ca, "equals",  1>>,

            Expect<Test<ExplicitInfo, "equals",  number>>,
            Expect<Test<ImplicitInfo, "equals",  number>>,

        ];
        const cases: cases = [
            true, true, true, true,
            true, true
        ];
    });


});

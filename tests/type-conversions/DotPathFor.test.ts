/* eslint-disable ts/ban-types */
import { describe, it } from "vitest";
import { Ref } from "vue";
import {
    Expect,
    DoesExtend,
    DotPathFor,
    Suggest,
    Test
} from "inferred-types/types";



describe("Name", () => {
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


    it("using an object as target", () => {
        type Path = DotPathFor<Obj>;
        type Suggestion = Suggest<Path>;
        type Scalar = DotPathFor<42>;

        const takeSuggestion: Suggestion = "baz.c.ca";
        const bespoke: Suggestion = "bespoke";

        type cases = [
            Expect<Test<Scalar, "equals", "">>,

            Expect<DoesExtend<"foo", Path>>,
            Expect<DoesExtend<"baz.c.ca", Path>>,
            // aware of VueJS ref object
            Expect<DoesExtend<"info.value.age", Path>>,

            // suggestions are offered but not required
            Expect<DoesExtend<typeof takeSuggestion, Suggestion>>,
            Expect<DoesExtend<typeof bespoke, Suggestion>>,
        ];
    });

    it("using an array target", () => {
        type ExampleArr = DotPathFor<["foo", "bar", "baz", ["a", "b"]]>;
        type Expected = "" | "0" | "1" | "2" | "3" | "3.0" | "3.1";

        type Suggestion = Suggest<ExampleArr>;

        type cases = [
            Expect<Test<ExampleArr, "equals", Expected>>,
            Expect<Test<Suggestion, "equals", Expected | (string & {})>>, //
        ];
        const cases: cases = [true, true];
    });

    it("Container and Scalar values provide empty string offset", () => {
        type Obj = {
            foo: 1;
            bar: {
                a: "str";
                b: "another str";
            };
            arr: [
                { inside: true; outside: true },
                1, 2, 3
            ];
            emptyArr: string[];
            emptyObj: object;
            deep: {
                deeper: {
                    prop: 42;
                };
            };
        };

        type ScalarPaths = DotPathFor<42>;
        type ObjPaths = DotPathFor<Obj>;

        type cases = [
            Expect<DoesExtend<ScalarPaths, "">>,
            Expect<DoesExtend<"", ObjPaths>>,
        ];

    });


    it("Wide object type and scalars resolve to only root path", () => {
        type TObj = DotPathFor<object>;
        type TNum = DotPathFor<42>;
        type TStr = DotPathFor<"foobar">;

        type cases = [
            Expect<Test<TObj, "equals", "">>,
            Expect<Test<TNum, "equals", "">>,
            Expect<Test<TStr, "equals", "">>,
        ];
    });

});


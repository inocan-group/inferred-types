/* eslint-disable ts/ban-types */
import { describe, it } from "vitest";
import { Equal, Expect } from "@type-challenges/utils";
import { Ref } from "vue";
import {
    DoesExtend,
    DotPathFor,
    Suggest
} from "inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

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
            Expect<Equal<Scalar, "">>,

            Expect<DoesExtend<"foo", Path>>,
            Expect<DoesExtend<"baz.c.ca", Path>>,
            // aware of VueJS ref object
            Expect<DoesExtend<"info.value.age", Path>>,

            // suggestions are offered but not required
            Expect<DoesExtend<typeof takeSuggestion, Suggestion>>,
            Expect<DoesExtend<typeof bespoke, Suggestion>>,
        ];
        const cases: cases = [
            true,
            true, true, true,
            true, true
        ];
    });

    it("using an array target", () => {
        type ExampleArr = DotPathFor<["foo", "bar", "baz", ["a", "b"]]>;
        type Expected = "" | "0" | "1" | "2" | "3" | "3.0" | "3.1";

        type Suggestion = Suggest<ExampleArr>;

        type cases = [
            Expect<Equal<ExampleArr, Expected>>,
            Expect<Equal<Suggestion, Expected | (string & {})>>, //
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
        const cases: cases = [
            true, true,
        ];
    });


    it("Wide object type and scalars resolve to only root path", () => {
        type TObj = DotPathFor<object>;
        type TNum = DotPathFor<42>;
        type TStr = DotPathFor<"foobar">;

        type cases = [
            Expect<Equal<TObj, "">>,
            Expect<Equal<TNum, "">>,
            Expect<Equal<TStr, "">>,
        ];
        const cases: cases = [true, true, true];
    });

});


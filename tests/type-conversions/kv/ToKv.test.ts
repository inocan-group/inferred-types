import { Equal, Expect } from "@type-challenges/utils";
import { defineObj, toKeyValue } from "inferred-types/runtime";
import {  NarrowObject, ToKv } from "inferred-types/types";
import { Narrowable } from "transpiled/types";
import { describe, it } from "vitest";


describe("ToKv<T>", () => {

    it("happy path", () => {
        type Foobar = ToKv<{ foo: 1; bar: "hi" }>;

        type cases = [
            Expect<Equal<Foobar, [
                { key: "foo"; value: 1 },
                { key: "bar"; value: "hi" }
            ]>>
        ];
    });

    it("with optional parameter", () => {
        type Foobar = ToKv<{ foo?: 1; bar: "hi" }>;

        type cases = [
            Expect<Equal<Foobar, [
                { key: "foo"; value: 1 | undefined; required: false },
                { key: "bar"; value: "hi" }
            ]>>
        ];
    });


    it("interacting with runtime and narrow objects", () => {
        const obj = defineObj({ foo: 1, bar: "hi" })()
        function fn<
            T extends NarrowObject<N>,
            N extends Narrowable
        >(obj: T) {
            return obj as NarrowObject<N> & T;
        }
        const kv = fn(obj);
        type KV = ToKv<typeof kv>;

        type cases = [
            /** type tests */
        ];
    });

});

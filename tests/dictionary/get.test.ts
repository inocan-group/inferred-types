import { describe, expect, it } from "vitest";
import {
    defineObject,
    get,
    isErrorCondition,
} from "inferred-types/runtime";
import type {
    Expect,
    Get,
    Test,
} from "inferred-types/types";
import { ref } from "vue";

describe("Get<T, K> type utility", () => {
    it("type: shallow path", () => {
        const input = defineObject({
            id: "Number(1234)",
            foo: "number",
            bar: "string"
        })

        type Input = typeof input;

        type Id = Get<Input, "id">;
        type Foo = Get<Input, "foo">;
        type Bar = Get<Input, "bar">;
        type Nada = Get<Input, "nada">;

        type cases = [
            // valid props are pulled off
            Expect<Test<Id, "equals", 1234>>,
            Expect<Test<Foo, "equals", number>>,
            Expect<Test<Bar, "equals", string>>,
            Expect<Test<Nada, "equals", undefined>>
        ];
        const c: cases = [true, true, true, true];
        expect(c).toBe(c);
    });


    it("type: shallow path into Ref", () => {
        const myRef = ref({ foo: 1, bar: 2 } as const);
        const obj = {
            foo: 1,
            myRef
        } as const;
        type Obj = typeof obj;

        type ShallowFoo = Get<Obj, "foo">;
        type RefFoo = Get<Obj, "myRef.value.foo">;
        type RefBar = Get<Obj, "myRef.value.bar">;
        type RefBase = Get<Obj, "myRef.value">;

        type cases = [
            Expect<Test<ShallowFoo, "equals", 1>>,
            Expect<Test<RefFoo, "equals", 1>>,
            Expect<Test<RefBar, "equals", 2>>,
            Expect<Test<RefBase, "equals", { readonly foo: 1; readonly bar: 2 }>>,
        ];
        const c: cases = [true, true, true, true];
        expect(c).toBe(c);
    });


    it("type: deep path through Ref", () => {
        const myRef = { bar: { baz: 42 } } as const;
        const obj = {
            foo: myRef
        };
        type Obj = typeof obj;

        type DeepFake = Get<Obj, "foo.bar.baz">;

        type cases = [
            Expect<Test<DeepFake, "equals", 42>>
        ];
        const cases: cases = [true];
    });



    it("type: default values", () => {
        type Obj = {
            foo: undefined;
            bar: {
                a: undefined;
            };
        };
        type T1 = Get<Obj, "foo", "foobar">;
        type T2 = Get<Obj, "bar.a", "foobar">;

        type cases = [
            Expect<Test<T1, "equals", "foobar">>,
            Expect<Test<T2, "equals", "foobar">>,
        ];
        const cases: cases = [true, true];
    });

    it("type: Deep Get", () => {
        type Obj = {
            foo: 1;
            bar: {
                a: "a";
                b: "b";
            };
            baz: [1, 2, 3];
        };

        type Shallow = Get<Obj, "foo">;
        type ObjDeep = Get<Obj, "bar.a">;
        type ArrDeep = Get<Obj, "baz.1">;

        type cases = [
            Expect<Test<Shallow, "equals", 1>>,
            Expect<Test<ObjDeep, "equals", "a">>,
            Expect<Test<ArrDeep, "equals", 2>>,
        ];
        const cases: cases = [true, true, true];
    });


    it("type: Unavailable", () => {
        type Obj = {
            foo: 1;
            bar: {
                a: "a";
                b: "b";
            };
            baz: [1, 2, 3];
        };

        type Undef = Get<Obj, "bar.c">;
        type WithDef = Get<Obj, "bar.c", 0>;

        // @ts-ignore
        type cases = [
            Expect<Test<Undef, "equals", undefined>>,
            Expect<Test<WithDef, "equals", 0>>,
        ];

    });


    it("runtime happy path", () => {
        const deep = ref({ deeperStill: [4, 5, 6] } as const);
        const obj = {
            foo: 1,
            bar: {
                a: "a",
                b: "b"
            },
            baz: [1, 2, 3],
            deep: deep
        } as const;

        const identity = get(42, null);
        const shallow = get(obj, "foo");
        const deepObj = get(obj, "bar.a");
        const deepArr = get(obj, "baz.1");
        const deeperArr = get(obj, "deep.value.deeperStill.1");
        const err1 = get(obj, "foo.not.exist");
        const handleErr = get(obj, "foo.not.exist", { handleInvalidDotpath: "foobar" });

        expect(identity, `null dotpath works for scalar`).toBe(42);
        expect(shallow, `shallow get`).toBe(1);
        expect(deepObj, "deep object get").toBe("a");
        expect(deepArr, "deep array get").toBe(2);
        expect(deeperArr, "deeper array get").toBe(5);
        expect(isErrorCondition(err1)).toBe(true);
        expect(handleErr).toBe("foobar");

        type cases = [
            Expect<Test<typeof shallow, "equals", 1>>,
            Expect<Test<typeof deepObj, "equals", "a">>,
            Expect<Test<typeof deepArr, "equals", 2>>,
            Expect<Test<typeof deeperArr, "equals", 5>>,
        ];
        const cases: cases = [true, true, true, true];
    });


    it("Runtime Errors", () => {
        const deeperStill = ref([4, 5, 6] as const);
        const obj = {
            foo: 1,
            bar: {
                a: "a",
                b: "b"
            },
            baz: [1, 2, 3],
            deep: {
                deeperStill
            }
        } as const;

        const err1 = get(obj, "bar.abc");
        const err2 = get(obj, "deep.notSoDeep");

        const handled1 = get(obj, "bar.abc", { handleInvalidDotpath: "handled" });
        const handled2 = get(obj, "deep.notSoDeep", { handleInvalidDotpath: "handled" });

        expect(isErrorCondition(err1), "err1 should have been an error").toBe(true);
        expect(isErrorCondition(err2), "err2 should have been an error").toBe(true);
        expect(handled1, "handled1 should have been handled").toBe("handled");
        expect(handled2, "handled2 should have been handled").toBe("handled");
    });

    it("Runtime default values", () => {
        type Obj = {
            foo: number;
            bar: Record<string, string | undefined>;
            baz: number[];
        };

        const obj: Obj = {
            foo: 1,
            bar: {
                a: "a",
                b: "b",
                c: undefined,
            },
            baz: [1, 2, 3],
        };

        const defVal = get(obj, "bar.c", { defaultValue: "foobar" });

        expect(defVal).toBe("foobar");
    });


});

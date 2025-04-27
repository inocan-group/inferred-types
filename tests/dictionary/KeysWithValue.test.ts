import { describe, it } from "vitest";

import {
    Expect,
    KeysWithValue,
    Dictionary,
    AnyFunction,
    Test
} from "inferred-types/types";
import { createFnWithProps } from "inferred-types/runtime";


const obj = {
    id: "foobar",
    foo2: 2,
    success: true,
    fail: false,
    narrowFn: (name: string) => `hi ${name}`,
    narrowFnWithProps: createFnWithProps(() => "hi", { foo: "there" }),
    foo: 1,
    bar: true,
    message: "hi there",
    numericArr: [1, 2, 3] as number[],
    strArr: ["foo", "bar"] as string[],
    fn: () => "hi",
    fnWithProp: createFnWithProps(() => "hi", { foo: "there" }),
    baz: { foo: 1, bar: 2 },
    emptyBaz: {}
} as const;

describe("KeysWithValue<T> utility", () => {

    it("happy path", () => {
        type Num = KeysWithValue<typeof obj, number>;
        type Str = KeysWithValue<typeof obj, string>;
        type Arr = KeysWithValue<typeof obj, unknown[]>;
        type RoArr = KeysWithValue<typeof obj, readonly unknown[]>;
        type Bool = KeysWithValue<typeof obj, boolean>;

        type Fn = KeysWithValue<typeof obj, AnyFunction>;
        type ObjOfType = KeysWithValue<typeof obj, { foo: unknown; bar: unknown }>;
        type Obj = KeysWithValue<typeof obj, Dictionary>;

        type cases = [
            Expect<Test<Num, "equals", "foo" | "foo2">>,
            Expect<Test<Str, "equals", "message" | "id">>,
            Expect<Test<Arr, "equals", "numericArr" | "strArr">>,
            Expect<Test<RoArr, "equals", "numericArr" | "strArr">>,
            Expect<Test<Bool, "equals", "bar" | "success" | "fail">>,

            Expect<Test<ObjOfType, "equals", "baz">>,
            Expect<Test<Obj, "equals", "baz" | "emptyBaz">>,
            Expect<Test<Fn, "equals", "fn" | "fnWithProp" | "narrowFn" | "narrowFnWithProps">>,
        ];

    });

    it("using literal types for match", () => {
        type Num = KeysWithValue<typeof obj, 2 | 3>;
        type True = KeysWithValue<typeof obj, true>;
        type False = KeysWithValue<typeof obj, false>;

        type cases = [
            Expect<Test<Num, "equals", "foo2">>,
            Expect<Test<True, "equals", "success" | "bar">>,
            Expect<Test<False, "equals", "fail">>,
        ];
    });
});

import { describe, it } from "vitest";
import {
    Expect,
    IT_TakeAtomic,
    Test,
} from "inferred-types/types";
import { IT_Token } from "types/runtime-types/type-defn/input-tokens/IT_Base";

describe("IT_TakeAtomic<T>", () => {

    it("happy path", () => {
        type Str = IT_TakeAtomic<"string">;
        type Num = IT_TakeAtomic<"number">;
        type Biggie = IT_TakeAtomic<"bigint">;
        type Null = IT_TakeAtomic<"null">;
        type Undef = IT_TakeAtomic<"undefined">;
        type Void = IT_TakeAtomic<"void">;
        type Obj = IT_TakeAtomic<"object">;
        type Obj2 = IT_TakeAtomic<"Object">;

        type cases = [
            Expect<Test<Str, "extends", IT_Token<"atomic">>>,
            Expect<Test<Num, "extends", IT_Token<"atomic">>>,
            Expect<Test<Biggie, "extends", IT_Token<"atomic">>>,
            Expect<Test<Null, "extends", IT_Token<"atomic">>>,
            Expect<Test<Undef, "extends", IT_Token<"atomic">>>,


            Expect<Test<Str["type"], "equals", string>>,
            Expect<Test<Num["type"], "equals", number>>,
            Expect<Test<Biggie["type"], "equals", bigint>>,
            Expect<Test<Null["type"], "equals", null>>,
            Expect<Test<Undef["type"], "equals", undefined>>,
            Expect<Test<Void["type"], "equals", void>>,
            Expect<Test<Obj["type"], "equals", object>>,
            Expect<Test<Obj2["type"], "equals", object>>,
        ];
    });


    it("trailing content", () => {
        type Union = IT_TakeAtomic<"string   | number">;

        type cases = [
            Expect<Test<Union, "extends", IT_Token<"atomic">>>,
            Expect<Test<Union["type"], "equals", string>>,
            Expect<Test<Union["rest"], "equals", "| number">>
        ];
    });


});

import { describe, it } from "vitest";
import {
    Char,
    DoesExtend,
    Expect,
    NestingKeyValue,
    AssertTrue,
} from "inferred-types/types";

describe("NestingKeyValue<T>", () => {

    it("valid config", () => {
        type T0a = DoesExtend<")", Char>;
        type T0b = DoesExtend<"(", Char>;
        type T1 = DoesExtend<{ "(": ")" }, NestingKeyValue>;

        type cases = [
            Expect<AssertTrue<T0a>>,
            Expect<AssertTrue<T0b>>,
            Expect<AssertTrue<T1>>,
        ];
    });

});

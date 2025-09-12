import { describe, it } from "vitest";
import type { Expect, IT_TakeKvObjects, IT_Token, Test } from "inferred-types/types";

describe("TakeKeyValueTokens<T>", () => {

    it("take Records", () => {
        type T1 = IT_TakeKvObjects<"Record<string,string>">;

        type cases = [
            Expect<Test<T1, "extends", IT_Token>>,
            Expect<Test<T1, "extends", IT_Token<"kv">>>,
            Expect<Test<T1["type"], "equals", Record<string,string>>>,
        ];
    });

    it("take Maps", () => {
        type T1 = IT_TakeKvObjects<"Map<string, number>">;
        type T2 = IT_TakeKvObjects<`Map<"foo" | "bar", number>`>;

        type cases = [
            Expect<Test<T1, "extends", IT_Token>>,
            Expect<Test<T1, "extends", IT_Token<"kv">>>,
            Expect<Test<T1["type"], "equals", Map<string, number>>>
        ];
    });

    it("take WeakMaps", () => {
        type T1 = IT_TakeKvObjects<"WeakMap<object, string>">;

        type cases = [
            Expect<Test<T1, "extends", IT_Token>>,
            Expect<Test<T1, "extends", IT_Token<"kv">>>,
            Expect<Test<T1["type"], "equals", WeakMap<object,string>>>
        ];
    });

    it("Records with union keys", () => {
        type T1 = IT_TakeKvObjects<"Record<'foo' | 'bar', string | number>">;

        type cases = [
            Expect<Test<T1, "extends", IT_Token>>,
            Expect<Test<T1, "extends", IT_Token<"kv">>>,
            Expect<Test<T1["type"], "equals", Record<"foo" | "bar", string | number>>>
        ];
    });

});

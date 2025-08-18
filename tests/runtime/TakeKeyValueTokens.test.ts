import { describe, it } from "vitest";
import {
    Expect,
    TakeKeyValueTokens,
    Test,
} from "inferred-types/types";

describe("TakeKeyValueTokens<T>", () => {

    it("take Records", () => {
        type T1 = TakeKeyValueTokens<"Record<string,string>">;


        type cases = [
            Expect<Test<T1["type"], "equals", Record<string,string>>>,
        ];
    });


    it("take Maps", () => {
        type T1 = TakeKeyValueTokens<"Map<string, number>">;

        type cases = [
            Expect<Test<T1["type"], "equals", Map<string, number>>>
        ];
    });





    it("Records with union keys", () => {
        type T1 = TakeKeyValueTokens<"Record<String(foo) | String(bar), string | number>">;

        type cases = [
            Expect<Test<T1["type"], "equals", Record<"foo" | "bar", string | number>>>
        ];
    });


});

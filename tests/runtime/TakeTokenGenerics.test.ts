import { describe, it } from "vitest";
import {
    Expect,
    Test,
} from "inferred-types/types";
import { TakeTokenGenerics } from "inferred-types/types";

describe("TakeTokenGenerics<T>", () => {

    it("happy path", () => {
        type T1 = TakeTokenGenerics<"<T extends string, U extends Record<string,string>>">;
        type T2 = TakeTokenGenerics<"T extends string, U extends Record<string,string>>">;

        type Expected = {
            generics: [
                { name: "T", token: "string", type: string },
                { name: "U", token: "Record<string,string>", type: Record<string,string>}
            ],
            rest: ""
        }


        type cases = [
            Expect<Test<T1, "equals", Expected>>,
            Expect<Test<T2, "equals", Expected>>,
        ];
    });


    it("invalid tokens", () => {


        type cases = [
            /** type tests */
        ];
    });


});

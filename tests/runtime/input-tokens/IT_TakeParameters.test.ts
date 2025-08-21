import { describe, it } from "vitest";
import {
    Expect,
    IT_TakeParameters,
    IT_TakeTokenGenerics,
    Test,
} from "inferred-types/types";

describe("IT_TakeParameters<T>", () => {

    it("no generics", () => {
        type T1 = IT_TakeParameters<"(name: string) => string">; // =>

        type Expected = [{
            name: "name";
            token: "string";
            fromGeneric: false;
            type: string;
        }]

        type cases = [
            Expect<Test<T1, "equals", Expected>>,
        ];
    });

    it("with generics", () => {
        type A1 = IT_TakeTokenGenerics<"T extends string>(name: T) => string">;
        type T1 = IT_TakeParameters<"<T extends string>(name: T) => string">;
        //   ^?

        type Expected = [{
            name: "name";
            token: "string";
            fromGeneric: false;
            type: string;
        }]

        type cases = [
            Expect<Test<T1, "equals", Expected>>,
        ];
    });


});

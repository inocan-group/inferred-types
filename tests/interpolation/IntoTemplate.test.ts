import { describe, it } from "vitest";
import {
    Expect,
    IntoTemplate,
    Test,
} from "inferred-types/types";

describe("IntoTemplate<TTpl, TArgs>", () => {

    it("single string interpolation", () => {
        type V = IntoTemplate<`Hi ${string}`, ["Bob"]>;

        type cases = [
            Expect<Test<V, "equals", `Hi Bob`>>
        ];
    });

    it("single numeric interpolation", () => {
        type V = IntoTemplate<`Age: ${number}`, [45]>;

        type cases = [
            Expect<Test<V, "equals", `Age: 45`>>
        ];
    });

    it("string -> number -> string", () => {
        type V = IntoTemplate<`${string} is ${number} years old and his favorite color is ${string}.`, ["Bob", 45, "blue"]>;

        type cases = [
            Expect<Test<V, "equals", `Bob is 45 years old and his favorite color is blue.`>>
        ];
    });

});



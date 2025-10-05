
import { describe, it } from "vitest";
import type { AssertEqual, Expect, Max, Test } from "inferred-types/types";

describe("Max<T>", () => {

    it("with arrays", () => {
        type Nada = Max<[]>;
        type InOrder = Max<[1, 2, 3, 4, 5]>;
        type Chaotic = Max<[8, 5, 3, 1, 2, 4]>;
        type Big = Max<[0, 8000, 1]>;

        type cases = [
            Expect<Test<Nada, "equals",  undefined>>,
            Expect<Test<InOrder, "equals",  5>>,
            Expect<Test<Chaotic, "equals",  8>>,
            Expect<Test<Big, "equals",  8000>>,
        ];
    });


    it("with singular number", () => {
        type Five = Max<5>;

        type cases = [
            Expect<AssertEqual<Five, 5>>
        ];
    });


    it("with numeric union", () => {
        type Union = Max<1|2|3>;

        type cases = [
            Expect<AssertEqual<Union,3>>
        ];
    });



});

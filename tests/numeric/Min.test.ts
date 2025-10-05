import { describe, it } from "vitest";
import type {
    Expect,
    Min,
    Test,
    AssertEqual
} from "inferred-types/types";

describe("Min<T>", () => {

    it("with tuple", () => {
        type Nada = Min<[]>;
        type InOrder = Min<[1,2,3,4,5]>;
        type Chaotic = Min<[8,5,3,1,2,4]>;
        type Zero = Min<[0,8,1]>;

        type cases = [
            Expect<Test<Nada, "equals",  undefined>>,
            Expect<Test<InOrder, "equals",  1>>,
            Expect<Test<Chaotic, "equals",  1>>,
            Expect<Test<Zero, "equals",  0>>,
        ];
    });


    it("with singular number", () => {
        type Five = Min<5>;

        type cases = [
            Expect<AssertEqual<Five, 5>>
        ];
    });


    it("with numeric union", () => {
        type Union = Min<1|2|3>;

        type cases = [
            Expect<AssertEqual<Union, 1>>
        ];
    });


});

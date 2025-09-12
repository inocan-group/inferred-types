
import { describe, it } from "vitest";
import type { ContainerKeyGuarantee, Expect, Test } from "inferred-types/types";

describe("ContainerKeyGuarantee<T>", () => {

    it("happy path", () => {
        type Obj = { foo: 1 };
        type Tup = [1, 2, 3];
        type StrArr = string[];

        type Bar = ContainerKeyGuarantee<Obj, "bar">;
        type Two = ContainerKeyGuarantee<Tup, 2>;
        type ThreeArr = ContainerKeyGuarantee<StrArr, 3>;

        type cases = [
            Expect<Test<Bar, "equals",  { foo: 1; bar: unknown }>>,
            Expect<Test<Two, "equals",  Tup & readonly [unknown, unknown, unknown]>>,
            Expect<Test<ThreeArr, "equals",  ThreeArr & readonly [unknown, unknown, unknown, unknown]>>,
        ];
    });

});

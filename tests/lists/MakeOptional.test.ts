import { describe, it } from "vitest";
import {
    Expect,
    MakeOptional,
    Test,
} from "inferred-types/types";

describe("MakeOptional<T,U>", () => {

    it("from all optional", () => {
        type Opt = [ 1?, 2?, string? ];
        type T1 = MakeOptional<Opt,1>;
        type T2 = MakeOptional<Opt,2>;
        type T3 = MakeOptional<Opt,3>;

        type cases = [
            Expect<Test<T1, "equals", [1,2, string?]>>,
            Expect<Test<T2, "equals", [1,2?, string?]>>,
            Expect<Test<T3, "equals", [1?,2?, string?]>>,
        ];
    });

    it("from all required", () => {
        type Opt = [ 1, 2, string ];
        type T1 = MakeOptional<Opt,1>;
        type T2 = MakeOptional<Opt,2>;
        type T3 = MakeOptional<Opt,3>;

        type cases = [
            Expect<Test<T1, "equals", [1,2, string?]>>,
            Expect<Test<T2, "equals", [1,2?, string?]>>,
            Expect<Test<T3, "equals", [1?,2?, string?]>>,
        ];
    });


    it("from mixed", () => {
        type Opt = [ 1, 2, string? ];
        type T1 = MakeOptional<Opt,1>;
        type T2 = MakeOptional<Opt,2>;
        type T3 = MakeOptional<Opt,3>;

        type cases = [
            Expect<Test<T1, "equals", [1,2, string?]>>,
            Expect<Test<T2, "equals", [1,2?, string?]>>,
            Expect<Test<T3, "equals", [1?,2?, string?]>>,
        ];
    });

});

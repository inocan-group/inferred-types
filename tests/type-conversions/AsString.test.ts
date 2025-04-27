import { describe, it } from "vitest";
import {
    Expect,
    AsString,
    Something,
    Test
} from "inferred-types/types";

describe("AsString<T>", () => {

    it("happy path", () => {
        type Foobar = AsString<"Foobar">;
        type WideStr = AsString<string>;
        type U1 = AsString<string | readonly string[]>;
        type U2 = AsString<Something>;
        type SU = AsString<"foobar" | null>;

        type Num = AsString<42>;
        type NU = AsString<42 | null>;

        type B1 = AsString<true>;
        type BU = AsString<boolean>;

        type SA = AsString<string[]>;

        type cases = [
            Expect<Test<Foobar, "equals",  "Foobar">>,
            Expect<Test<WideStr, "equals",  string>>,
            Expect<Test<U1, "equals",  string>>,
            Expect<Test<U2, "equals",  string>>,
            Expect<Test<SU, "equals",  "foobar">>,

            Expect<Test<Num, "equals",  "42">>,
            Expect<Test<NU, "equals",  "42">>,

            Expect<Test<B1, "equals",  "true">>,
            Expect<Test<BU, "equals",  "true" | "false">>,

            Expect<Test<SA, "equals",  never>>,
            Expect<Test<AsString<string[] | string>, "equals",  string>>,
            Expect<Test<AsString<null>, "equals",  never>>,
            Expect<Test<AsString<undefined>, "equals",  never>>,

        ];
    });

});

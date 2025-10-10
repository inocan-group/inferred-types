import { describe, it } from "vitest";
import {
    AssertEqual,
    Every,
    Expect,
    FromCsv,
    AssertTrue,
    HasIndex,
} from "inferred-types/types";

describe("FromCsv<T>", () => {

    type Data = `Name,Age,Rank
    Bob,45,Chief
    Chris,32,Manager
    Wendy,44,General Manager
    Todd,22,Muppet
    `;
    it("as multidimensional array", () => {
        type T1 = FromCsv<Data>;

        type cases = [
            Expect<AssertEqual<T1["length"],5>>,
            Expect<AssertTrue<Every<T1, "hasLength", 3>>>
        ];
    });


    it("as Key/Value array", () => {
        type T1 = FromCsv<Data, "KV[]">;

        type cases = [
            Expect<AssertEqual<T1["length"],5>>,
            Expect<AssertTrue<
                And<{
                    [K in keyof T1]: HasIndex<T1[K], "Name"> extends true
                        ? HasIndex<T1[K], "Age"> extends true
                            ? HasIndex<T1[K], "Rank"> extends true
                                ? true
                                : false
                        : false
                    : false
                }>
            >>
        ];
    });


});

import { describe, it } from "vitest";
import {
    AssertEqual,
    Every,
    Expect,
    FromCsv,
    AssertTrue,
    HasIndex,
    And,
    Test,
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
            // Should have 4 data rows (header is consumed for keys)
            Expect<AssertEqual<T1["length"], 4>>,

            // First object should have the correct keys
            Expect<AssertTrue<HasIndex<T1[0], "Name">>>,
            Expect<AssertTrue<HasIndex<T1[0], "Age">>>,
            Expect<AssertTrue<HasIndex<T1[0], "Rank">>>,

            // Values should extend string (they will be literal strings)
            Expect<Test<T1[0]["Name"], "extends", string>>,
            Expect<Test<T1[0]["Age"], "extends", string>>,
            Expect<Test<T1[0]["Rank"], "extends", string>>,

            // Test specific values for first row
            Expect<AssertEqual<T1[0]["Name"], "Bob">>,
            Expect<AssertEqual<T1[0]["Age"], "45">>,
            Expect<AssertEqual<T1[0]["Rank"], "Chief">>,

            // Test last row
            Expect<AssertEqual<T1[3]["Name"], "Todd">>,
            Expect<AssertEqual<T1[3]["Age"], "22">>,
            Expect<AssertEqual<T1[3]["Rank"], "Muppet">>,

            // All objects should have the same keys
            Expect<AssertTrue<HasIndex<T1[1], "Name">>>,
            Expect<AssertTrue<HasIndex<T1[2], "Age">>>,
            Expect<AssertTrue<HasIndex<T1[3], "Rank">>>,
        ];
    });

    it("multidimensional array with specific values", () => {
        type T1 = FromCsv<Data>;

        type cases = [
            // Test header row
            Expect<AssertEqual<T1[0][0], "Name">>,
            Expect<AssertEqual<T1[0][1], "Age">>,
            Expect<AssertEqual<T1[0][2], "Rank">>,

            // Test first data row
            Expect<AssertEqual<T1[1][0], "Bob">>,
            Expect<AssertEqual<T1[1][1], "45">>,
            Expect<AssertEqual<T1[1][2], "Chief">>,

            // Test row with space in value
            Expect<AssertEqual<T1[3][2], "General Manager">>,
        ];
    });

    it("handles CSV with no trailing whitespace", () => {
        type CleanData = `A,B,C
1,2,3
4,5,6`;

        type Multi = FromCsv<CleanData, "[][]">;
        type KV = FromCsv<CleanData, "KV[]">;

        type cases = [
            // Multi should have 3 rows
            Expect<AssertEqual<Multi["length"], 3>>,
            Expect<Test<Multi[0], "hasSameValues", ["A", "B", "C"]>>,
            Expect<Test<Multi[1], "hasSameValues", ["1", "2", "3"]>>,

            // KV should have 2 data objects
            Expect<AssertEqual<KV["length"], 2>>,
            Expect<AssertEqual<KV[0]["A"], "1">>,
            Expect<AssertEqual<KV[1]["C"], "6">>,
        ];
    });

    it("handles single data row", () => {
        type SingleRow = `Name,Value
Test,123`;

        type Multi = FromCsv<SingleRow, "[][]">;
        type KV = FromCsv<SingleRow, "KV[]">;

        type cases = [
            Expect<AssertEqual<Multi["length"], 2>>,
            Expect<AssertEqual<KV["length"], 1>>,
            Expect<AssertEqual<KV[0]["Name"], "Test">>,
            Expect<AssertEqual<KV[0]["Value"], "123">>,
        ];
    });

});



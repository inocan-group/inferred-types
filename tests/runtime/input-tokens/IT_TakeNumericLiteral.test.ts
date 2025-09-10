import { describe, it } from "vitest";
import {
    Expect,
    IT_TakeNumericLiteral,
    IT_Token,
    Test,
} from "inferred-types/types";

describe("IT_TakeNumericLiteral<T>", () => {

    it("bare numeric literal", () => {
        type Complete = IT_TakeNumericLiteral<"42">;
        type Partial = IT_TakeNumericLiteral<"42 | 56">;

        type Invalid = IT_TakeNumericLiteral<"42a">;


        type cases = [
            Expect<Test<Complete, "extends", IT_Token<"literal">>>,
            Expect<Test<Invalid, "isError", "malformed-token/numeric-literal">>,

            Expect<Test<Complete["type"], "equals", 42>>,
            Expect<Test<Partial["type"], "equals", 42>>,
            Expect<Test<Partial["rest"], "equals", "| 56">>,
        ];
    });

    it("negative number", () => {
        type Complete = IT_TakeNumericLiteral<"-42">;
        type Partial = IT_TakeNumericLiteral<"-42 | 56">;

        type cases = [
            Expect<Test<Complete, "extends", IT_Token<"literal">>>,

            Expect<Test<Complete["type"], "equals", -42>>,
            Expect<Test<Partial["type"], "equals", -42>>,
            Expect<Test<Partial["rest"], "equals", "| 56">>,
        ];
    });


    it("float", () => {
        type Complete = IT_TakeNumericLiteral<"42.01">;
        type Partial = IT_TakeNumericLiteral<"42.01 | 56">;

        type cases = [
            Expect<Test<Complete, "extends", IT_Token<"literal">>>,

            Expect<Test<Complete["type"], "equals", 42.01>>,
            Expect<Test<Partial["type"], "equals", 42.01>>,
            Expect<Test<Partial["rest"], "equals", "| 56">>,
        ];
    });



    it("Numeric constructor", () => {
        type CompleteInt = IT_TakeNumericLiteral<"Number(42)">;
        type PartialInt = IT_TakeNumericLiteral<"Number(42) | Number(56)">;

        type CompleteFloat = IT_TakeNumericLiteral<"Number(42.01)">;
        type PartialFloat = IT_TakeNumericLiteral<"Number(42.01) | Number(56)">;

        type NegCompleteFloat = IT_TakeNumericLiteral<"Number(-42.01)">;
        type NegPartialFloat = IT_TakeNumericLiteral<"Number(-42.01) | Number(56)">;

        type Invalid = IT_TakeNumericLiteral<"Number(abc)">;

        type cases = [
            Expect<Test<CompleteInt, "extends", IT_Token<"literal">>>,
            Expect<Test<PartialInt, "extends", IT_Token<"literal">>>,
            Expect<Test<CompleteFloat, "extends", IT_Token<"literal">>>,
            Expect<Test<PartialFloat, "extends", IT_Token<"literal">>>,
            Expect<Test<Invalid, "isError", "malformed-token">>,

            Expect<Test<CompleteInt["type"], "equals", 42>>,
            Expect<Test<PartialInt["type"], "equals", 42>>,
            Expect<Test<PartialInt["rest"], "equals", "| Number(56)">>,

            Expect<Test<CompleteFloat["type"], "equals", 42.01>>,
            Expect<Test<PartialFloat["type"], "equals", 42.01>>,
            Expect<Test<PartialFloat["rest"], "equals", "| Number(56)">>,

            Expect<Test<NegCompleteFloat["type"], "equals", -42.01>>,
            Expect<Test<NegPartialFloat["type"], "equals", -42.01>>,
            Expect<Test<NegPartialFloat["rest"], "equals", "| Number(56)">>,

        ];
    });


});

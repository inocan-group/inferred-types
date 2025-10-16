
import { describe, it } from "vitest";
import type { Expect, IsBooleanLike, Test } from "inferred-types/types";

describe("IsBooleanLike<T>", () => {

    it("valid boolean-like string literals", () => {
        type BooleanStr = IsBooleanLike<"boolean">;
        type TrueStr = IsBooleanLike<"true">;
        type FalseStr = IsBooleanLike<"false">;

        type cases = [
            Expect<Test<BooleanStr, "equals", true>>,
            Expect<Test<TrueStr, "equals", true>>,
            Expect<Test<FalseStr, "equals", true>>,
        ];
    });

    it("invalid string literals", () => {
        type Foo = IsBooleanLike<"foo">;
        type Yes = IsBooleanLike<"yes">;
        type No = IsBooleanLike<"no">;
        type One = IsBooleanLike<"1">;
        type Zero = IsBooleanLike<"0">;
        type Empty = IsBooleanLike<"">;
        type TrueCapital = IsBooleanLike<"True">;
        type FalseCapital = IsBooleanLike<"False">;

        type cases = [
            Expect<Test<Foo, "equals", false>>,
            Expect<Test<Yes, "equals", false>>,
            Expect<Test<No, "equals", false>>,
            Expect<Test<One, "equals", false>>,
            Expect<Test<Zero, "equals", false>>,
            Expect<Test<Empty, "equals", false>>,
            Expect<Test<TrueCapital, "equals", false>>,
            Expect<Test<FalseCapital, "equals", false>>,
        ];
    });

    it("wide string type", () => {
        type Wide = IsBooleanLike<string>;

        type cases = [
            Expect<Test<Wide, "equals", boolean>>,
        ];
    });

    it("non-string types", () => {
        type Num = IsBooleanLike<42>;
        type Bool = IsBooleanLike<true>;
        type BoolFalse = IsBooleanLike<false>;
        type Obj = IsBooleanLike<{ foo: "bar" }>;
        type Arr = IsBooleanLike<[]>;
        type Null = IsBooleanLike<null>;
        type Undefined = IsBooleanLike<undefined>;
        type Func = IsBooleanLike<() => void>;

        type cases = [
            Expect<Test<Num, "equals", false>>,
            Expect<Test<Bool, "equals", false>>,
            Expect<Test<BoolFalse, "equals", false>>,
            Expect<Test<Obj, "equals", false>>,
            Expect<Test<Arr, "equals", false>>,
            Expect<Test<Null, "equals", false>>,
            Expect<Test<Undefined, "equals", false>>,
            Expect<Test<Func, "equals", false>>,
        ];
    });

    it("union types with only valid literals", () => {
        type BoolAndTrue = IsBooleanLike<"boolean" | "true">;
        type TrueAndFalse = IsBooleanLike<"true" | "false">;
        type AllThree = IsBooleanLike<"boolean" | "true" | "false">;

        type cases = [
            Expect<Test<BoolAndTrue, "equals", true>>,
            Expect<Test<TrueAndFalse, "equals", true>>,
            Expect<Test<AllThree, "equals", true>>,
        ];
    });

    it("union types with mixed valid and invalid string literals", () => {
        type ValidAndInvalid = IsBooleanLike<"true" | "foo">;
        type BooleanAndBar = IsBooleanLike<"boolean" | "bar">;
        type FalseAndYes = IsBooleanLike<"false" | "yes">;

        type cases = [
            Expect<Test<ValidAndInvalid, "equals", boolean>>,
            Expect<Test<BooleanAndBar, "equals", boolean>>,
            Expect<Test<FalseAndYes, "equals", boolean>>,
        ];
    });

    it("union types with strings and non-strings", () => {
        type StrAndNum = IsBooleanLike<"true" | 42>;
        type BooleanAndBool = IsBooleanLike<"boolean" | true>;
        type FalseAndNull = IsBooleanLike<"false" | null>;

        type cases = [
            Expect<Test<StrAndNum, "equals", boolean>>,
            Expect<Test<BooleanAndBool, "equals", boolean>>,
            Expect<Test<FalseAndNull, "equals", boolean>>,
        ];
    });

    it("union types with only non-strings", () => {
        type NumUnion = IsBooleanLike<42 | 56>;
        type BoolUnion = IsBooleanLike<true | false>;
        type Mixed = IsBooleanLike<42 | true | null>;

        type cases = [
            Expect<Test<NumUnion, "equals", false>>,
            Expect<Test<BoolUnion, "equals", false>>,
            Expect<Test<Mixed, "equals", false>>,
        ];
    });

    it("edge cases", () => {
        type Never = IsBooleanLike<never>;
        type Unknown = IsBooleanLike<unknown>;
        type Any = IsBooleanLike<any>;

        type cases = [
            // Implementation explicitly handles never to return false
            Expect<Test<Never, "equals", false>>,
            // Unknown is handled as boolean since it could be a valid string
            Expect<Test<Unknown, "equals", boolean>>,
            // any results in boolean due to how TypeScript handles any
            Expect<Test<Any, "equals", boolean>>,
        ];
    });

});

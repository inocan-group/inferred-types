import { describe, it } from "vitest";
import type { Expect, TakeSeconds, Test, TwoDigitSecond } from "inferred-types/types";

describe("TakeSeconds<T>", () => {

    it("numeric literal generic tests validity", () => {
        type Valid = TwoDigitSecond<"42">;
        type Invalid = TwoDigitSecond<"99">;

        type cases = [
            Expect<Test<Valid, "equals", TwoDigitSecond<"branded"> & "42">>,
            Expect<Test<Invalid, "isError", "invalid-type">>
        ];
    });

    it("happy path", () => {
        type T1 = TakeSeconds<"03, more">;
        type T2 = TakeSeconds<"59 seconds">;
        type T3 = TakeSeconds<"00:00:00">;
        type T4 = TakeSeconds<"45">;

        type cases = [
            Expect<Test< T1, "equals", { take: TwoDigitSecond<"03">, rest: ", more" }>>,
            Expect<Test< T2, "equals", { take: TwoDigitSecond<"59">, rest: " seconds" }>>,
            Expect<Test< T3, "equals", { take: TwoDigitSecond<"00">, rest: ":00:00" }>>,
            Expect<Test< T4, "equals", { take: TwoDigitSecond<"45">, rest: "" }>>,
        ];
    });

    it("invalid seconds", () => {
        type T1 = TakeSeconds<"60 seconds">;  // 60 is not valid
        type T2 = TakeSeconds<"99 seconds">;  // > 59
        type T3 = TakeSeconds<"a5 seconds">;  // not numeric
        type T4 = TakeSeconds<"5 seconds">;   // single digit
        type T5 = TakeSeconds<"">;            // empty string

        type cases = [
            Expect<Test< T1, "isError", "parse-time">>,
            Expect<Test< T2, "isError", "parse-time">>,
            Expect<Test< T3, "isError", "parse-time">>,
            Expect<Test< T4, "isError", "parse-time">>,
            Expect<Test< T5, "isError", "parse-time">>,
        ];
    });

    it("wide string types", () => {
        type Wide = string;
        type T1 = TakeSeconds<Wide>;
        type T2 = TakeSeconds<`${string}seconds`>;
        type T3 = TakeSeconds<`${number}seconds`>;

        type cases = [
            Expect<Test<
                T1, "equals",
                Error | { take: TwoDigitSecond<"branded">; rest: string }
            >>,
            Expect<Test<
                T2, "equals",
                Error | { take: TwoDigitSecond<"branded">; rest: string }
            >>,
            Expect<Test<
                T3, "equals",
                Error | { take: TwoDigitSecond<"branded">; rest: string }
            >>,
        ];
    });

});

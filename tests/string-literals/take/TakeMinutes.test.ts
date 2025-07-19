import { describe, it } from "vitest";
import {
    Expect,
    TakeMinutes,
    Test,
    TwoDigitMinute,
} from "inferred-types/types";

describe("TakeMinutes<T>", () => {

    it("happy path", () => {
        type T1 = TakeMinutes<"03, more">;
        type T2 = TakeMinutes<"59 minutes">;
        type T3 = TakeMinutes<"00:00:00">;
        type T4 = TakeMinutes<"45">;
        type T5 = TakeMinutes<"30:00">;

        type cases = [
            Expect<Test< T1, "equals", { take: TwoDigitMinute<"03">, rest: ", more" }>>,
            Expect<Test< T2, "equals", { take: TwoDigitMinute<"59">, rest: " minutes" }>>,
            Expect<Test< T3, "equals", { take: TwoDigitMinute<"00">, rest: ":00:00" }>>,
            Expect<Test< T4, "equals", { take: TwoDigitMinute<"45">, rest: "" }>>,
            Expect<Test< T5, "equals", { take: TwoDigitMinute<"30">, rest: ":00" }>>,
        ];
    });

    it("invalid minutes", () => {
        type T1 = TakeMinutes<"60 minutes">;  // 60 is not valid
        type T2 = TakeMinutes<"99 minutes">;  // > 59
        type T3 = TakeMinutes<"a5 minutes">;  // not numeric
        type T4 = TakeMinutes<"5 minutes">;   // single digit
        type T5 = TakeMinutes<"">;            // empty string
        type T6 = TakeMinutes<"6a minutes">;  // second char not numeric

        type cases = [
            Expect<Test<T1, "isError","parse-time">>,
            Expect<Test<T2, "isError","parse-time">>,
            Expect<Test<T3, "isError","parse-time">>,
            Expect<Test<T4, "isError","parse-time">>,
            Expect<Test<T5, "isError","parse-time">>,
            Expect<Test<T6, "isError","parse-time">>,
        ];
    });

    it("wide string types", () => {
        type Wide = string;
        type T1 = TakeMinutes<Wide>;
        type T2 = TakeMinutes<`${string}minutes`>;
        type T3 = TakeMinutes<`${number}minutes`>;

        type cases = [
            Expect<Test< T1, "extends", Error | { take: TwoDigitMinute<"branded">; rest: string }>>,
            Expect<Test< T2, "extends", Error | { take: TwoDigitMinute<"branded">; rest: string }>>,
            Expect<Test< T3, "extends", Error | { take: TwoDigitMinute<"branded">; rest: string }>>,
        ];
    });

});

import { describe, it } from "vitest";
import {
    Expect,
    TakeSeconds,
    Test,
} from "inferred-types/types";

describe("TakeMinutes<T>", () => {

    it("happy path", () => {
        type T1 = TakeSeconds<"03, more">;

        type cases = [
            Expect<Test< T1, "equals", ["03", ", more"]>>
        ];
    });


    it("negative tests", () => {
        type F1 = TakeSeconds<"3, more">;

        type cases = [
            Expect<Test<F1, "equals", [ undefined, "3, more"]>>
        ];
    });


});

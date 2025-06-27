import { describe, it } from "vitest";
import {
    Expect,
    TakeSeconds,
    Test,
} from "inferred-types/types";

describe("TakeSeconds<T>", () => {

    it("happy path", () => {
        type T1 = TakeSeconds<"03, more">;

        type cases = [
            Expect<Test< T1, "equals", ["03", ", more"]>>
        ];
    });

});

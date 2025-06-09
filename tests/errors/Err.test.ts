import { describe, expect, it } from "vitest";
import {
    Err,
    Expect,
    Test,
} from "inferred-types/types";
import { err } from "inferred-types/runtime";

describe("Err<...>", () => {

    it("errors from Err extend Error", () => {
        type E1 = Err<`invalid/juju`>;
        type E2 = Err<`invalid/juju`, 'bad stuff happening'>;
        type E3 = Err<`invalid/juju`, 'bad stuff happening', { foo: 1}>;

        type cases = [
            Expect<Test<E1, "extends", Error>>,
            Expect<Test<E2, "extends", Error>>,
            Expect<Test<E3, "extends", Error>>,
        ];
    });

});

describe("err()", () => {

    it("error from err() extend Error", () => {
        const e1 = err("invalid/juju");
        const e2 = err("invalid/juju", "bad stuff happening");
        const e3 = err("invalid/juju", "bad stuff happening", { foo: 1 });

        expect(e1 instanceof Error).toBe(true);
        expect(e2 instanceof Error).toBe(true);
        expect(e3 instanceof Error).toBe(true);

        type cases = [
            Expect<Test<typeof e1, "extends", Error>>,
            Expect<Test<typeof e2, "extends", Error>>,
            Expect<Test<typeof e3, "extends", Error>>,
        ];
    });

})

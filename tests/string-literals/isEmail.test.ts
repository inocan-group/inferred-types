import { describe, expect, it } from "vitest";
import { Expect, Email, Test } from "inferred-types/types"
import { isEmail } from "inferred-types/runtime"



describe("isEmail(val)", () => {

    it("happy path", () => {
        const bob = "bob@builder.com" as string;

        const t1 = isEmail(bob);
        const t2 = isEmail("bob-joe-paul@work.builder.com");

        expect(t1).toBe(true);
        expect(t2).toBe(true);

        const f1 = isEmail("bob@builder");
        const f2 = isEmail("bob@builder.b");
        const f3 = isEmail("1bob@builder.com");

        expect(f1).toBe(false);
        expect(f2).toBe(false);
        expect(f3).toBe(false);

        if (isEmail(bob)) {
            type Bob = typeof bob;

            type cases = [
                Expect<Test<Bob, "equals",  Email>>
            ];
        }

    });

});

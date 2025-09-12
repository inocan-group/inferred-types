import { describe, it } from "vitest";
import type { CreateLookup, Expect, IsNever, Test } from "inferred-types/types";

describe("CreateLookup<TPayload,TKeyProp,TValProp>", () => {
    type Tup = [
        { name: "foo"; value: 12; color: "red"; rank: 100 },
        { name: "bar"; value: 53; color: "blue"; rank: 120 },
        { name: "baz"; value: 12; color: "green"; rank: 1 },
    ]

    it("happy path", () => {
        type LName = CreateLookup<Tup, "name", "value">;
        type LColor = CreateLookup<Tup, "color", "value">;
        type LValue = CreateLookup<Tup, "value", "name">; // non-unique key
        type LRank = CreateLookup<Tup, "rank", "value">; // numeric key converted

        type cases = [
            Expect<Test<LName, "equals",  { foo: 12; bar: 53; baz: 12 }>>,
            Expect<Test<LColor, "equals",  { red: 12; blue: 53; green: 12 }>>,
            Expect<Test<IsNever<LValue>, "equals", true>>,
            Expect<Test<LRank, "extends",  { 100: 12; 120: 53; 1: 12 }>>,
        ];
    });

});

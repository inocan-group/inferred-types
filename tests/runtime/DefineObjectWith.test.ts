import { describe, expect, it } from "vitest";
import type { DefineObjectWith, Expect, Test } from "inferred-types/types";

import { defineObjectWith } from "inferred-types/runtime";

describe("DefineObjectWith<TDefn,TMap>", () => {

    it("happy path", () => {
        type Mapper = {
            foo: 1,
            bar: 2,
            baz: 3
        }
        type Defn = DefineObjectWith<{ uno: "foo", dos: "bar", tres: "baz"}, Mapper>;

        type Type = Defn["type"];
        type Lookup = Defn["defn"];

        type cases = [
            Expect<Test<Type, "equals", { uno: 1, dos: 2, tres: 3}>>,
            Expect<Test<Lookup, "equals", { uno: "foo", dos: "bar", tres: "baz"}>>,
        ];
    });

});

describe("defineObjectWith(mapper)(defn)", () => {

    it("happy path", () => {

        const mapper = defineObjectWith({
            foo: "Number(1)",
            bar: "Number(2)",
            baz: "Number(3)"
        });
        const defn = mapper({ uno: "foo", dos: "bar", tres: "baz"});

        expect(defn).toEqual({
            kind: "define-object-with",
            defn: { uno: "foo", dos: "bar", tres: "baz" },
            type: null
        })

        type cases = [
            Expect<Test<typeof defn["type"], "equals", { uno: 1, dos: 2, tres: 3}>>
        ]

    })

})

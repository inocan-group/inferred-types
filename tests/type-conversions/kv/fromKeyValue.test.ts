import { fromKeyValue, tuple } from "inferred-types/runtime";
import { Expect, Test, KeyValue } from "inferred-types/types";
import { describe, expect, it } from "vitest";

describe("fromKeyValue()", () => {
    it("happy path with required properties", () => {
        const kv = [
            { key: "foo", value: "hi", required: true },
            { key: "bar", value: 42, required: true },
        ] as const;
        /**
         * a narrowly defined tuple but not with readonly
         * modifiers which `as const` imposes.
         */
        const kv2 = tuple(
            { key: "foo", value: "hi", required: true },
            { key: "bar", value: 42, required: true }
        )

        const obj = fromKeyValue(kv);
        const obj2 = fromKeyValue(kv2);

        expect(obj).toEqual({ foo: "hi", bar: 42 });

        type cases = [
            Expect<Test<typeof obj, "equals", { foo: "hi"; bar: 42 }>>,
            Expect<Test<typeof obj2, "equals", { foo: "hi"; bar: 42 }>>,
        ];
    });

    it("optional properties", () => {
        const kv = [
            { key: "name", value: "John", required: false },
            { key: "age", value: 30, required: false },
        ] as const;
        const obj = fromKeyValue(kv);

        expect(obj).toEqual({ name: "John", age: 30 });

        type cases = [
            Expect<Test<typeof obj, "equals", { name?: "John"; age?: 30 }>>,
        ];
    });

    it("mixed required and optional properties", () => {
        const kv = [
            { key: "id", value: 123, required: true },
            { key: "name", value: "Alice", required: true },
            { key: "nickname", value: "Ally", required: false },
            { key: "isActive", value: true, required: false },
        ] as const;
        const obj = fromKeyValue(kv);

        expect(obj).toEqual({ id: 123, name: "Alice", nickname: "Ally", isActive: true });

        type cases = [
            Expect<Test<typeof obj, "equals", {
                id: 123;
                name: "Alice";
                nickname?: "Ally";
                isActive?: true
            }>>,
        ];
    });

    it("empty array", () => {
        const kv = [] as const;
        const obj = fromKeyValue(kv);

        expect(obj).toEqual({});

        type cases = [
            Expect<Test<typeof obj, "equals", {}>>,
        ];
    });

    it("nested KeyValue arrays", () => {
        const kv = [
            { key: "user", value: "john_doe", required: true },
            {
                key: "settings",
                value: [
                    { key: "theme", value: "dark", required: true },
                    { key: "lang", value: "en", required: false },
                ] as const,
                required: true
            },
        ] as const;
        const obj = fromKeyValue(kv);

        expect(obj).toEqual({
            user: "john_doe",
            settings: [
                { key: "theme", value: "dark", required: true },
                { key: "lang", value: "en", required: false },
            ]
        });

        // FromKv keeps the nested array as-is, not converting to object
        type cases = [
            Expect<Test<typeof obj, "equals", {
                user: "john_doe";
                settings: readonly [
                    { readonly key: "theme"; readonly value: "dark"; readonly required: true },
                    { readonly key: "lang"; readonly value: "en"; readonly required: false }
                ];
            }>>,
        ];
    });

    it("various value types", () => {
        const kv = [
            { key: "str", value: "hello", required: true },
            { key: "num", value: 42, required: true },
            { key: "bool", value: true, required: true },
            { key: "null", value: null, required: true },
            { key: "undefined", value: undefined, required: false },
            { key: "obj", value: { nested: "value" }, required: true },
            { key: "arr", value: [1, 2, 3], required: true },
        ] as const;
        const obj = fromKeyValue(kv);

        expect(obj).toEqual({
            str: "hello",
            num: 42,
            bool: true,
            null: null,
            undefined: undefined,
            obj: { nested: "value" },
            arr: [1, 2, 3],
        });

        type cases = [
            Expect<Test<typeof obj, "equals", {
                str: "hello";
                num: 42;
                bool: true;
                null: null;
                undefined?: undefined;
                obj: { nested: "value" };
                arr: readonly [1, 2, 3];
            }>>,
        ];
    });

    it("wide type handling", () => {
        // When not using 'as const', types should be widened
        const kvWide: readonly KeyValue<string, any>[] = [
            { key: "a", value: 1, required: true },
            { key: "b", value: "test", required: false },
        ];
        const objWide = fromKeyValue(kvWide);

        expect(objWide).toEqual({ a: 1, b: "test" });

        // Wide types should result in a Dictionary type
        type cases = [
            Expect<Test<typeof objWide, "extends", Record<string, any>>>,
        ];
    });

    it("type narrowing with literal values", () => {
        const kv = [
            { key: "status", value: "active" as const, required: true },
            { key: "role", value: "admin" as const, required: true },
            { key: "count", value: 10 as const, required: false },
        ] as const;
        const obj = fromKeyValue(kv);

        expect(obj).toEqual({ status: "active", role: "admin", count: 10 });

        type cases = [
            Expect<Test<typeof obj, "equals", {
                status: "active";
                role: "admin";
                count?: 10;
            }>>,
        ];
    });

    it("numeric literal keys", () => {
        // Testing with numeric string keys
        const kv = [
            { key: "0", value: "zero", required: true },
            { key: "1", value: "one", required: true },
            { key: "100", value: "hundred", required: false },
        ] as const;
        const obj = fromKeyValue(kv);

        expect(obj).toEqual({ "0": "zero", "1": "one", "100": "hundred" });

        type cases = [
            Expect<Test<typeof obj, "equals", {
                "0": "zero";
                "1": "one";
                "100"?: "hundred";
            }>>,
        ];
    });

    it("special characters in keys", () => {
        const kv = [
            { key: "foo-bar", value: 1, required: true },
            { key: "baz_qux", value: 2, required: true },
            { key: "hello world", value: 3, required: false },
            { key: "@special", value: 4, required: true },
        ] as const;
        const obj = fromKeyValue(kv);

        expect(obj).toEqual({
            "foo-bar": 1,
            "baz_qux": 2,
            "hello world": 3,
            "@special": 4,
        });

        type cases = [
            Expect<Test<typeof obj, "equals", {
                "foo-bar": 1;
                "baz_qux": 2;
                "hello world"?: 3;
                "@special": 4;
            }>>,
        ];
    });

    it("duplicate keys (runtime last wins)", () => {
        const kv = [
            { key: "value", value: "first", required: true },
            { key: "value", value: "second", required: false },
            { key: "value", value: "third", required: true },
        ] as const;
        const obj = fromKeyValue(kv);

        // Last value should win at runtime
        expect(obj).toEqual({ value: "third" });

        // Type merges all occurrences - the intersection of all definitions
        // Since they have different required states, it results in never
        // This is a limitation of the type system
        type ObjType = typeof obj;

        type cases = [
            // The type is never due to conflicting required states
            Expect<Test<ObjType, "equals", never>>,
        ];
    });

    it("duplicate keys (same required state)", () => {
        const kv = [
            { key: "value", value: "first", required: true },
            { key: "value", value: "second", required: true },
            { key: "value", value: "third", required: true },
        ] as const;
        const obj = fromKeyValue(kv);

        // Last value should win at runtime
        expect(obj).toEqual({ value: "third" });

        // Intersection of different string literals is never
        type cases = [
            Expect<Test<typeof obj, "equals", never>>,
        ];
    });

    it("union values", () => {
        const kv = [
            { key: "union", value: Math.random() > 0.5 ? "string" : 123, required: true },
            { key: "literal", value: Math.random() > 0.5 ? ("a" as const) : ("b" as const), required: false },
        ] as const;
        const obj = fromKeyValue(kv);

        expect(["string", 123]).toContain(obj.union);
        if ("literal" in obj) {
            expect(["a", "b"]).toContain(obj.literal);
        }

        type cases = [
            Expect<Test<typeof obj, "equals", {
                union: "string" | 123;  // Exact literal types, not widened
                literal?: "a" | "b";
            }>>,
        ];
    });

    it("symbol values", () => {
        const sym1 = Symbol("test1");
        const sym2 = Symbol("test2");

        const kv = [
            { key: "sym", value: sym1, required: true },
            { key: "optSym", value: sym2, required: false },
        ] as const;
        const obj = fromKeyValue(kv);

        expect(obj).toEqual({ sym: sym1, optSym: sym2 });

        type cases = [
            Expect<Test<typeof obj, "equals", {
                sym: typeof sym1;
                optSym?: typeof sym2;
            }>>,
        ];
    });

    it("function values", () => {
        const fn1 = () => "hello";
        const fn2 = (x: number) => x * 2;

        const kv = [
            { key: "greet", value: fn1, required: true },
            { key: "double", value: fn2, required: false },
        ] as const;
        const obj = fromKeyValue(kv);

        expect(obj.greet()).toBe("hello");
        expect(obj.double?.(5)).toBe(10);

        type cases = [
            Expect<Test<typeof obj, "equals", {
                greet: typeof fn1;
                double?: typeof fn2;
            }>>,
        ];
    });

    it("complex nested structures", () => {
        const kv = [
            {
                key: "config",
                value: {
                    api: {
                        url: "https://api.example.com",
                        timeout: 5000,
                        retries: 3,
                    },
                    features: {
                        darkMode: true,
                        beta: false,
                    }
                },
                required: true
            },
            {
                key: "metadata",
                value: {
                    version: "1.0.0",
                    tags: ["production", "stable"] as const,
                },
                required: false
            }
        ] as const;
        const obj = fromKeyValue(kv);

        expect(obj).toEqual({
            config: {
                api: {
                    url: "https://api.example.com",
                    timeout: 5000,
                    retries: 3,
                },
                features: {
                    darkMode: true,
                    beta: false,
                }
            },
            metadata: {
                version: "1.0.0",
                tags: ["production", "stable"],
            }
        });

        type cases = [
            Expect<Test<typeof obj, "equals", {
                config: {
                    api: {
                        url: "https://api.example.com";
                        timeout: 5000;
                        retries: 3;
                    };
                    features: {
                        darkMode: true;
                        beta: false;
                    };
                };
                metadata?: {
                    version: "1.0.0";
                    tags: readonly ["production", "stable"];
                };
            }>>,
        ];
    });
});

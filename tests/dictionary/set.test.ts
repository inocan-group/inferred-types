import { describe, expect, it } from "vitest";
import type { Expect, Set, Test } from "inferred-types/types";

import { set } from "inferred-types/runtime";

describe("Set<TContainer,TDotPath,TValue>", () => {

    describe("objects", () => {
        it("shallow mutation", () => {
            type Obj = {
                foo: 1;
                bar: 2;
            }
            type Mutated = Set<Obj, "foo", 42>;

            type cases = [
                Expect<Test<Mutated, "equals", { foo: 42; bar: 2}>>,
            ];
        });

        it("deep mutation", () => {
            type Obj = {
                foo: {
                    bar: {
                        baz: 1
                    }
                }
            }
            type Mutated = Set<Obj, "foo.bar.baz", 42>;

            type cases = [
                Expect<Test<Mutated, "equals", { foo: { bar: { baz: 42 }}}>>
            ];
        });

        it("add new property", () => {
            type Obj = {
                foo: 1;
                bar: 2;
            }
            type Mutated = Set<Obj, "baz", 3>;

            type cases = [
                Expect<Test<Mutated, "equals", { foo: 1; bar: 2; baz: 3}>>
            ];
        });

        it("complex nested mutation", () => {
            type Complex = {
                user: {
                    profile: {
                        settings: {
                            theme: "light";
                            notifications: boolean;
                        }
                    }
                }
            };
            type Mutated = Set<Complex, "user.profile.settings.theme", "dark">;

            type cases = [
                Expect<Test<Mutated, "equals", {
                    user: {
                        profile: {
                            settings: {
                                theme: "dark";
                                notifications: boolean;
                            }
                        }
                    }
                }>>
            ];
        });

        it("handles leading dot in path", () => {
            type Obj = {
                foo: 1;
                bar: {
                    baz: 2;
                }
            };

            // Test shallow path with leading dot
            type ShallowWithDot = Set<Obj, ".foo", 42>;
            type ShallowWithoutDot = Set<Obj, "foo", 42>;

            // Test deep path with leading dot
            type DeepWithDot = Set<Obj, ".bar.baz", 99>;
            type DeepWithoutDot = Set<Obj, "bar.baz", 99>;

            type cases = [
                // Leading dot should be ignored - results should be identical
                Expect<Test<ShallowWithDot, "equals", ShallowWithoutDot>>,
                Expect<Test<DeepWithDot, "equals", DeepWithoutDot>>,
                // Verify the actual values
                Expect<Test<ShallowWithDot, "equals", { foo: 42; bar: { baz: 2 } }>>,
                Expect<Test<DeepWithDot, "equals", { foo: 1; bar: { baz: 99 } }>>
            ];
        });
    })

    describe("arrays", () => {

        it("shallow mutation", () => {
            type Arr = [1,2,3];
            type Mutated = Set<Arr,"1",42>;

            type cases = [
                Expect<Test<Mutated, "equals", [1,42,3]>>
            ];
        });

        it("deep mutation in nested arrays", () => {
            type Nested = {
                items: [
                    { id: 1; name: "foo" },
                    { id: 2; name: "bar" },
                    { id: 3; name: "baz" }
                ]
            };
            type Mutated = Set<Nested, "items.1.name", "updated">;

            type cases = [
                Expect<Test<Mutated, "equals", {
                    items: [
                        { id: 1; name: "foo" },
                        { id: 2; name: "updated" },
                        { id: 3; name: "baz" }
                    ]
                }>>
            ];
        });

    })
});

describe("set(container,dotpath,value)", () => {

    describe("objects", () => {
        it("shallow mutation", () => {
            const obj = {
                foo: 1,
                bar: 2
            } as const;

            const mutated = set(obj, "foo", 42);

            expect(mutated).toEqual({foo: 42, bar: 2});

            type cases = [
                Expect<Test<typeof mutated, "equals", { readonly foo: 42; readonly bar: 2}>>,
            ];
        });

        it("deep mutation", () => {
            const obj = {
                foo: {
                    bar: {
                        baz: 1
                    }
                }
            };

            const mutated = set({
                foo: {
                    bar: {
                        baz: 1
                    }
                }
            }, "foo.bar.baz", 42);

            expect(mutated).toEqual({ foo: { bar: { baz: 42 }}});
            expect(mutated).not.toBe(obj); // Ensure immutability
            expect(mutated.foo).not.toBe(obj.foo); // Ensure deep immutability

            type cases = [
                Expect<Test<typeof mutated, "equals", { foo: { bar: { baz: 42 }}}>>,
            ];
        });

        it("add new property", () => {
            const obj = {
                foo: 1,
                bar: 2
            };

            const mutated = set({
                foo: 1,
                bar: 2
            }, "baz", 3);

            expect(mutated).toEqual({foo: 1, bar: 2, baz: 3});

            type cases = [
                Expect<Test<typeof mutated, "equals", { foo: 1; bar: 2; baz: 3}>>,
            ];
        });

        it("handles leading dot in path", () => {
            const obj = {
                foo: 1,
                bar: {
                    baz: 2
                }
            };

            const mutatedWithDot = set(obj, ".foo", 42);
            const mutatedWithoutDot = set(obj, "foo", 42);

            expect(mutatedWithDot).toEqual(mutatedWithoutDot);
            expect(mutatedWithDot).toEqual({foo: 42, bar: { baz: 2 }});
        });
    });

    describe("arrays", () => {
        it("shallow mutation", () => {
            const arr = [1, 2, 3];
            const mutated = set([1, 2, 3], "1", 42);

            expect(mutated).toEqual([1, 42, 3]);

            type cases = [
                Expect<Test<typeof mutated, "equals", readonly [1, 42, 3]>>,
            ];
        });

        it("deep mutation in nested arrays", () => {
            const nested = {
                items: [
                    { id: 1, name: "foo" },
                    { id: 2, name: "bar" },
                    { id: 3, name: "baz" }
                ]
            };

            const mutated = set({
                items: [
                    { id: 1, name: "foo" },
                    { id: 2, name: "bar" },
                    { id: 3, name: "baz" }
                ]
            }, "items.1.name", "updated");

            expect(mutated).toEqual({
                items: [
                    { id: 1, name: "foo" },
                    { id: 2, name: "updated" },
                    { id: 3, name: "baz" }
                ]
            });

            type cases = [
                Expect<Test<typeof mutated, "equals", {
                    readonly items: readonly [
                        { readonly id: 1; readonly name: "foo" },
                        { readonly id: 2; readonly name: "updated" },
                        { readonly id: 3; readonly name: "baz" }
                    ]
                }>>,
            ];
        });
    });

})

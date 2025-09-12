import { describe, it, expect } from "vitest";
import type { Constructor, Expect, Test } from "inferred-types/types";

class TestClass {
    public foo: number;
    public bar: string;

    constructor(foo: number, bar: string) {
        this.foo = foo;
        this.bar = bar;
    }
}

describe("Constructor<Ctor, Klass>", () => {
    it("simple test", () => {
        type KlassParams = ConstructorParameters<typeof TestClass>;
        type KlassInstance = InstanceType<typeof TestClass>;
        type Synthetic = Constructor<[foo: number, bar: string], TestClass>;
        type SynReturn = InstanceType<Synthetic>;
        const s: Synthetic = TestClass;

        const myS = new s(1, "bar");

        const inst = new TestClass(1, "bar");
        type Instance = typeof inst;

        type cases = [
            Expect<Test<Instance, "equals",  { foo: number; bar: string }>>,
            Expect<Test<Instance, "equals",  KlassInstance>>,
            Expect<Test<KlassParams, "equals", [foo: number,  bar: string]>>,
            Expect<Test<SynReturn, "equals",  TestClass>>
        ];

        const c: cases = [true, true, true, true];
        expect(c).toBe(c);
        expect(myS).toBeInstanceOf(TestClass);
    });
});

import { Expect, Equal } from "@type-challenges/utils";
import { Constructor } from "../src/types/Constructor";

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
      // prep
      Expect<Equal<Instance, { foo: number; bar: string }>>,
      Expect<Equal<Instance, KlassInstance>>,
      Expect<Equal<KlassParams, [foo: number, bar: string]>>,
      //
      Expect<Equal<SynReturn, TestClass>>
    ];

    const c: cases = [true, true, true, true];
    expect(c).toBe(c);
    expect(myS).toBeInstanceOf(TestClass);
  });
});

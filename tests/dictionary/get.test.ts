import { describe, it, expect } from "vitest";
import { Equal, Expect } from "@type-challenges/utils";
import { defineType } from "src/runtime/literals/defineType";
import { Get } from "src/types/dictionary/Get";
import { get } from "src/runtime/dictionary/get";
import { ref } from "vue";
import { isErrorCondition } from "src/runtime/type-guards/isErrorCondition";

describe("Get<T, K> type utility", () => {
  it("type: shallow path", () => {
    const input = defineType({ id: 1234 })({ foo: 1, bar: "hi" });
    type Input = typeof input;

    type Id = Get<Input, "id">;
    type Foo = Get<Input, "foo">;
    type Bar = Get<Input, "bar">;
    type Nada = Get<Input, "nada">;

    type cases = [
      // valid props are pulled off
      Expect<Equal<Id, 1234>>,
      Expect<Equal<Foo, number>>,
      Expect<Equal<Bar, string>>,
      // non-existent props return never
      Expect<Equal<Nada, never>>
    ];
    const c: cases = [true, true, true, true];
    expect(c).toBe(c);
  });

  
  it("type: shallow path into Ref", () => {
    const myRef = ref({foo: 1, bar: 2} as const);
    const obj = {
      foo: 1,
      myRef
    } as const;
    type Obj = typeof obj;

    type ShallowFoo = Get<Obj, "foo">;
    type RefFoo = Get<Obj, "myRef.foo">;
    type RefBar = Get<Obj, "myRef.bar">;
    type RefBase = Get<Obj, "myRef">;

    type cases = [
      Expect<Equal<ShallowFoo, 1>>,
      Expect<Equal<RefFoo, 1>>,
      Expect<Equal<RefBar, 2>>,
      Expect<Equal<RefBase, Readonly<{ foo: 1; bar: 2}>>>,
    ];
    const c: cases = [ true, true, true, true ];
    expect(c).toBe(c);
  });

  
  it("type: deep path through Ref", () => {
    const myRef = { bar: { baz: 42 }} as const;
    const obj = {
      foo: myRef
    };
    type Obj = typeof obj;

    type DeepFake = Get<Obj, "foo.bar.baz">;
    
    type cases = [
      Expect<Equal<DeepFake, 42>>
    ];
    const cases: cases = [ true ];
  });

  
  it("type: Deep Get", () => {
    type Obj = {
      foo: 1;
      bar: {
        a: "a";
        b: "b";
      };
      baz: [ 1, 2, 3 ];
    };

    type Shallow = Get<Obj, "foo">;
    type ObjDeep = Get<Obj, "bar.a">;
    type ArrDeep = Get<Obj, "baz.1">;
    
    type cases = [
      Expect<Equal<Shallow, 1>>,
      Expect<Equal<ObjDeep, "a">>,
      Expect<Equal<ArrDeep, 2>>,
    ];
    const cases: cases = [true, true, true];
  });
  
  it("runtime: happy path", () => {
    const deeperStill = ref([4,5,6] as const);
    const obj = {
      foo: 1,
      bar: {
        a: "a",
        b: "b"
      },
      baz: [ 1, 2, 3 ],
      deep: {
        deeperStill
      }
    } as const;
    
    const shallow = get(obj, "foo");
    const deepObj = get(obj, "bar.a");
    const deepArr = get(obj, "baz.1");
    const deeperArr = get(obj, "deep.deeperStill.1");
    const err1 = get(obj, "foo.not.exist");
    
    expect(shallow, `shallow get`).toBe(1);
    expect(deepObj, "deep object get").toBe("a");
    expect(deepArr, "deep array get").toBe(2);
    expect(deeperArr, "deeper array get").toBe(5);
    expect(isErrorCondition(err1)).toBe(true);
    
    type cases = [
      Expect<Equal<typeof shallow, 1>>,
      Expect<Equal<typeof deepObj, "a">>,
      Expect<Equal<typeof deepArr, 2>>,
      Expect<Equal<typeof deeperArr, 5>>,
    ];
    const cases: cases = [ true, true, true, true];
  });

  
  it("runtime: getting values with never", () => {
    const obj = { id: 1, color: undefined as undefined | string } as const;
    const arr = [ {id: 1} ] as const;

    const shallowObj = get(obj, "color" as string);

  });
  
  
});

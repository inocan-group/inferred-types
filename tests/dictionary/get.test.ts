import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { 
  get, 
  defineType, 
  isErrorCondition 
} from "src/runtime";
import type { 
  DoesExtend, 
  IsErrorCondition, 
  Get 
} from "src/types";
import { ref } from "vue";

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
      Expect<Equal<DoesExtend<Nada, ErrorCondition<"invalid-dot-path">>, true>>
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
      Expect<Equal<RefBase, { readonly foo: 1; readonly bar: 2}>>,
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

  
  it("type: Errors", () => {
    type Obj = {
      foo: 1;
      bar: {
        a: "a";
        b: "b";
      };
      baz: [ 1, 2, 3 ];
      deep: {
        deeper: {
          a: "a";
        };
      };
    };

    type InvalidRoot = Get<Obj, "foobar">;
    type InvalidLeaf = Get<Obj, "bar.c">;
    type InvalidMiddle = Get<Obj, "deep.shallow.abc">;
    type InvalidDeepLeaf = Get<Obj, "deep.deeper.c">;

    type HandledInvalidRoot = Get<Obj, "foobar", NoDefaultValue, "handled">;
    type HandledInvalidLeaf = Get<Obj, "bar.c", NoDefaultValue, "handled">;
    type HandledInvalidMiddle = Get<Obj, "deep.shallow.abc", NoDefaultValue, "handled">;
    type HandledInvalidDeepLeaf = Get<Obj, "deep.deeper.c", NoDefaultValue, "handled">;
    
    type cases = [
      Expect<ExpectTrue<IsErrorCondition<InvalidRoot>>>,
      Expect<ExpectTrue<IsErrorCondition<InvalidLeaf>>>,
      Expect<ExpectTrue<IsErrorCondition<InvalidMiddle>>>,
      Expect<ExpectTrue<IsErrorCondition<InvalidDeepLeaf>>>,

      Expect<Equal<HandledInvalidRoot, "handled">>,
      Expect<Equal<HandledInvalidLeaf, "handled">>,
      Expect<Equal<HandledInvalidMiddle, "handled">>,
      Expect<Equal<HandledInvalidDeepLeaf, "handled">>
    ];
    const cases: cases = [ true, true, true, true, true, true, true, true ];
  });
  
  it("type: default values", () => {
    type Obj = {
      foo: undefined;
      bar: {
        a: undefined;
      };
    };
    type T1 = Get<Obj, "foo", "foobar">;
    type T2 = Get<Obj, "bar.a", "foobar">;

    type cases = [
     Expect<Equal<T1, "foobar">>,
     Expect<Equal<T2, "foobar">>,
    ];
    const cases: cases = [ true, true ];
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
    const deep = ref({deeperStill: [4,5,6]} as const);
    const obj = {
      foo: 1,
      bar: {
        a: "a",
        b: "b"
      },
      baz: [ 1, 2, 3 ],
      deep: deep
    } as const;

    const identity = get(42, null);
    const shallow = get(obj, "foo");
    const deepObj = get(obj, "bar.a");
    const deepArr = get(obj, "baz.1");
    const deeperArr = get(obj, "deep.deeperStill.1");
    const err1 = get(obj, "foo.not.exist");
    const handleErr = get(obj, "foo.not.exist", { handleInvalidDotpath: "foobar" });
    
    expect(identity, `null dotpath works for scalar`).toBe(42);
    expect(shallow, `shallow get`).toBe(1);
    expect(deepObj, "deep object get").toBe("a");
    expect(deepArr, "deep array get").toBe(2);
    expect(deeperArr, "deeper array get").toBe(5);
    expect(isErrorCondition(err1)).toBe(true);
    expect(handleErr).toBe("foobar");
    
    type cases = [
      Expect<Equal<typeof shallow, 1>>,
      Expect<Equal<typeof deepObj, "a">>,
      Expect<Equal<typeof deepArr, 2>>,
      Expect<Equal<typeof deeperArr, 5>>,
    ];
    const cases: cases = [ true, true, true, true];
  });

  
  it("Runtime Errors", () => {
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

    const err1 = get(obj, "bar.abc");
    const err2 = get(obj, "deep.notSoDeep");

    const handled1 = get(obj, "bar.abc", { handleInvalidDotpath: "handled"});
    const handled2 = get(obj, "deep.notSoDeep", { handleInvalidDotpath: "handled"});

    expect(isErrorCondition(err1), "err1 should have been an error").toBe(true);
    expect(isErrorCondition(err2), "err2 should have been an error").toBe(true);
    expect(handled1, "handled1 should have been handled").toBe("handled");
    expect(handled2, "handled2 should have been handled").toBe("handled");
  });
  
  it("Runtime default values", () => {
    type Obj = {
      foo: number; 
      bar: Record<string, string | undefined>; 
      baz: number[];
    };

    const obj: Obj = {
      foo: 1,
      bar: {
        a: "a",
        b: "b", 
        c: undefined,
      },
      baz: [ 1, 2, 3 ],
    };

    const defVal = get(obj, "bar.c", { defaultValue: "foobar"} );

    expect(defVal).toBe("foobar");
  });
  
  
});

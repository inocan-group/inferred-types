import { narrowObjectTo, narrowObjectToType } from "inferred-types/runtime";
import { Expect, Test } from "inferred-types/types";
import { describe, expect, it } from "vitest";



describe("narrowObjectTo(constraint) -> (obj) -> obj", () => {

  it("first test", () => {
    const a = narrowObjectTo({foo: "string", bar: "Opt<number>"})
    const b = a({foo: "foo", bar: 42});

    const a2 = narrowObjectToType<{foo: string; bar?: number}>()
    const b2 = a2({foo: "foo", bar: 42});

    expect(b).toEqual({foo: "foo", bar: 42})


    // @ts-ignore
    type cases = [
      Expect<Test<typeof b, "equals",  { foo: "foo"; bar: 42 }>>,
      Expect<Test<typeof b2, "equals",  { foo: "foo"; bar: 42 }>>
    ];
  });


  it("with callback", () => {
    const cb = narrowObjectToType<{foo: string; bar?: number}>().asCallback;
    const mapper = cb(i => `${i.foo} is da foo`);

    const whoDat = mapper({foo: "Foo"});

    expect(whoDat).toEqual("Foo is da foo");


    // @ts-ignore
    type cases = [
      Expect<Test<typeof whoDat, "equals",  `${string} is da foo`>>
    ];

  });


});



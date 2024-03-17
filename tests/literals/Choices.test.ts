import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { choice, choices, mergeChoices } from "src/runtime/index";
import { Choice, AsChoices, DoesExtend } from "src/types/index";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Choice<T>, Choices<T>", () => {

  it("Happy Path", () => {
    type CFoo = Choice<"foo">;
    type CBar = Choice<{name: "bar"; value: 42}>;
    type CBaz = Choice<{name: "baz"; value: "baz"}>;

    type C1 = AsChoices<[CFoo,CBar,CBaz]>;
    type C2 = AsChoices<[
      "foo", 
      {name: "bar"; value: 42}, 
      {name: "baz"; value: "baz"}
    ]>;
    
    
    type cases = [
      Expect<Equal<CFoo, Record<"foo", "foo">>>,
      Expect<Equal<CBar, Record<"bar", 42>>>,
      Expect<Equal<CBaz, Record<"baz", "baz">>>,

      ExpectTrue<DoesExtend<C1, Record<string, unknown>>>,
      Expect<Equal<C1,C2>>,
      Expect<Equal<C1, {
        foo: "foo";
        bar: 42;
        baz: "baz";
      }>>,


    ];
    const cases: cases = [
      true, true, true,
      true, true, true,
    ];
  });
});

describe("choices()", () => {

  it("Definition with choice()", () => {
    const c_foo = choice("foo");
    const c_foo_arr = choice(["foo","foey"]);
    const c_bar = choice({name: "bar", value: 42});
    const c_baz = choice({name: "baz", type: a => a.literals("baz").done()});
    const c_baz_no_done = choice({name: "baz", type: a => a.literals("baz")});

    expect(c_foo).toEqual({foo: "foo"});
    expect(c_foo_arr).toEqual({foo: "foey"});

    type cases = [
      Expect<Equal<typeof c_foo, Record<"foo", "foo">>>,      
      Expect<Equal<typeof c_foo_arr, Record<"foo", "foey">>>,      
      Expect<Equal<typeof c_bar, Record<"bar", 42>>>,      
      Expect<Equal<typeof c_baz, Record<"baz", "baz">>>,      
      Expect<Equal<typeof c_baz_no_done, Record<"baz", "baz">>>,

    ];
    const cases: cases = [ 
      true, true, true, true, true
    ];
  });

  
  it("Merging choices into single KV", () => {
    const foo = choice("foo");
    const bar = choice("bar");
    const baz = choice("baz");

    const choices = mergeChoices(foo,bar,baz);
    
    expect(choices).toEqual({
      foo: "foo",
      bar: "bar",
      baz: "baz"
    })
    
    type cases = [
      /** type tests */
    ];
    const cases: cases = [];
    
  });

  
  it("Building Multi Choice API", () => {
    const api  = choices(
      choice("yes"),
      choice("no"),
      choice("maybe")
    ).chooseMany(true);

    
    type cases = [
      /** type tests */
    ];
    const cases: cases = [];
    
  });

});


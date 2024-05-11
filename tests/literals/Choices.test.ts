import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { choice, choices, handleDoneFn, isDoneFn, mergeChoices } from "src/runtime/index";
import { Choice, AsChoices, DoesExtend,  MultiChoiceCallback } from "src/types/index";
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
      Expect<Equal<typeof foo, { foo: "foo" }>>,
      Expect<Equal<typeof bar, { bar: "bar" }>>,
      Expect<Equal<typeof baz, { baz: "baz" }>>,
      
    ];
    const cases: cases = [
      true, true, true
    ];
    
  });
  
  it("Building Multi Choice API", () => {
    const api  = choices(
      choice("yes"),
      choice(["no", "nope"]),
      choice("maybe")
    ).chooseMany(true);

    expect(typeof api).toEqual("function");
    expect(isDoneFn(api)).toEqual(true); 

    const all = api("yes")("maybe")("no").done();
    const yes = api("yes").done();
    const partial = api("yes")("no");
    type AvailableChoices = Parameters<typeof partial>

    expect(all).toEqual(["yes","maybe","nope"]);
    expect(yes).toEqual(["yes"])

    const api2  = choices(
      choice("yes"),
      choice(["no", "nope"]),
      choice("maybe")
    ).chooseMany(false);

    const partial2 = api2("yes")("no");
    type AvailableChoices2 = Parameters<typeof partial2>;

    
    type cases = [
      ExpectTrue<SameKeys<typeof all, ["yes","nope","maybe"]>>,
      ExpectTrue<SameKeys<typeof yes, ["yes"]>>,
      Expect<Equal<AvailableChoices, ["maybe"]>>,
      Expect<Equal<AvailableChoices2, ["yes" | "no" | "maybe"]>>,
    ];
    const cases: cases = [
      true, true, true, true
    ];
    
  });
  
  it("Using Multi Choice API as Callback", () => {
    const api  = choices(
      choice("yes"),
      choice(["no", "nope"]),
      choice("maybe")
    ).chooseMany(true);

    const fn: MultiChoiceCallback<typeof api> = (cb) => handleDoneFn(cb(api)); 

    const yesNo = fn(cb => cb("yes")("no").done());
    const yesNo2 = fn(cb => cb("yes")("no"));

    expect(yesNo).toEqual(["yes","nope"]);
    expect(yesNo2).toEqual(["yes","nope"]);
    
    type cases = [
      ExpectTrue<SameKeys<typeof yesNo, ["yes", "nope"]>>,
      ExpectTrue<SameKeys<typeof yesNo2, ["yes", "nope"]>>,
    ];
    const cases: cases = [
      true, true
    ];
    
  });
  

});


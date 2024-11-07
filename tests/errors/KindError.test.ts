import { Equal, Expect,  } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { kindError, KindError, KindErrorDefn, Narrowable } from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("KindError", () => {

  it("no base context", () => {
    const err = kindError("foo-bar");
    const fooBar = err("oh my!");

    expect(fooBar.name).toEqual("FooBar");
    expect(fooBar.kind).toEqual("foo-bar");
    expect(fooBar.__kind).toEqual("KindError");

    expect(fooBar.context).toEqual({});

    // @ts-ignore
    type cases = [
      Expect<Equal<typeof err, KindErrorDefn<"foo-bar", Record<string, Narrowable>> >>,
      Expect<Equal<typeof fooBar, KindError<"foo-bar", {}>>>,
      Expect<Equal<typeof fooBar["kind"], "foo-bar">>,
      Expect<Equal<typeof fooBar["name"], "FooBar">>,
    ];

  });



  it("with non-conflicting base context", () => {
    const err = kindError("foo-bar", { foo: 42 });
    const fooBar = err("oh my!", { bar: 55 });

    expect(fooBar.name).toEqual("FooBar");
    expect(fooBar.kind).toEqual("foo-bar");
    expect(fooBar.__kind).toEqual("KindError");

    expect(fooBar.context).toEqual({foo: 42, bar: 55});


    // @ts-ignore
    type cases = [
      Expect<Equal<typeof err, KindErrorDefn<"foo-bar", { foo: 42 }> >>,
      Expect<Equal<typeof fooBar, KindError<"foo-bar", {foo: 42; bar: 55}>>>,
      Expect<Equal<typeof fooBar["kind"], "foo-bar">>,
      Expect<Equal<typeof fooBar["name"], "FooBar">>,
    ];

  });


  it("with conflicting base context", () => {
    const err = kindError("foo-bar", { foo: 42 });
    const fooBar = err("oh my!", { foo: 1, bar: 55 });

    expect(fooBar.name).toEqual("FooBar");
    expect(fooBar.kind).toEqual("foo-bar");
    expect(fooBar.__kind).toEqual("KindError");

    expect(fooBar.context).toEqual({foo: 1, bar: 55});

    // @ts-ignore
    type cases = [
      Expect<Equal<typeof err, KindErrorDefn<"foo-bar", { foo: 42 }> >>,
      Expect<Equal<typeof fooBar, KindError<"foo-bar", {foo: 1; bar: 55}>>>,
      Expect<Equal<typeof fooBar["kind"], "foo-bar">>,
      Expect<Equal<typeof fooBar["name"], "FooBar">>,
    ];

  });


  it("with awkward name", () => {
      const err = kindError("FooBar<Baz>");
      const fooBarBaz = err("well, well");

      expect(fooBarBaz.name).toEqual("FooBar<Baz>");
      expect(fooBarBaz.kind).toEqual("foo-bar-baz");


    // @ts-ignore
    type cases = [
      Expect<Equal<typeof fooBarBaz, KindError<"FooBar<Baz>">  >>
    ];

  });


});

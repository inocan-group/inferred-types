import { Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { Dict, Extends } from "inferred-types/types";




describe.skip("Dict<T,ID>", () => {

  it("happy path", () => {
    let fooBar = dict({ foo: 1, bar: 2 });
    let id = dict({ id: 1, foo: "foo", bar: 2 }, "id");
    let opt = dict({ foo: 1, bar: 2 }, "opt:bar");
    let idOpt = dict({ id: 1, foo: 1, bar: 2 }, "id", "opt:bar");

    expect(fooBar).toEqual({ foo: 1, bar: 2 });
    fooBar["bar"] = 42;
    expect(fooBar).toEqual({ foo: 1, bar: 42 });

    delete opt["bar"];
    expect(opt).toEqual({ foo: 1 });


    type cases = [
      Expect<Extends<typeof fooBar, Dict<{ foo: number; bar: number }>>>,
      Expect<Extends<typeof id, Dict<{ id: 1; foo: string; bar: number }>>>,
      Expect<Extends<typeof opt, Dict<{ foo: number; bar?: number | undefined }>>>,
      Expect<Extends<typeof idOpt, Dict<{ id: 1; foo: number; bar?: number | undefined }>>>,
    ];
    const cases: cases = [
      true, true, true, true
    ];
  });

});

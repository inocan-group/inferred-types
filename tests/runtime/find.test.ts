import { describe, expect, it } from "vitest";
import { Expect, Test } from "inferred-types/types";
import { find, narrow } from "inferred-types/runtime";

describe("find(list,[deref])", () => {

  it("happy path", () => {
    let scalars = narrow(42, 56, "foo", "bar", false);
    let objects = narrow(
      { id: 1, name: "Bob" },
      { id: 2, name: "Mark" },
      { id: 3, name: "Mary" },
    );
    let findScalar = find(scalars);
    let foo = findScalar("foo");
    let num = findScalar(42);

    let findObj = find(objects, "id");
    let bob = findObj(1);
    expect(bob).toEqual({ id: 1, name: "Bob" });
    let mark = findObj(2);
    expect(mark).toEqual({ id: 2, name: "Mark" });

    type cases = [
      Expect<Test<typeof foo, "equals",  "foo">>,
      Expect<Test<typeof num, "equals",  42>>,
      Expect<Test<typeof bob, "equals", { id: 1, name: "Bob" }>>,
      Expect<Test<typeof mark,"equals", { id: 2, name: "Mark" }>>,
    ];
  });

});


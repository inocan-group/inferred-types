import { Equal, Expect } from "@type-challenges/utils";
import { LeftWhitespace, RightWhitespace } from "~/types";

describe("LeftWhitespace<T> utility", () => {

  it("no whitespace results in empty string literal", () => {
    type T1 = LeftWhitespace<"foobar">;
    type T2 = LeftWhitespace<"foobar \n">;

    type cases = [
      Expect<Equal<T1, "">>,
      Expect<Equal<T2, "">>,
    ];
    const c: cases = [true, true];
    expect(c).toBe(c);
  });

  it("left whitespace is captured from string literal, right whitespace ignored", () => {
    type T1 = LeftWhitespace<" foobar">;
    type T2 = LeftWhitespace<"\n\t foobar \n">;

    type cases = [
      Expect<Equal<T1, " ">>,
      Expect<Equal<T2, "\n\t ">>,
    ];
    const c: cases = [true, true];
    expect(c).toBe(c);
  });

  it("a 'string' type passed in returns a string", () => {
    type T1 = LeftWhitespace<string>;

    type cases = [
      Expect<Equal<T1, string>>,
    ];
    const c: cases = [true];
    expect(c).toBe(c);
  });

});

describe("RightWhitespace<T> utility", () => {

  it("no whitespace results in empty string literal", () => {
    type T1 = RightWhitespace<"foobar">;
    type T2 = RightWhitespace<"\n\tfoobar">;

    type cases = [
      Expect<Equal<T1, "">>,
      Expect<Equal<T2, "">>,
    ];
    const c: cases = [true, true];
    expect(c).toBe(c);
  });

  it("right whitespace is captured from string literal, left whitespace ignored", () => {
    type T1 = RightWhitespace<"foobar ">;
    type T2 = RightWhitespace<"\n\t foobar \n">;

    type cases = [
      Expect<Equal<T1, " ">>,
      Expect<Equal<T2, " \n">>,
    ];
    const c: cases = [true, true];
    expect(c).toBe(c);
  });

  it("a 'string' type passed in returns a string", () => {
    type T1 = RightWhitespace<string>;

    type cases = [
      Expect<Equal<T1, string>>,
    ];
    const c: cases = [true];
    expect(c).toBe(c);
  });

});
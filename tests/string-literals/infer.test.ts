import { Equal, Expect } from "@type-challenges/utils";
import { infer } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";

const datum = "Llama-3.3-70B-Instruct-f16/Llama-3.3-70B-Instruct-f16-00001-of-00004.gguf" as const;
// const data = [
//   "Llama-3.3-70B-Instruct-f16/Llama-3.3-70B-Instruct-f16-00001-of-00004.gguf",
//   "Llama-3.3-70B-Instruct-f16/Llama-3.3-70B-Instruct-f16-00002-of-00004.gguf",
//   "Llama-3.3-70B-Instruct-f16/Llama-3.3-70B-Instruct-f16-00003-of-00004.gguf",
//   "Llama-3.3-70B-Instruct-f16/Llama-3.3-70B-Instruct-f16-00004-of-00004.gguf",
// ] as const;


describe("infer(templ) → (test) → RESULT", () => {

  it("happy path", () => {
    const inference = infer(
      `{{infer Model}}/{{infer File}}-{{infer Index extends number}}-of-{{infer Total extends number}}.{{infer Rest}}`
    )
    const strInference = infer(
      `{{infer Model}}/{{infer File}}-{{infer Index extends string}}-of-{{infer Total extends string}}.{{infer Rest}}`
    )
    type Vars = typeof inference["vars"];
    type Literal = typeof inference["typeLiteral"];

    console.log({
      match: inference(datum),
      noMatch: inference("hello world"),
      strMatch: strInference(datum)
    })

    const match = inference(datum);
    expect(match).toBeTypeOf("object");

    const noMatch = inference("hello world");
    expect(noMatch).toBe(false);

    const wide = inference(datum as string);

    const strMatch = strInference(datum);
    expect(strMatch).toBeTypeOf("object");


    // @ts-ignore
    type cases = [
      Expect<Equal<Vars, {
        string: ["Model", "File", "Rest"],
        numeric: ["Index", "Total"],
        boolean: []
      }>>,
      Expect<Equal<
        Literal,
        `${string}/${string}-${number}-of-${number}.${string}`
      >>,

      // match relies on runtime to determine if a match can be made
      Expect<Equal<
        typeof match,
        false | {
          Model: string;
          File: string;
          Rest: string;
          Index: number;
          Total: number;
        }
      >>,
      // type system KNOWS that no match will be made
      Expect<Equal<typeof noMatch, false>>,
      // type system KNOWS that there will be a match
      Expect<Equal<typeof strMatch, {
          Model: string;
          File: string;
          Index: string;
          Total: string;
          Rest: string;
        }
      >>
    ];
  });
});

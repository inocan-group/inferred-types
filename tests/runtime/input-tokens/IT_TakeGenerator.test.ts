import { describe, it } from "vitest";
import {
  Expect,
  Test,
  IT_Token,
  GetInputToken,
  IT_TakeGroup,
  IT_TakeGenerator
} from "inferred-types/types";

describe("IT_TakeGenerator<T>", () => {
  describe("named generators", () => {
    it("synchronous named generator", () => {
      type G1 = `function* iterate(count: number): Generator<number, void, unknown>`;
      type T1 = IT_TakeGenerator<G1>;

      type G2 = `function* collect<T extends number>(arr: Array<T>): IterableIterator<T>`;
      type T2 = IT_TakeGenerator<G2>;

      type cases = [
        Expect<Test<T1, "extends", IT_Token<"generator">>>,
        Expect<Test<T2, "extends", IT_Token<"generator">>>,

        // G1 specifics
        Expect<Test<T1["kind"], "equals", "generator">>,
        Expect<Test<T1["name"], "equals", "iterate">>,
        Expect<Test<T1["narrowing"], "equals", false>>,
        Expect<Test<T1["isAsync"], "equals", false>>,
        Expect<Test<T1["returnToken"], "equals", "Generator<number, void, unknown>">>,
        Expect<Test<T1["returnType"], "equals", Generator<number, void, unknown>>>,
        Expect<Test<T1["type"], "equals", Generator<number, void, unknown>>>,

        // G2 generics imply narrowing
        Expect<Test<T2["narrowing"], "equals", true>>,
        Expect<Test<T2["returnType"], "equals", IterableIterator<number>>>,
      ];
    });

    it("asynchronous named generator", () => {
      type AG1 = `async function* stream(url: string): AsyncGenerator<string, number, unknown>`;
      type T1 = IT_TakeGenerator<AG1>;

      type cases = [
        Expect<Test<T1, "extends", IT_Token<"generator">>>,
        Expect<Test<T1["kind"], "equals", "generator">>,
        Expect<Test<T1["name"], "equals", "stream">>,
        Expect<Test<T1["isAsync"], "equals", true>>,
        Expect<Test<T1["returnType"], "equals", AsyncGenerator<string, number, unknown>>>,
      ];
    });
  });

  describe("anonymous generators", () => {
    it("synchronous anonymous generator", () => {
      type G1 = `function* (value: string): Iterator<string>`;
      type T1 = IT_TakeGenerator<G1>;

      type cases = [
        Expect<Test<T1, "extends", IT_Token<"generator">>>,
        Expect<Test<T1["kind"], "equals", "generator">>,
        Expect<Test<T1["name"], "equals", null>>,
        Expect<Test<T1["narrowing"], "equals", false>>,
        Expect<Test<T1["returnToken"], "equals", "Iterator<string>">>,
        Expect<Test<T1["returnType"], "equals", Iterator<string>>>,
        Expect<Test<T1["type"], "equals", Iterator<string>>>,
      ];
    });

    it("asynchronous anonymous generator", () => {
      type G1 = `async function* (value: string): AsyncIterableIterator<string>`;
      type T1 = IT_TakeGenerator<G1>;

      type cases = [
        Expect<Test<T1, "extends", IT_Token<"generator">>>,
        Expect<Test<T1["kind"], "equals", "generator">>,
        Expect<Test<T1["name"], "equals", null>>,
        Expect<Test<T1["isAsync"], "equals", true>>,
        Expect<Test<T1["returnType"], "equals", AsyncIterableIterator<string>>>,
      ];
    });
  });

  describe("grouping and intersections", () => {
    it("generator with key value pairs via grouping", () => {
      type Tok = `(function* (name: string): Generator<string, void, unknown>) & { foo: 1; bar: 2 }`;
      type T1 = IT_TakeGenerator<Tok>;
      type T2 = IT_TakeGroup<Tok>;
      type T3 = GetInputToken<Tok>;

      type cases = [
        // direct call to IT_TakeGenerator should not parse grouped token
        Expect<Test<T1, "isError", "wrong-handler">>,

        // IT_TakeGroup works and leaves an intersection to parse
        Expect<Test<T2["type"], "equals", Generator<string, void, unknown>>>,
        Expect<Test<T2["rest"], "equals", "& { foo: 1; bar: 2 }">>,

        // final GetInputToken parses to intersection type
        Expect<Test<T3, "extends", IT_Token<"intersection">>>,
        Expect<Test<T3["type"], "equals", (
          Generator<string, void, unknown>
        ) & { foo: 1; bar: 2 }>>,
      ];
    });
  });

  describe("validation errors", () => {
    it("sync generator returning async type is malformed", () => {
      type Bad = IT_TakeGenerator<`function* g(): AsyncGenerator<string, void, unknown>`>;
      type cases = [
        Expect<Test<Bad, "isError", "malformed-token">>,
      ];
    });

    it("async generator returning sync type is malformed", () => {
      type Bad = IT_TakeGenerator<`async function* g(): Generator<string, void, unknown>`>;
      type cases = [
        Expect<Test<Bad, "isError", "malformed-token">>,
      ];
    });
  });
});


import type { Opaque } from "type-fest";
import { uuid } from "~/shared";
import { ExplicitFunction, RuleSet } from "~/utility";

describe("Opaque type from type-fest", () => {
  it("create a opaque Person record", () => {
    type PersonId<T extends string> = Opaque<string, T>;

    type Person<T extends string> = {
      id: PersonId<T>;
      name: T;
      balance: number;
      /** hi */
      doit(name: string): string;
    };

    type Person2<T extends string> = {
      id: string;
      name: T;
      balance: number;
      /** hi */
      doit(name: string): string;
    };

    const person = <T extends string>(name: T) => {
      const id = uuid() as PersonId<T>;
      return { id, name } as Person<T>;
    };
    const person2 = <T extends string>(name: T) => {
      const id = uuid();
      return { id, name } as Person<T>;
    };


    const p = person("Joe");
    const p2 = person2("Bob");

    p.id = p2.id;

    console.log(p.id);
  });

  it("create an API with opaque", () => {
    type Endpoint<K extends string, F extends ExplicitFunction<any[], any>> = Record<K, F>;


    function endpoint<K extends Readonly<string>, F extends ExplicitFunction<any[], any>, R extends RuleSet<any, any>>(key: K, fn: F, rules?: R) {
      return { [key]: fn } as Endpoint<K, F>;
    };

    // function api<A extends {[K in keyof A]: V}, V extends any

    // const e1 = endpoint("hi", (name: string) => `hi ${name}`);
    // /** bye endpoint */
    // const e2 = endpoint("bye", (name: string) => `bye ${name}`);

    // const api = { ...e1, ...e2 };

  });
});
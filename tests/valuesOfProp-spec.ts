import type { Expect, Equal, ExpectExtends } from "@type-challenges/utils";
import { valuesOfProp } from "~/utility";

describe("valuesOfProp() utility", () => {

  it("values of unique prop", () => {
    type Type = { name: string; color: string };
    const t: Type[] = [
      { name: "bob", color: "blue" },
      { name: "chris", color: "red" },
      { name: "mary", color: "yellow" },
      { name: "jude", color: "orange" },
    ];

    const t2 = valuesOfProp<Type>()(t, "name");

  });


});
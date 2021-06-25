import { Model } from "~/utility";

describe("Model() utility", () => {

  it("Initializing model works", () => {
    const test = Model("food");
    type Test = typeof test;


    // const t = Model("food").addProp("foo", "string").addProp("bar", "string");

  });


});
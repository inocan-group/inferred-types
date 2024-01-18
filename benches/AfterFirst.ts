import { bench } from "@arktype/attest";
import { AfterFirst } from "../dist/inferred-types/index";

export const TARGET = 64;

export const test = () => {

  bench(`AfterFirst<["foo","bar","baz"]>`, () => {
    return {} as AfterFirst<["foo","bar","baz"]>;
  }).types([TARGET, "instantiations"]);
}

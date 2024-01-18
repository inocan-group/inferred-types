import { bench } from "@arktype/attest";
import { First } from "../dist/inferred-types/index";

export const TARGET = 32;

export const test = () => {

  bench(`First<["foo","bar","baz"]>`, () => {
    return {} as First<["foo","bar","baz"]>;
  }).types([TARGET, "instantiations"]);
}

import { bench } from "@arktype/attest";
import { Pluralize } from "../dist/types/index";
import { pluralize} from "../dist/runtime/index";

export const TARGET = 450;

export const test = () => {
  
  bench("Pluralize<'person'>", () => {
    return {} as Pluralize<"person">;
  }).types([TARGET, "instantiations"]);
  
  bench("Pluralize<'foot'>", () => {
    return {} as Pluralize<"foot">;
  }).types([TARGET, "instantiations"]);
  
  bench("pluralize(person)", () => {
    return pluralize("person");
  }).types([TARGET, "instantiations"]);
  
}

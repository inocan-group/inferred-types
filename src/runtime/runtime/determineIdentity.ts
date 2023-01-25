import { TypeDefn } from "types/runtime-types/Type";
import { Suggest } from "../literals";

// const byKind = {
//   string: `The `
// } as const satisfies Record<Partial<TypeKind>, any>;

export function determineIdentity<TD extends TypeDefn>(defn: TD) {

  switch (defn.kind) {
    case "string": 
      return "";
    case "number":
      return 0;
    default:
      return "" as Suggest<"no identity property">;
  }

}


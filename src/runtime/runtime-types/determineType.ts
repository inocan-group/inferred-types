import { 
  FromTypeDefn, 
  TypeDefn, 
  GetEach, 
  TupleToUnion, 
  UnionToIntersection 
} from "src/types";

import { 
  hasNoUnderlyingTypes, 
  hasUnderlyingTypes, 
  isLiteralType, 
  WIDE 
} from "src/runtime";

type GetType<U> = U extends readonly unknown[]
  ? GetEach<U, "type">
  : never;


export function determineType<TD extends TypeDefn>(t: TD): FromTypeDefn<TD>["type"] {
  // literals and containers have underlying types
  if(isLiteralType(t)) {
    // all literal types store their types directly on underlying prop
    return t.underlying as TupleToUnion<TD["underlying"]>;
  } else if (hasUnderlyingTypes(t)) {
    switch (t.kind) {
      case "arrayOf":
        return t.underlying as TupleToUnion<TD["underlying"]>;
      case "tuple":
        return t.underlying as GetType<TD["underlying"]>;
      case "intersection":
        return t.underlying as UnionToIntersection<
          TupleToUnion<GetType<TD["underlying"]>>
        >;
      case "union":
        return t.underlying as TupleToUnion<GetType<TD["underlying"]>>;
      case "object":
        return t.underlying as TD["underlying"];

      default:
          throw new Error(`Unknown type (with underlying values): ${t.kind}`);
    }
  } else if(hasNoUnderlyingTypes(t)) {
    // the remaining are all static in their type
    switch(t.kind) {
      case "string":
        return WIDE.string;
      case "number":
        return WIDE.number;
      case "undefined":
        return WIDE.undefined;
      case "null":
        return WIDE.null;
      case "boolean":
        return WIDE.boolean;
      case "anyFunction":
        return WIDE.function;
      case "anyArray":
        return WIDE.anyArray;
      case "anyObject":
        return WIDE.anyObject;
      case "unknownObject":
        return WIDE.unknownObject;
      case "emptyObject": 
        return WIDE.emptyObject;
      default:
        throw new Error(`Unknown type (without underlying values): ${t.kind}`);
    }
  }

  throw new Error("Unknown type passed to determineType()!");
}

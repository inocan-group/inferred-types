import { 
  FromTypeDefn, 
  TypeDefn, 
  GetEach, 
  KvDictToObject, 
  TupleToUnion, 
  TypeKvBase, 
  UnionToIntersection 
} from "src/types";

import { hasNoUnderlyingTypes, hasUnderlyingTypes, isLiteralType } from "../type-guards/runtime-type-guards";
import { wide } from "../literals";

type GetType<U> = U extends readonly any[]
  ? GetEach<U, "type">
  : never;

type ObjectShape<U> = U extends readonly TypeKvBase<any,any>[]
  ? KvDictToObject<U>
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
        return t.underlying as ObjectShape<TD["underlying"]>;

      default:
          throw new Error(`Unknown type (with underlying values): ${t.kind}`);
    }
  } else if(hasNoUnderlyingTypes(t)) {
    // the remaining are all static in their type
    switch(t.kind) {
      case "string":
        return wide.string;
      case "number":
        return wide.number;
      case "undefined":
        return wide.undefined;
      case "null":
        return wide.null;
      case "boolean":
        return wide.boolean;
      case "anyFunction":
        return wide.function;
      case "anyArray":
        return wide.anyArray;
      case "anyObject":
        return wide.anyObject;
      case "unknownObject":
        return wide.unknownObject;
      case "emptyObject": 
        return wide.emptyObject;
      default:
        throw new Error(`Unknown type (without underlying values): ${t.kind}`);
    }
  }

  throw new Error("Unknown type passed to determineType()!");
}

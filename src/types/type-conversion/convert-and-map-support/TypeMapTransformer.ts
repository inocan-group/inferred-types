import { GetEach } from "src/types/lists";
import { TupleToUnion } from "../TupleToUnion";
import { TypeTuple } from "../TypeTuple";
import { UnionToTuple } from "../UnionToTuple";


/**
 * The types of transformation you want to apply to matched tokens
 */
export type TypeMapTransformer<T = unknown> = 
  | ["Identity"] 
  | ["Capitalized"]
  | ["PascalCase"]
  | ["CamelCase"]
  | ["KebabCase"]
  | ["ToString"]
  | ["ToTrue"]
  | ["ToFalse"]
  | ["ToBoolean"]
  | ["AsString"]
  | ["AsBooleanString"]
  | ["AsNumericString"]
  | ["Never"]
  | ["StripLeading", T & string] 
  | ["StripTrailing", T & string] 
  | ["As", T & TypeTuple] 
  | ["NumericLiteral", T & number]
  | ["StringLiteral", T & string];

/**
 * **TypeMapTransformerOp**
 * 
 * A union type of all valid `TypeMapTransformer` operations.
 */
export type TypeMapTransformerOp = TupleToUnion<GetEach<UnionToTuple<TypeMapTransformer>, 0>>;

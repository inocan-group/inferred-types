import { 
  Concat,
  ErrorCondition, 
  IfExtends, 
  TypeComparison, 
  ValidateTypeMapMatcher 
} from "src/types";

type InvalidStructure<T> = ErrorCondition<
  "invalid-tuple",
  "The type T passed into TypeMapMatcher was not a valid Tuple contains [ comparison op, reference type ]",
  "TypeMapMatcher",
  { tuple: T }
>;

/**
 * **TypeMapMatcher**`<T>`
 * 
 * A tuple which represents both the _method_ you will use to match 
 * and the _reference_ type you are comparing to. 
 * 
 * - this type is most typically generated when using the 
 * `createTypeMapper()` runtime utility but may be useful in other
 * scenarios too
 * - the _method_ or _operations_ supported are defined by the `TypeComparison`
 * type union and the `TYPE_COMPARISONS` runtime constant
 * 
 * 
 * ### Usage Examples
 * ```ts
 * const valid: TypeMatcher<"foobar"> = ["Extends", "foobar"];
 * const mapper = createTypeMapper("foobar", t => t.startsWith("foo"));
 * ```
 */
export type TypeMapMatcher<T> = 
[T] extends [[
  op: TypeComparison,
  reference: unknown
]] 
  ? ValidateTypeMapMatcher<T[0],T[1]>
  : T extends [ unknown, unknown ]
    ? IfExtends<
        T[0], TypeComparison,
        InvalidStructure<T>,
        ErrorCondition<
          "unknown-operation",
          Concat<["The type T passed into TypeMapMatcher looked reasonable structurally but the operation \"", T[0], "\" is not known!"]>,
          "TypeMapMatcher",
          { comparisonOperation: T[0]; referenceType: T[1] }
        >
      >
    : InvalidStructure<T>;


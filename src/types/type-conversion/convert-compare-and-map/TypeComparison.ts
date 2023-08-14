import { AnyFunction, Concat,  ErrorCondition,IfExtends,Tuple,TupleToUnion } from "src/types";
import { TYPE_COMPARISONS, TYPE_COMPARISONS_FUNCTION, TYPE_COMPARISONS_NUMERIC, TYPE_COMPARISONS_STRING, TYPE_COMPARISONS_TUPLE } from "src/constants";

/**
 * **TypeComparison**
 * 
 * A union type of comparison operations which can be done between two
 * known typed data structures.
 */
export type TypeComparison = TupleToUnion<typeof TYPE_COMPARISONS>;

export type TypeComparison_String = TupleToUnion<typeof TYPE_COMPARISONS_STRING>;
export type TypeComparison_Number = TupleToUnion<typeof TYPE_COMPARISONS_NUMERIC>;
export type TypeComparison_Function = TupleToUnion<typeof TYPE_COMPARISONS_FUNCTION>;
export type TypeComparison_Tuple = TupleToUnion<typeof TYPE_COMPARISONS_TUPLE>;

/**
 * **ValidateTypeMapMatcher**`<TType, TOp>`
 * 
 * A validation type utility which ensures that a `TypeMapMatcher`
 * always receives a valid comparison type _based_ on the comparison
 * operation being used.
 */
export type ValidateTypeMapMatcher<TOp extends TypeComparison, TRefType> = 
IfExtends<
  TOp, TypeComparison_String,
  IfExtends<
    TRefType, string, 
    [TOp, TRefType], 
    ErrorCondition<
      "invalid-type", 
      Concat<[`Using the '`, TOp, "' comparison operation requires that the reference type extend a string value!"]>,
      "TypeMapMatcher",
        { referenceType: TRefType; comparisonOperation: TOp }
    >
  >,
    // non-string TType
    IfExtends<
      // conditional params
      TOp, TypeComparison_Function,
      // requires function
      IfExtends<
        TRefType, AnyFunction,
        [TOp, TRefType],
        ErrorCondition<
          "invalid-type",
          Concat<[
            "Using the '", 
            TOp, 
            "' comparison operation requires that the reference type extends a function!"
          ]>,
          "TypeMapMatcher",
          { referenceType: TRefType; comparisonOperation: TOp }
        >
      >,
      IfExtends<
          TOp, TypeComparison_Tuple,
          IfExtends<
            TRefType, Tuple,
            [TOp, TRefType],
            ErrorCondition<
              "invalid-type",
              Concat<["Using the '", TOp, "' comparison operation requires that the reference type be a Tuple!"]>,
              "TypeMapMatcher"
            >
          >,

          IfExtends<
            TOp, TypeComparison_Number,
            IfExtends<
              TRefType, number,
              [TOp, TRefType], 
              ErrorCondition<
                "invalid-type",
                Concat<["Using the '", TOp, "' comparison operation requires that the reference type be a number type!"]>,
                "TypeMapMatcher"
              >
            >,

            // generic comparisons take all types
            [TOp, TRefType]
      >
    >
  >
>;




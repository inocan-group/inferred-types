import { 
  And,  
  IsStringLiteral, 
  IsNumericLiteral,   
  IsTuple, 
  IsBooleanLiteral, 
  IsObjectLiteral, 
  Or 
} from "src/types/index";

/**
 * **AllLiteral**`<TTuple>`
 * 
 * A boolean operator which tests whether all properties in
 * the tuple `TTuple` are _literal_ types.
 */
export type AllLiteral<T extends readonly unknown[]> = And<{
  [K in keyof T]: Or<[
      IsStringLiteral<T[K]>,
      IsNumericLiteral<T[K]>,
      IsTuple<T[K]>,
      IsBooleanLiteral<T[K]>,
      IsObjectLiteral<T[K]>,
    ]>
}>;

// [1,2,3] -> [true,true,true]

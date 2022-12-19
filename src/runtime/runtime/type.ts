/* eslint-disable no-use-before-define */
import {  GetEach, IsLiteral, TupleToUnion, UnionToTuple } from "src/types";
import { IfLength } from "src/types/boolean-logic/IfLength";
import { Narrowable } from "src/types/Narrowable";
import { ObjectFromKv } from "src/types/type-conversion/ObjectFromKv";
import { TypeGuard } from "src/types/TypeGuard";

export const NO_DEFAULT_VALUE = `no-default-value` as const;
export type TypeKind = "string" | "number" | "boolean" | "true" | "false" | "stringLiteral" | "numericLiteral" | "object" | "function" | "functionLiteral" | "objectFunction" | "objectLiteral" | "null" | "undefined" | "array" | "tuple" | "never" | "union";

// basic types
export type StringType<T, TDesc extends string = ""> =  Type<"string", T, TDesc>;
export type NumericType<T, TDesc extends string = ""> =  Type<"number", T, TDesc>;
export type BooleanType<T, TDesc extends string = ""> =  Type<"boolean", T, TDesc>;
export type TrueType<T, TDesc extends string = ""> = Type<"true", T, TDesc>;
export type FalseType<TDesc extends string = ""> = Type<"false", false, TDesc>;
export type StringLiteral<TLiteral extends string, TDesc extends string = ""> =  Type<"stringLiteral", TLiteral, TDesc>;
export type NumericLiteral<TLiteral extends number, TDesc extends string = ""> =  Type<"numericLiteral", TLiteral, TDesc>;
export type FunctionType<TDesc extends string = ""> =  Type<"function", Function, TDesc>;
export type FunctionLiteral<TFn extends Narrowable, TDesc extends string = ""> =  Type<"function", Function, TDesc> & { Fn: TFn & ((...args: any[]) => any) };

export type ScalarType<TLiteral extends number | string | boolean = never, TDesc extends string = ""> = StringType<TDesc> 
  | NumericType<TDesc>
  | BooleanType<TDesc>
  | StringLiteral<Exclude<TLiteral, number | boolean>, TDesc>
  | NumericLiteral<Exclude<TLiteral, string | boolean>, TDesc>
  | TrueType<TDesc>
  | FalseType<TDesc>
  | FunctionType<TDesc>;


// container types
export type UnionType<
  TUnderlying extends readonly Type<TypeKind, any, string>[], 
  TDesc extends string = ""
> = Type<"union", TupleToUnion<GetEach<TUnderlying, "type">>, TDesc> & { underlying : TUnderlying};

export type ObjectType<
  TKv extends readonly {key: string; value: Type<TypeKind, any, string>}[],
  TDesc extends string = ""
> = Type<"object", ObjectFromKv<TKv>, TDesc> & {kv: TKv};

export type ArrayType<
  TType extends Type<TypeKind, any, string>,
  TDesc extends string = ""
> = Type<"array", TType["type"][], TDesc>;

export type TupleType<
  TTuple extends readonly Type<TypeKind, any, string>[],
  TDesc extends string = ""
> = Type<"tuple", GetEach<TTuple, "type">, TDesc> & { underlying: TTuple };

export type ContainerType<
  TState extends readonly any[] = readonly[],
  TType extends Type<TypeKind, any, string> = Type<TypeKind, any, string>,
  TDesc extends string = ""
> = UnionType<TState, TDesc>
  | ObjectType<TState, TDesc>
  | ArrayType<TType, TDesc>
  | TupleType<TState, TDesc>;

export type ValidationResult = [checkedForType: true, valid: boolean] | [checkedForType: false, valid: undefined];


/**
 * A type definition which retains valuable runtime characteristics
 */
export type Type<
  K extends TypeKind, 
  T extends Narrowable, 
  D extends string = ""
> = {
  _kind: "Type";
  /** the _kind_ or _category_ of the type (e.g., string, stringLiteral, number, etc) */
  kind: K;
  /** the fully expressed _type_ of the Type */
  type: T;
  /** whether or not the type represents a _union_ type */
  isUnion: IfLength<UnionToTuple<T>, 1, false, true>;
  isLiteralType: IsLiteral<T>;

  /** 
   * a type guard function which uses the basic type shape to be generated automatically
   */
  is: TypeGuard<T>;

  /** runs the type-guard check plus any run-time validates which were configured */
  validate: <V extends T>(val: V) => boolean;
  /**
   * the "default value" of a given type 
   */
  defaultValue: T | typeof NO_DEFAULT_VALUE;

  identity: T | NotApplicable;

  /** Description of the type */
  description: D;
};

export type TypeOptions<
  T, 
  TValidations extends readonly any[], 
  TDefaultValue extends T | null,
  TDesc extends string
> = {
  validations?: TValidations;
  defaultValue?: TDefaultValue;
  desc?: TDesc;
};

export interface TypeInterface {
    /** a wide string type */
    string<
      TValidations extends readonly any[] = readonly[], 
      TDefault extends string | null = null,
      TDesc extends string = ""
    >(options?: TypeOptions<string, TValidations, TDefault, TDesc>): StringType<string, TDesc>;

    stringLiteral<
      TLiteral extends readonly any[],
      TValidations extends readonly any[] = readonly[], 
      TDefault extends TupleToUnion<TLiteral> | null = null,
      TDesc extends string = ""
    >(literal: TLiteral extends readonly string[] ? TLiteral : never, options?: TypeOptions<TupleToUnion<TLiteral>, TValidations, TDefault, TDesc>): StringLiteral<TupleToUnion<TLiteral>, TDesc>;

    /** a wide number type */
    number<
      TValidations extends readonly any[] = readonly[], 
      TDefault extends number | null = null,
      TDesc extends string = ""
    >(options: TypeOptions<number, TValidations, TDefault, TDesc>): NumericType<number, TDesc>;

    numericLiteral<
      TLiteral extends readonly any[],
      TValidations extends readonly any[] = readonly[], 
      TDefault extends TupleToUnion<TLiteral> | null = null,
      TDesc extends string = ""
    >(
      literal: TLiteral extends readonly number[] ? TLiteral : never, 
      options?: TypeOptions<TupleToUnion<TLiteral>, TValidations, TDefault, TDesc>
    ): NumericLiteral<TupleToUnion<TLiteral>, TDesc>;

    /** a wide boolean type */
    boolean<
      TValidations extends readonly any[] = readonly[], 
      TDefault extends boolean | null = null,
      TDesc extends string = ""  
    >(options: TypeOptions<boolean, TValidations, TDefault, TDesc>): BooleanType<boolean, TDesc>;

    /** a narrow `true` type */
    true<V extends any, D extends string>(options: TypeOptions<true, V,D>): TrueType;

    /** a narrow `false` type */
    false<V extends any, D extends string>(options: TypeOptions<false, V,D>): FalseType;

    function<V extends any, D extends string>(options: TypeOptions<Function, V,D>): FunctionType;

    /** a tuple definition */
    tuple<T extends readonly any[], V extends any, D extends string>(tuple: T, options: TypeOptions<any, V,D>): TupleType<T>;

    /** an array definition */
  //   array<T extends Narrowable>(arrayOf: T, options: TypeOptions<T[]>): TypeApi<
  //     FilterTuple<[...TType, T[]], never>, 
  //     [...TExclude, "array", "tuple"]
  //   >;

  //   /** a string _literal_ */
  //   stringLiteral<L extends string | readonly string[]>(literal: L, options: TypeOptions<L>): TypeApi<
  //     FilterTuple<[...TType, ...AsArray<L>], never>, 
  //     [...TExclude, "stringLiteral", "string"]
  //   >;

  //   /** a numeric _literal_ */
  //   numericLiteral<L extends string>(literal: L, options: TypeOptions<L>): TypeApi<
  //     FilterTuple<[...TType, string], never>, 
  //     [...TExclude, "numericLiteral", "number"]
  //   >;
  // }, 
  // TupleToUnion<TExclude>
}



// export const typeApi = <TExclude extends readonly string[] = []>() =>
//   ({
//     string: {
//       name: "string",
//       type: "" as string,
//       typeGuard: (v: unknown): v is string => isString(v),
//       is: isString,
//     } as Type<string, typeof isString>,
//     boolean: {
//       name: "boolean",
//       type: true as boolean,
//       typeGuard: (v: unknown): v is boolean => isBoolean(v),
//       is: isBoolean,
//     } as Type<boolean, typeof isBoolean>,
//     number: {
//       name: "number",
//       type: 1 as number,
//       typeGuard: (v: unknown): v is number => isNumber(v),
//       is: isNumber,
//     } as Type<number, typeof isNumber>,
//     function: {
//       name: "function",
//       type: Function as FunctionType,
//       typeGuard: (v: unknown): v is FunctionType => isFunction(v),
//       is: isFunction,
//     } as Type<FunctionType, typeof isFunction>,
//     null: {
//       name: "null",
//       type: null as null,
//       typeGuard: (v: unknown): v is null => isNull(v),
//       is: isNull,
//     } as Type<null, typeof isNull>,
//     symbol: {
//       name: "symbol",
//       type: Symbol() as Symbol,
//       typeGuard: (v: unknown): v is Symbol => isSymbol(v),
//       is: isSymbol,
//     } as Type<symbol, typeof isSymbol>,
//     undefined: {
//       name: "undefined",
//       type: undefined as undefined,
//       typeGuard: (v: unknown): v is undefined => isUndefined(v),
//       is: isUndefined,
//     } as Type<undefined, typeof isUndefined>,

//     true: {
//       name: "true",
//       type: true as true,
//       typeGuard: (v: Narrowable): v is true => isTrue(v),
//       is: isTrue,
//     } as Type<true, typeof isTrue>,
//     false: {
//       name: "false",
//       type: false as false,
//       typeGuard: (v: unknown): v is false => isFalse(v),
//       is: isFalse,
//     } as Type<false, typeof isFalse>,

//     object: {
//       name: "object",
//       type: {},
//       typeGuard: (v: unknown): v is ObjectType => isObject(v),
//       is: isObject,
//     } as Type<ObjectType, typeof isObject>,

//     array: {
//       name: "array",
//       type: {} as any[],
//       typeGuard: (v: unknown): v is Object => isArray(v),
//       is: isObject,
//     } as Type<any[], typeof isArray>,

//     // literal: <T extends Readonly<string>>(...literalValues: T[]) =>
//     //   ({
//     //     name: "literal",
//     //     type: v as T,
//     //     typeGuard: (v: unknown): v is T => isLiteral(...literalValues)(v),
//     //     is: isLiteral(...literalValues)(v),
//     //   } as Type<T, typeof isLiteral>),
//   } as const);

/**
 * **isTypeDefinition**(thing)
 * 
 * A type guard which identifies if the value passed in a `Type<K,T,D>` type definition.
 */
export function isTypeDefinition<U extends Type<any, any, any>>(thing: unknown | U): thing is U {
  return (
    typeof thing === "object" && "_kind" in (thing as object) && (thing as any)._kind === "Type"
  );
}

export type TypeApi<E extends string = never> = Exclude<TypeInterface, E>;


/**
 * Provides a runtime configurator to specify a _type_ which is known to 
 * both the type system and the runtime system.
 */
export type TypeDefinition<
  TType extends Narrowable
> = (defn: TypeApi) => TType;


function baseType<
  K extends TypeKind, 
  T, 
  TValidations extends readonly any[], 
  TDefault extends T | null,
  TDesc extends string
>(kind: K, type: T, tg: TypeGuard<T>, o: TypeOptions<T, TValidations, TDefault, TDesc> ) {
  return {
    _kind: "Type",
    kind,
    type,
    is: tg,
    isUnion: false,
    isLiteralType: false,
    validate<V extends T>(val: V): boolean {
      return tg(val);
    },
    
    description: o?.desc || ""
  } as Partial<Type<K,T,TDesc>>;
} 

export const NOT_APPLICABLE = `-x-x-x- n/a -x-x-x-` as const;
export type NotApplicable = typeof NOT_APPLICABLE;


const createTypeApi: TypeInterface = {
    string(o) {
      return {
        ...baseType(
          "string", 
          "" as string, 
          (test: unknown): test is string =>  {
            return typeof test === "string" ? true : false;
          },
          o
        ),
        identity: "",

      };
    },
    number(o) {
      return {
        ...baseType(
          "number",
          0 as number,
          (test: unknown): test is number =>  {
            return typeof test === "number" ? true : false;
          },
          o
        ),
        identity: 0,

      }
    },
    boolean(o) {
      return {
        ...baseType(
          "boolean",
          true as boolean,
          (test: unknown): test is boolean =>  {
            return typeof test === "boolean" ? true : false;
          },
          o
        ),
        identity: NOT_APPLICABLE,

      }
    }, 
    stringLiteral(literal, o) {
      return {
        ...baseType(
          "stringLiteral",
          literal as unknown as UnionToTuple<typeof literal>,
          (test: unknown): test is UnionToTuple<typeof literal> =>  {
            return typeof test === "string" 
              ? literal.includes(test) ? true : false
              : false;
          },
          o
        ),
        identity: "",
        isLiteralType: true,
        isUnion: literal.length > 1 ? true : false
      }
    }
    

  };

  // return available API

  return api as TypeApi<TType, TExclude>;
};

/**
 * Creates a runtime and type definition which are more readily able to be kept in
 * sync. You can define a singular type or a _union_ type.
 * ```ts
 * // simple wide type
 * const myString = type(c => c.string());
 * // string literal
 * const foobar = type(c => c.stringLiteral(["foo", "bar"]));
 * // union
 * const thisThat = type(
 *  c => c.stringLiteral("42").numericLiteral(42)
 * );
 * ```
 */
export function type<
  TType extends Narrowable,
>(typeDefn: TypeDefinition<TType>) {

  return typeDefn(createTypeApi());
}



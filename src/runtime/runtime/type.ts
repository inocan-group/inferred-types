import { FilterTuple, IsLiteral, TupleToUnion, UnionToTuple } from "src/types";
import { IfLength } from "src/types/boolean-logic/IfLength";
import { Narrowable } from "src/types/Narrowable";
import { TypeGuard } from "src/types/TypeGuard";
import { asArray, AsArray } from "../lists/asArray";
import {
  AnyFunction,
} from "../type-checks";

export const NO_DEFAULT_VALUE = `no-default-value` as const;
export type TypeKind = "string" | "number" | "boolean" | "true" | "false" | "stringLiteral" | "numericLiteral" | "object" | "function" | "objectFunction" | "objectLiteral" | "null" | "undefined" | "array" | "tuple" | "never";

export type ValidationResult = [checkedForType: true, valid: boolean] | [checkedForType: false, valid: undefined];

// function isValid<R extends ValidationResult>(r: R){
//   return ifTrue(and(r[0],r[1]), true, false);
// }

export type TypeValidationFn<R extends ValidationResult> = <V extends Narrowable>(test: V) => R;

/**
 * A type definition which retains valuable runtime characteristics
 */
export type Type<K extends TypeKind, T extends Narrowable, D extends string = ""> = {
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
  typeGuard: TypeGuard<T>;

  /** optional type validations/constraints beyond basic type guard */
  validations: readonly TypeValidationFn<any>[];
  /**
   * the "default value" of a given type
   */
  defaultValue: T | typeof NO_DEFAULT_VALUE;

  /** Description of the type */
  description: D;
};

export type TypeOptions<T extends Narrowable> = {
  validations?: Type<any, T>["validations"];
};

export type TypeApi<
  TType extends readonly any[],
  TExclude extends readonly TypeKind[] | []
> = Exclude<
  {
    /**
     * The type definition as it currently stands. A single call to
     * a type function on the API will define the type and every call
     * afterward will add another type as a _union_ to the first.
     */
    typeDefn: Readonly<TupleToUnion<TType>>;

    /** a wide string type */
    string(options: TypeOptions<string>): TypeApi<
      FilterTuple<[...TType, string], never>, 
      [...TExclude, "string", "stringLiteral"]
    >;

    /** a wide number type */
    number(options: TypeOptions<number>): TypeApi<
      FilterTuple<[...TType, string], never>, 
      [...TExclude, "number", "numericLiteral"]
    >;

    /** a wide boolean type */
    boolean(options: TypeOptions<boolean>): TypeApi<
      FilterTuple<[...TType, string], never>, 
      [...TExclude, "boolean"]
    >;

    /** a narrow `true` type */
    true(options: TypeOptions<true>): TypeApi<
      FilterTuple<[...TType, string], never>, 
      [...TExclude, "true"]
    >;

    /** a narrow `false` type */
    false(options: TypeOptions<false>): TypeApi<
      FilterTuple<[...TType, string], never>, 
      [...TExclude, "false"]
    >;

    function(options: TypeOptions<Function>): TypeApi<
      FilterTuple<[...TType, AnyFunction], never>, 
      [...TExclude, "function"]
    >;

    /** a tuple definition */
    tuple<T extends readonly any[]>(tuple: T, options: TypeOptions<T>): TypeApi<
      FilterTuple<[...TType, T], never>, 
      [...TExclude, "tuple" | "array"]
    >;

    /** an array definition */
    array<T extends Narrowable>(arrayOf: T, options: TypeOptions<T[]>): TypeApi<
      FilterTuple<[...TType, T[]], never>, 
      [...TExclude, "array", "tuple"]
    >;

    /** a string _literal_ */
    stringLiteral<L extends string | readonly string[]>(literal: L, options: TypeOptions<L>): TypeApi<
      FilterTuple<[...TType, ...AsArray<L>], never>, 
      [...TExclude, "stringLiteral", "string"]
    >;

    /** a numeric _literal_ */
    numericLiteral<L extends string>(literal: L, options: TypeOptions<L>): TypeApi<
      FilterTuple<[...TType, string], never>, 
      [...TExclude, "numericLiteral", "number"]
    >;
  }, 
  TupleToUnion<TExclude>
>;



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


/**
 * Provides a runtime configurator which allows for expressing a type
 */
export type TypeDefinition<
  TType extends readonly any[],
  TExclude extends readonly any[] = []
> = (defn: TypeApi<[], []>) => TypeApi<TType, TExclude>;

function updateType<
  E extends readonly any[], 
  T extends readonly any[]
>(existing: E, ...newType: T ) {
  return [...existing, ...newType] as unknown as UnionToTuple<TupleToUnion<[...E,...T]>>;
}


const createTypeApi = <
  TType extends readonly any[], 
  TExclude extends readonly TypeKind[] | []
>(type: TType, excluding: TExclude) => {

  // full API definition
  const api: TypeApi<TType, []> = {
    string(_o) {
      return createTypeApi(
        updateType(type, "" as string),
        [...excluding, "string", "stringLiteral"]
      );
    },
    stringLiteral(literal, _o) {
      return createTypeApi(
        updateType(type, ...asArray(literal, false)),
        [...excluding, "string", "stringLiteral"]
      );
    },
    

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
  TType extends readonly any[],
  TExclude extends readonly any[]
>(typeDefn: TypeDefinition<TType, TExclude>) {

  // initialize to "never" state
  const type = {
    _kind: "Type",
    kind: "never",
    type: null as never,
    typeGuard(thing): thing is never {
      return true;
    },
    validations: [],
    isUnion: false,
    isLiteralType: false,
    defaultValue: NO_DEFAULT_VALUE,
    description: ""
  } satisfies Type<any, any, any>;


  const api = createTypeApi(type, []);
  return typeDefn(api);
}



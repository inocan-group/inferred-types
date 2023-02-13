/* eslint-disable no-use-before-define */
import type {
  FromTypeDefn,
  TypeDefaultValue,
  TypeDefn,
  TypeKind,
  TypeUnderlying,
} from "src/types";
import { 
  LITERAL_TYPE_KINDS,
  NO_DEFAULT_VALUE,
} from "src/constants";
import { keys } from "../dictionary";
import { box } from "../literals";
import { isTypeDefn } from "../type-guards";

import { createTypeGuard,createValidator,determineIdentity, determineType } from "./index";

/**
 * **TypeApi**
 * 
 * The API surface used to define _types_ which have a runtime
 * understanding of the type as well.
 */
// type TypeApi<E extends (keyof TypeDefnApi)[] | []> = RemoveProps<TypeDefnApi, E>;

/**
 * **createTypeApi**
 * 
 * Receives an array of properties on the full API
 * which should be _omitted_ and then returns the
 * remaining parts of the API surface.
 */
// const createTypeApi = <
//   K extends TypeKind,
//   T,
//   R extends TypeIsRequired,
//   // exclusions to API surface
//   E extends (keyof TypeDefnApi)[]
// >(
//   state: Type<K,T,R>,
//   exclude: E,
// ): TypeApi<E> => removeProps(typeApiImplementation, exclude);


/**
 * **createTypeDefn**(td: TypeDefn): Type
 * 
 * 
* (defined by the `TypeDefn` type). This function then enriches
 * this data to become a fully fledged "runtime type" as expressed
 * by the `Type` type.
 */
export const createTypeDefn = <
  // eslint-disable-next-line no-use-before-define
  TD extends TypeDefn<TKind, TRequired, TDesc, TUnderlying, TDefValue>,
  TKind extends TypeKind,
  TRequired extends boolean,
  TDesc extends string,
  TUnderlying extends TypeUnderlying,
  TDefValue extends TypeDefaultValue<TKind, TRequired, TUnderlying>
>(defn: TD) => {
  type FullType = FromTypeDefn<TD>;

  const type: FullType = {
    _type: "Type",
    kind: defn.kind,
    type: determineType(defn),
    isRequired: defn.isRequired ? true : false,
    isLiteral: keys(LITERAL_TYPE_KINDS).includes(defn.kind as any) ? true : false,
    description: (defn.description || "") as TDesc,
    validations: (defn.validations || []) as FullType["validations"],
    defaultValue: (
      defn.defaultValue
        ? box(defn.defaultValue)
        : NO_DEFAULT_VALUE
    ) as FullType["defaultValue"],
    identity: determineIdentity(defn),
    underlying: (defn.underlying || "no-underlying") as FullType["underlying"],
    underlying_operand: (
      defn.kind === "intersection" ? "AND" : "OR"
    ) as FullType["underlying_operand"],

    isUnion: (
      defn.isRequired === false || (
        Array.isArray(defn.underlying) && defn.underlying.length > 1
      )
        ? true
        : false
    ),

    // stubs
    validate: (_val) => true,
    is: ((_val) => true) as FullType["is"],

  } as FullType;

  return createValidator(createTypeGuard(type)) as FullType;
};

// export const typeApiImplementation: TypeApi = {
//   string(o) {
//     return createTypeDefn({
//       ...o,
//       kind: "string",
//     });
//   },
//   number(o) {
//     return createTypeDefn({
//       ...o,
//       kind: "number",
//     });
//   },
//   boolean(o) {
//     return createTypeDefn({
//       ...o,
//       kind: "boolean",
//     });
//   },
//   stringLiteral(literal, o) {
//     return createTypeDefn({
//       ...o,
//       underlying: literal,
//       kind: "stringLiteral",
//     });
//   },


// };

/**
 * Creates a _run time_ type definition (`Type`).
 * 
 * - you may pass in a `TypeDefn` or use the builder API to build the type.
 * ```ts
 * // pass in a `TypeDefn` dictionary
 * const myString = type({ kind: "string" });
 * // use the builder API
 * const myObj = type(
 *    defn => defn.objectLiteral()
 *      .addProperty(p => p("string", { isRequired: false }))
 *      .addProperty(p => p("number")
 * )
 * ```
 */
export const type = <
  TD extends TypeDefn
>(t: TD) => {
  if (isTypeDefn(t)) {
    return createTypeDefn({...t, _type: "TypeDefn"} as TD);
  } else {
    throw new Error(`type() received an invalid configuration. Valid types are either a "TypeDefn" dictionary or a API callback definition. Instead received: ${JSON.stringify(t)}`);
    // create type from builder API
    // const initialState = createTypeApi([], createEmptyState());
    // const returnedState = type(initialState);

    // if (returnedState.type.kind === "empty") {
    //   throw new Error("Invalid type! When using the type() utility you must change the state from initial 'empty' state to something else. If you wanted to set to 'never' then choose that method on the API surface.");
    // }

    // return returnedState.type;
  }

};


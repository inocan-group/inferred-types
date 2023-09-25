import { EmptyObject, NotNull } from "src/types";

export type ErrorCondition__Props = {
  context?: Record<string, unknown>;
  utility?: string;
  stack?: readonly string[];
  id?: string | number;
  library?: string;
};


export interface TypeErrorInfo<
  TContext extends object = object,
  TUtility extends string | never = string | never,
  TStack extends readonly string[] = readonly string[],
  TId extends string | number | never = string | number | never,
  TLibrary extends string | never = string | never
> {
  /**
   * A place to add a dictionary of key/value pairs specifically related 
   * to the error.
   */
  context?: TContext;
  /**
   * the name of the type utility which generated the error
   */
  utility?: TUtility;
  /**
   * An array of known type utilities which were involved to get to this error
   */
  stack?: TStack;

  /**
   * if there is a particular "id" value which is useful to separate from the error message
   * you can add it here.
   */
  id?: TId;
  /**
   * If this error condition is originating in a library/repo then you can
   * mark this as being the case.
   */
  library?: TLibrary;
}



/**
 * **ErrorCondition**`<TKind,[TMsg],[TDomain],[TVars]>`
 * 
 * A way to express a meaningful error message in type system
 */
export interface ErrorCondition<
  TKind extends string = string, 
  TMsg extends string = string, 
  TInfo extends TypeErrorInfo | null = TypeErrorInfo | null
> {
  _type: "ErrorCondition";
  /** the kind/category of error this is */
  kind: TKind;
  /** an error about the message */
  message: TMsg;
  /** Error specific context */
  context: TInfo extends NotNull ? TInfo["context"] : EmptyObject;
  /** the originating type utility which threw the error */
  utility: TInfo extends NotNull ? TInfo["utility"] : never;
  /** the stack of utility types which were used to get to this error */
  stack: TInfo extends NotNull ? TInfo["stack"] : [];
  /** a unique id important to this error */
  id: TInfo extends NotNull ? TInfo["id"] : never;
  /** the library this error came from */
  library: TInfo extends NotNull ? TInfo["library"] : never;


  // from: <
  //   TKind2 extends string = string, 
  //   TMsg2 extends string = string, 
  //   TContext2 extends Record<string, unknown> = EmptyObject,
  //   TStack2 extends readonly string[] = [],
  //   TLibrary2 extends string = string,
  //   TCategory2 extends string = string,
  //   TSubcategory2 extends string = string
  // >() => ErrorCondition<

  //   >;
}


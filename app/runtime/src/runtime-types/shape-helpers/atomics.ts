import { isDefined, isFalse, isTrue } from "src/runtime/index";
import { addToken } from "./addToken";
import { If, IsTrue, IsFalse } from "src/types/index";

export const boolean = <L extends boolean>(literal?: L) => (
  isDefined(literal)
    ? isTrue(literal)
      ? addToken("true")
      : isFalse(literal)
        ? addToken("false")
        : addToken("boolean")
    : addToken("boolean")
) as unknown as If<IsTrue<L>, true, If<IsFalse<L>, false, boolean>>;

export const unknown = () => "<<unknown>>" as unknown;

export const undefinedType = () => "<<undefined>>" as unknown as undefined;

export const nullType = () => "<<null>>" as unknown as null;

export const never = () => "<<never>>" as unknown as never;

import { PLURAL_EXCEPTIONS } from "src/constants"
import { getEach, pop } from "src/runtime"

const isException = <T extends string>(word: T) => getEach(PLURAL_EXCEPTIONS,0).includes(word as any);

const exceptionLookup = <T extends string>(word: T) => pop(PLURAL_EXCEPTIONS.find(i => i[0] === word));

export const pluralize = <T extends string>(word: T): Pluralize<T> {
  return isException(word)
    ? exceptionLookup(word)
    : 
}
